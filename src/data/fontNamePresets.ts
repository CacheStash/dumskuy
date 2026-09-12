import { FontNameCandidate, NamingCategory, WordCountOption } from '../types';

// Famous font names to cross-check availability and avoid trademark collisions
export const KNOWN_FONT_CATALOG: Set<string> = new Set([
  'HELVETICA', 'ARIAL', 'TIMES', 'TIMES NEW ROMAN', 'FUTURA', 'GARAMOND',
  'BODONI', 'CASLON', 'BASKERVILLE', 'DIDOT', 'CLARENDON', 'FRANKLIN GOTHIC',
  'UNIVERS', 'FRUTIGER', 'AVENIR', 'GOTHAM', 'PROXIMA NOVA', 'MONTSERRAT',
  'LATO', 'INTER', 'ROBOTO', 'OPEN SANS', 'POPPINS', 'RALEWAY', 'PLAYFAIR DISPLAY',
  'CINZEL', 'BEBAS NEUE', 'OSWALD', 'NUNITO', 'RUBIK', 'WORK SANS', 'SOURCE SANS',
  'TRAJAN', 'CENTURY GOTHIC', 'GILL SANS', 'ROCKWELL', 'COOPER BLACK',
  'COPPERPLATE', 'EUROSTILE', 'DIN', 'AVANT GARDE', 'GEORGIA', 'VERDANA',
  'TAHOMA', 'TREBUCHET', 'IMPACT', 'COMIC SANS', 'PAPYRUS', 'CALIBRI',
  'CAMBRIA', 'OPTIMA', 'MYRIAD', 'MINION', 'SABON', 'AKZIDENZ GROTESK',
  'GILROY', 'CIRCULAR', 'NEUE HAAS GROTESK', 'SPACE GROTESK', 'SYNE',
  'PLUS JAKARTA SANS', 'DM SANS', 'CABINET GROTESK', 'SATOSHI', 'GENERAL SANS',
  'CLASH DISPLAY', 'SWITZER', 'SENTIENT', 'GAMBARINO', 'ZODIAK', 'RANADE',
  'BOSKA', 'MELODRAMA', 'CHILANKA', 'CORONA', 'PALATINO', 'BOOKMAN',
  'LUCIDA', 'CORBEL', 'CANDARA', 'CONSOLAS', 'JETBRAINS MONO', 'FIRA CODE',
  'INCONSOLATA', 'UBUNTU', 'MERRIWEATHER', 'LORA', 'PLAYFAIR', 'PACIFICO',
  'LOBSTER', 'CAVEAT', 'SHADOWS INTO LIGHT', 'GREAT VIBES', 'DANCING SCRIPT',
  'COMFORTAA', 'QUICKSAND', 'TITILLIUM', 'BARLOW', 'TEKO', 'ANTON',
  'ARCHIVIO', 'FESTIVAL', 'VOGUE', 'HARPER', 'BAUHAUS', 'METROPOLIS'
]);

export interface PresetLocation {
  name: string;
  wordCount: 1 | 2;
  category: NamingCategory;
  origin: string;
  meaning: string;
  ligatures: string[];
}

export const PRESET_LOCATIONS: PresetLocation[] = [
  // ISLANDS (1 Kata)
  { name: 'Santorini', wordCount: 1, category: 'islands', origin: 'Cyclades Island, Greece', meaning: 'Volcanic island known for dramatic caldera cliffs, white cubic architecture, and cobalt blue domes.', ligatures: ['st'] },
  { name: 'Sumba', wordCount: 1, category: 'islands', origin: 'Savu Sea Island, Indonesia', meaning: 'East Nusa Tenggara island famous for megalithic culture, wild savannahs, and woven Ikat textiles.', ligatures: ['mb'] },
  { name: 'Corsica', wordCount: 1, category: 'islands', origin: 'Mediterranean Island, France', meaning: 'Mountainous island of rugged granite peaks, ancient coastal citadels, and wild maquis herbs.', ligatures: ['rs'] },
  { name: 'Mallorca', wordCount: 1, category: 'islands', origin: 'Balearic Island, Spain', meaning: 'Sun-drenched Mediterranean jewel of golden sandstone arches, dramatic limestone coves, and orange groves.', ligatures: ['ll'] },
  { name: 'Lofoten', wordCount: 1, category: 'islands', origin: 'Arctic Archipelago, Norway', meaning: 'Dramatic jagged mountain walls soaring straight from the Arctic sea, dotted with vibrant red fishing rorbuer.', ligatures: ['ft'] },
  { name: 'Natuna', wordCount: 1, category: 'islands', origin: 'Border Sea Archipelago, Indonesia', meaning: 'Pristine emerald archipelago framed by massive prehistoric granite sea boulders in Riau Islands.', ligatures: ['na'] },
  { name: 'Capri', wordCount: 1, category: 'islands', origin: 'Bay of Naples, Italy', meaning: 'Gilded island of sheer limestone sea stacks (Faraglioni), Roman villas, and luxury cliffside terraces.', ligatures: ['pr'] },
  { name: 'Madeira', wordCount: 1, category: 'islands', origin: 'Atlantic Island, Portugal', meaning: 'Subtropical volcanic pearl with terraced mountain vineyards, endemic laurel forests, and levada waterways.', ligatures: ['de'] },
  { name: 'Rinjani', wordCount: 1, category: 'geography', origin: 'Lombok Sacred Mountain, Indonesia', meaning: 'Majestic caldera peak with turquoise Segara Anak volcanic lake, revered in Balinese and Sasak lore.', ligatures: ['nj'] },
  { name: 'Gotland', wordCount: 1, category: 'islands', origin: 'Baltic Sea Island, Sweden', meaning: 'Medieval Hanseatic island surrounded by ancient limestone sea stacks (rauks) and fortified stone towers.', ligatures: ['tl'] },
  { name: 'Bunaken', wordCount: 1, category: 'islands', origin: 'North Sulawesi Marine Island, Indonesia', meaning: 'Iconic marine park island renowned for steep vertical underwater coral drop-offs.', ligatures: ['ak'] },
  { name: 'Orkney', wordCount: 1, category: 'islands', origin: 'Northern Archipelago, Scotland', meaning: 'Wind-scoured archipelago of Neolithic stone circles, towering sea cliffs, and Viking rune heritage.', ligatures: ['kn'] },
  { name: 'Derawan', wordCount: 1, category: 'islands', origin: 'East Kalimantan Coral Island, Indonesia', meaning: 'Remote tropical haven of gentle giant sea turtles and turquoise lagoon shallows.', ligatures: ['wa'] },
  { name: 'Faroe', wordCount: 1, category: 'islands', origin: 'North Atlantic Archipelago', meaning: 'Volcanic emerald peaks plunging into foaming ocean swells with turf-roofed coastal hamlets.', ligatures: ['ro'] },
  { name: 'Maratua', wordCount: 1, category: 'islands', origin: 'Berau Atoll, Indonesia', meaning: 'Crescent-shaped coral atoll featuring secret jungle caves and translucent mangrove waterways.', ligatures: ['rt'] },

  // CITIES & TOWNS WITH DOUBLE LETTERS / LIGATURES
  { name: 'Passau', wordCount: 1, category: 'geography', origin: 'Bavaria Three Rivers City, Germany', meaning: 'Baroque city where the Danube, Inn, and Ilz rivers converge beneath fortress Veste Oberhaus.', ligatures: ['ss'] },
  { name: 'Wattens', wordCount: 1, category: 'geography', origin: 'Tyrol Mountain Town, Austria', meaning: 'Alpine valley enclave nestled in Tyrolean peaks, historic home of crystalline glass craftsmanship.', ligatures: ['tt'] },
  { name: 'Stafford', wordCount: 1, category: 'geography', origin: 'Midlands Ancient Borough, England', meaning: 'Historic Saxon market town with timber-framed Elizabethan estates and pottery craft guilds.', ligatures: ['ff'] },
  { name: 'Bellagio', wordCount: 1, category: 'geography', origin: 'Lake Como Promontory, Italy', meaning: 'The "Pearl of Lake Como", celebrated for steep cobbled stairways and neoclassical villa gardens.', ligatures: ['ll'] },
  { name: 'Ferrara', wordCount: 1, category: 'geography', origin: 'Emilia-Romagna Renaissance City, Italy', meaning: 'Este ducal capital surrounded by miles of ancient brick ramparts and terracotta palaces.', ligatures: ['rr'] },
  { name: 'Inverness', wordCount: 1, category: 'geography', origin: 'Highlands Capital, Scotland', meaning: 'Crown of the Scottish Highlands where River Ness empties toward mystical Loch Ness.', ligatures: ['ss'] },
  { name: 'Moorland', wordCount: 1, category: 'nature', origin: 'Heather Moor Plateau, Yorkshire', meaning: 'Rolling windswept wild plateau carpeted in purple heather, granite tors, and peat bogs.', ligatures: ['oo'] },
  { name: 'Stirling', wordCount: 1, category: 'geography', origin: 'Royal Citadel, Scotland', meaning: 'Perched high upon an extinct volcanic crag, the ancient key to the Kingdom of Scotland.', ligatures: ['st'] },
  { name: 'Cassis', wordCount: 1, category: 'geography', origin: 'Provence Fishing Port, France', meaning: 'Charming Mediterranean harbour sheltered beneath Cap Canaille, Europe’s highest sea cliff.', ligatures: ['ss'] },
  { name: 'Botticelli', wordCount: 1, category: 'luxury', origin: 'Florentine Golden Era, Italy', meaning: 'Honoring early Renaissance grace, poetic line balance, and ethereal mythological portraits.', ligatures: ['tt', 'll'] },
  { name: 'Schaffhausen', wordCount: 1, category: 'geography', origin: 'Upper Rhine Historic Town, Switzerland', meaning: 'Medieval town renowned for ornate oriel bay windows and the roaring Rhine Falls.', ligatures: ['ff'] },
  { name: 'Tarragona', wordCount: 1, category: 'geography', origin: 'Costa Daurada Roman Port, Spain', meaning: 'Ancient Roman coastal capital bathed in golden sunlight with seaside amphitheatre ruins.', ligatures: ['rr'] },
  { name: 'Castille', wordCount: 1, category: 'luxury', origin: 'Historical Kingdom, Spain', meaning: 'Land of fortified hilltop stone castles, deep wine cellars, and austere regal nobility.', ligatures: ['st', 'll'] },
  { name: 'Rosslyn', wordCount: 1, category: 'mythology', origin: 'Midlothian Chapel Woods, Scotland', meaning: 'Gothic forest sanctuary steeped in Templar masonry, carved green men, and astronomical symbols.', ligatures: ['ss'] },
  { name: 'Kintamani', wordCount: 1, category: 'geography', origin: 'Batur Highland, Bali, Indonesia', meaning: 'High mountain ridge perched above Mount Batur volcano, renowned for cool mountain air and citrus groves.', ligatures: ['nt'] },

  // CITIES & NATURE (1 Kata)
  { name: 'Amalfi', wordCount: 1, category: 'geography', origin: 'Campania Coast, Italy', meaning: 'Spectacular seaside republic clinging to vertical limestone cliffs covered in fragrant lemon terraces.', ligatures: ['fi'] },
  { name: 'Ravenna', wordCount: 1, category: 'geography', origin: 'Byzantine Mosaic Capital, Italy', meaning: 'Ancient imperial city glittering with 5th-century lapis lazuli and gold Byzantine mosaics.', ligatures: ['nn'] },
  { name: 'Portofino', wordCount: 1, category: 'luxury', origin: 'Ligurian Riviera, Italy', meaning: 'Pastel-hued fishing village nestled in a turquoise cove, playground of classic yachting royalty.', ligatures: ['fi', 'oo'] },
  { name: 'Hallstatt', wordCount: 1, category: 'geography', origin: 'Salzkammergut Lake Town, Austria', meaning: 'Fairytale lakeside village mirrored on glass waters beneath dramatic Dachstein salt crags.', ligatures: ['ll', 'tt', 'st'] },
  { name: 'Taormina', wordCount: 1, category: 'geography', origin: 'Sicilian Hilltop, Italy', meaning: 'Ancient Greco-Roman amphitheatre framed against smoking Mount Etna and the Ionian sea.', ligatures: ['mi'] },
  { name: 'Colmar', wordCount: 1, category: 'geography', origin: 'Alsace Canal Town, France', meaning: 'Half-timbered medieval architecture lining cobblestone canals draped in pink geraniums.', ligatures: ['lm'] },
  { name: 'Sintra', wordCount: 1, category: 'geography', origin: 'Serra de Sintra, Portugal', meaning: 'Romantic mountain retreat of vibrant whimsical palaces hidden among mystical pine fog.', ligatures: ['st', 'tr'] },
  { name: 'Telluride', wordCount: 1, category: 'geography', origin: 'San Juan Mountains, Colorado', meaning: 'Box-canyon Victorian mining town nestled under towering alpine peaks and bridal veil waterfalls.', ligatures: ['ll'] },
  { name: 'Sedona', wordCount: 1, category: 'nature', origin: 'Red Rock Country, Arizona', meaning: 'Mesmerizing sandstone monoliths and desert buttes that glow fiery crimson at sunset.', ligatures: ['ed'] },
  { name: 'Kotagede', wordCount: 1, category: 'geography', origin: 'Historic Mataram Royal Quarter, Indonesia', meaning: 'Ancient capital quarter of Jogja known for labyrinthine brick alleyways and royal filigree silversmiths.', ligatures: ['ed'] },
  { name: 'Borobudur', wordCount: 1, category: 'geography', origin: 'Kedu Plain Sanctuary, Indonesia', meaning: 'The world’s largest Buddhist monument, rising like a lotus stepped pyramid above jungle mist.', ligatures: ['bu', 'ur'] },
  { name: 'Toraja', wordCount: 1, category: 'geography', origin: 'South Sulawesi Highlands, Indonesia', meaning: 'Sacred misty highlands of curved boat-roofed Tongkonan houses and stone-carved cliff tombs.', ligatures: ['or'] },
  { name: 'Sawahlunto', wordCount: 1, category: 'geography', origin: 'West Sumatra Heritage Town, Indonesia', meaning: 'UNESCO heritage valley town of Dutch colonial brick architecture and winding mountain railway tracks.', ligatures: ['ah', 'nt'] },

  // TWO WORDS / TWO LINES (2 Kata)
  { name: 'Capri Riviera', wordCount: 2, category: 'luxury', origin: 'Ligurian & Tyrrhenian Seas', meaning: 'Sunlight glimmering on azure sea spray against chalk white villas and bougainvillea pergolas.', ligatures: ['pr', 'rr'] },
  { name: 'Sumba Heritage', wordCount: 2, category: 'islands', origin: 'East Nusa Tenggara, Indonesia', meaning: 'Ancient ancestral tradition, high peaked thatched clan houses, and hand-spun indigo cotton.', ligatures: ['mb', 'er'] },
  { name: 'Amalfi Coast', wordCount: 2, category: 'geography', origin: 'Campania Region, Italy', meaning: 'Hairpin cliffside curves overlooking shimmering Mediterranean horizons and terracotta roofs.', ligatures: ['fi', 'st'] },
  { name: 'Porto Novo', wordCount: 2, category: 'geography', origin: 'Atlantic Maritime Harbor', meaning: 'Historic cobbled quays with cobalt azulejo tiles, salt wind, and aged port wine cellars.', ligatures: ['rt', 'ov'] },
  { name: 'Passau Serif', wordCount: 2, category: 'geography', origin: 'Bavarian Border Town', meaning: 'Baroque structural dignity inspired by three rivers meeting at the threshold of the Alps.', ligatures: ['ss', 'er', 'fi'] },
  { name: 'Banda Neira', wordCount: 2, category: 'islands', origin: 'Spice Islands Caldera, Indonesia', meaning: 'Historic colonial fortress overlooking Gunung Api volcano, cradle of ancient nutmeg trade.', ligatures: ['nd', 'ei'] },
  { name: 'Lofoten Nord', wordCount: 2, category: 'geography', origin: 'Arctic Archipelago, Norway', meaning: 'Minimalist northern solitude, polar midnight sun, and dark granite sea fjords.', ligatures: ['ft', 'rd'] },
  { name: 'Sedona Valley', wordCount: 2, category: 'nature', origin: 'Oak Creek Canyon, Arizona', meaning: 'Deep red clay canyons, scented desert juniper breeze, and sandstone cathedral rock vistas.', ligatures: ['ll', 'ed'] },
  { name: 'Sintra Royal', wordCount: 2, category: 'luxury', origin: 'Serra de Sintra, Portugal', meaning: 'Monarchial summer courts enveloped in mossy oak forests and flamboyant Moorish tilework.', ligatures: ['st', 'tr', 'oy'] },
  { name: 'Natuna Bay', wordCount: 2, category: 'islands', origin: 'South China Sea Islands, Indonesia', meaning: 'Sheltered tropical anchorage dotted with massive granite sea boulders and coconut palms.', ligatures: ['na', 'ay'] },
  { name: 'Gruyeres Castle', wordCount: 2, category: 'luxury', origin: 'Fribourg Pre-Alps, Switzerland', meaning: '800-year-old fortified hill castle commanding green dairy pastures and snowy mountain summits.', ligatures: ['st', 'le'] },
  { name: 'Kintamani Mist', wordCount: 2, category: 'geography', origin: 'Volcanic Ridge, Bali, Indonesia', meaning: 'Cool morning cloud layers sweeping across volcanic lakes and pine-shaded coffee plantations.', ligatures: ['nt', 'st'] },
  { name: 'Belitung Coral', wordCount: 2, category: 'islands', origin: 'Tin Island Archipelago, Indonesia', meaning: 'Pure white quartz sand beaches contrasting against smooth giant black granite monoliths.', ligatures: ['li', 'or'] },
  { name: 'Toraja Highlands', wordCount: 2, category: 'geography', origin: 'Sulawesi Mountain Valleys, Indonesia', meaning: 'Mystical morning mountain haze settling over terraced rice paddies and curved ancestral rooftops.', ligatures: ['gh', 'nd'] },
  { name: 'Savannah Display', wordCount: 2, category: 'geography', origin: 'Georgia Coastal District, USA', meaning: 'Stately cobblestone squares draped in centuries-old live oaks and hanging Spanish moss.', ligatures: ['nn', 'sp', 'ay'] },
  { name: 'Colmar Vintage', wordCount: 2, category: 'geography', origin: 'Alsace Wine Capital, France', meaning: 'A blend of Gothic French and German Renaissance half-timbered architecture along calm canals.', ligatures: ['lm', 'in'] },
  { name: 'Gotland Stone', wordCount: 2, category: 'islands', origin: 'Baltic Sea Coast, Sweden', meaning: 'Ancient weathered limestone runes and defensive medieval battlements standing firm against winter gales.', ligatures: ['tl', 'st', 'on'] },
  { name: 'Passarella Luxe', wordCount: 2, category: 'luxury', origin: 'Milano Fashion District, Italy', meaning: 'The polished catwalk runway where haute couture meets architectural serif balance.', ligatures: ['ss', 'll', 'ux'] }
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
      // If none match, dynamically generate names with that starting letter!
      const prefixes: Record<string, string[]> = {
        A: ['Amalfi', 'Atacama', 'Azores', 'Avalon', 'Aura'],
        B: ['Biarritz', 'Bellagio', 'Bergamo', 'Banda', 'Belitung'],
        C: ['Capri', 'Corsica', 'Colmar', 'Cassis', 'Canggu'],
        D: ['Derawan', 'Danube', 'Dolomiti', 'Dublin', 'Delphi'],
        E: ['Elba', 'Elysium', 'Engadin', 'Etruria', 'Everest'],
        F: ['Faroe', 'Ferrara', 'Fjord', 'Florence', 'Fuji'],
        G: ['Gotland', 'Gruyeres', 'Galapagos', 'Gianyar', 'Granada'],
        H: ['Hallstatt', 'Highland', 'Heidelberg', 'Havana', 'Helsinki'],
        I: ['Inverness', 'Ischia', 'Ibiza', 'Ijen', 'Illyria'],
        J: ['Java', 'Jura', 'Jost', 'Jalisco', 'Jordan'],
        K: ['Kintamani', 'Kotagede', 'Kauai', 'Kowloon', 'Kyoto'],
        L: ['Lofoten', 'Lucca', 'Lugano', 'Lisbon', 'Lombok'],
        M: ['Mallorca', 'Madeira', 'Maratua', 'Mentawai', 'Monaco'],
        N: ['Natuna', 'Naxos', 'Nettuno', 'Navarre', 'Nirvana'],
        O: ['Orkney', 'Oostende', 'Olympus', 'Oahu', 'Osaka'],
        P: ['Passau', 'Portofino', 'Positano', 'Prague', 'Palma'],
        Q: ['Quito', 'Quebec', 'Quimper', 'Qingdao', 'Queensland'],
        R: ['Rinjani', 'Ravenna', 'Rhodes', 'Ronda', 'Reykjavik'],
        S: ['Santorini', 'Sumba', 'Sintra', 'Stafford', 'Sedona'],
        T: ['Taormina', 'Telluride', 'Toraja', 'Toledo', 'Tuscany'],
        U: ['Ubud', 'Ushuaia', 'Uppsala', 'Umbria', 'Uluwatu'],
        V: ['Verona', 'Valletta', 'Venice', 'Valloire', 'Vesuvius'],
        W: ['Wattens', 'Wakatobi', 'Waikiki', 'Wellington', 'Wexford'],
        X: ['Xanadu', 'Xalapa', 'Xanthi', 'Xcaret', 'Xiamen'],
        Y: ['Yokohama', 'Yosemite', 'Yorkshire', 'Yucatan', 'Yarra'],
        Z: ['Zermatt', 'Zanzibar', 'Zurich', 'Zagreb', 'Zambezi'],
      };
      const seeds = prefixes[letterUpper] || [`${letterUpper}oria`];
      list = seeds.map((s, idx) => ({
        name: wordCount === 'double' ? `${s} Heritage` : s,
        wordCount: (wordCount === 'double' ? 2 : 1) as 1 | 2,
        category: 'geography' as NamingCategory,
        origin: `Geographical heritage location (${letterUpper})`,
        meaning: `Evocative place-based font name crafted for typographic specimen identity.`,
        ligatures: ['th', 'st', 'er']
      }));
    }
  }

  // 4. Filter by target ligature / double letter (if specified)
  if (targetLigature && targetLigature !== 'none') {
    const query = targetLigature.toLowerCase();
    const ligatureMatches = list.filter(item => item.name.toLowerCase().includes(query));
    if (ligatureMatches.length > 0) {
      list = ligatureMatches;
    } else {
      // Synthesize candidates with the target ligature if not enough in static list!
      list = list.map(item => {
        // e.g. add the ligature nicely if missing
        let newName = item.name;
        if (!newName.toLowerCase().includes(query)) {
          if (item.wordCount === 2) {
            const parts = item.name.split(' ');
            newName = `${parts[0]} ${query.toUpperCase()}${parts[1].slice(1)}`;
          } else {
            newName = `${item.name}${query}`;
          }
        }
        return {
          ...item,
          name: newName,
          ligatures: [...item.ligatures, query]
        };
      });
    }
  }

  // Convert to FontNameCandidate
  const candidates: FontNameCandidate[] = list.slice(0, requestedCount).map((loc, idx) => {
    const upper = loc.name.toUpperCase();
    const isTaken = KNOWN_FONT_CATALOG.has(upper);

    return {
      id: `candidate-${idx}-${Date.now()}`,
      name: loc.name,
      wordCount: loc.wordCount,
      origin: loc.origin,
      category: loc.category,
      matchedLigatures: detectLigatures(loc.name, targetLigature),
      meaning: loc.meaning,
      isKnownTaken: isTaken,
      knownFontNote: isTaken ? `Caution: "${upper}" is already an existing famous font name!` : undefined,
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
  const common = ['ss', 'tt', 'ff', 'fi', 'fl', 'll', 'oo', 'rr', 'st', 'ch', 'th', 'ee', 'mm', 'nn', 'pp'];
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
