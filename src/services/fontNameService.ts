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
 */
export async function deepScanFontWithAI(
  fontName: string,
  provider: ApiProvider,
  apiKey?: string,
  model?: string
): Promise<AiDeepCheckResult> {
  const cleanName = fontName.trim();
  // First check local catalog
  const localCheck = checkFontCollision(cleanName);
  if (localCheck.isTaken) {
    return {
      fontName: cleanName,
      isTaken: true,
      status: 'TAKEN',
      foundryOrDesigner: localCheck.sourceNote,
      details: localCheck.sourceNote || `Existing font match detected in registry.`,
      sourceNote: 'Found in Font Marketplace Database'
    };
  }

  // If no API key, return local result
  if (!apiKey || !apiKey.trim()) {
    return {
      fontName: cleanName,
      isTaken: false,
      status: 'LIKELY_AVAILABLE',
      details: 'No collisions in local 1,600+ font catalog. Verify with 1-click Google search.',
      sourceNote: 'Local Registry Verified'
    };
  }

  const prompt = `You are a specialist font trademark and typography release auditor.
Investigate if there is ANY existing typeface, commercial font, or free font released on DaFont, Creative Market, MyFonts, Monotype, Adobe Fonts, Google Fonts, Fontspring, Envato, or Behance named "${cleanName}" (or very similar).

For example:
- "Amalfi Coast" -> TAKEN (Script font by Attype Studio on DaFont / Creative Market)
- "Santorini" -> TAKEN (Luxury script font by Calamar on Creative Market)
- "Wild Youth" -> TAKEN (Brush script font by Jeremy Vessey)

Answer strictly in valid JSON:
{
  "isTaken": boolean (true if commercial/free font exists with this name),
  "status": "TAKEN" or "POSSIBLE_MATCH" or "LIKELY_AVAILABLE",
  "foundryOrDesigner": "Designer or Foundry name if known",
  "details": "Explanation of existing font or why it is clear"
}

Provide ONLY raw JSON.`;

  try {
    let rawText = '';
    if (provider === 'gemini') {
      const activeModel = model || 'gemini-1.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey.trim()}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
        })
      });
      if (!res.ok) throw new Error(`Gemini status ${res.status}`);
      const data = await res.json();
      rawText = data?.candidates?.[0]?.parts?.[0]?.text || '';
    } else {
      const activeModel = model || 'llama-3.3-70b-versatile';
      const url = 'https://api.groq.com/openai/v1/chat/completions';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey.trim()}` },
        body: JSON.stringify({
          model: activeModel,
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.1
        })
      });
      if (!res.ok) throw new Error(`Groq status ${res.status}`);
      const data = await res.json();
      rawText = data?.choices?.[0]?.message?.content || '';
    }

    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();

    const parsed = JSON.parse(cleaned);
    return {
      fontName: cleanName,
      isTaken: !!parsed.isTaken,
      status: parsed.status || (parsed.isTaken ? 'TAKEN' : 'LIKELY_AVAILABLE'),
      foundryOrDesigner: parsed.foundryOrDesigner || undefined,
      details: parsed.details || (parsed.isTaken ? 'Font with this name exists in market.' : 'No major font release found under this exact name.'),
      sourceNote: 'AI Deep Registry Scan'
    };
  } catch (err: any) {
    return {
      fontName: cleanName,
      isTaken: false,
      status: 'LIKELY_AVAILABLE',
      details: 'Local catalog clear. Please use 1-click Google search link to double check.',
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
    ? 'All names MUST be exactly ONE word (1 kata) (e.g. "Valldemossa", "Favignana", "Passau", "Maratua").'
    : config.wordCount === 'double'
    ? 'All names MUST be exactly TWO words (2 kata / 2 baris) (e.g. "Maratua Reef", "Passau Heritage", "Valldemossa Stone").'
    : 'Names can be either one word or two words.';

  const letterRule = config.startingLetter && config.startingLetter !== 'ANY'
    ? `CRITICAL REQUIREMENT: The first word of EVERY font name MUST start with the capital letter "${config.startingLetter.toUpperCase()}".`
    : '';

  const ligatureRule = config.targetLigature && config.targetLigature !== 'none'
    ? `CRITICAL REQUIREMENT: EVERY font name MUST contain the character sequence / double letter / ligature "${config.targetLigature.toLowerCase()}" (such as in "Passau" for "ss", or "Wattens" for "tt", "Stafford" for "ff", etc.) so the typeface designer can showcase this specific ligature!`
    : 'Incorporate aesthetic double-letters or ligatures (e.g. ss, tt, ff, fi, fl, ll, oo, rr, st) whenever possible.';

  const categoryRule = config.category === 'islands'
    ? 'Names MUST be inspired by real islands (pulau) around the world or Indonesian archipelago (e.g. Maratua, Favignana, Amorgos, Belitung, Derawan, Gotland, Lofoten, Folegandros).'
    : config.category === 'geography'
    ? 'Names MUST be inspired by real places on maps (historic towns, mountain villages, capes, rivers, valleys) across Europe, Asia, Americas, or Indonesia.'
    : config.category === 'nature'
    ? 'Names inspired by botanicals, minerals, geological formations, red rock canyons, or astronomical terms.'
    : config.category === 'luxury'
    ? 'Names inspired by classic luxury, high fashion ateliers, Italian villas, or French châteaux.'
    : 'Names inspired by real places on maps, islands, historic districts, and evocative geographic landmarks.';

  const prompt = `You are an elite Type Director and Font Naming Specialist for independent type foundries.
Generate a curated collection of ${config.count || 12} original, evocative, and commercially viable typeface names.

CRITICAL INSTRUCTION TO AVOID EXISTING FONTS:
- Do NOT output already-saturated names like "Amalfi Coast", "Santorini", "Capri", "Biarritz", "California", or "Helvetica" because they are already taken!
- Choose fresh, authentic, hidden geographic gems, lesser-known islands, historic towns, and distinctive pairings that have NOT been heavily commercialized as font names yet.

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
    "origin": "Real-world map location or island (e.g. 'Tramuntana Mountain Village, Mallorca')",
    "meaning": "1 evocative sentence describing the aesthetic vibe and geographic landscape.",
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
