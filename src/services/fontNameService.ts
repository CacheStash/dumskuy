import {
  FontNameCandidate,
  FontNameFilterConfig,
  ApiProvider
} from '../types';
import {
  getOfflineFontNameCandidates,
  detectLigatures
} from '../data/fontNamePresets';
import { checkFontCollision, CollisionCheckResult } from '../data/existingFontsCatalog';

export interface FontNameGeneratorResult {
  candidates: FontNameCandidate[];
  usedFallback: boolean;
  error?: string;
  providerName?: string;
}

export interface AiDeepCheckResult {
  fontName: string;
  isTaken: boolean;
  status: 'TAKEN' | 'POSSIBLE_MATCH' | 'LIKELY_AVAILABLE';
  foundryOrDesigner?: string;
  details: string;
  sourceNote?: string;
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
      details: localCheck.sourceNote || `Existing font match detected in registry.`,
      sourceNote: 'Direct Registry Catalog Match'
    };
  }

  // 2. If no API key provided, return local check
  if (!apiKey || !apiKey.trim()) {
    return {
      fontName: cleanName,
      isTaken: false,
      status: 'LIKELY_AVAILABLE',
      details: 'No collisions found in local 1,600+ font catalog. Verify with 1-click Google search.',
      sourceNote: 'Local Catalog Verified'
    };
  }

  // 3. Online AI Check with Live Search Guidance
  const prompt = `Perform a thorough font trademark and availability audit for the name: "${cleanName}".
Step 1: Search for "${cleanName} font" and "${cleanName} typeface" across Google, Creative Market, DaFont, MyFonts, Fontspring, Behance, and independent foundries (such as Bombastype, Set Sail Studios, Dharma Type, RetroStudio).
Step 2: If an existing font, typeface family, or lettering product with this name exists, state the foundry or designer name clearly.

Output your final verdict strictly as a JSON markdown block:
\`\`\`json
{
  "isTaken": boolean,
  "status": "TAKEN" or "POSSIBLE_MATCH" or "LIKELY_AVAILABLE",
  "foundryOrDesigner": "Designer or Foundry name if known",
  "details": "Accurate explanation of the existing font or verification findings"
}
\`\`\``;

  try {
    let rawText = '';

    if (provider === 'gemini') {
      const activeModel = model || 'gemini-1.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey.trim()}`;
      
      // Try first with Google Search Grounding tool
      let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          tools: [{ googleSearch: {} }]
        })
      });

      // If tools rejected (e.g. on older endpoints), fallback without tools
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
    if (!jsonMatch) {
      throw new Error('No JSON block returned by AI');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      fontName: cleanName,
      isTaken: !!parsed.isTaken,
      status: parsed.status || (parsed.isTaken ? 'TAKEN' : 'LIKELY_AVAILABLE'),
      foundryOrDesigner: parsed.foundryOrDesigner || undefined,
      details: parsed.details || (parsed.isTaken ? 'Font with this name exists in market.' : 'No major font release found under this exact name.'),
      sourceNote: 'AI Search Grounded Audit'
    };
  } catch (err: any) {
    console.warn('AI Deep Scan error:', err);
    return {
      fontName: cleanName,
      isTaken: false,
      status: 'LIKELY_AVAILABLE',
      details: 'Local catalog clear. Use 1-click Google search link to double check.',
      sourceNote: 'Catalog Offline Check'
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
