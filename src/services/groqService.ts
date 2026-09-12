import { GenerationConfig, GeneratedSpecimen } from '../types';
import { ERA_METADATA, ASSET_TYPES } from '../data/offlinePresets';

export async function generateWithGroq(
  config: GenerationConfig,
  apiKey: string
): Promise<GeneratedSpecimen> {
  const model = config.model || 'llama-3.3-70b-versatile';
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const eraInfo = ERA_METADATA[config.era];
  const assetInfo = ASSET_TYPES[config.assetType];

  let lengthInstruction = '';
  if (config.length === 'short') {
    lengthInstruction = 'Body copy must be 1 punchy sentence.';
  } else if (config.length === 'medium') {
    lengthInstruction = 'Body copy must be 2-3 sentences.';
  } else {
    lengthInstruction = 'Body copy must be a rich narrative paragraph (4-6 sentences).';
  }

  const startingLetterInstruction = (config.startingLetter && config.startingLetter !== 'ANY')
    ? `CRITICAL: The first word of "headline" MUST begin with the letter "${config.startingLetter.toUpperCase()}".`
    : '';

  const languagePrompt = config.language === 'id' ? 'Bahasa Indonesia' : 'English';

  const systemInstruction = `You are a master typographer and copywriting historian. Generate authentic, period-accurate dummy text for typeface specimen testing and graphic design wireframes.
NEVER use Lorem Ipsum. Output strict JSON with:
{
  "category": "${assetInfo.label}",
  "style": "${eraInfo.label}",
  "headline": "...",
  "sub_headline": "...",
  "tagline": "...",
  "supporting_details": ["DETAIL 1", "DETAIL 2", "DETAIL 3"],
  "body_copy": "..."
}`;

  const prompt = `Style: ${eraInfo.label} (${eraInfo.period}).
Asset: ${assetInfo.label}.
Language: ${languagePrompt}.
Length: ${lengthInstruction}
${startingLetterInstruction}
Provide only JSON.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Groq API status ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;
  if (!rawText) {
    throw new Error('Empty response from Groq API');
  }

  const parsed = JSON.parse(rawText);
  return {
    category: parsed.category || assetInfo.label,
    style: parsed.style || eraInfo.label,
    headline: parsed.headline || 'SPECIMEN HEADLINE',
    sub_headline: parsed.sub_headline || 'Secondary Type Subtitle',
    tagline: parsed.tagline || 'Crafted with Authentic Precision',
    supporting_details: Array.isArray(parsed.supporting_details) ? parsed.supporting_details : ['AUTHENTIC SPECIMEN'],
    body_copy: parsed.body_copy || '',
    source: 'ai',
    providerName: `Groq (${model})`,
    timestamp: Date.now()
  };
}
