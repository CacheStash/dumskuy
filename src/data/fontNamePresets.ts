import { FontNameCandidate, NamingCategory, WordCountOption } from '../types';
import { checkFontCollision } from './existingFontsCatalog';

export interface PresetConceptName {
  name: string;
  wordCount: 1 | 2;
  category: NamingCategory;
  vibe: string;
  meaning: string;
  ligatures: string[];
}

export const GENRE_METADATA: Record<NamingCategory, { label: string; vibe: string; icon: string }> = {
  'all': { label: 'All Genres (Bebas)', vibe: 'Explores all concept-driven typography styles', icon: 'Sparkles' },
  'horror-gothic': { label: 'Horror / Gothic / Occult', vibe: 'Morbid, Crypt, Bloodlust, Nocturnal, Hex, Grimlore', icon: 'Flame' },
  'scifi-cyberpunk': { label: 'Sci-Fi / Space / Cyberpunk', vibe: 'Orbit, Zenith, Pulsar, Xenon, Hyperion, Voidwalker', icon: 'Cpu' },
  'modern-swiss': { label: 'Modern / Swiss / Tech Minimalist', vibe: 'Neue Forma, Modul, Kinesis, Aspect, Ratio, Structura', icon: 'Layers' },
  'retro-vintage': { label: 'Retro / Vintage / Nostalgia', vibe: 'Moonshine, Rustler, Velvet, Sundown, Timberland', icon: 'Compass' },
  'brutalist-acid': { label: 'Brutalist / Acid / Streetwear', vibe: 'Distortion, Concrete, Riot, Toxic, Hazard, Subversive', icon: 'Zap' },
  'luxury-editorial': { label: 'Luxury / High-End Editorial', vibe: 'Ethereal, Aurelia, Sovereign, Opulent, Seraphine', icon: 'Crown' },
  'playful-cartoon': { label: 'Playful / Cartoon / Kids', vibe: 'Boing, Jellypop, Chonky, Wobble, Doodle, Bouncy', icon: 'Smile' },
};

// Inventive, concept-driven, non-geographic font names across all 7 genres
export const PRESET_CONCEPT_NAMES: PresetConceptName[] = [
  // 1. HORROR / GOTHIC / OCCULT
  { name: 'Morbid Crypt', wordCount: 2, category: 'horror-gothic', vibe: 'Occult Gothic', meaning: 'Dark ritual stone catacombs with chilling medieval blackletter weight.', ligatures: ['or', 'pt'] },
  { name: 'Nocturnal Hex', wordCount: 2, category: 'horror-gothic', vibe: 'Coven Witchcraft', meaning: 'Midnight incantations cast through sharp triangular serifs and thorned terminals.', ligatures: ['ct', 'ex'] },
  { name: 'Grimlore', wordCount: 1, category: 'horror-gothic', vibe: 'Dark Fantasy', meaning: 'Forgotten grimoires bound in blackened leather and iron clasps.', ligatures: ['gr', 'or'] },
  { name: 'Bloodlust', wordCount: 1, category: 'horror-gothic', vibe: 'Vampiric Gothic', meaning: 'Aggressive spiky blackletter stems sharpened like cold predator fangs.', ligatures: ['oo', 'st'] },
  { name: 'Coven Spire', wordCount: 2, category: 'horror-gothic', vibe: 'Occult Architecture', meaning: 'Towering Gothic spires silhouetted against a blood-red eclipse.', ligatures: ['ov', 'sp'] },
  { name: 'Phantom Vein', wordCount: 2, category: 'horror-gothic', vibe: 'Eerie Ethereal', meaning: 'Cold spectral filaments drifting through mist-shrouded Victorian cemeteries.', ligatures: ['nt', 'ei'] },
  { name: 'Necromancy', wordCount: 1, category: 'horror-gothic', vibe: 'Occult Magic', meaning: 'Ancient summoner glyphs with fractured strokes and jagged ascenders.', ligatures: ['cr', 'an'] },
  { name: 'Obsidian Skull', wordCount: 2, category: 'horror-gothic', vibe: 'Dark Relic', meaning: 'Carved volcanic glass reflecting distorted candlelight in an underground vault.', ligatures: ['ss', 'll'] },

  // 2. SCI-FI / SPACE / CYBERPUNK
  { name: 'Xenon Pulsar', wordCount: 2, category: 'scifi-cyberpunk', vibe: 'Astrophysical', meaning: 'Blinding bursts of electromagnetic neon energy across the stellar void.', ligatures: ['en', 'ls', 'ar'] },
  { name: 'Hyperion Void', wordCount: 2, category: 'scifi-cyberpunk', vibe: 'Deep Space', meaning: 'Monumental orbital dreadnought slipping into hyperspace silence.', ligatures: ['er', 'oi'] },
  { name: 'Zenith Protocol', wordCount: 2, category: 'scifi-cyberpunk', vibe: 'Cybernetic System', meaning: 'Overclocked neural mainframe running sub-millisecond encryption diagnostics.', ligatures: ['th', 'ro', 'ol'] },
  { name: 'Cryo Matrix', wordCount: 2, category: 'scifi-cyberpunk', vibe: 'Sub-Zero Cyber', meaning: 'Sub-zero liquid nitrogen cooling jackets surrounding high-frequency quantum wafers.', ligatures: ['ry', 'tr'] },
  { name: 'Singularity', wordCount: 1, category: 'scifi-cyberpunk', vibe: 'Theoretical Physics', meaning: 'The infinite gravitational core where geometry collapses into pure visual density.', ligatures: ['ng', 'ty'] },
  { name: 'Astrotech', wordCount: 1, category: 'scifi-cyberpunk', vibe: 'Orbital Industrial', meaning: 'Brushed titanium hulls and geometric hexagonal modular lettering.', ligatures: ['st', 'ro', 'ch'] },
  { name: 'Cyberflux', wordCount: 1, category: 'scifi-cyberpunk', vibe: 'Synthetic Flow', meaning: 'Liquid optical fiber data streams pulsing through subterranean megacity channels.', ligatures: ['fl', 'ux'] },
  { name: 'Chronos 99', wordCount: 2, category: 'scifi-cyberpunk', vibe: 'Time Warp Y2K', meaning: 'Millennium bug experimental phosphor CRT displays with jagged horizontal scanlines.', ligatures: ['ch', 'ro', 'on'] },

  // 3. MODERN / SWISS / TECH MINIMALIST
  { name: 'Neue Forma', wordCount: 2, category: 'modern-swiss', vibe: 'Swiss Modernism', meaning: 'Rigorous mathematical clarity, asymmetric grid discipline, and objective beauty.', ligatures: ['eu', 'rm'] },
  { name: 'Aspect Ratio', wordCount: 2, category: 'modern-swiss', vibe: 'Geometric Proportions', meaning: 'Disciplined negative space engineered for screen typography and architectural signposts.', ligatures: ['sp', 'ct', 'ti'] },
  { name: 'Kinesis Modul', wordCount: 2, category: 'modern-swiss', vibe: 'Dynamic Functionalism', meaning: 'Kinetic typography balancing optical rhythm with pure sans-serif efficiency.', ligatures: ['ne', 'si', 'od'] },
  { name: 'Structura', wordCount: 1, category: 'modern-swiss', vibe: 'Bauhaus Tectonics', meaning: 'Exposed structural purity where form strictly follows purpose without decoration.', ligatures: ['tr', 'ct', 'ra'] },
  { name: 'Objectiv', wordCount: 1, category: 'modern-swiss', vibe: 'Neue Grafik', meaning: 'Neutral communication vessel engineered to let the raw message speak unobstructed.', ligatures: ['bj', 'ct', 'iv'] },
  { name: 'Ratio Grotesk', wordCount: 2, category: 'modern-swiss', vibe: 'Golden Section', meaning: 'Proportional geometric arches and consistent mechanical monoline stroke weight.', ligatures: ['ti', 'ro', 'sk'] },
  { name: 'Tectonic Grid', wordCount: 2, category: 'modern-swiss', vibe: 'Industrial Layout', meaning: 'Structural foundation designed like modern steel and cast-concrete architecture.', ligatures: ['ct', 'ic', 'gr'] },

  // 4. RETRO / VINTAGE / NOSTALGIA
  { name: 'Moonshine Velvet', wordCount: 2, category: 'retro-vintage', vibe: 'Prohibition Era', meaning: 'Secret Appalachian copper stills producing bold liquor with a silky smooth finish.', ligatures: ['oo', 'sh', 'lv', 'et'] },
  { name: 'Rustler Timber', wordCount: 2, category: 'retro-vintage', vibe: 'Americana Trade', meaning: 'Heavy crosscut saws, cedar shavings, and double-stitched denim work jackets.', ligatures: ['st', 'tl', 'er', 'mb'] },
  { name: 'Sundown Bourbon', wordCount: 2, category: 'retro-vintage', vibe: 'Southern Heritage', meaning: 'Charred American oak barrels glowing in the amber light of twilight verandas.', ligatures: ['un', 'ow', 'ou', 'rb'] },
  { name: 'Heritage Copper', wordCount: 2, category: 'retro-vintage', vibe: 'Old Guild Workshop', meaning: 'Hand-hammered warm metal kettleware and engraved printing plates.', ligatures: ['er', 'it', 'pp'] },
  { name: 'Golden Saloon', wordCount: 2, category: 'retro-vintage', vibe: 'Frontier Nostalgia', meaning: 'Swing doors, upright honky-tonk piano keys, and gold dust weighed on brass scales.', ligatures: ['ld', 'oo', 'al'] },
  { name: 'Blackwood Roaster', wordCount: 2, category: 'retro-vintage', vibe: 'Cast Iron Artisan', meaning: 'Rich espresso beans tumbling in red-hot cast iron drums over hickory wood embers.', ligatures: ['ck', 'oo', 'st', 'er'] },
  { name: 'Ironclad Stitches', wordCount: 2, category: 'retro-vintage', vibe: 'Heavyweight Denim', meaning: 'Triple-needle chainstitching on 18oz Japanese selvage cotton.', ligatures: ['on', 'cl', 'tt', 'ch'] },

  // 5. BRUTALIST / ACID / STREETWEAR
  { name: 'Distortion Riot', wordCount: 2, category: 'brutalist-acid', vibe: 'Subversive Streetwear', meaning: 'Overdriven guitar feedback, megaphone slogans, and raw silkscreened protest posters.', ligatures: ['st', 'or', 'ti', 'io'] },
  { name: 'Concrete Hazard', wordCount: 2, category: 'brutalist-acid', vibe: 'Bunker Industrial', meaning: 'High-contrast yellow and black hazard bars spray-painted on chipped Soviet bunker walls.', ligatures: ['on', 'cr', 'az', 'rd'] },
  { name: 'Toxic Subversion', wordCount: 2, category: 'brutalist-acid', vibe: 'Acid Rave Culture', meaning: 'Fluorescent green glowsticks, heavy smoke machines, and 160 BPM drum & bass.', ligatures: ['xi', 'ub', 'rs', 'on'] },
  { name: 'Bunker Barricade', wordCount: 2, category: 'brutalist-acid', vibe: 'Heavy Tactical', meaning: 'Reinforced ballistic nylon, modular Molle straps, and cold corrugated iron gates.', ligatures: ['nk', 'er', 'rr', 'ca'] },
  { name: 'Anarchy Mono', wordCount: 2, category: 'brutalist-acid', vibe: 'Underground Zine', meaning: 'Distressed typewriter keys hammered furiously onto cheap recycled newsprint.', ligatures: ['ch', 'on'] },
  { name: 'Heavy Overlock', wordCount: 2, category: 'brutalist-acid', vibe: 'Deconstructed Garment', meaning: 'Exposed seam allowances and unclipped threads on an oversized boxy hoodie.', ligatures: ['ea', 'vy', 'er', 'ck'] },

  // 6. LUXURY / HIGH-END EDITORIAL
  { name: 'Ethereal Aurelia', wordCount: 2, category: 'luxury-editorial', vibe: 'Haute Horlogerie', meaning: 'Delicate high-contrast hairline serifs floating like champagne bubbles at a Paris salon.', ligatures: ['th', 'er', 'ea', 'au', 'el', 'ia'] },
  { name: 'Sovereign Silk', wordCount: 2, category: 'luxury-editorial', vibe: 'Monarchial Elegance', meaning: 'Loom-woven Lyon damask flowing gracefully over marble imperial staircases.', ligatures: ['ov', 'er', 'ei', 'gn', 'lk'] },
  { name: 'Opulent Noir', wordCount: 2, category: 'luxury-editorial', vibe: 'Midnight Black Tie', meaning: 'Flawless velvet tuxedos illuminated by indirect amber chandeliers at the opera.', ligatures: ['pu', 'le', 'nt', 'oi'] },
  { name: 'Seraphine Atelier', wordCount: 2, category: 'luxury-editorial', vibe: 'Fine Parfumerie', meaning: 'Crystal perfume decanters infused with rare May roses from Grasse.', ligatures: ['ph', 'in', 'el', 'ie'] },
  { name: 'Lumina Solitaire', wordCount: 2, category: 'luxury-editorial', vibe: 'High Jewellery', meaning: 'Brilliant-cut diamonds set in hand-carved micro-platinum bezels.', ligatures: ['mi', 'na', 'ol', 'it', 'ai'] },
  { name: 'Palais Royale', wordCount: 2, category: 'luxury-editorial', vibe: 'Château Heritage', meaning: 'Gilded mirrors and intricate boiserie panelling overlooking the Tuileries gardens.', ligatures: ['al', 'is', 'oy', 'le'] },

  // 7. PLAYFUL / CARTOON / KIDS
  { name: 'Jellypop Boing', wordCount: 2, category: 'playful-cartoon', vibe: 'Bouncy Candy', meaning: 'Squishy gelatin letters bouncing off trampoline pads with colorful fruit juice splashes.', ligatures: ['ll', 'yp', 'op', 'oi', 'ng'] },
  { name: 'Chonky Wobble', wordCount: 2, category: 'playful-cartoon', vibe: 'Cute Chubby', meaning: 'Super plump, round, lovable letters that wiggle happily with every step.', ligatures: ['ch', 'on', 'bb', 'le'] },
  { name: 'Doodle Bounce', wordCount: 2, category: 'playful-cartoon', vibe: 'Hand-Drawn Joy', meaning: 'Spontaneous crayon scribbles hopping across an open sketchbook.', ligatures: ['oo', 'dl', 'ou', 'nc'] },
  { name: 'Snickerdoodle', wordCount: 1, category: 'playful-cartoon', vibe: 'Sweet Bakery', meaning: 'Warm cinnamon-sugar butter cookies freshly pulled from the kitchen oven.', ligatures: ['ck', 'er', 'oo', 'dl'] },
  { name: 'Wacky Bongo', wordCount: 2, category: 'playful-cartoon', vibe: 'Jungle Rhythm', meaning: 'Energetic cartoon monkey rhythms with cheerful asymmetrical counters.', ligatures: ['ck', 'on', 'go'] },
  { name: 'Bubble Gum', wordCount: 2, category: 'playful-cartoon', vibe: 'Fun Nostalgia', meaning: 'Giant pink balloon bubbles that pop with a delightful sugary snap.', ligatures: ['bb', 'le', 'um'] }
];

/**
 * Filter offline preset names according to user constraints
 */
export function getOfflineFontNameCandidates(
  wordCount: WordCountOption,
  startingLetter: string,
  targetLigature: string,
  category: NamingCategory,
  requestedCount: number = 12
): FontNameCandidate[] {
  let list = [...PRESET_CONCEPT_NAMES];

  // 1. Filter by genre / category
  if (category && category !== 'all') {
    list = list.filter(item => item.category === category);
  }

  // 2. Filter by word count
  if (wordCount === 'single') {
    list = list.filter(item => item.wordCount === 1);
  } else if (wordCount === 'double') {
    list = list.filter(item => item.wordCount === 2);
  }

  // 3. Filter by starting letter
  if (startingLetter && startingLetter !== 'ANY') {
    const letterUpper = startingLetter.toUpperCase();
    const exactMatches = list.filter(item => item.name.toUpperCase().startsWith(letterUpper));
    if (exactMatches.length > 0) {
      list = exactMatches;
    } else {
      // Synthesize inventive concept names starting with that letter
      const conceptWords: Record<string, string[]> = {
        A: ['Aspect', 'Aurelia', 'Astrotech', 'Anarchy', 'Archon'],
        B: ['Bloodlust', 'Boing', 'Bunker', 'Barricade', 'Bubble'],
        C: ['Crypt', 'Chonky', 'Chronos', 'Coven', 'Concrete'],
        D: ['Distortion', 'Doodle', 'Darklore', 'Dynasty', 'Drift'],
        E: ['Ethereal', 'Eclipse', 'Equinox', 'Echo', 'Entropy'],
        F: ['Forma', 'Flux', 'Frostbite', 'Fracture', 'Fable'],
        G: ['Grimlore', 'Grotesk', 'Gummy', 'Glitch', 'Gargoyle'],
        H: ['Hyperion', 'Hex', 'Hazard', 'Heritage', 'Heavy'],
        I: ['Ironclad', 'Illusion', 'Infinity', 'Impact', 'Ignite'],
        J: ['Jellypop', 'Jinx', 'Juggernaut', 'Jester', 'Junction'],
        K: ['Kinesis', 'Karma', 'Krypton', 'Kinetic', 'Kingdom'],
        L: ['Lumina', 'Lunatic', 'Lagoon', 'Limbo', 'Legacy'],
        M: ['Morbid', 'Modul', 'Moonshine', 'Matrix', 'Monolith'],
        N: ['Nocturnal', 'Neue', 'Necromancy', 'Neon', 'Nexus'],
        O: ['Obsidian', 'Orbit', 'Objectiv', 'Opulent', 'Overdrive'],
        P: ['Pulsar', 'Phantom', 'Palais', 'Protocol', 'Pixel'],
        Q: ['Quantum', 'Quicksilver', 'Quark', 'Quasar', 'Quaint'],
        R: ['Ratio', 'Rustler', 'Riot', 'Runic', 'Resonance'],
        S: ['Singularity', 'Structura', 'Sovereign', 'Sundown', 'Spire'],
        T: ['Tectonic', 'Toxic', 'Timberland', 'Titan', 'Threshold'],
        U: ['Ultra', 'Utopia', 'Umbra', 'Unbound', 'Underworld'],
        V: ['Velvet', 'Voidwalker', 'Vein', 'Vortex', 'Vampire'],
        W: ['Wobble', 'Wacky', 'Witchcraft', 'Warp', 'Wildfire'],
        X: ['Xenon', 'Xerox', 'X-Ray', 'Xeno', 'Xanadu'],
        Y: ['Yesteryear', 'Yield', 'Yonder', 'Yolk', 'Yearling'],
        Z: ['Zenith', 'Zodiac', 'Zephyr', 'Zero', 'Zombie'],
      };

      const seeds = conceptWords[letterUpper] || [`${letterUpper}on`];
      list = seeds.map((s) => ({
        name: wordCount === 'double' ? `${s} Protocol` : s,
        wordCount: (wordCount === 'double' ? 2 : 1) as 1 | 2,
        category: category !== 'all' ? category : 'modern-swiss',
        vibe: 'Inventive Typographic Concept',
        meaning: `Concept-driven font name exploring distinct letterform cadence and atmospheric tension.`,
        ligatures: ['th', 'st', 'er']
      }));
    }
  }

  // 4. Filter by target ligature
  if (targetLigature && targetLigature !== 'none') {
    const query = targetLigature.toLowerCase();
    const ligatureMatches = list.filter(item => item.name.toLowerCase().includes(query));
    if (ligatureMatches.length > 0) {
      list = ligatureMatches;
    }
  }

  // Convert to FontNameCandidate & run thorough collision detection
  const candidates: FontNameCandidate[] = list.slice(0, requestedCount).map((item, idx) => {
    const collision = checkFontCollision(item.name);

    return {
      id: `candidate-${idx}-${Date.now()}`,
      name: item.name,
      wordCount: item.wordCount,
      origin: GENRE_METADATA[item.category]?.label || 'Concept-Driven Naming',
      category: item.category,
      matchedLigatures: detectLigatures(item.name, targetLigature),
      meaning: item.meaning,
      isKnownTaken: collision.isTaken,
      knownFontNote: collision.isTaken ? collision.sourceNote : undefined,
      timestamp: Date.now(),
      source: 'preset'
    };
  });

  return candidates;
}

/**
 * Detects common double-letters and ligatures in a name
 */
export function detectLigatures(name: string, priorityQuery?: string): string[] {
  const common = ['ss', 'tt', 'ff', 'fi', 'fl', 'll', 'oo', 'rr', 'st', 'ch', 'th', 'ee', 'mm', 'nn', 'pp', 'ua', 'wa', 'ck', 'qu'];
  const lower = name.toLowerCase();
  const found: string[] = [];

  if (priorityQuery && priorityQuery !== 'none' && lower.includes(priorityQuery.toLowerCase())) {
    found.push(priorityQuery.toLowerCase());
  }

  for (const lig of common) {
    if (lower.includes(lig) && !found.includes(lig)) {
      found.push(lig);
    }
  }

  return found;
}
