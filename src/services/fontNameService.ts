import {
  FontNameCandidate,
  FontNameFilterConfig,
  ApiProvider,
  AiDeepCheckResult,
  LiveGoogleSearchResponse,
  LiveGoogleSearchResultItem
} from '../types';
import {
  getOfflineFontNameCandidates,
  detectLigatures
} from '../data/fontNamePresets';
import { checkFontCollision } from '../data/existingFontsCatalog';

export interface FontNameGeneratorResult {
  candidates: FontNameCandidate[];
  usedFallback: boolean;
  error?: string;
  providerName?: string;
}

export const KNOWN_FONT_MARKETPLACE_DOMAINS = [
  'dafont.com',
  'myfonts.com',
  'creativemarket.com',
  'fonts.google.com',
  'fontspring.com',
  'fontspace.com',
  'fontsquirrel.com',
  'fonts.adobe.com',
  'behance.net',
  'youworkforthem.com',
  'typenetwork.com',
  'fontbundles.net',
  'creativefabrica.com',
  'linotype.com',
  'monotype.com',
  'freefontsdownload.net',
  'font.download',
  'fontesk.com',
  'envato.com',
  'bombastype.com',
  'subqistudio.com',
  'velvetyne.fr'
];

/**
 * Perform a direct Live Google Custom Search query via Google Custom Search JSON API
 */
export async function fetchLiveGoogleSearchResults(
  query: string,
  apiKey?: string,
  cseId?: string
): Promise<LiveGoogleSearchResponse> {
  const cleanQuery = query.trim();
  const targetQuery = cleanQuery.toLowerCase().includes('font') ? cleanQuery : `"${cleanQuery}" font`;

  if (!apiKey || !apiKey.trim() || !cseId || !cseId.trim()) {
    return {
      query: targetQuery,
      totalResults: '0',
      items: [],
      detectedMarketplaces: [],
      isCollisionDetected: false,
      error: 'Google Custom Search Engine ID (CX) or Search API Key is not configured.'
    };
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(apiKey.trim())}&cx=${encodeURIComponent(cseId.trim())}&q=${encodeURIComponent(targetQuery)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Google CSE returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const rawItems: any[] = data.items || [];
    const detectedMarketplaces: string[] = [];

    const items: LiveGoogleSearchResultItem[] = rawItems.map((item) => {
      const displayLink = (item.displayLink || '').toLowerCase();
      const snippet = item.snippet || '';
      const title = item.title || '';

      const matchedDomain = KNOWN_FONT_MARKETPLACE_DOMAINS.find(d => 
        displayLink.includes(d) || item.link.toLowerCase().includes(d)
      );

      const isMarketplace = !!matchedDomain || 
        title.toLowerCase().includes('font') || 
        snippet.toLowerCase().includes('typeface') || 
        snippet.toLowerCase().includes('download');

      if (matchedDomain && !detectedMarketplaces.includes(matchedDomain)) {
        detectedMarketplaces.push(matchedDomain);
      }

      return {
        title,
        link: item.link || '',
        snippet,
        displayLink: item.displayLink || '',
        isFontMarketplace: isMarketplace,
        marketplaceName: matchedDomain
      };
    });

    const isCollisionDetected = detectedMarketplaces.length > 0 || items.some(i => i.isFontMarketplace);

    return {
      query: targetQuery,
      totalResults: data.searchInformation?.totalResults || String(items.length),
      items,
      detectedMarketplaces,
      isCollisionDetected
    };
  } catch (err: any) {
    return {
      query: targetQuery,
      totalResults: '0',
      items: [],
      detectedMarketplaces: [],
      isCollisionDetected: false,
      error: err.message || 'Failed to fetch Google Search results.'
    };
  }
}

/**
 * AI Deep Scan for Font Trademark & Marketplace Availability
 * Uses Google Search Grounding with Gemini if available, plus local catalog cross-checking
 */
export async function deepScanFontWithAI(
  fontName: string,
  provider: ApiProvider,
  apiKey?: string,
  model?: string
): Promise<AiDeepCheckResult> {
  const cleanName = fontName.trim();

  // 1. Immediate Local Catalog Check (Google Fonts, Bombastype, Creative Market, DaFont)
  const localCheck = checkFontCollision(cleanName);
  if (localCheck.isTaken) {
    return {
      fontName: cleanName,
      isTaken: true,
      status: 'TAKEN',
      foundryOrDesigner: localCheck.sourceNote,
      details: localCheck.sourceNote || `Existing font match detected in registry catalog.`,
      sourceNote: 'Direct Registry Catalog Match'
    };
  }

  // 2. If no API key provided, mark as UNVERIFIED ONLINE (never falsely claim "LIKELY AVAILABLE")
  if (!apiKey || !apiKey.trim()) {
    return {
      fontName: cleanName,
      isTaken: false,
      status: 'UNVERIFIED',
      details: 'Local catalog clear. Open Live Google Search to verify real-time market availability.',
      sourceNote: 'Not Scanned Online'
    };
  }

  // 3. Online AI Check with Live Search Guidance
  const prompt = `Conduct a rigorous real-time font availability and trademark audit for: "${cleanName}".
Task: Search the live web for "${cleanName} font" and "${cleanName} typeface" on DaFont, MyFonts, Creative Market, Fontspring, Behance, Adobe Fonts, or indie foundries (e.g. Bombastype, Subqi Studio, Set Sail Studios).
If this name is already taken by an existing font release, state the creator/foundry and where it is sold.

Return your evaluation as a clean JSON block:
\`\`\`json
{
  "isTaken": boolean,
  "status": "TAKEN" or "POSSIBLE_MATCH" or "LIKELY_AVAILABLE",
  "foundryOrDesigner": "Designer or Foundry name if known",
  "details": "Explanation of existing font or live search findings"
}
\`\`\``;

  try {
    let rawText = '';
    let groundingUrls: Array<{ title: string; url: string }> = [];
    let searchQueries: string[] = [];

    if (provider === 'gemini') {
      const activeModel = model || 'gemini-1.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey.trim()}`;
      
      // Try with Google Search Grounding tool (do NOT send responseMimeType: application/json because Gemini rejects tools with structured JSON mode)
      let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }]
        })
      });

      // Fallback with camelCase googleSearch if snake_case rejected
      if (!res.ok) {
        res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            tools: [{ googleSearch: {} }]
          })
        });
      }

      // Fallback without tools if tools are not supported for this key
      if (!res.ok) {
        res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.1 }
          })
        });
      }

      if (!res.ok) throw new Error(`Gemini status ${res.status}`);
      const data = await res.json();
      rawText = data?.candidates?.[0]?.parts?.[0]?.text || '';

      // Extract real Google Search Grounding Metadata
      const grounding = data?.candidates?.[0]?.groundingMetadata;
      if (grounding) {
        if (Array.isArray(grounding.webSearchQueries)) {
          searchQueries = grounding.webSearchQueries;
        }
        if (Array.isArray(grounding.groundingChunks)) {
          groundingUrls = grounding.groundingChunks
            .map((chunk: any) => ({
              title: chunk.web?.title || 'Web Result',
              url: chunk.web?.uri || ''
            }))
            .filter((u: any) => !!u.url);
        }
      }
    } else {
      // Groq
      const activeModel = model || 'llama-3.3-70b-versatile';
      const url = 'https://api.groq.com/openai/v1/chat/completions';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey.trim()}` },
        body: JSON.stringify({
          model: activeModel,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.1
        })
      });
      if (!res.ok) throw new Error(`Groq status ${res.status}`);
      const data = await res.json();
      rawText = data?.choices?.[0]?.message?.content || '';
    }

    // Extract JSON block
    const jsonMatch = rawText.match(/\{[\s\S]*?\}/);
    let parsed: any = {};
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch {
        parsed = {};
      }
    }

    // Check if any real Google Search grounding chunks matched known font marketplaces
    const marketplaceHit = groundingUrls.find(item => 
      KNOWN_FONT_MARKETPLACE_DOMAINS.some(d => item.url.toLowerCase().includes(d)) ||
      item.title.toLowerCase().includes('font') ||
      item.title.toLowerCase().includes('typeface')
    );

    const isTaken = !!parsed.isTaken || !!marketplaceHit;
    let status: 'TAKEN' | 'POSSIBLE_MATCH' | 'LIKELY_AVAILABLE' | 'UNVERIFIED' = 
      isTaken ? 'TAKEN' : (parsed.status || 'LIKELY_AVAILABLE');

    let details = parsed.details;
    if (marketplaceHit && !details?.includes('Found')) {
      details = `Existing font found on Google Search: "${marketplaceHit.title}" (${marketplaceHit.url})`;
    } else if (!details) {
      details = isTaken ? 'Font with this name exists in market.' : 'No active font releases found under this name.';
    }

    return {
      fontName: cleanName,
      isTaken,
      status,
      foundryOrDesigner: parsed.foundryOrDesigner || (marketplaceHit ? marketplaceHit.title : undefined),
      details,
      sourceNote: groundingUrls.length > 0 ? 'Google Live Search Grounded' : 'AI Knowledge Scan',
      groundingUrls,
      searchQueries
    };
  } catch (err: any) {
    console.warn('AI Deep Scan error:', err);
    return {
      fontName: cleanName,
      isTaken: false,
      status: 'UNVERIFIED',
      details: `Online search verification could not be completed (${err.message}). Use 1-click Google search to verify manually.`,
      sourceNote: 'Unverified Online',
      error: err.message
    };
  }
}


export async function generateFontNames(
  config: FontNameFilterConfig,
  provider: ApiProvider,
  apiKey?: string,
  model?: string
): Promise<FontNameGeneratorResult> {
  // If no API key provided, immediately use rich offline preset
  if (!apiKey || apiKey.trim() === '') {
    const candidates = getOfflineFontNameCandidates(
      config.wordCount,
      config.startingLetter,
      config.targetLigature,
      config.category,
      config.count || 12
    );
    return {
      candidates,
      usedFallback: true,
    };
  }

  // AI Prompting
  const wordCountRule = config.wordCount === 'single'
    ? 'All names MUST be exactly ONE word (1 kata) (e.g. "Morbid", "Xenon", "Structura", "Moonshine", "Distortion", "Ethereal", "Chonky").'
    : config.wordCount === 'double'
    ? 'All names MUST be exactly TWO words (2 kata / 2 baris) (e.g. "Nocturnal Hex", "Hyperion Void", "Neue Forma", "Rustler Timber", "Concrete Hazard", "Sovereign Silk", "Jellypop Boing").'
    : 'Names can be either one word or two words.';

  const letterRule = config.startingLetter && config.startingLetter !== 'ANY'
    ? `CRITICAL REQUIREMENT: The first word of EVERY font name MUST start with the capital letter "${config.startingLetter.toUpperCase()}".`
    : '';

  const ligatureRule = config.targetLigature && config.targetLigature !== 'none'
    ? `CRITICAL REQUIREMENT: EVERY font name MUST contain the character sequence / double letter / ligature "${config.targetLigature.toLowerCase()}" (such as in "Passau" for "ss", or "Wattens" for "tt", "Stafford" for "ff", "Chonky" for "ch", etc.) so the typeface designer can showcase this specific ligature!`
    : 'Incorporate aesthetic double-letters or ligatures (e.g. ss, tt, ff, fi, fl, ll, oo, rr, st, ch) whenever appropriate.';

  let categoryRule = '';
  switch (config.category) {
    case 'horror-gothic':
      categoryRule = 'Genre: Horror / Gothic / Occult. Vibe: Morbid, Crypt, Bloodlust, Nocturnal, Hex, Grimlore, Coven, Spire, Necromancy, Malice.';
      break;
    case 'scifi-cyberpunk':
      categoryRule = 'Genre: Sci-Fi / Space / Cyberpunk. Vibe: Orbit, Zenith, Pulsar, Xenon, Hyperion, Voidwalker, Quantum, Glitch, Singularity, Astrotech.';
      break;
    case 'modern-swiss':
      categoryRule = 'Genre: Modern / Swiss / Tech Minimalist. Vibe: Neue Forma, Modul, Kinesis, Aspect, Ratio, Structura, Objectiv, Monolith Grid.';
      break;
    case 'retro-vintage':
      categoryRule = 'Genre: Retro / Vintage / Nostalgia. Vibe: Moonshine, Rustler, Velvet, Sundown, Timberland, Heritage, Copper, Rawhide, Golden Saloon.';
      break;
    case 'brutalist-acid':
      categoryRule = 'Genre: Brutalist / Acid / Streetwear. Vibe: Distortion, Concrete, Riot, Toxic, Hazard, Subversive, Overlock, Bunker, Anarchy.';
      break;
    case 'luxury-editorial':
      categoryRule = 'Genre: Luxury / High-End Editorial. Vibe: Ethereal, Aurelia, Sovereign, Opulent, Seraphine, Lumina, Solitaire, Palais Royale, Velvet Whisper.';
      break;
    case 'playful-cartoon':
      categoryRule = 'Genre: Playful / Cartoon / Kids. Vibe: Boing, Jellypop, Chonky, Wobble, Doodle, Bounce, Bongo, Bubble Gum, Snickerdoodle.';
      break;
    default:
      categoryRule = 'Explore an eclectic mix across Horror, Sci-Fi, Modern Swiss, Retro, Brutalist, Luxury, and Playful styles.';
  }

  const prompt = `You are an elite Type Director and Font Naming Specialist for independent type foundries.
Generate a curated collection of ${config.count || 12} original, evocative, and commercially viable typeface names.

CRITICAL INSTRUCTIONS ON NAMING TYPOLOGY & UNIQUENESS:
- Generate unique, inventive, concept-driven, or portmanteau font names.
- Avoid overused generic tropes and AVOID purely geographic/city/country names (e.g. do NOT use "Brooklyn", "Berlin", "Dakota", "Amalfi", "Capri", "Vienna", "Tokyo") unless explicitly requested.
- Font names must be constructed based on conceptual atmosphere, word typology, emotional tone, or neologisms matching the specific typography genre.
- Do NOT output already-known fonts (like "Sacred Bridge", "Thanjavur", "Amalfi Coast", "Santorini", "Helvetica").

RULES:
1. ${wordCountRule}
2. ${categoryRule}
3. ${letterRule}
4. ${ligatureRule}
5. Return strictly a JSON array of objects with this schema:
[
  {
    "name": "Font Name",
    "wordCount": 1 or 2,
    "origin": "Short conceptual origin / atmosphere (e.g. 'Occult Gothic Arch' or 'Orbital Cyberpunk Matrix')",
    "meaning": "1 evocative sentence describing the aesthetic tone and visual weight of the font.",
    "matchedLigatures": ["ss", "tt"]
  }
]

Return ONLY raw valid JSON array.`;

  try {
    let rawText = '';
    let providerName = '';

    if (provider === 'gemini') {
      const activeModel = model || 'gemini-1.5-flash';
      providerName = `Gemini (${activeModel})`;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey.trim()}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.85
          }
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Gemini HTTP ${res.status}`);
      }

      const data = await res.json();
      rawText = data?.candidates?.[0]?.parts?.[0]?.text || '';
    } else {
      // Groq
      const activeModel = model || 'llama-3.3-70b-versatile';
      providerName = `Groq (${activeModel})`;
      const url = 'https://api.groq.com/openai/v1/chat/completions';

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: activeModel,
          messages: [
            { role: 'system', content: 'You are an expert typography consultant. Return ONLY valid JSON array.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.85
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Groq HTTP ${res.status}`);
      }

      const data = await res.json();
      rawText = data?.choices?.[0]?.message?.content || '';
    }

    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();

    let parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) {
      const keys = Object.keys(parsed);
      for (const k of keys) {
        if (Array.isArray(parsed[k])) {
          parsed = parsed[k];
          break;
        }
      }
    }

    if (!Array.isArray(parsed)) {
      throw new Error('Could not parse candidates array from AI output');
    }

    const candidates: FontNameCandidate[] = parsed.map((item: any, idx: number) => {
      const fontName = (item.name || 'Custom Font').trim();
      const collision = checkFontCollision(fontName);
      const ligs = item.matchedLigatures && Array.isArray(item.matchedLigatures) && item.matchedLigatures.length > 0
        ? item.matchedLigatures
        : detectLigatures(fontName, config.targetLigature);

      return {
        id: `ai-candidate-${idx}-${Date.now()}`,
        name: fontName,
        wordCount: (item.wordCount === 2 || fontName.includes(' ')) ? 2 : 1,
        origin: item.origin || 'Geographical Map Reference',
        category: config.category,
        matchedLigatures: ligs,
        meaning: item.meaning || 'Aesthetic typography candidate name.',
        isKnownTaken: collision.isTaken,
        knownFontNote: collision.isTaken ? collision.sourceNote : undefined,
        timestamp: Date.now(),
        source: 'ai'
      };
    });

    return {
      candidates,
      usedFallback: false,
      providerName
    };

  } catch (err: any) {
    console.warn(`Font Name AI generation failed (${err.message}). Using offline preset candidates.`);
    const fallback = getOfflineFontNameCandidates(
      config.wordCount,
      config.startingLetter,
      config.targetLigature,
      config.category,
      config.count || 12
    );
    return {
      candidates: fallback,
      usedFallback: true,
      error: err.message || 'API request error. Displaying curated offline suggestions.'
    };
  }
}

/**
 * Quick checker search URL generators with direct Google Font search
 */
export function getRegistryCheckerUrls(fontName: string) {
  const clean = fontName.trim();
  const quoted = `"${clean}" font`;
  const encodedQuoted = encodeURIComponent(quoted);
  const encodedName = encodeURIComponent(clean);

  return {
    googleSearch: `https://www.google.com/search?q=${encodedQuoted}`,
    creativeMarket: `https://creativemarket.com/search?q=${encodedName}+font`,
    dafont: `https://www.dafont.com/search.php?q=${encodedName}`,
    myfonts: `https://www.myfonts.com/search?query=${encodedName}`,
    googleFonts: `https://fonts.google.com/?query=${encodedName}`,
    adobeFonts: `https://fonts.adobe.com/search?query=${encodedName}`,
    usptoTrademark: `https://tmsearch.uspto.gov/search/search-results?searchType=basic&query=${encodedName}`,
  };
}
