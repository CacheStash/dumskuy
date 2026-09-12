import googleFontsData from './googleFonts.json';

// Popular commercial fonts from Creative Market, DaFont, MyFonts, Monotype, Adobe, Behance
export const POPULAR_INDIE_AND_COMMERCIAL_FONTS: Record<string, string> = {
  'AMALFI COAST': 'Popular modern script font by Attype Studio (DaFont / Creative Market)',
  'AMALFI': 'Serif & Script typeface family on MyFonts / Creative Market',
  'SANTORINI': 'Luxury signature script font by Calamar (Creative Market / DaFont)',
  'CAPRI': 'Vintage display & resort script font family on MyFonts',
  'CORSICA': 'Geometric sans-serif typeface on MyFonts',
  'MALLORCA': 'Modern serif & display font family on Fontspring',
  'LOFOTEN': 'Nordic display font by VP Creative Shop on Creative Market',
  'MADEIRA': 'Geometric sans typeface family by Paulo Goode on MyFonts',
  'CALIFORNIA': 'Signature & monoline script by Sensatype / Creative Market',
  'WILD YOUTH': 'Hand-drawn brush script by Jeremy Vessey (Behance / Creative Market)',
  'NORTHWELL': 'Rustic handwritten font by Sam Parrett / Set Sail Studios',
  'MADINA': 'Fun modern script font by Sam Parrett / Creative Market',
  'SILVER SOUTH': 'Dual font duo (Serif & Script) by Set Sail Studios',
  'STAY TRUE': 'Handwritten dry brush font by Mans Greback / DaFont',
  'BLACKSWORD': 'Calligraphy gothic script by Youssef Habchi / DaFont',
  'HELLO HONEY': 'Wedding calligraphy script with swashes by Ef Studio / DaFont',
  'BELLFORT': 'Vintage letterpress family by PintassilgoPrints / MyFonts',
  'HERITAGE': 'Classic retro monoline script by VintageDesignCo',
  'ROASTER': 'Rough rounded display font by Ian Barnard',
  'VINTAGE KING': 'Retro label badge font by IlhamHerry / Creative Market',
  'HIGH TIDE': 'All-caps geometric display font by Filipe Rolim',
  'SATURDAY': 'Casual brush script font by Nicky Laatz',
  'PLAYLIST': 'Handlettered brush typeface by Jesyll / Creative Market',
  'AUTUMN': 'Rustic serif & script duo on Creative Market',
  'MOONSTONE': 'Boho display serif by Peach Creme',
  'SUNSET BOULEVARD': 'Retro 80s neon synth font on DaFont',
  'SAVANNAH': 'Editorial luxury serif font by Jen Wagner Co',
  'AUSTIN': 'High-contrast modern serif by Paul Barnes / Commercial Type',
  'DALLAS': 'Vintage block display font by Hustle Supply Co',
  'BROOKLYN': 'Modern clean sans-serif typeface family on MyFonts',
  'BERLIN': 'Minimalist geometric display typeface on Creative Market',
  'PARISIENNE': 'Casual connecting script by Astigmatic (Google Fonts)',
  'VENICE': 'Serif display typeface inspired by Venetian architecture',
  'MONACO': 'Monospaced font designed by Susan Kare for Apple',
  'HAVANA': 'Tropical vintage script on Creative Market',
  'KYOTO': 'Minimalist Japanese-inspired geometric font',
  'CATALINA': 'Hand-drawn font family inspired by Catalina Island by Kimmy Design',
  'VIENNA': 'Modern editorial high-fashion serif font on Creative Market',
  'MONTEREY': 'West Coast retro script by Nick Curtis',
  'SEDONA': 'Red rock rustic display font on Creative Market',
  'NANTUCKET': 'Coastal vintage nautical font by Spencer & Sons',
  'ORLEANS': 'French vintage serif display font on MyFonts',
  'VALENTINA': 'Didone luxury serif typeface by Pedro Arilla',
  'CHRYSLER': 'Art deco geometric sans typeface on Fontspring',
  'ASTORIA': 'Vintage sans & serif duo by Simon & Sons',
  'MANHATTAN': 'Clean art deco serif font by Jen Wagner Co',
  'RIVIERA': 'Retro luxury script & serif duo on Creative Market',
  'PORTOFINO': 'Signature luxury script font on Creative Market',
  'TAORMINA': 'Sicilian chic serif font on Creative Market',
  'COLMAR': 'Rustic vintage serif font on Fontspring',
  'SINTRA': 'Handcrafted brush display font on Behance',
  'TELLURIDE': 'Western slab-serif display font on Creative Market',
  'BOROBUDUR': 'Indonesian heritage decorative ethnic display font on DaFont',
  'KOTAGEDE': 'Vintage Javanese script/display font on Creative Market',
  'BALI': 'Tropical brush & script typeface on DaFont',
  'SUMBA': 'Ethnic display typeface on Creative Market',
  'RINJANI': 'Modern adventure display font on Behance',
  'HELVETICA': 'Max Miedinger / Haas Type Foundry / Monotype',
  'FUTURA': 'Paul Renner / Bauer Type Foundry',
  'GARAMOND': 'Claude Garamond / Classic French Renaissance',
  'BODONI': 'Giambattista Bodoni / Classic Didone',
  'BASKERVILLE': 'John Baskerville / Transitional Serif',
  'DIDOT': 'Firmin Didot / French Modern Serif',
  'CASLON': 'William Caslon / English Old Style Serif',
  'CLARENDON': 'Robert Besley / Fann Street Foundry',
  'AVENIR': 'Adrian Frutiger / Linotype',
  'GOTHAM': 'Tobias Frere-Jones / Hoefler & Frere-Jones',
  'PROXIMA NOVA': 'Mark Simonson Studio',
  'MONTSERRAT': 'Julieta Ulanovsky (Google Fonts)',
  'LATO': 'Lukasz Dziedzic (Google Fonts)',
  'INTER': 'Rasmus Andersson (Google Fonts)',
  'ROBOTO': 'Christian Robertson (Google Fonts)',
  'OPEN SANS': 'Steve Matteson (Google Fonts)',
  'POPPINS': 'Indian Type Foundry (Google Fonts)',
  'RALEWAY': 'Matt McInerney (Google Fonts)',
  'PLAYFAIR DISPLAY': 'Claus Eggers Sorensen (Google Fonts)',
  'CINZEL': 'Natanael Gama (Google Fonts)',
  'BEBAS NEUE': 'Ryoichi Tsunekawa / Dharma Type',
  'OSWALD': 'Vernon Adams (Google Fonts)',
  'NUNITO': 'Vernon Adams (Google Fonts)',
  'SPACE GROTESK': 'Florian Karsten (Google Fonts)',
  'SYNE': 'Bonjour Monde / Lucas Descroix (Google Fonts)',
  'PLUS JAKARTA SANS': 'Gumpita Rahayu / Tokotype',
  'DM SANS': 'Colophon Foundry (Google Fonts)',
  'CABINET GROTESK': 'Indian Type Foundry',
  'SATOSHI': 'Indian Type Foundry',
  'GENERAL SANS': 'Indian Type Foundry',
  'CLASH DISPLAY': 'Indian Type Foundry',
  'SWITZER': 'Indian Type Foundry',
  'SENTIENT': 'Indian Type Foundry',
  'GAMBARINO': 'Peggo Fonts',
  'ZODIAK': 'Jeremie Hornus / Black[Foundry]',
  'RANADE': 'Indian Type Foundry',
  'BOSKA': 'Indian Type Foundry',
  'MELODRAMA': 'Indian Type Foundry'
};

// Build combined fast lookup set (Google Fonts + Popular Indie Fonts)
const GOOGLE_FONTS_SET = new Set((googleFontsData as string[]).map(s => s.toUpperCase().trim()));

export interface CollisionCheckResult {
  status: 'TAKEN' | 'PARTIAL_MATCH' | 'UNVERIFIED_SAFE';
  isTaken: boolean;
  matchType?: 'exact' | 'google_fonts' | 'indie_commercial' | 'partial';
  matchedName?: string;
  sourceNote?: string;
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Checks a candidate font name against Google Fonts and known commercial/free fonts
 */
export function checkFontCollision(name: string): CollisionCheckResult {
  const clean = name.trim().toUpperCase();
  if (!clean) {
    return { status: 'UNVERIFIED_SAFE', isTaken: false, confidence: 'low' };
  }

  // 1. Check Exact Match in Popular Indie/Commercial Fonts (e.g. AMALFI COAST)
  if (POPULAR_INDIE_AND_COMMERCIAL_FONTS[clean]) {
    return {
      status: 'TAKEN',
      isTaken: true,
      matchType: 'indie_commercial',
      matchedName: clean,
      sourceNote: POPULAR_INDIE_AND_COMMERCIAL_FONTS[clean],
      confidence: 'high'
    };
  }

  // 2. Check Exact Match in Google Fonts (1,580+ fonts)
  if (GOOGLE_FONTS_SET.has(clean)) {
    return {
      status: 'TAKEN',
      isTaken: true,
      matchType: 'google_fonts',
      matchedName: clean,
      sourceNote: `Existing official Google Font: "${clean}"`,
      confidence: 'high'
    };
  }

  // 3. Check if first word is an exact famous font (e.g. "Amalfi" in "Amalfi Studio" or "Helvetica Bold")
  const tokens = clean.split(/\s+/);
  const firstToken = tokens[0];
  if (tokens.length > 1) {
    if (POPULAR_INDIE_AND_COMMERCIAL_FONTS[firstToken]) {
      return {
        status: 'PARTIAL_MATCH',
        isTaken: true,
        matchType: 'partial',
        matchedName: firstToken,
        sourceNote: `Caution: First word "${firstToken}" matches existing font: ${POPULAR_INDIE_AND_COMMERCIAL_FONTS[firstToken]}`,
        confidence: 'medium'
      };
    }
    if (GOOGLE_FONTS_SET.has(firstToken)) {
      return {
        status: 'PARTIAL_MATCH',
        isTaken: true,
        matchType: 'partial',
        matchedName: firstToken,
        sourceNote: `Caution: First word "${firstToken}" matches Google Font "${firstToken}"`,
        confidence: 'medium'
      };
    }
  }

  // 4. Check if any popular indie font starts with or contains this name
  for (const [knownName, desc] of Object.entries(POPULAR_INDIE_AND_COMMERCIAL_FONTS)) {
    if (knownName === clean || knownName.startsWith(clean + ' ') || clean.startsWith(knownName + ' ')) {
      return {
        status: 'TAKEN',
        isTaken: true,
        matchType: 'indie_commercial',
        matchedName: knownName,
        sourceNote: desc,
        confidence: 'high'
      };
    }
  }

  // If not found in catalog, return unverified
  return {
    status: 'UNVERIFIED_SAFE',
    isTaken: false,
    confidence: 'medium'
  };
}
