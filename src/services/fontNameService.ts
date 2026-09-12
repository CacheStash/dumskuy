import {
  FontNameCandidate,
  FontNameFilterConfig,
  ApiProvider
} from '../types';
import {
  KNOWN_FONT_CATALOG,
  getOfflineFontNameCandidates,
  detectLigatures
} from '../data/fontNamePresets';

export interface FontNameGeneratorResult {
  candidates: FontNameCandidate[];
  usedFallback: boolean;
  error?: string;
  providerName?: string;
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
    ? 'All names MUST be exactly ONE word (1 kata) (e.g. "Santorini", "Bellagio", "Passau").'
    : config.wordCount === 'double'
    ? 'All names MUST be exactly TWO words (2 kata / 2 baris) (e.g. "Capri Riviera", "Sumba Heritage", "Amalfi Coast").'
    : 'Names can be either one word or two words.';

  const letterRule = config.startingLetter && config.startingLetter !== 'ANY'
    ? `CRITICAL REQUIREMENT: The first word of EVERY font name MUST start with the capital letter "${config.startingLetter.toUpperCase()}".`
    : '';

  const ligatureRule = config.targetLigature && config.targetLigature !== 'none'
    ? `CRITICAL REQUIREMENT: EVERY font name MUST contain the character sequence / double letter / ligature "${config.targetLigature.toLowerCase()}" (such as in "Passau" for "ss", or "Wattens" for "tt", "Stafford" for "ff", etc.) so the typeface designer can showcase this specific ligature!`
    : 'Incorporate aesthetic double-letters or ligatures (e.g. ss, tt, ff, fi, fl, ll, oo, rr, st) whenever possible.';

  const categoryRule = config.category === 'islands'
    ? 'Names MUST be inspired by islands (pulau) around the world or Indonesian archipelago (e.g. Sumba, Natuna, Santorini, Corsica, Capri, Lofoten).'
    : config.category === 'geography'
    ? 'Names MUST be inspired by real places on maps (cities, historic towns, mountain villages, capes, rivers, valleys) across Europe, Asia, Americas, or Indonesia.'
    : config.category === 'nature'
    ? 'Names inspired by botanicals, minerals, geological formations, red rock canyons, or astronomical terms.'
    : config.category === 'luxury'
    ? 'Names inspired by classic luxury, high fashion ateliers, Italian villas, or French châteaux.'
    : 'Names inspired by real places on maps, islands, historic districts, and evocative geographic landmarks.';

  const prompt = `You are a world-class Type Director and Font Naming Consultant for premier type foundries (like Linotype, Monotype, Pangram Pangram, and independent type studios).
Generate a curated collection of ${config.count || 12} original, evocative, and commercially viable typeface names.

RULES:
1. ${wordCountRule}
2. ${categoryRule}
3. ${letterRule}
4. ${ligatureRule}
5. Avoid overly generic names. Give each font name a real geographical origin or authentic story.
6. Return strictly a JSON array of objects with this schema:
[
  {
    "name": "Font Name",
    "wordCount": 1 or 2,
    "origin": "Short real-world location or map inspiration (e.g. 'Volcanic caldera island, Greece')",
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
    // In case Groq wrapped in { "fonts": [...] } or similar
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
      const upper = (item.name || '').toUpperCase().trim();
      const isTaken = KNOWN_FONT_CATALOG.has(upper);
      const ligs = item.matchedLigatures && Array.isArray(item.matchedLigatures) && item.matchedLigatures.length > 0
        ? item.matchedLigatures
        : detectLigatures(item.name || '', config.targetLigature);

      return {
        id: `ai-candidate-${idx}-${Date.now()}`,
        name: item.name || 'Custom Font',
        wordCount: (item.wordCount === 2 || (item.name || '').trim().includes(' ')) ? 2 : 1,
        origin: item.origin || 'Geographical Map Reference',
        category: config.category,
        matchedLigatures: ligs,
        meaning: item.meaning || 'Aesthetic typography candidate name.',
        isKnownTaken: isTaken,
        knownFontNote: isTaken ? `Alert: "${upper}" matches an existing registered font!` : undefined,
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
 * Quick checker search URL generators
 */
export function getRegistryCheckerUrls(fontName: string) {
  const encoded = encodeURIComponent(fontName.trim());
  return {
    myfonts: `https://www.myfonts.com/search?query=${encoded}`,
    googleFonts: `https://fonts.google.com/?query=${encoded}`,
    adobeFonts: `https://fonts.adobe.com/search?query=${encoded}`,
    dafont: `https://www.dafont.com/search.php?q=${encoded}`,
    fontSquirrel: `https://www.fontsquirrel.com/fonts/list/find_fonts?q=${encoded}`,
    fontspring: `https://www.fontspring.com/search?query=${encoded}`,
    usptoTrademark: `https://tmsearch.uspto.gov/search/search-results?searchType=basic&query=${encoded}`,
  };
}
