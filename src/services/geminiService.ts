import { GenerationConfig, GeneratedSpecimen } from '../types';
import { ERA_METADATA, ASSET_TYPES } from '../data/offlinePresets';

export async function generateWithGemini(
  config: GenerationConfig,
  apiKey: string
): Promise<GeneratedSpecimen> {
  const model = config.model || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const eraInfo = ERA_METADATA[config.era];
  const assetInfo = ASSET_TYPES[config.assetType];

  let lengthInstruction = '';
  if (config.length === 'short') {
    lengthInstruction = 'Body copy must be 1 punchy, concise sentence (or omitted if unneeded for the asset).';
  } else if (config.length === 'medium') {
    lengthInstruction = 'Body copy must be 2 to 3 evocative, well-crafted sentences.';
  } else {
    lengthInstruction = 'Body copy must be a rich narrative paragraph (4 to 6 sentences) full of evocative atmospheric details.';
  }

  const startingLetterInstruction = (config.startingLetter && config.startingLetter !== 'ANY')
    ? `CRITICAL REQUIREMENT: The first word of "headline" MUST start with the capital letter "${config.startingLetter.toUpperCase()}". This is strictly required for a typeface specimen testing.`
    : '';

  const languagePrompt = config.language === 'id'
    ? 'Bahasa Indonesia (Gunakan ejaan klasik, istilah lokal otentik, atau gaya bahasa yang sangat pas dengan era yang dipilih).'
    : 'English (Use historically accurate, evocative, era-specific terminology).';

  const systemInstruction = `You are an elite Type Designer, Master Typographer, and Historic Copywriter.
Your task is to generate authentic, meaningful dummy text / copywriting designed specifically for font specimens and graphic design mockups.

STRICT RULES:
1. DO NOT USE generic filler text like "Lorem ipsum dolor sit amet", "Sample text", or generic modern marketing fluff.
2. Use authentic, historically and aesthetically accurate terminology, industry jargon, and trade idioms.
3. Output MUST be strictly valid JSON matching this schema:
{
  "category": "${assetInfo.label}",
  "style": "${eraInfo.label}",
  "headline": "Main headline / brand name",
  "sub_headline": "Secondary subtitle or descriptor",
  "tagline": "Aesthetic motto, slogan, or provenance statement",
  "supporting_details": ["EST. YEAR", "LOCATION / BADGE", "SPEC / MATERIAL"],
  "body_copy": "Narrative text or craft description"
}`;

  const prompt = `Generate a typographic specimen copywriting layout:
- Design Era / Aesthetic: ${eraInfo.label} (${eraInfo.period}). Vibe: ${eraInfo.vibe}.
- Asset Type: ${assetInfo.label} (${assetInfo.description}).
- Expected elements: ${assetInfo.sampleElements.join(', ')}.
- Language: ${languagePrompt}.
- Length constraint: ${lengthInstruction}
${startingLetterInstruction}

Return ONLY raw JSON.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\n${prompt}` }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Gemini API error status ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('Empty response received from Gemini API');
  }

  // Parse JSON
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
  }

  const parsed = JSON.parse(cleaned);
  return {
    category: parsed.category || assetInfo.label,
    style: parsed.style || eraInfo.label,
    headline: parsed.headline || 'SPECIMEN HEADLINE',
    sub_headline: parsed.sub_headline || 'Secondary Type Subtitle',
    tagline: parsed.tagline || 'Crafted with Authentic Precision',
    supporting_details: Array.isArray(parsed.supporting_details) ? parsed.supporting_details : ['EST. 1974', 'AUTHENTIC SPECIMEN'],
    body_copy: parsed.body_copy || '',
    source: 'ai',
    providerName: `Gemini (${model})`,
    timestamp: Date.now()
  };
}
