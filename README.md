# ✒️ DumSkuy — Contextual Copywriting & Font Specimen Generator

> **No more boring "Lorem Ipsum".** DumSkuy is a specialized Single Page Web Application (SPA) designed specifically for **Type Designers**, **Lettering Artists**, and **Graphic Designers** to generate meaningful, authentic, and historically accurate dummy copy for font specimen previews and client mockups.

![DumSkuy Preview](https://img.shields.io/badge/License-MIT-purple.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)
![Gemini AI](https://img.shields.io/badge/Gemini_1.5_Flash-100%25_Free_Tier-green.svg)
![Groq](https://img.shields.io/badge/Groq_Cloud-Ultra_Fast-orange.svg)
![Offline Ready](https://img.shields.io/badge/Offline_Mode-Zero_Setup-emerald.svg)

---

## 🌟 Key Features

### 1. Authentic Period & Style Copywriting (Zero Filler)
Say goodbye to generic Latin filler text. DumSkuy produces authentic industry jargon, established dates, location names, and narrative prose across 6 distinct typographic movements:
- 📻 **Retro / Vintage / Americana (50s–70s)**: Heavyweight workwear, speed shops, roadside diners, raw denim, motorcycle garages.
- 📐 **Modern / Minimalist / Swiss / Bauhaus (20s–60s)**: Asymmetrical grids, objective functionalism, architecture, rationalist colophons.
- 🏛️ **Victorian / Art Deco / Ornamental (1890s–1930s)**: Gilded speakeasies, bespoke apothecary, Chrysler spires, velvet parlours.
- 💾 **Cyberpunk / Futuristic / Y2K (1998–2077)**: Synaptic wetware, liquid chrome, neon netrunner dispatch, Tokyo underground subnets.
- 🚧 **Streetwear / Brutalist / Urban**: Raw concrete, heavy tactical apparel, hazard bars, drop-shoulder silhouettes, bunker records.
- 🍷 **Classic Editorial / Serif Romance / Luxury**: Haute perfumerie, grand cru champagne, Savile Row tailoring, Parisian literary salons.

### 2. Comprehensive Asset Formats
- ⚡ **Logo / Wordmark**: Primary brandmark + industry descriptor + authentic tagline.
- 🛡️ **Badge / Emblem**: Arch text headers, established year, motto ribbons, and provenance.
- 📦 **Packaging / Label**: Brand variant, volume/weight, craft notes, batch numbers, and origin notes.
- 🏪 **Signboard / Storefront**: Store fascia, artisan trades, opening hours, and street address.
- 📰 **Editorial / Poster**: Large display hero headline, editorial deck, narrative body paragraph, and spec colophon.

### 3. 🔍 Font Name Finder & Marketplace Availability Checker (NEW!)
- **Geographic & Map-based Inspirations**: Find authentic font names derived from real islands (Santorini, Sumba, Lofoten, Capri, Natuna, Corsica), historic towns, cities, valleys, and ancient landmarks.
- **Word Count Options**: 1 Kata (Single Word) vs 2 Kata / 2 Baris (Double Word lockups like "Capri Riviera", "Sumba Heritage").
- **Target Ligature / Double-Letter Filter**: Specifically hunt for names featuring `ss`, `tt`, `ff`, `fi`, `fl`, `ll`, `oo`, `rr`, `st`, etc. to showcase your custom ligatures in the typeface's own name!
- **Starting Letter Selector (A–Z or Any)**: Filter names by starting letter.
- **Trademark & Marketplace Taken Checker**:
  - Automatically flags collisions against a catalog of famous existing fonts.
  - **1-Click Deep Search Links** to check live availability directly on:
    - **MyFonts** (Monotype marketplace)
    - **Google Fonts**
    - **Adobe Fonts**
    - **DaFont**
    - **USPTO Trademark Registry**
- **1-Click "Test in Specimen"**: Send any candidate name straight to the Specimen Sheet generator to see how it looks formatted as a full specimen!

### 4. 🎯 Starting Letter Glyph Filter (A–Z)
Select any letter from **A to Z** (or **Any**) to enforce the primary headline to start with that specific letter. Indispensable for testing specific uppercase display glyphs, ligatures, or kerning pairs in your font family.

### 4. 🔤 Live In-Browser Font Drag & Drop Preview
- Drag and drop your `.otf`, `.ttf`, `.woff`, or `.woff2` font files directly into the browser.
- Uses dynamic client-side `FontFace` API — **zero files are uploaded to any server**.
- Real-time typography sliders:
  - **Font Size** (20px – 96px)
  - **Letter-Spacing / Tracking** (-2px to +16px)
  - **Leading / Line-Height**
  - **Text-Transform** (Normal, UPPERCASE, lowercase, Capitalize)
  - **Text Alignment** (Left, Center, Right)
  - Built-in curated display fonts (Outfit, Playfair Display, Cinzel, Space Grotesk, Bebas Neue, Syne, JetBrains Mono) if you don't have a font file at hand.

### 5. ⚡ 100% Free Online AI + Instant Offline Fallback
- **Google Gemini API (1.5 Flash / 2.0 Flash)**: 100% free tier directly from Google AI Studio.
- **Groq Cloud API**: Ultra-fast free tier (`llama-3.3-70b-versatile` / `llama-3.1-8b-instant`).
- **Rich Curated Offline Dataset**: Even with no internet or zero API keys, DumSkuy works immediately with hand-crafted authentic presets in both **English** and **Indonesian (Bahasa Indonesia)**.
- **Privacy-first**: API keys are saved exclusively in your browser's `localStorage` and never transmitted to third parties.

### 6. 📋 One-Click Designer Export Tools
- **Copy All**: Formatted specimen text ready to paste directly into Figma, Adobe Illustrator, Photoshop, or InDesign.
- **Individual Copy**: Click any detail chip, arch headline, or tagline to copy just that string.
- **Copy JSON**: Structured schema for developers and mockup generators.
- **Grid Rulers**: Toggle typography baseline guides and wireframe grid overlay.
- **Dark & Light Mode**: Clean, high-contrast specimen sheets.

---

## 🚀 Quick Start

### Development

```bash
# Clone repository
git clone https://github.com/CacheStash/dumskuy.git
cd dumskuy

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` / `Cmd + Enter` | Generate New Specimen |

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **AI Integrations**: Google Gemini API & Groq Cloud REST API
- **Fonts**: Dynamic Web Font API + Google Fonts specimen set

---

## 📄 License

MIT © [CacheStash](https://github.com/CacheStash)
