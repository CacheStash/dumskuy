import { DesignEra, AssetType, Language, GeneratedSpecimen, EraMeta, AssetTypeMeta } from '../types';

export const ERA_METADATA: Record<DesignEra, EraMeta> = {
  'retro-americana': {
    id: 'retro-americana',
    label: 'Retro / Americana',
    period: '1950s – 1970s',
    description: 'Heritage garages, neon drive-ins, distressed chainstitch, and honest trade craftsmanship.',
    tagColor: 'amber',
    vibe: 'Raw denim, motor oil, rusty signs, gas station neon, Route 66',
    recommendedFont: 'Bebas Neue, sans-serif'
  },
  'modern-swiss': {
    id: 'modern-swiss',
    label: 'Modern / Swiss / Bauhaus',
    period: '1920s – 1960s',
    description: 'Rational grids, asymmetric balance, objective clarity, and sans-serif functional purity.',
    tagColor: 'sky',
    vibe: 'Josef Müller-Brockmann, Helvetica, functional minimalism, concrete architecture',
    recommendedFont: 'Space Grotesk, sans-serif'
  },
  'victorian-art-deco': {
    id: 'victorian-art-deco',
    label: 'Victorian & Art Deco',
    period: '1890s – 1930s',
    description: 'Gilded filigree, intricate flourishes, Chrysler spire symmetry, and grand emporiums.',
    tagColor: 'yellow',
    vibe: 'Gilded lettering, brass bevels, Gatsby speakeasy, ornamental apothecary',
    recommendedFont: 'Cinzel, serif'
  },
  'cyberpunk-y2k': {
    id: 'cyberpunk-y2k',
    label: 'Cyberpunk & Y2K',
    period: '1998 – 2077',
    description: 'High-tech low-life, chrome typography, liquid metals, sub-neural networks, and dark synth.',
    tagColor: 'fuchsia',
    vibe: 'Neo-Shinjuku rain, holographic wireframes, CRT scanlines, liquid chrome',
    recommendedFont: 'Syne, sans-serif'
  },
  'streetwear-brutalist': {
    id: 'streetwear-brutalist',
    label: 'Streetwear & Brutalist',
    period: 'Contemporary Underground',
    description: 'Raw exposed structural aesthetics, heavy industrial mono, hazard bars, and subversive energy.',
    tagColor: 'emerald',
    vibe: 'Berlin bunker techno, distressed concrete, tactical tape, heavy kerning',
    recommendedFont: 'Archivo Black, sans-serif'
  },
  'editorial-luxury': {
    id: 'editorial-luxury',
    label: 'Editorial & Luxury Romance',
    period: 'High Fashion & Fine Print',
    description: 'Dramatic high-contrast serif ligatures, delicate italic whispers, and Paris runway sophistication.',
    tagColor: 'rose',
    vibe: 'Italian silk, Vogue mastheads, high aperture perfume bottles, quiet luxury',
    recommendedFont: 'Playfair Display, serif'
  },
};

export const ASSET_TYPES: Record<AssetType, AssetTypeMeta> = {
  'logo-wordmark': {
    id: 'logo-wordmark',
    label: 'Logo / Wordmark',
    description: 'Main brandmark headline and descriptor/sub-tagline for core identity.',
    iconName: 'Sparkles',
    sampleElements: ['Brand Name', 'Industry Descriptor', 'Tagline', 'Established Year']
  },
  'badge-emblem': {
    id: 'badge-emblem',
    label: 'Badge & Emblem',
    description: 'Circular/shield lockups: arch headers, established year, motto, and provenance.',
    iconName: 'Shield',
    sampleElements: ['Arch Header', 'Main Motif Text', 'Ribbon Slogan', 'Origin Location', 'Year']
  },
  'packaging-label': {
    id: 'packaging-label',
    label: 'Packaging & Label',
    description: 'Retail & boutique labels: volume weight, craft notes, batch number, and ingredients.',
    iconName: 'Package',
    sampleElements: ['Brand Title', 'Product Variant', 'Volume / Mass', 'Craft Notes', 'Origin & Lot #']
  },
  'signboard-storefront': {
    id: 'signboard-storefront',
    label: 'Signboard & Storefront',
    description: 'Fascia lettering, artisan specialty, opening hours, and street address lockups.',
    iconName: 'Store',
    sampleElements: ['Store Banner', 'Artisan Trade', 'Hours Callout', 'District / Street Address']
  },
  'editorial-poster': {
    id: 'editorial-poster',
    label: 'Editorial & Poster',
    description: 'Exhibition headline, poetic/critical blurb, curatorial credits, and spec metadata.',
    iconName: 'FileText',
    sampleElements: ['Hero Title', 'Editorial Deck', 'Narrative Body', 'Exhibition Meta', 'Colophon']
  }
};

export const OFFLINE_DATASET: Record<Language, Record<DesignEra, Record<AssetType, GeneratedSpecimen[]>>> = {
  en: {
    'retro-americana': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'BRIMSTONE & SONS',
          sub_headline: 'AUTHENTIC HEAVYWEIGHT WORKWEAR',
          tagline: 'Guaranteed Tough Since The Dust Bowl',
          supporting_details: ['UNION MADE', 'SANFORIZED DENIM', 'DETROIT, MICH.'],
          body_copy: 'Forged in the industrial heat of the Rust Belt. Hand-stitched triple needles on 16oz selvage cotton built to survive generation after generation.',
          source: 'preset'
        },
        {
          category: 'Logo / Wordmark',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'REDLINE MOTOR CO.',
          sub_headline: 'SPEED EQUIPMENT & CUSTOM TUNING',
          tagline: 'Built For The Quarter Mile And The Open Highway',
          supporting_details: ['HORSEPOWER PURVEYORS', 'EST. 1968', 'BAKERSFIELD, CA'],
          body_copy: 'Specializing in dual-carburetor setups, forged pistons, and thunderous straight exhaust pipes for champions of the blacktop.',
          source: 'preset'
        },
        {
          category: 'Logo / Wordmark',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'ARROWHEAD TIMBER CO.',
          sub_headline: 'PACIFIC NORTHWEST FORESTERS',
          tagline: 'Old-Growth Tradition, Modern Stewardship',
          supporting_details: ['CASCADE RANGE', 'EST. 1954', 'TIMBER COUNTRY'],
          body_copy: 'Harvesting Douglas fir and western red cedar with honest sweat, crosscut saws, and unwavering Pacific grit.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'BLACK BEAR ROASTERY',
          sub_headline: 'CAST IRON DRUM ROASTED',
          tagline: 'Strong Enough To Wake The Forest',
          supporting_details: ['EST. 1962', 'BATCH NO. 48', 'BLUE RIDGE MTNS', 'PURE COFFEE GOLD'],
          body_copy: 'Slow-roasted over hickory embers in small batches. Deep notes of smoked molasses, toasted pecan, and mountain dew morning air.',
          source: 'preset'
        },
        {
          category: 'Badge & Emblem',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'COPPERHEAD SPEED SHOP',
          sub_headline: 'SPEED CAPITAL OF THE MIDWEST',
          tagline: 'Where Velocity Meets Heavy Metal Iron',
          supporting_details: ['EST. 1959', 'SUPERCHARGED', 'INDIANAPOLIS, IND.', 'V8 PROVEN'],
          body_copy: 'Cylinder heads ported by hand and verified on the dyno until the oil boils and the needle redlines.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'GOLDEN HARVEST RYE',
          sub_headline: 'BARREL-PROOF STRAIGHT WHISKEY',
          tagline: 'Charred American White Oak Casks',
          supporting_details: ['100 PROOF / 50% ALC. VOL.', '750 ML', 'AGED 8 LONG YEARS', 'KENTUCKY VALLEY DISTILLERS'],
          body_copy: 'Distilled using sweet limestone spring water and pot-still grains. Unfiltered, bold, and unapologetically rich with spicy cinnamon finish.',
          source: 'preset'
        },
        {
          category: 'Packaging & Label',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'IRON HORSE POMADE',
          sub_headline: 'HEAVY HOLD OIL-BASED FORMULA',
          tagline: 'For Classic Slickbacks & High Pompadours',
          supporting_details: ['NET WT. 4.0 OZ (113G)', 'TOBACCO & VANILLA SCENT', 'WATER RESISTANT', 'CHICAGO, IL'],
          body_copy: 'Tames unruly cowlicks and keeps contours razor-sharp through rain, grease, and high-speed wind.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'LUCKY STAR DINER',
          sub_headline: 'HOMEMADE CHERRY PIE & HOT COFFEE',
          tagline: 'Always Open For Wandering Souls',
          supporting_details: ['24 HOURS DAILY', 'AIR CONDITIONED', 'ROUTE 66 MILEPOST 402', 'BOOTHS AVAILABLE'],
          body_copy: 'Fresh butter biscuits rolling out at 5 AM. Neon humming outside, warm bottomless cups inside.',
          source: 'preset'
        },
        {
          category: 'Signboard & Storefront',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'BILLY’S BOOT EMPORIUM',
          sub_headline: 'COWBOY RIGS & WORKWEAR COBBLER',
          tagline: 'Resoled While You Wait',
          supporting_details: ['OPEN MON-SAT 8AM - 6PM', 'CORNER OF 4TH & MAIN', 'AUSTIN, TEXAS'],
          body_copy: 'Hand-pegged soles, saddle soap treatments, and Goodyear welting by certified guild craftsmen.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Retro Americana (1950s-1970s)',
          headline: 'THE LAST HIGHWAY RUN',
          sub_headline: 'AN ODYSSEY THROUGH THE MOJAVE SUNSET',
          tagline: 'Two Lane Blacktop, 400 Horses, Zero Regrets',
          supporting_details: ['RECORDED ON KODACHROME 64', 'CHAPTER VII: THE CRACKED ASPHALT', 'CALIFORNIA-NEVADA LINE', 'VOL. 14'],
          body_copy: 'The heat shimmer rises off the desert flats like ghosts of forgotten roadsters. When the sun dips behind the Joshua trees, the only sound left is the tick of cooling cast-iron headers and the whistling evening wind.',
          source: 'preset'
        }
      ]
    },
    'modern-swiss': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Modern Swiss / Bauhaus (1920s-1960s)',
          headline: 'FORMA ARCHITEKTUR',
          sub_headline: 'MODULAR STRUCTURAL SYSTEMS',
          tagline: 'Structure Determines Aesthetics',
          supporting_details: ['ZÜRICH / BASEL', 'EST. 1957', 'ISO 9001 COMPLIANT'],
          body_copy: 'Rational spatial design driven by rigorous mathematical proportional systems and pure tectonic honesty.',
          source: 'preset'
        },
        {
          category: 'Logo / Wordmark',
          style: 'Modern Swiss / Bauhaus (1920s-1960s)',
          headline: 'NEUE TYPOGRAFIE',
          sub_headline: 'INSTITUTE FOR VISUAL COMMUNICATION',
          tagline: 'Objective Clarity in Universal Form',
          supporting_details: ['WERKBUND DIVISION', 'HELVETIA', 'SERIES 08'],
          body_copy: 'Stripping decoration to unveil pure message legibility through asymmetric grid architecture.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Modern Swiss / Bauhaus (1920s-1960s)',
          headline: 'KINETIK WERKSTATT',
          sub_headline: 'PRECISION HOROLOGY & CHRONOMETRY',
          tagline: 'Form Follows Function Strictly',
          supporting_details: ['GENEVA OBSERVATORY', 'CALIBRE 401', 'SWISS CHRONOMETER', 'ZERO TOLERANCE'],
          body_copy: 'Engineered with calibrated beryllium balances and antimagnetic escapements to deliver sub-millisecond fidelity.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Modern Swiss / Bauhaus (1920s-1960s)',
          headline: 'SYSTEM NO. 04 PURE TONER',
          sub_headline: 'MINIMAL RESIDUE MONOCHROME EMULSION',
          tagline: 'Formulated For Optical Density Standard DIN 16536',
          supporting_details: ['NET 500 ML / 17.6 FL OZ', 'SPECTRAL ABSORPTION: 99.8%', 'BATCH S-2024', 'MADE IN SWITZERLAND'],
          body_copy: 'A high-purity colloidal suspension engineered for uncompromising line edge acutance across photographic plates and offset substrates.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Modern Swiss / Bauhaus (1920s-1960s)',
          headline: 'KUNSTHALLE PAVILION',
          sub_headline: 'CONTEMPORARY INDUSTRIAL ARCHIVE',
          tagline: 'Open To Public Discourse & Design Inquiry',
          supporting_details: ['HOURS: 10:00 - 18:00', 'LIMMATSTRASSE 270', 'CH-8005 ZÜRICH', 'SECTOR B'],
          body_copy: 'Exhibitions rotate bi-monthly focusing on post-war concrete constructs and generative typography matrices.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Modern Swiss / Bauhaus (1920s-1960s)',
          headline: 'GRID SYSTEM & ASYMMETRY',
          sub_headline: 'THE MATHEMATICS OF RATIONAL COMPOSITION',
          tagline: 'An Exposition of Columnar Discipline and Typographic Order',
          supporting_details: ['KUNSTMUSEUM BASEL', 'SEPTEMBER 14 – NOVEMBER 30', 'CURATED BY M. BROCKMANN', 'CATALOGUE NO. 88'],
          body_copy: 'The visual surface is divided into modular increments of 12 units. By disciplining whitespace into deliberate negative tension, communication transcends linguistic borders and arrives at total structural clarity.',
          source: 'preset'
        }
      ]
    },
    'victorian-art-deco': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Victorian & Art Deco (1890s-1930s)',
          headline: 'THE GRAND METROPOLITAN',
          sub_headline: 'HOTEL & GILDED CASINO',
          tagline: 'Splendour Unsurpassed Across The Continent',
          supporting_details: ['ESTD. 1928', 'PARIS — NEW YORK', 'BY APPOINTMENT ONLY'],
          body_copy: 'Where brass spires pierce the nocturnal clouds and jazz orchestras reverberate across marble ballrooms.',
          source: 'preset'
        },
        {
          category: 'Logo / Wordmark',
          style: 'Victorian & Art Deco (1890s-1930s)',
          headline: 'BLACKWOOD & STERLING',
          sub_headline: 'PURVEYORS OF RARE APOTHECARY',
          tagline: 'Distilled Botanical Elixirs & Fine Panaceas',
          supporting_details: ['LONDON COVENT GARDEN', 'REG. NO. 4410', 'PATENT APPLIED FOR'],
          body_copy: 'Hand-harvested nightshade roots and cold-pressed bergamot essences blended according to 19th-century royal pharmacopeia.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Victorian & Art Deco (1890s-1930s)',
          headline: 'CHRYSLER TOWER FELLOWSHIP',
          sub_headline: 'CHRONOMETERS & RADIANT STEEL',
          tagline: 'Perfection Crowned In Sunburst Chevron',
          supporting_details: ['ANNO DOMINI 1930', 'MANHATTAN SKYLINE', 'FIRST CLASS ORDER', 'SEAL OF EXCELLENCE'],
          body_copy: 'Commemorating the triumph of geometric ornament, terraced ziggurats, and chrome gargoyles over mundane architecture.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Victorian & Art Deco (1890s-1930s)',
          headline: 'NOCTURNE VELVET ABSINTHE',
          sub_headline: 'ARTEMISIA ABSINTHIUM VAPOUR INFUSION',
          tagline: 'The Green Fairy Awaits The Silver Spoon',
          supporting_details: ['68% VOL. / 136 PROOF', '50 CL DECANTER', 'PONTARLIER DISTILLERY', 'GOLD MEDAL 1900'],
          body_copy: 'Infused with alpine wormwood, green anise seed, and Florentine fennel. Clouding to an opalescent emerald louche with cold iced water.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Victorian & Art Deco (1890s-1930s)',
          headline: 'HARRINGTON’S VELVET PARLOUR',
          sub_headline: 'BESPOKE TAILORING & SILK WAISTCOATS',
          tagline: 'Gentlemen & Ladies of Distinction Attended Daily',
          supporting_details: ['SAVILE ROW NO. 14', 'HOURS 9 TIL DUSK', 'LONDON W1', 'APPOINTMENTS WELCOMED'],
          body_copy: 'Featuring imported Italian worsted wools, mother-of-pearl buttons, and hand-basted canvas lapels.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Victorian & Art Deco (1890s-1930s)',
          headline: 'THE ROARING CENTURY',
          sub_headline: 'A CELEBRATION OF MACHINE AGE RADIANCE',
          tagline: 'From The Paris Exposition of 1925 To The Spire of Manhattan',
          supporting_details: ['BALLROOM OF THE WALDORF', 'SATURDAY MIDNIGHT SOIRÉE', 'ADMISSION BY GOLD TICKET', 'DRESS CODE: BLACK TIE'],
          body_copy: 'The mechanical age has unleashed a furious rhythm of syncopated brass and neon luminescence. Step into the stepped silhouettes where diamonds glitter beneath indirect amber sconces and the future arrives in silver flutes of champagne.',
          source: 'preset'
        }
      ]
    },
    'cyberpunk-y2k': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Cyberpunk & Y2K (1998-2077)',
          headline: 'NEO-KINETIX // 00',
          sub_headline: 'NEURAL AUGMENTATION PROTOCOL',
          tagline: 'Synaptic Bandwidth Beyond Biological Limits',
          supporting_details: ['SYS_ID: 808-TX', 'CHROME COATED', 'NEO-SHINJUKU SECTOR 4'],
          body_copy: 'Overclocked sensory co-processors offering direct cerebral link to orbital data streams with zero latency degradation.',
          source: 'preset'
        },
        {
          category: 'Logo / Wordmark',
          style: 'Cyberpunk & Y2K (1998-2077)',
          headline: 'CYBERPULSE MATRIX',
          sub_headline: 'ACID SYNTH AUDIO EXPERIMENTAL',
          tagline: 'Rave Culture In Liquid Mercury',
          supporting_details: ['RELEASE 2000.4', '160 BPM DNB', 'SUB-BASS OVERDRIVE'],
          body_copy: 'Holographic jewel-case mastering, iridescent foil pressings, and jagged hyper-curved display ligatures.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Cyberpunk & Y2K (1998-2077)',
          headline: 'KOWLOON GRID DISPATCH',
          sub_headline: 'UNLICENSED SUBNET RUNNERS',
          tagline: 'Data Wants To Be Free // Encryption Broken',
          supporting_details: ['NODE 0x9F', 'PORT 8080', 'EST. 2099', 'SIGNAL STRENGTH: 99.4%'],
          body_copy: 'Operating underneath the monsoon rain and surveillance towers. Black market fiber bundles spliced into orbital communication arrays.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Cyberpunk & Y2K (1998-2077)',
          headline: 'NANO-STIM ENERGY AMPULE',
          sub_headline: 'ELECTROLYTE NOOTROPIC DRINK',
          tagline: '12 Hours Sustained Reflex Velocity',
          supporting_details: ['VOL: 250 ML / 8.4 FL OZ', 'CAFFEINE: 300 MG', 'LOT: CYBER-99', 'CAUTION: SYNAPSE ACCELERATOR'],
          body_copy: 'Formulated with taurine crystals, synthetic ginseng, and glowing blue bioluminescent algae for night-shift netrunners and mech pilots.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Cyberpunk & Y2K (1998-2077)',
          headline: 'GHOST SHELL CYBERNETICS',
          sub_headline: 'HARDWARE DECKS & OCULAR REPAIR',
          tagline: 'Fast Firmware Flashes While You Wait',
          supporting_details: ['OPEN 22:00 - 06:00', 'ALLEY 9 LOWER LEVEL', 'CASH OR CRYPTO ONLY', 'SECTOR 07'],
          body_copy: 'Solder fumes mingle with lukewarm street noodles. Military-grade limb actuators calibrated with counterfeit telemetry diagnostics.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Cyberpunk & Y2K (1998-2077)',
          headline: 'NEURAL COLLAPSE // PROTOCOL X',
          sub_headline: 'THE DECONSTRUCTION OF DIGITAL SENTIENCE',
          tagline: 'Where Biological Memory Dissolves Into Phosphor Ghosting',
          supporting_details: ['MEGACITY 01 SUB-BASEMENT', 'BROADCAST FREQUENCY 144.2 MHZ', 'CURATOR: VECTOR_NULL', 'ARCHIVE 2049'],
          body_copy: 'We plugged the cerebral optic cable into the mainframe when the sirens started howling above the skyways. The screen tore into jagged green scanlines, spilling gigabytes of forbidden telemetry into the wet asphalt.',
          source: 'preset'
        }
      ]
    },
    'streetwear-brutalist': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Streetwear & Brutalist',
          headline: 'DESTRUCTION PROTOCOL',
          sub_headline: 'HEAVY INDUSTRIAL TEXTILES',
          tagline: 'Manufactured In Conflict Zones',
          supporting_details: ['HEAVY COTTON 450 GSM', 'BERLIN — SEOUL', 'DROP 003'],
          body_copy: 'Drop-shoulder silhouettes cut from deadstock canvas with exposed overlock stitching and industrial buckle hardware.',
          source: 'preset'
        },
        {
          category: 'Logo / Wordmark',
          style: 'Streetwear & Brutalist',
          headline: 'VOID SYSTEM CORP',
          sub_headline: 'TACTICAL APPAREL & GEAR',
          tagline: 'Designed For Concrete Environments',
          supporting_details: ['SPEC NO. 881-A', 'WATERPROOF MEMBRANE', 'LIMITED RUN OF 100'],
          body_copy: 'Modular Molle webbing, heat-sealed seams, and brutalist geometric screenprints inspired by defensive bunkers.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Streetwear & Brutalist',
          headline: 'UNDERGROUND COMBAT CLUB',
          sub_headline: 'NO WEAPONS // NO MERCY',
          tagline: 'Born In Basement Concrete',
          supporting_details: ['HEAVYWEIGHT CLASS', 'DIVISION 09', 'NON-COMMERCIAL', 'RESISTANCE REGISTERED'],
          body_copy: 'Sanctioned only by the thud of heavy punching bags and the reverberation of hardcore techno basslines at 4 AM.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Streetwear & Brutalist',
          headline: 'TACTICAL UTILITY SPRAY 90',
          sub_headline: 'MATTE BLACK POLYMER SEALANT',
          tagline: 'Weatherproof Coating For Extreme Exposure',
          supporting_details: ['CAN: 400 ML NET', 'FAST-DRY RESIN', 'WARNING: HIGH FLAMMABILITY', 'SERIAL 0984-Z'],
          body_copy: 'Adheres to raw concrete, aluminum siding, and ballistic nylon. Resists industrial acid rain, abrasion, and salt spray.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Streetwear & Brutalist',
          headline: 'BUNKER 14 RECORDS & GEAR',
          sub_headline: 'VINYL PRESSINGS // INDUSTRIAL WORKWEAR',
          tagline: 'Entry Through The Loading Dock Gate',
          supporting_details: ['FRI-SUN ONLY 23:00-LATE', 'KREUZBERG INDUSTRIAL PARK', 'NO PHOTOGRAPHY ALLOWED'],
          body_copy: 'Raw corrugated iron doors, red warning beacon rotating slowly above the threshold. Strictly underground sound systems.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Streetwear & Brutalist',
          headline: 'BRUTALIST MONUMENTALITY',
          sub_headline: 'ANATOMY OF RAW REINFORCED CONCRETE',
          tagline: 'Unvarnished Architecture For Uncompromising Humanity',
          supporting_details: ['SERIES NO. 09', 'CURATED BY RAW_STUDIO', 'EXHIBITION AT SINKWERK', 'EDITION OF 50'],
          body_copy: 'Forms cast in rough board-marked timber shuttering. No stucco, no paint, no apologies. The weight of monolithic concrete pressing down upon the earth, defying transient decorative whims.',
          source: 'preset'
        }
      ]
    },
    'editorial-luxury': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Editorial & Luxury Romance',
          headline: 'MAISON D’ORLÉANS',
          sub_headline: 'HAUTE PARFUMERIE & SOIE',
          tagline: 'The Whisper of French Nobility',
          supporting_details: ['PARIS — PLACE VENDÔME', 'FONDATEUR 1892', 'EXCLUSIVE EDITION'],
          body_copy: 'Hand-blown crystal flacons filled with Bulgarian Damascus rose essences and aged Madagascar bourbon vanilla.',
          source: 'preset'
        },
        {
          category: 'Logo / Wordmark',
          style: 'Editorial & Luxury Romance',
          headline: 'VALENTINA SERAPHINE',
          sub_headline: 'FINE JEWELLERY & SOLITAIRES',
          tagline: 'Diamonds Cut For The Stars',
          supporting_details: ['VIA CONDOTTI ROMA', 'PLATINUM 950', 'ESTABLISHED 1912'],
          body_copy: 'Artisanal micro-pave gem setting and hand-carved platinum prongs illuminating untreated Colombian emeralds.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Editorial & Luxury Romance',
          headline: 'CHÂTEAU DE L’ÉTOILE',
          sub_headline: 'GRAND CRU CLASSÉ CHAMPAGNE',
          tagline: 'Harvested Under The Autumn Moon',
          supporting_details: ['VINTAGE 2012', 'MÉTHODE TRADITIONNELLE', 'REIMS, FRANCE', 'APPELLATION CONTRÔLÉE'],
          body_copy: 'Aged twelve years in chalk cellars sixty feet subterranean. Golden reflections of brioche, white truffle, and crisp green pear.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Editorial & Luxury Romance',
          headline: 'SÉRUM EXTRAORDINAIRE',
          sub_headline: 'NOCTURNAL BOTANICAL ELIXIR',
          tagline: 'Infused With 24-Karat Gold Leaf & Rare Orchid',
          supporting_details: ['FLACON 50 ML / 1.7 FL OZ', 'DERMATOLOGICALLY TESTED', 'MADE IN MONACO', 'LOT D’OR 01'],
          body_copy: 'A silky bio-fermented emulsion designed to replenish cellular luminosity and preserve youthfulness across the skin barrier.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Editorial & Luxury Romance',
          headline: 'ATELIER BOTANICA',
          sub_headline: 'FLORAL ARCHITECTURE & RARE CAMELLIAS',
          tagline: 'Private Consultations For Grand Weddings',
          supporting_details: ['OPEN BY SALON RENDEZ-VOUS', 'RUE DU FAUBOURG SAINT-HONORÉ', 'PARIS VIII'],
          body_copy: 'Gilded mirrors framing fragrant cascades of white gardenias, Dutch peonies, and preserved velvet mosses.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Editorial & Luxury Romance',
          headline: 'LES HEURES PERDUES',
          sub_headline: 'AN AUTUMN RETROSPECTIVE ON VELVET & SILENCE',
          tagline: 'In The Dimly Lit Salons of Saint-Germain-des-Prés',
          supporting_details: ['VOGUE ARCHIVES ISSUE NO. 142', 'PHOTOGRAPHED BY HENRI LECLERC', 'MONOCHROME PRINT ON COTTON RAG', 'PARIS 1964'],
          body_copy: 'She sat by the tall casement window overlooking the Seine as the rain painted grey strokes against the slate mansard roofs. A silk scarf tied loosely around her neck, a solitary fountain pen poised above deckle-edged correspondence paper.',
          source: 'preset'
        }
      ]
    }
  },
  id: {
    'retro-americana': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Retro Americana / Vintage Lokal',
          headline: 'BENGKEL KENCANA DIESEL',
          sub_headline: 'SPESIALIS MESIN DIESEL & TANGKI BAJA',
          tagline: 'Bandel, Teruji Melibas Jalur Pantura',
          supporting_details: ['BERDIRI 1974', 'SUKU CADANG ASLI', 'SEMARANG, JAWA TENGAH'],
          body_copy: 'Dibangun dari keringat mekanik legendaris. Melayani turun mesin truk berat, bubut as silinder, dan kalibrasi pompa injeksi sejak era bensin super.',
          source: 'preset'
        },
        {
          category: 'Logo / Wordmark',
          style: 'Retro Americana / Vintage Lokal',
          headline: 'RADJA TEMBAKAU SOERABAJA',
          sub_headline: 'TEMBAKAU RAJANG TRADISIONAL & KROPENG',
          tagline: 'Wangi Mantap, Tarikan Halus Khas Priyayi',
          supporting_details: ['CAP BURUNG WALET', 'EST. 1958', 'PASAR ATOM SOERABAJA'],
          body_copy: 'Racikan tembakau srintil pilihan berpadu dengan cengkeh rajangan halus kebun lereng Gunung Slamet.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Retro Americana / Vintage Lokal',
          headline: 'KOPI TUBRUK TJAP BADAK',
          sub_headline: 'SANGRAI TEMBIKAR ARANG KAYU ASLI',
          tagline: 'Hitam Pekat, Manis Pas, Semangat Pantang Kendor',
          supporting_details: ['SEJAK 1965', 'BIJI ROBUSTA PILIHAN', 'KOTAGEDE JOGJAKARTA', 'MUTU TERDJAMIN'],
          body_copy: 'Kopi warisan kakek moyang, disangrai menggunakan wajan tanah liat berbahan bakar arang kayu asam. Menghasilkan aroma sangit harum yang menempel di lidah.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Retro Americana / Vintage Lokal',
          headline: 'MINYAK GOSOK TONGKAT SAKTI',
          sub_headline: 'RAMUAN AKAR PINANG & REMPAH RIMBA',
          tagline: 'Pereda Pegal Linu & Masuk Angin',
          supporting_details: ['NETTO: 100 ML', 'IJIN DEP-KES RI NO. 8412', 'PABRIK JAMU WONOGIRI', 'KOCOK DAHULU'],
          body_copy: 'Hangatnya meresap sampai ke tulang sumsum. Diracik dari minyak sereh wangi, gandapura murni, dan jahe merah lereng Gunung Lawu.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Retro Americana / Vintage Lokal',
          headline: 'TOKO KELONTONG REJEKI ABADI',
          sub_headline: 'SEDIA BERAS CIANJUR, MINYAK GORENG & KAIN MORI',
          tagline: 'Timbangan Pas, Harga Saudara, Selalu Murah Senyum',
          supporting_details: ['BUKA JAM 06.00 - 21.00', 'JL. PECHINAN NO. 45', 'KUDUS KULON', 'TERIMA BON LANGGANAN'],
          body_copy: 'Koleksi toples kaca jadul berisi kembang gula permen jahe, sabun batangan cuci cap tangan, dan rokok lintingan.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Retro Americana / Vintage Lokal',
          headline: 'LEGENDA JALUR LINTAS SUMATRA',
          sub_headline: 'CATATAN PERJALANAN BUS MALAM 1978',
          tagline: 'Ribuan Kilometer Membelah Liuk Tanjakan Sedayu',
          supporting_details: ['FOTO DOKUMENTASI KLASIK', 'BAB III: RAUNGAN SASIS MERCEDES', 'TERMINAL MEDAN', 'EDISI KOLEKTOR'],
          body_copy: 'Lampu kuning halogen menembus pekatnya kabut hutan Bukit Barisan. Di balik kemudi kayu kemuning yang licin, sopir legendaris mengoper gigi rendah dengan desisan rem angin yang tegas.',
          source: 'preset'
        }
      ]
    },
    'modern-swiss': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Modern Swiss / Bauhaus',
          headline: 'RUANG METRIKA STUDIO',
          sub_headline: 'KONSULTAN ARSITEKTUR & TIPOGRAFI',
          tagline: 'Fungsi Menentukan Wujud visual',
          supporting_details: ['JAKARTA / BANDUNG', 'EST. 2018', 'STANDAR MODUL GRID'],
          body_copy: 'Perancangan ruang dan identitas visual berbasis rasionalisme geometri murni tanpa ornamen berlebih.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Modern Swiss / Bauhaus',
          headline: 'KRONO PRESISI NUSANTARA',
          sub_headline: 'LABORATORIUM KALIBRASI AKUSTIK',
          tagline: 'Akurasi Tanpa Kompromi',
          supporting_details: ['SERTIFIKAT KAN', 'BANDUNG TECH PARK', 'STANDAR DIN EN ISO', 'SERI PROTOTIPE'],
          body_copy: 'Peralatan pengukur presisi tinggi untuk rekayasa material komposit dan resonansi frekuensi.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Modern Swiss / Bauhaus',
          headline: 'PIGMEN HITAM MURNI 01',
          sub_headline: 'TINTA SABLON BERBASIS AIR',
          tagline: 'Daya Rekat Tinggi Pada Serat Alami',
          supporting_details: ['ISI BERSIH: 1000 GRAM', 'VISKOSITAS TINGGI', 'FORMULA TANPA PELARUT', 'KODE BATCH: BND-88'],
          body_copy: 'Diformulasikan untuk menghasilkan sapuan garis tajam berdensitas optik maksimal pada kain linen dan katun.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Modern Swiss / Bauhaus',
          headline: 'GALERI DESAIN MODULAR',
          sub_headline: 'ARSIP TIPOGRAFI & PERCETAKAN CETAK TINGGI',
          tagline: 'Buka Untuk Diskusi & Riset Visual',
          supporting_details: ['SELASA - MINGGU 10:00 - 19:00', 'JL. DIPATIUKUR NO. 24', 'BANDUNG', 'RUANG PAMER 02'],
          body_copy: 'Menampilkan koleksi buku tata letak Swiss modernis tahun 1950 hingga 1980 beserta prototipe mebel fungsional.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Modern Swiss / Bauhaus',
          headline: 'DISIPLIN TATA LETAK GRID',
          sub_headline: 'SIMPOSIUM STRUKTUR KOMUNIKASI VISUAL',
          tagline: 'Membedah Ruang Negatif dan Hierarki Teks',
          supporting_details: ['INSTITUT TEKNOLOGI BANDUNG', '12 - 15 OKTOBER', 'PEMBICARA UTAMA: S. HIDAYAT', 'KATALOG SERI 04'],
          body_copy: 'Sebuah poster bukan sekadar wadah gambar dekoratif, melainkan susunan matematis yang memandu mata pembaca secara efisien dan objektif dari pesan terpenting hingga rincian teknis.',
          source: 'preset'
        }
      ]
    },
    'victorian-art-deco': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Victorian & Art Deco',
          headline: 'MAHKOTA PURNAMA',
          sub_headline: 'PABRIK EMAS & INTAN BERLIAN KEDATON',
          tagline: 'Kemilau Abadi Peninggalan Bangsawan',
          supporting_details: ['DIRIDHOI SEJAK 1922', 'EMAS KADAR 24 KARAT', 'SURAKARTA HADININGRAT'],
          body_copy: 'Ukiran tatah emas buatan pandai perhiasan keraton dengan detail ornamen lung-lungan bermotif kembang melati.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Victorian & Art Deco',
          headline: 'HOTEL DES INDES BATAVIA',
          sub_headline: 'SALON DANAU MARMER & DANDANAN MEWAH',
          tagline: 'Pelesir Agung Tuan dan Nyonya Terhormat',
          supporting_details: ['ANNO 1908', 'BATAVIA CENTRUM', 'CAP RESMI BINTANG LIMA', 'PELAYANAN KELAS SATU'],
          body_copy: 'Gedung megah berdinding pualam putih dengan lampu kristal gantung Bohemia yang bersinar anggun di malam dansa.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Victorian & Art Deco',
          headline: 'MINYAK WANGI MELATI KRATON',
          sub_headline: 'SULINGAN BUNGA SEDAP MALAM & CENDANA WANGI',
          tagline: 'Semerbak Harum Semalam Suntuk',
          supporting_details: ['BOTOL KRISTAL 60 ML', 'KUALITAS EKSPOR EROPA', 'PENYULINGAN BLITAR', 'MEDALI EMAS 1935'],
          body_copy: 'Diekstrak dengan metode enfleurage tradisional dingin tanpa alkohol untuk mempertahankan aroma sakral melati segar.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Victorian & Art Deco',
          headline: 'TOKO ARRIWANG KACA PATRI',
          sub_headline: 'SENI KACA TIMAH & UKIR KAYU JATI JEPARA',
          tagline: 'Hiasan Mewah Untuk Rumah Agrowisata & Villa',
          supporting_details: ['BUKA JAM 09.00 - 17.00', 'BRAGA WEG NO. 18', 'BANDOENG', 'PESANAN KHUSUS'],
          body_copy: 'Pengrajin kaca patri geometris motif Art Deco dipadu ragam hias flora tropis warisan kolonial.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Victorian & Art Deco',
          headline: 'MALAM GALA PARIJS VAN JAVA',
          sub_headline: 'PERAYAAN KEMEWAHAN SENI DEKORATIF BATAVIA',
          tagline: 'Ketika Musik Jazz Berpadu Ayunan Kain Batik Sutra',
          supporting_details: ['SOCIETEIT CONCORDIA', 'SABTU MALAM BULAN PURNAMA', 'UNDANGAN RESMI BERSEGEL', 'TAHUN 1931'],
          body_copy: 'Lampu-lampu sorot bergaya ziggurat menyinari pilar-pilar granit tinggi. Alunan piano dan terompet mengalun lembut mengiringi langkah para tamu berkemeja tuksedo rapi dan gaun beludru berenda emas.',
          source: 'preset'
        }
      ]
    },
    'cyberpunk-y2k': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Cyberpunk & Y2K',
          headline: 'CYBER-NUSANTARA 2099',
          sub_headline: 'JARINGAN IMPLAN NEURAL BAWAH TANAH',
          tagline: 'Koneksi Langsung Tanpa Sensor Satelit',
          supporting_details: ['SEKTOR GLODOK 4', 'ENKRIPSI KUANTUM', 'FIRMWARE V.2.0'],
          body_copy: 'Modul akselerator sinaps otak hasil oprekan teknisi lorong Glodok dengan pendingin nitrogen cair mandiri.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Cyberpunk & Y2K',
          headline: 'HACKER SQUADRON KOTA TUA',
          sub_headline: 'OPERASI KABEL OPTIK BAWAH AIR',
          tagline: 'Meretas Frekuensi, Menembus Firewall',
          supporting_details: ['NODE 021-ID', 'PROTOKOL Y2K', 'SINYAL 100%', 'TIDAK TERLACAK'],
          body_copy: 'Markas rahasia di bekas gudang rempah berkarat dengan jajaran monitor CRT berkilau hijau neon di bawah rintik hujan asam.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Cyberpunk & Y2K',
          headline: 'MINUMAN ISOTONIK ELEKTRO-VOLT',
          sub_headline: 'STIMULAN REFLEKS CEPAT GAME & KODING',
          tagline: 'Fokus Tajam 10 Jam Tanpa Henti',
          supporting_details: ['VOLUME: 330 ML', 'TAURIN SINTETIK 500 MG', 'BATCH CYBER-GLODOK', 'BEBAS GULA'],
          body_copy: 'Cairan berpendar biru elektrik diperkaya elektrolit mineral nano untuk pilot drone dan operator data malam hari.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Cyberpunk & Y2K',
          headline: 'KLINIK SIBER MEKAR JAYA',
          sub_headline: 'GANTI LAYAR RETINA & SERVIS TANGAN MEKANIK',
          tagline: 'Cepat, Bergaransi, Terima Tukar Tambah Komponen',
          supporting_details: ['BUKA MALAM 21.00 - SUBUH', 'LORONG ELEKTRONIK BASEMENT 2', 'HANYA KURS DIGITAL'],
          body_copy: 'Bau asap timah solder berbaur aroma sate pinggir jalan di bawah guyuran lampu LED holografis neon pink.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Cyberpunk & Y2K',
          headline: 'KORUPSI SINYAL DIGITAL MEGACITY',
          sub_headline: 'MANIFESTO GENERASI SIBER PASCA KIAMAT SERVER',
          tagline: 'Ketika Memori Manusia Tercecer Dalam Hard Disk Rusak',
          supporting_details: ['PANCORAN SKYWAY SECTOR 7', 'FREKUENSI GELOMBANG 99.8 FM', 'ARSIP BAWAH TANAH', 'TAHUN 2088'],
          body_copy: 'Hujan gerimis membasahi kabel-kabel hitam tebal yang menjuntai di antara pencakar langit beton. Layar raksasa yang retak menampilkan running text peringatan darurat yang terus berkedip tanpa henti.',
          source: 'preset'
        }
      ]
    },
    'streetwear-brutalist': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Streetwear & Brutalist',
          headline: 'BETON HITAM REBEL',
          sub_headline: 'PAKAIAN BERAT SUBVERSIF IBUKOTA',
          tagline: 'Keras Seperti Cor Gedung Mangkrak',
          supporting_details: ['KATUN 400 GSM BERAT', 'SABLON DISCHARGE MATTE', 'DROP TERBATAS'],
          body_copy: 'Potongan kotak oversized tanpa kompromi, jahitan rantai kasar, dan sablon tebal bertema protes urban.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Streetwear & Brutalist',
          headline: 'PERSATUAN SKATEBOARD TROTOAR',
          sub_headline: 'MEREBUT KEMBALI RUANG PUBLIK ASPAL',
          tagline: 'Lecet Lutut, Patah Papan, Terus Meluncur',
          supporting_details: ['KOMUNITAS MANDIRI', 'KOTA METROPOLITAN', 'SEJAK 2012', 'SOLIDARITAS'],
          body_copy: 'Tumbuh dari suara decit roda urethane di atas undakan marmer taman kota sebelum diusir petugas keamanan malam.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Streetwear & Brutalist',
          headline: 'CAT SEMPROT AKRILIK INDUSTRI 99',
          sub_headline: 'PIGMEN PEKAT TAHAN PANAS & GESEKAN',
          tagline: 'Nozzle Lebar Untuk Sapuan Cepat',
          supporting_details: ['ISI BERSIH: 400 CC', 'WARNA: HITAM DOFF', 'GAS BERTEKANAN TINGGI', 'AWAS MUDAH TERBAKAR'],
          body_copy: 'Daya tutup tinggi sekali semprot pada permukaan tembok plester kasar, baja kontainer, dan kayu lapis.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Streetwear & Brutalist',
          headline: 'DISTRO GUDANG BAWAH TANAH',
          sub_headline: 'KAOS MUSIK HARDCORE & CELANA KARGO',
          tagline: 'Masuk Lewat Tangga Darurat Belakang Parkiran',
          supporting_details: ['SABTU-MINGGU 15:00-22:00', 'KOMPLEK RUKO KELAPA GADING', 'NON-TUNAI SAJA'],
          body_copy: 'Pintu besi lipat berkarat dengan stiker bertumpuk tebal. Rak pipa besi industrial menggantung jaket kanvas kasar.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Streetwear & Brutalist',
          headline: 'ESTETIKA RETAK DAN KASAR',
          sub_headline: 'KUMPULAN KARYA GRAFIS BRUTALIS URBAN',
          tagline: 'Keindahan Yang Lahir Dari Sudut Gelap Jakarta',
          supporting_details: ['PAMERAN INDEPENDEN', 'GUDANG SARINAH LEVEL B3', 'KURATOR: KOLEKTIF RAW', 'CETAK RISO'],
          body_copy: 'Gedung-gedung bertingkat abu-abu menjulang angkuh di antara jalan layang berdebu. Tipografi tegas berjarak rapat menolak basa-basi kesopanan desain komersial biasa.',
          source: 'preset'
        }
      ]
    },
    'editorial-luxury': {
      'logo-wordmark': [
        {
          category: 'Logo / Wordmark',
          style: 'Editorial & Luxury Romance',
          headline: 'RADEN AYU PERMATA',
          sub_headline: 'KARYA KEBAYA DAN SUTRA HAND-WOVEN',
          tagline: 'Keanggunan Putri Keraton Masa Kini',
          supporting_details: ['ATELIER JAKARTA SELATAN', 'KARYA TANGAN EKSKLUSIF', 'EDISI TERBATAS'],
          body_copy: 'Sutra tenun ATBM berpadu bordir benang emas Perancis dan taburan mutiara air tawar Lombok.',
          source: 'preset'
        }
      ],
      'badge-emblem': [
        {
          category: 'Badge & Emblem',
          style: 'Editorial & Luxury Romance',
          headline: 'PERKEBUNAN TEH KAYU ARO',
          sub_headline: 'PUCUK TEH ORTHODOX DAUN HITAM',
          tagline: 'Dipetik Saat Fajar Di Kaki Gunung Kerinci',
          supporting_details: ['KETINGGIAN 1.600 MDPL', 'KUALITAS EKSPOR PREMIUM', 'SEJAK 1925', 'RESIKO NIKMAT TINGGI'],
          body_copy: 'Air seduhan berwarna merah tembaga jernih dengan buket aroma bunga liar dan rasa manis malt alami di tenggorokan.',
          source: 'preset'
        }
      ],
      'packaging-label': [
        {
          category: 'Packaging & Label',
          style: 'Editorial & Luxury Romance',
          headline: 'EMULSI INTISARI MAWAR DAMASKA',
          sub_headline: 'SERUM PEREMAJA KULIT BERMINYAK ALAMI',
          tagline: 'Kaya Antioksidan Murni Tanpa Pewangi Buatan',
          supporting_details: ['BOTOL KACA GELAP 30 ML', 'UJI DERMATOLOGIS', 'DIBUAT DI BALI', 'BATCH SERI ROYAL'],
          body_copy: 'Sentuhan tetes pertama yang menyejukkan, mengunci kelembapan alami kulit wajah dengan nutrisi mawar segar.',
          source: 'preset'
        }
      ],
      'signboard-storefront': [
        {
          category: 'Signboard & Storefront',
          style: 'Editorial & Luxury Romance',
          headline: 'BUTIK KENCANA SUTRA',
          sub_headline: 'KONSULTASI BUSANA PENGANTIN ADAT & MODERN',
          tagline: 'Layanan Eksklusif Melalui Perjanjian Terlebih Dahulu',
          supporting_details: ['SENIN - SABTU 10.00 - 18.00', 'JL. SENOPATI NO. 68', 'KEBAYORAN BARU'],
          body_copy: 'Ruang rias privat berbalut tirai beledu merah marun dengan pencahayaan hangat dan wangi dupa cendana.',
          source: 'preset'
        }
      ],
      'editorial-poster': [
        {
          category: 'Editorial & Poster',
          style: 'Editorial & Luxury Romance',
          headline: 'SENANDUNG SENJA DI UBUD',
          sub_headline: 'FOTOGRAFI MODE BERBAHAN TENUN SUTRA BALI',
          tagline: 'Kisah Kasih Klasik Antara Cahaya dan Lembah',
          supporting_details: ['MAJALAH HARPER’S BAZAAR INDONESIA', 'FOTOGRAFER: ARYA PRASETYA', 'CETAKAN SUTRA FINE ART', 'EDISI DESEMBER'],
          body_copy: 'Siluet anggun berdiri di tepian tebing Campuhan saat sinar emas mentari sore membelai helai kain songket tenun tangan yang berayun ditiup angin sepoi perbukitan.',
          source: 'preset'
        }
      ]
    }
  }
};

/**
 * Fallback generator function that selects or modifies a preset to match the letter filter
 */
export function getOfflineSpecimen(
  era: DesignEra,
  assetType: AssetType,
  lang: Language,
  startingLetter: string = 'ANY'
): GeneratedSpecimen {
  const langData = OFFLINE_DATASET[lang] || OFFLINE_DATASET.en;
  const eraData = langData[era] || langData['retro-americana'];
  const presets = eraData[assetType] || eraData['logo-wordmark'] || [];

  if (presets.length === 0) {
    // Return a safe default
    return {
      category: ASSET_TYPES[assetType]?.label || 'Specimen',
      style: ERA_METADATA[era]?.label || 'Classic',
      headline: startingLetter !== 'ANY' ? `${startingLetter}MPORIUM VINTAGE` : 'VINTAGE SPECIMEN',
      sub_headline: 'EXQUISITE TYPOGRAPHIC COMPOSITION',
      tagline: 'Designed for Font Previewing & Mockups',
      supporting_details: ['EST. 1974', 'PREMIUM TYPE', 'SPECIMEN SHEET'],
      body_copy: 'A meticulously balanced specimen layout constructed for lettering artists and type designers.',
      source: 'preset'
    };
  }

  // If a starting letter is requested, try to find a preset with that letter
  if (startingLetter && startingLetter !== 'ANY') {
    const targetLetter = startingLetter.toUpperCase();
    const matched = presets.find(p => p.headline.trim().toUpperCase().startsWith(targetLetter));
    if (matched) {
      return { ...matched, timestamp: Date.now() };
    }

    // Otherwise take a preset and replace or prefix the first word to match the letter!
    const base = presets[Math.floor(Math.random() * presets.length)];
    const words = base.headline.split(' ');
    
    // Aesthetic starter words for type designers
    const starterWords: Record<string, string[]> = {
      A: ['APOLLO', 'ARROWHEAD', 'ARCHIPELAGO', 'ATELIER', 'AURA'],
      B: ['BLACKWOOD', 'BRIMSTONE', 'BEACON', 'BOULEVARD', 'BAUHAUS'],
      C: ['CHOPPER', 'COPPERHEAD', 'CHRONOS', 'CASCADE', 'CYBERPULSE'],
      D: ['DIAMOND', 'DESTRUCTION', 'DISTRICT', 'DOMINION', 'DYNAMO'],
      E: ['ECLIPSE', 'EMPIRE', 'EQUINOX', 'EMPORIUM', 'ELEVATION'],
      F: ['FORMA', 'FALCON', 'FRONTIER', 'FORBIDDEN', 'FUSION'],
      G: ['GOLDEN', 'GHOST', 'GALAXY', 'GRIDLINE', 'GRAND'],
      H: ['HERITAGE', 'HIGHLAND', 'HYPERDRIVE', 'HORIZON', 'HEXAGON'],
      I: ['IRONCLAD', 'IMPERIAL', 'INFINITY', 'INDUSTRIAL', 'ISLAND'],
      J: ['JASPER', 'JUPITER', 'JOURNAL', 'JUNCTION', 'JAGUAR'],
      K: ['KINETIK', 'KRONOS', 'KEYSTONE', 'KINGDOM', 'KOWLOON'],
      L: ['LUMEN', 'LUCKY', 'LEGACY', 'LIGHTNING', 'LUXOR'],
      M: ['MONOLITH', 'METROPOLIS', 'MODULAR', 'MAISON', 'MATRIX'],
      N: ['NEURAL', 'NEO-TOKYO', 'NOCTURNE', 'NEXUS', 'NORTHSTAR'],
      O: ['OMEGA', 'ORION', 'OBSIDIAN', 'OUTLAW', 'OVERDRIVE'],
      P: ['PHANTOM', 'PIONEER', 'PROVIDENCE', 'PACIFIC', 'PROTOCOL'],
      Q: ['QUANTUM', 'QUICKSILVER', 'QUARTZ', 'QUARRY', 'QUINTESSENCE'],
      R: ['RADICAL', 'REDLINE', 'RATIONAL', 'ROYAL', 'REVOLUTION'],
      S: ['SOLARIS', 'SPECTRUM', 'SYNDICATE', 'SANCTUARY', 'STRATOS'],
      T: ['TITAN', 'TIMBERLAND', 'TACTICAL', 'TERMINAL', 'THUNDER'],
      U: ['ULTRAVIOLET', 'UNDERGROUND', 'UNIVERSE', 'UTOPIA', 'UNION'],
      V: ['VECTOR', 'VALENTINA', 'VELOCITY', 'VANGUARD', 'VORTEX'],
      W: ['WANDERER', 'WESTWIND', 'WILDCAT', 'WARRIOR', 'WAVELENGTH'],
      X: ['XENON', 'XYLOPHONE', 'X-RAY', 'XANADU', 'XEROX'],
      Y: ['YARDARM', 'YELLOWSTONE', 'YONDER', 'YOKOHAMA', 'YIELD'],
      Z: ['ZENITH', 'ZEPHYR', 'ZODIAC', 'ZERO-ONE', 'ZURICH'],
    };

    const replacementList = starterWords[targetLetter] || [`${targetLetter}X`];
    const chosenWord = replacementList[Math.floor(Math.random() * replacementList.length)];
    
    // Replace the first word or create headline
    const newHeadline = words.length > 1 
      ? `${chosenWord} ${words.slice(1).join(' ')}`
      : `${chosenWord} ${base.sub_headline.split(' ')[0] || 'STUDIO'}`;

    return {
      ...base,
      headline: newHeadline,
      timestamp: Date.now()
    };
  }

  // Random preset
  const randomPreset = presets[Math.floor(Math.random() * presets.length)];
  return { ...randomPreset, timestamp: Date.now() };
}
