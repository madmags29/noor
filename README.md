# 🌙 Noor-e-ilahi (نُورِ اِلٰہی)
### *Your Deen. Your Daily Companion.*

An authentic, modern, and privacy-first Islamic digital platform built for millions of believers worldwide. Designed with state-of-the-art web and mobile architectures, deep obsidian-emerald aesthetics, and Islamic geometric design principles.

---

## 🕌 Platform Modules & Features

- **⏱️ Astronomical Prayer Timetable & Adhan Engine**
  - High-precision astronomical prayer calculation algorithms.
  - Multi-Fiqh jurisprudence support (Standard: Shafi'i, Maliki, Hanbali / Hanafi Asr method).
  - 7 authentic Mu'adhin voices streaming directly from *Masjid al-Haram*, *Al-Masjid An-Nabawi*, *Al-Aqsa*, and *Cairo*.
  - Live upcoming prayer countdown visualizer and Sehri/Iftar fasting schedules.

- **📖 The Noble Quran (114 Surahs)**
  - Canonical 114 Surahs catalog with Meccan/Medinan tags, Ayah counts, and Juz references.
  - Authentic multi-language translations (English, Hindi, Urdu, Arabic).
  - High-quality audio recitation streaming with verse-by-verse player.

- **🏛️ Sacred Ziyarat & Dargahs Directory**
  - 35+ verified sanctuaries across 12 nations (Morocco, Iraq, Iran, Egypt, Syria, Palestine, Uzbekistan, Turkey, Indonesia, Bangladesh, India, Pakistan).
  - Silsila/Tariqa classifications (Chishti, Qadiri, Naqshbandi, Suhrawardi, Shadhili, Tijaniyya, Mevlevi, Ahl al-Bayt, Sahabah).
  - Authentic Islamic architectural photography (100% verified sanctuaries), GPS coordinates, visiting etiquette (*Adab*), and classical scholarly sources.

- **📿 Digital Tasbih & Masnoon Duas**
  - Interactive digital Dhikr counter with milestone target presets (33x, 99x, 100x, 1,000x).
  - Tactile haptic feedback integration for mobile.
  - Categorized supplications from *Hisn al-Muslim* (Morning/Evening, Sleep, Protection, Travel, Forgiveness, and Ease).

- **🧭 Spherical Qibla Compass**
  - Accurate Kaaba bearing calculation based on Great-Circle navigation formulas.
  - Distance indicator to Makkah Al-Mukarramah in kilometers.

- **🌙 Hijri Lunar Calendar**
  - Dynamic 12 sacred lunar months (*Muharram* through *Dhu al-Hijjah*).
  - Complete holy observances (Blessed Ramadan, Laylat al-Qadr, Eid al-Fitr, Day of Arafah, Eid al-Adha, Day of Ashura).

- **🖼️ Sacred Visual Media & 4K Cinema**
  - Curated high-definition photographs and 4K video streams of Islamic holy sanctuaries and manuscripts.

- **🤖 Noor AI Islamic Companion**
  - Scholarly Islamic companion powered by OpenAI (`gpt-4o-mini`).
  - Contextual responses referencing the Noble Quran, Sahih Hadith (Bukhari, Muslim, Tirmidhi, Abu Dawood), and Sunnah etiquette.

- **🌐 Multi-Language Localization**
  - Intelligent country and state-level native language detection.
  - Complete support for English (`en`), Hindi (`hi` - हिन्दी), Arabic (`ar` - العربية), Urdu (`ur` - اردو), and regional Indian languages.
  - Bi-directional support (LTR & RTL).

---

## 📁 Monorepo Structure

```text
noor/
├── noor-web/           # Next.js 15+ Web Application & App Preview Simulator
├── noor-mobile/        # React Native / Expo SDK 57 iOS & Android Mobile App
├── noor-api/           # Express / TypeScript Backend REST API
├── noor-admin/         # Next.js Admin & Content Management Dashboard
└── noor-shared/        # Shared TypeScript types, prayer formulas & utils
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**
- **Git**
- **Expo Go** (for mobile app testing)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/madmags29/noor.git
   cd noor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment files and configure your keys:
   ```bash
   # Web configuration
   cp noor-web/.env.example noor-web/.env.local

   # API configuration
   cp noor-api/.env.example noor-api/.env
   ```

4. **Run Development Servers**:
   ```bash
   # Run Web Platform (http://localhost:3000)
   cd noor-web && npm run dev

   # Run Mobile App (Expo Metro bundler)
   cd noor-mobile && npx expo start

   # Run Backend API (http://localhost:4000)
   cd noor-api && npm run dev
   ```

---

## ⚡ Deploying to Vercel

Noor is 100% Vercel-ready with zero additional configuration needed.

### Option A: Import Entire Monorepo (Automatic)
1. In the Vercel Dashboard, click **New Project** and import `madmags29/noor`.
2. Leave the **Root Directory** as `./` (or select `noor-web`).
3. Vercel will automatically read `vercel.json`, build `@noor/shared`, and deploy `noor-web`.
4. (Optional) Add your `OPENAI_API_KEY` under Environment Variables.
5. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
# From the root directory:
vercel

# Or deploy specifically noor-web:
cd noor-web && vercel --prod
```

---

## 🔒 Security & Privacy

- All user location lookups are performed client-side or through privacy-preserving geolocation headers.
- Secrets, tokens, and `.env*` files are strictly excluded from source control.
- 100% Halal and ethical architecture with no intrusive advertisements.

---

## 📜 License & Dedication

Dedicated as **Sadaqah Jariyah** (صدقة جارية) for the global Muslim Ummah.
Copyright © 2026 Noor-e-ilahi Global Islamic Technology Platform.
