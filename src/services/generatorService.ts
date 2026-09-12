import { GenerationConfig, GeneratedSpecimen } from '../types';
import { getOfflineSpecimen } from '../data/offlinePresets';
import { generateWithGemini } from './geminiService';
import { generateWithGroq } from './groqService';

export interface GenerationResult {
  specimen: GeneratedSpecimen;
  error?: string;
  usedFallback: boolean;
}

export async function generateContent(config: GenerationConfig): Promise<GenerationResult> {
  const { provider, apiKey, era, assetType, language, startingLetter } = config;

  // 1. If no API key provided, immediately use rich offline preset
  if (!apiKey || apiKey.trim() === '') {
    const specimen = getOfflineSpecimen(era, assetType, language, startingLetter);
    return {
      specimen,
      usedFallback: true,
    };
  }

  // 2. Try online generation via selected provider
  try {
    let specimen: GeneratedSpecimen;
    if (provider === 'gemini') {
      specimen = await generateWithGemini(config, apiKey.trim());
    } else {
      specimen = await generateWithGroq(config, apiKey.trim());
    }
    return {
      specimen,
      usedFallback: false,
    };
  } catch (err: any) {
    console.warn(`Online generation failed (${err.message}). Falling back to curated offline dataset.`);
    const fallbackSpecimen = getOfflineSpecimen(era, assetType, language, startingLetter);
    return {
      specimen: fallbackSpecimen,
      error: err.message || 'API request failed. Displaying curated offline preset.',
      usedFallback: true,
    };
  }
}
