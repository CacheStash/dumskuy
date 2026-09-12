export type DesignEra = 
  | 'retro-americana'
  | 'modern-swiss'
  | 'victorian-art-deco'
  | 'cyberpunk-y2k'
  | 'streetwear-brutalist'
  | 'editorial-luxury';

export type AssetType = 
  | 'logo-wordmark'
  | 'badge-emblem'
  | 'packaging-label'
  | 'signboard-storefront'
  | 'editorial-poster';

export type DescriptionLength = 'short' | 'medium' | 'long';

export type Language = 'en' | 'id';

export type ApiProvider = 'gemini' | 'groq';

export type ActiveAppTab = 'specimen' | 'name-finder';

export interface GenerationConfig {
  era: DesignEra;
  assetType: AssetType;
  startingLetter: string; // "ANY" or "A".."Z"
  length: DescriptionLength;
  language: Language;
  provider: ApiProvider;
  apiKey?: string;
  model?: string;
}

export interface GeneratedSpecimen {
  category: string;
  style: string;
  headline: string;
  sub_headline: string;
  tagline: string;
  supporting_details: string[];
  body_copy?: string;
  timestamp?: number;
  source: 'ai' | 'preset';
  providerName?: string;
}

export interface FontSettings {
  name: string;
  isCustom: boolean;
  fontSize: number; // in px
  letterSpacing: number; // in px
  lineHeight: number; // multiplier e.g. 1.2
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textAlign: 'left' | 'center' | 'right';
}

export interface EraMeta {
  id: DesignEra;
  label: string;
  period: string;
  description: string;
  tagColor: string;
  vibe: string;
  recommendedFont: string;
}

export interface AssetTypeMeta {
  id: AssetType;
  label: string;
  description: string;
  iconName: string;
  sampleElements: string[];
}

/* =========================================================================
   FONT NAME FINDER & AVAILABILITY CHECKER TYPES
   ========================================================================= */

export type NamingCategory = 
  | 'all'
  | 'horror-gothic'
  | 'scifi-cyberpunk'
  | 'modern-swiss'
  | 'retro-vintage'
  | 'brutalist-acid'
  | 'luxury-editorial'
  | 'playful-cartoon';

export type WordCountOption = 'single' | 'double' | 'any';

export interface FontNameFilterConfig {
  wordCount: WordCountOption;
  startingLetter: string; // 'ANY' or 'A'-'Z'
  targetLigature: string; // 'none' | 'ss' | 'tt' | 'ff' | 'fi' | 'fl' | 'st' | 'll' | 'oo' | 'rr' | custom
  category: NamingCategory;
  count: number;
}

export interface FontNameCandidate {
  id: string;
  name: string;
  wordCount: 1 | 2;
  origin: string; // Geographical location, map origin, or historical context
  category: NamingCategory | string;
  matchedLigatures: string[];
  meaning: string;
  isKnownTaken?: boolean;
  knownFontNote?: string;
  timestamp?: number;
  source?: 'ai' | 'preset';
}
