import { FontNameCandidate, NamingCategory, WordCountOption } from '../types';
import { checkFontCollision } from './existingFontsCatalog';

export interface PresetLocation {
  name: string;
  wordCount: 1 | 2;
  category: NamingCategory;
  origin: string;
  meaning: string;
  ligatures: string[];
}

// Truly authentic, distinctive geographic locations on maps (far less saturated by commercial fonts)
export const PRESET_LOCATIONS: PresetLocation[] = [
  // ISLANDS & ARCHIPELAGOS (Unsaturated Hidden Gems)
  { name: 'Maratua', wordCount: 1, category: 'islands', origin: 'Berau Archipelago Atoll, Indonesia', meaning: 'Crescent-shaped coral atoll featuring secret jungle caves and translucent mangrove waterways.', ligatures: ['rt', 'ua'] },
  { name: 'Derawan', wordCount: 1, category: 'islands', origin: 'East Kalimantan Coral Island, Indonesia', meaning: 'Remote tropical haven of gentle giant sea turtles and turquoise lagoon shallows.', ligatures: ['wa', 'er'] },
  { name: 'Natuna', wordCount: 1, category: 'islands', origin: 'Border Sea Archipelago, Indonesia', meaning: 'Pristine emerald archipelago framed by massive prehistoric granite sea boulders in Riau Islands.', ligatures: ['na', 'at'] },
  { name: 'Gotland', wordCount: 1, category: 'islands', origin: 'Baltic Sea Island, Sweden', meaning: 'Medieval Hanseatic island surrounded by ancient limestone sea stacks (rauks) and fortified stone towers.', ligatures: ['tl', 'ot'] },
  { name: 'Orkney', wordCount: 1, category: 'islands', origin: 'Northern Archipelago, Scotland', meaning: 'Wind-scoured archipelago of Neolithic stone circles, towering sea cliffs, and Viking rune heritage.', ligatures: ['kn', 'ey'] },
  { name: 'Faroe', wordCount: 1, category: 'islands', origin: 'North Atlantic Archipelago', meaning: 'Volcanic emerald peaks plunging into foaming ocean swells with turf-roofed coastal hamlets.', ligatures: ['ro', 'ar'] },
  { name: 'Belitung', wordCount: 1, category: 'islands', origin: 'Granite Sea Archipelago, Indonesia', meaning: 'Striking white quartz sand coastlines dotted with colossal smooth black granite megaliths.', ligatures: ['li', 'ng'] },
  { name: 'Ischia', wordCount: 1, category: 'islands', origin: 'Gulf of Naples Volcanic Island, Italy', meaning: 'Thermal hot spring island with an imposing Aragonese castle perched upon a dark volcanic rock.', ligatures: ['ch', 'ia'] },
  { name: 'Pantelleria', wordCount: 1, category: 'islands', origin: 'Strait of Sicily, Italy', meaning: 'Black volcanic pearl of obsidian cliffs, dry stone dammusi houses, and sweet Zibibbo wine.', ligatures: ['ll', 'nt'] },
  { name: 'Favignana', wordCount: 1, category: 'islands', origin: 'Aegadian Archipelago, Sicily', meaning: 'Butterfly-shaped limestone island famed for ancient tufa stone quarries and sapphire sea coves.', ligatures: ['gn', 'an'] },
  { name: 'Folegandros', wordCount: 1, category: 'islands', origin: 'Southern Cyclades, Greece', meaning: 'Cliffside whitewashed chora perched 200 meters above azure Aegean swells.', ligatures: ['le', 'nd'] },
  { name: 'Amorgos', wordCount: 1, category: 'islands', origin: 'Deep Blue Aegean Island, Greece', meaning: 'Dramatically steep mountain island sheltering the stark white 11th-century Hozoviotissa monastery.', ligatures: ['or', 'rg'] },
  { name: 'Formentera', wordCount: 1, category: 'islands', origin: 'Pityusic Island, Spain', meaning: 'Pure turquoise shallows, pink salt flats, and wooden boardwalks through aromatic coastal pine dunes.', ligatures: ['rm', 'nt'] },
  { name: 'Selayar', wordCount: 1, category: 'islands', origin: 'Flores Sea Island, Indonesia', meaning: 'Ancient sailing crossroads of Dong Son bronze kettledrums and endless coconut groves.', ligatures: ['la', 'ay'] },

  // CITIES, TOWNS & VALLEYS WITH DOUBLE LETTERS / LIGATURES
  { name: 'Passau', wordCount: 1, category: 'geography', origin: 'Bavaria Three Rivers City, Germany', meaning: 'Baroque city where the Danube, Inn, and Ilz rivers converge beneath fortress Veste Oberhaus.', ligatures: ['ss'] },
  { name: 'Wattens', wordCount: 1, category: 'geography', origin: 'Tyrol Mountain Town, Austria', meaning: 'Alpine valley enclave nestled in Tyrolean peaks, historic home of crystalline glass craftsmanship.', ligatures: ['tt'] },
  { name: 'Stafford', wordCount: 1, category: 'geography', origin: 'Midlands Ancient Borough, England', meaning: 'Historic Saxon market town with timber-framed Elizabethan estates and pottery craft guilds.', ligatures: ['ff'] },
  { name: 'Bellagio', wordCount: 1, category: 'geography', origin: 'Lake Como Promontory, Italy', meaning: 'The "Pearl of Lake Como", celebrated for steep cobbled stairways and neoclassical villa gardens.', ligatures: ['ll'] },
  { name: 'Ferrara', wordCount: 1, category: 'geography', origin: 'Emilia-Romagna Renaissance City, Italy', meaning: 'Este ducal capital surrounded by miles of ancient brick ramparts and terracotta palaces.', ligatures: ['rr'] },
  { name: 'Inverness', wordCount: 1, category: 'geography', origin: 'Highlands Capital, Scotland', meaning: 'Crown of the Scottish Highlands where River Ness empties toward mystical Loch Ness.', ligatures: ['ss'] },
  { name: 'Moorland', wordCount: 1, category: 'nature', origin: 'Heather Moor Plateau, Yorkshire', meaning: 'Rolling windswept wild plateau carpeted in purple heather, granite tors, and peat bogs.', ligatures: ['oo'] },
  { name: 'Stirling', wordCount: 1, category: 'geography', origin: 'Royal Citadel, Scotland', meaning: 'Perched high upon an extinct volcanic crag, the ancient key to the Kingdom of Scotland.', ligatures: ['st'] },
  { name: 'Cassis', wordCount: 1, category: 'geography', origin: 'Provence Fishing Port, France', meaning: 'Charming Mediterranean harbour sheltered beneath Cap Canaille, Europe’s highest sea cliff.', ligatures: ['ss'] },
  { name: 'Schaffhausen', wordCount: 1, category: 'geography', origin: 'Upper Rhine Historic Town, Switzerland', meaning: 'Medieval town renowned for ornate oriel bay windows and the roaring Rhine Falls.', ligatures: ['ff'] },
  { name: 'Tarragona', wordCount: 1, category: 'geography', origin: 'Costa Daurada Roman Port, Spain', meaning: 'Ancient Roman coastal capital bathed in golden sunlight with seaside amphitheatre ruins.', ligatures: ['rr'] },
  { name: 'Castille', wordCount: 1, category: 'luxury', origin: 'Historical Kingdom, Spain', meaning: 'Land of fortified hilltop stone castles, deep wine cellars, and austere regal nobility.', ligatures: ['st', 'll'] },
  { name: 'Rosslyn', wordCount: 1, category: 'mythology', origin: 'Midlothian Chapel Woods, Scotland', meaning: 'Gothic forest sanctuary steeped in Templar masonry, carved green men, and astronomical symbols.', ligatures: ['ss'] },
  { name: 'Valldemossa', wordCount: 1, category: 'geography', origin: 'Serra de Tramuntana, Mallorca', meaning: 'Stone carthusian monastery nestled high among terraced almond groves and olive hills.', ligatures: ['ll', 'ss'] },
  { name: 'Albarracin', wordCount: 1, category: 'geography', origin: 'Aragon Medieval Citadel, Spain', meaning: 'Dramatically preserved pink clay fortified citadel perched above a winding river gorge.', ligatures: ['rr'] },
  { name: 'Kintamani', wordCount: 1, category: 'geography', origin: 'Batur Highland, Bali, Indonesia', meaning: 'High mountain ridge perched above Mount Batur volcano, renowned for cool mountain air and citrus groves.', ligatures: ['nt'] },
  { name: 'Sawahlunto', wordCount: 1, category: 'geography', origin: 'West Sumatra Heritage Town, Indonesia', meaning: 'UNESCO heritage valley town of Dutch colonial brick architecture and winding mountain railway tracks.', ligatures: ['ah', 'nt'] },
  { name: 'Trowulan', wordCount: 1, category: 'geography', origin: 'Ancient Majapahit Capital, Indonesia', meaning: 'Historic 14th-century capital of terracotta bathing pools, red brick gates, and royal reservoirs.', ligatures: ['ow', 'an'] },

  // TWO WORDS / TWO LINES (2 Kata Distinctive Pairings)
  { name: 'Maratua Reef', wordCount: 2, category: 'islands', origin: 'Outer Berau Sea, Indonesia', meaning: 'Pristine ocean drop-offs where coral pinnacles meet translucent oceanic depths.', ligatures: ['rt', 'ee'] },
  { name: 'Passau Heritage', wordCount: 2, category: 'geography', origin: 'Bavarian Border Confluence', meaning: 'Baroque structural dignity inspired by three alpine rivers meeting beneath historic spires.', ligatures: ['ss', 'er', 'it'] },
  { name: 'Sumba Textura', wordCount: 2, category: 'islands', origin: 'East Nusa Tenggara, Indonesia', meaning: 'Ancestral megalithic balance and the organic rhythmic cadence of indigo handwoven ikat.', ligatures: ['mb', 'ex'] },
  { name: 'Valldemossa Stone', wordCount: 2, category: 'geography', origin: 'Tramuntana Mountain Village, Spain', meaning: 'Weathered ochre cobblestones and terracotta rooflines framed against alpine pine ridges.', ligatures: ['ll', 'ss', 'st'] },
  { name: 'Gotland Runic', wordCount: 2, category: 'islands', origin: 'Baltic Sea Coast, Sweden', meaning: 'Ancient carved limestone monuments standing firm against Baltic sea winds.', ligatures: ['tl', 'un', 'ic'] },
  { name: 'Kintamani Mist', wordCount: 2, category: 'geography', origin: 'Volcanic Ridge, Bali, Indonesia', meaning: 'Cool morning cloud layers sweeping across volcanic lakes and pine-shaded coffee plantations.', ligatures: ['nt', 'st'] },
  { name: 'Belitung Monolith', wordCount: 2, category: 'islands', origin: 'South China Sea Coast, Indonesia', meaning: 'Colossal black granite boulders sculpted smooth by millennia of tropical ocean waves.', ligatures: ['li', 'th'] },
  { name: 'Albarracin Clay', wordCount: 2, category: 'geography', origin: 'Aragon Mountain Pass, Spain', meaning: 'Warm earthen ramparts winding along steep canyon limestone cliffs.', ligatures: ['rr', 'ay'] },
  { name: 'Sawahlunto Brick', wordCount: 2, category: 'geography', origin: 'West Sumatra Valley, Indonesia', meaning: 'Colonial industrial heritage expressed in sturdy fired terracotta brick and mountain locomotives.', ligatures: ['ah', 'ck'] },
  { name: 'Schaffhausen Fall', wordCount: 2, category: 'geography', origin: 'Upper Rhine Valley, Switzerland', meaning: 'Thundering glacial water currents and precision horology heritage.', ligatures: ['ff', 'll'] },
  { name: 'Ischia Thermal', wordCount: 2, category: 'islands', origin: 'Campanian Volcanic Coast, Italy', meaning: 'Ancient mineral hot springs bubbling through aromatic Mediterranean pine groves.', ligatures: ['ch', 'rm', 'al'] },
  { name: 'Rosslyn Masonry', wordCount: 2, category: 'mythology', origin: 'Midlothian Ancient Chapel, Scotland', meaning: 'Intricate Gothic stone carvings encoding celestial geometry and floral symbolism.', ligatures: ['ss', 'on', 'ry'] },
  { name: 'Trowulan Red', wordCount: 2, category: 'geography', origin: 'Majapahit Royal Realm, Indonesia', meaning: 'The timeless warm terracotta red of ancient Southeast Asian imperial temples.', ligatures: ['ow', 'ed'] },
  { name: 'Faroe Solitude', wordCount: 2, category: 'islands', origin: 'North Atlantic Ocean, Denmark', meaning: 'Epic basalt sea stacks enveloped in low-drifting clouds and ocean spray.', ligatures: ['ro', 'li', 'tu'] }
];

/**
 * Filter offline preset locations according to user constraints
 */
export function getOfflineFontNameCandidates(
  wordCount: WordCountOption,
  startingLetter: string,
  targetLigature: string,
  category: NamingCategory,
  requestedCount: number = 12
): FontNameCandidate[] {
  let list = [...PRESET_LOCATIONS];

  // 1. Filter by category
  if (category && category !== 'all') {
    list = list.filter(item => item.category === category || (category === 'geography' && item.category === 'islands'));
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
      // Synthesize candidates starting with that letter
      const places: Record<string, string[]> = {
        A: ['Albarracin', 'Amorgos', 'Alor', 'Aegadian', 'Appennino'],
        B: ['Belitung', 'Bellagio', 'Bosa', 'Baturiti', 'Banda'],
        C: ['Castille', 'Civita', 'Cadaques', 'Catterick', 'Cavtat'],
        D: ['Derawan', 'Dinant', 'Durbuy', 'Durnstein', 'Dammusi'],
        E: ['Eguisheim', 'Echternach', 'Engadin', 'Etruria', 'Elba'],
        F: ['Faroe', 'Favignana', 'Folegandros', 'Ferrara', 'Frigiliana'],
        G: ['Gotland', 'Guimaraes', 'Glorenza', 'Gruissan', 'Gjirokaster'],
        H: ['Hallstatt', 'Hanseatic', 'Hesperia', 'Highland', 'Harbour'],
        I: ['Ischia', 'Inverness', 'Ijen', 'Illyria', 'Ikaria'],
        J: ['Java', 'Jura', 'Jost', 'Jalisco', 'Jordan'],
        K: ['Kintamani', 'Kotagede', 'Kotor', 'Korcula', 'Kaysersberg'],
        L: ['Lofoten', 'Locorotondo', 'Lugano', 'Limestone', 'Lombok'],
        M: ['Maratua', 'Monopoli', 'Motovun', 'Monsaraz', 'Munduk'],
        N: ['Natuna', 'Narni', 'Naantali', 'Nisyros', 'Ness'],
        O: ['Orkney', 'Ohrid', 'Oostende', 'Obsidian', 'Ochil'],
        P: ['Passau', 'Pantelleria', 'Piran', 'Pitigliano', 'Polignano'],
        Q: ['Quimper', 'Quito', 'Quebec', 'Quarry', 'Quartz'],
        R: ['Rosslyn', 'Rovinj', 'Riquewihr', 'Rantepao', 'Roti'],
        S: ['Sawahlunto', 'Stafford', 'Stirling', 'Schaffhausen', 'Scilla'],
        T: ['Trowulan', 'Tarragona', 'Trogir', 'Tomohon', 'Tramuntana'],
        U: ['Ubud', 'Umbria', 'Uluwatu', 'Ushuaia', 'Uppsala'],
        V: ['Valldemossa', 'Vianden', 'Vipiteno', 'Vlissingen', 'Volterra'],
        W: ['Wattens', 'Wae Rebo', 'Wangi-Wangi', 'Wakatobi', 'Wexford'],
        X: ['Xanadu', 'Xalapa', 'Xanthi', 'Xcaret', 'Xiamen'],
        Y: ['Yorkshire', 'Yarra', 'Yosemite', 'Yucatan', 'Yonder'],
        Z: ['Zermatt', 'Zanzibar', 'Zagreb', 'Zephyr', 'Zibibbo'],
      };
      const seeds = places[letterUpper] || [`${letterUpper}oria`];
      list = seeds.map((s) => ({
        name: wordCount === 'double' ? `${s} Textura` : s,
        wordCount: (wordCount === 'double' ? 2 : 1) as 1 | 2,
        category: 'geography' as NamingCategory,
        origin: `Geographical map reference (${letterUpper})`,
        meaning: `Evocative location-based typeface name crafted for distinctive visual identity.`,
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
  const candidates: FontNameCandidate[] = list.slice(0, requestedCount).map((loc, idx) => {
    const collision = checkFontCollision(loc.name);

    return {
      id: `candidate-${idx}-${Date.now()}`,
      name: loc.name,
      wordCount: loc.wordCount,
      origin: loc.origin,
      category: loc.category,
      matchedLigatures: detectLigatures(loc.name, targetLigature),
      meaning: loc.meaning,
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
  const common = ['ss', 'tt', 'ff', 'fi', 'fl', 'll', 'oo', 'rr', 'st', 'ch', 'th', 'ee', 'mm', 'nn', 'pp', 'ua', 'wa'];
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
