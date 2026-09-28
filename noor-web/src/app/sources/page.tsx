'use client';

// ============================================================
// NOOR Web — Sources & Methodology (Transparency in Sacred Knowledge)
// Detail: Qur'an, Hadith, Prayer Calculations, Calendar, Zakat, Ziyarat & AI
// Core Principle: SOURCE → VERIFY → EXPLAIN → PRESENT
// ============================================================

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Compass,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Scale,
  FileText,
  Globe,
  Sparkles,
  ExternalLink,
  Mail,
  Building,
  Flag
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

export default function SourcesMethodologyPage() {
  const lastVerified = 'September 28, 2026';

  const sections = [
    { id: 'principle', title: '1. Core Content Principle (Amanah)' },
    { id: 'quran', title: '2. Qur\'an Scripture & Calligraphy' },
    { id: 'hadith', title: '3. Hadith & Duas (Hisn al-Muslim)' },
    { id: 'prayer', title: '4. Prayer Times & Astronomical Engine' },
    { id: 'qibla', title: '5. Qibla Bearing & Great-Circle Azimuth' },
    { id: 'calendar', title: '6. Hijri Calendar & Moon Sightings' },
    { id: 'zakat', title: '7. Zakat & Nisab Calculations' },
    { id: 'ziyarat', title: '8. Ziyarat & Historical Heritage' },
    { id: 'media', title: '9. Media Licensing & Copyright' },
    { id: 'ai-policy', title: '10. AI Information Assistant Guidelines' },
    { id: 'corrections', title: '11. Corrections & Scholarly Review' },
  ];

  return (
    <div className="min-h-screen bg-[#02120d] text-[#f3f4f6] flex flex-col selection:bg-amber-500 selection:text-black">
      <GlobalNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-emerald-400/80 mb-6 font-mono">
          <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Sources & Methodology</span>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063828] via-[#021c14] to-[#010e0a] border border-emerald-500/20 p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparency & Verification</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Sources & Methodology
            </h1>

            <p className="text-base sm:text-lg text-emerald-200/85 leading-relaxed mb-6">
              Islamic knowledge is a sacred trust (<span className="text-amber-300 font-semibold">أمانة</span>). We believe in complete transparency: every calculation, Quranic verse, Hadith narration, and historical record in <strong>Noor-e-ilahi</strong> is traced to authentic, verifiable sources.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-300/80 font-mono pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Reviewed & Verified: {lastVerified}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                Editorial Standard: Source → Verify → Explain → Present
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
            <div className="p-3 w-fit rounded-xl bg-emerald-500/15 text-emerald-400 mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Authentic Scripture & Sunnah</h3>
            <p className="text-xs text-emerald-300/75 leading-relaxed">
              Textual integrity from King Fahd Qur'an Complex and Kutub al-Sittah Hadith collections with canonical reference numbering.
            </p>
          </div>

          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
            <div className="p-3 w-fit rounded-xl bg-amber-500/15 text-amber-400 mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Astronomical Solar Equations</h3>
            <p className="text-xs text-emerald-300/75 leading-relaxed">
              Transparent celestial mathematics matching recognized Islamic authorities (Umm Al-Qura, MWL, ISNA, Karachi, Egyptian Survey).
            </p>
          </div>

          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
            <div className="p-3 w-fit rounded-xl bg-emerald-500/15 text-emerald-400 mb-3">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">No Synthetic Inventions</h3>
            <p className="text-xs text-emerald-300/75 leading-relaxed">
              Never invent or assume. When accounts differ or data is unverified, we explicitly label it: "Historical accounts vary" or "Under review".
            </p>
          </div>
        </div>

        {/* Layout with Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Table of Contents */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 bg-[#031711] border border-white/10 rounded-2xl p-4 space-y-1.5 text-xs">
              <p className="font-bold text-amber-400 uppercase tracking-wider text-[11px] mb-2 px-2">
                Methodology Index
              </p>
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block px-2.5 py-1.5 rounded-lg text-emerald-300/70 hover:text-white hover:bg-emerald-500/10 transition-colors"
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Detailed Content */}
          <div className="lg:col-span-3 space-y-10 text-sm leading-relaxed text-emerald-100/90">
            
            {/* Section 1 */}
            <section id="principle" className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <span>1.</span>
                <span>Core Content Principle (Amanah)</span>
              </h2>
              <p>
                NOOR operates on an unyielding editorial rule:
              </p>
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 font-mono text-center text-xs text-emerald-300">
                SOURCE → VERIFY → EXPLAIN → PRESENT &nbsp;|&nbsp; NEVER: INVENT → PUBLISH
              </div>
              <p>
                We do not use synthetic AI generation to produce fabricated Hadiths, unverified historical claims, imaginary shrine chronologies, or unverified religious rulings. If an inscription, date, or attribution is not definitively verified in primary literature, we state:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-emerald-300/80 pl-2">
                <li><em>"According to local tradition..."</em></li>
                <li><em>"Historical accounts vary regarding this date..."</em></li>
                <li><em>"Source information currently under editorial review."</em></li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="quran" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>2. Qur'an Scripture & Calligraphy</span>
              </h2>
              <p>
                The divine text of the Noble Qur'an is presented with the highest standards of preservation:
              </p>
              <div className="bg-[#031c14] border border-white/10 rounded-2xl p-5 space-y-2.5 text-xs">
                <p><strong>Arabic Text:</strong> Rendered in the verified <em>Madinah Mushaf Uthmani Calligraphy</em> (Riwayah of Hafs 'an 'Asim) verified against the standards of the King Fahd Glorious Qur'an Printing Complex in Madinah.</p>
                <p><strong>Translations:</strong> High-fidelity scholarly translations including Saheeh International, Dr. Mustafa Khattab (The Clear Quran), Maulana Fateh Muhammad Jalandhari (Urdu), and regional language editions.</p>
                <p><strong>Audio Recitations:</strong> Authorized streaming recordings of world-renowned reciters, including Sheikh Mishary Rashid Alafasy, Sheikh Abdul Basit Abdul Samad, Sheikh Abdur-Rahman As-Sudais, and Sheikh Saad Al-Ghamdi.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="hadith" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>3. Hadith & Duas (Hisn al-Muslim)</span>
              </h2>
              <p>
                Every supplication and Hadith in Noor-e-ilahi includes its full provenance and scholarly grading:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs text-emerald-300/80 pl-2">
                <li><strong>Hisn al-Muslim (Fortress of the Muslim):</strong> Based on the authentic compilation of Shaykh Sa'id bin Ali bin Wahf al-Qahtani.</li>
                <li><strong>Canonical Hadith Collections:</strong> Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami` at-Tirmidhi, Sunan an-Nasa'i, and Sunan Ibn Majah.</li>
                <li><strong>Grading:</strong> Where available, Hadith gradings (Sahih, Hasan) according to classical Hadith scholarship (Imam al-Tirmidhi, Hafiz Ibn Hajar, Shaykh al-Albani) are documented.</li>
                <li><strong>No Fabrications:</strong> Weak (Da'if Jiddan) or fabricated (Mawdu') narrations are strictly excluded.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="prayer" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>4. Prayer Times & Astronomical Engine</span>
              </h2>
              <p>
                Prayer times are computed using celestial solar position algorithms, calculating the exact moment the sun reaches specific depression angles below the horizon:
              </p>
              <div className="bg-[#031a13] border border-emerald-500/20 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-emerald-950/60 text-amber-300 border-b border-white/10">
                      <th className="p-3 font-bold">Authority / Method</th>
                      <th className="p-3 font-bold">Fajr Angle</th>
                      <th className="p-3 font-bold">Isha Angle / Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-emerald-200/85">
                    <tr>
                      <td className="p-3 font-semibold text-white">Umm Al-Qura University (Makkah)</td>
                      <td className="p-3 font-mono">18.5°</td>
                      <td className="p-3 font-mono">90 min after Maghrib (120 min in Ramadan)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Muslim World League (MWL)</td>
                      <td className="p-3 font-mono">18.0°</td>
                      <td className="p-3 font-mono">17.0°</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Islamic Society of North America (ISNA)</td>
                      <td className="p-3 font-mono">15.0°</td>
                      <td className="p-3 font-mono">15.0°</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Univ. of Islamic Sciences, Karachi</td>
                      <td className="p-3 font-mono">18.0°</td>
                      <td className="p-3 font-mono">18.0°</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Egyptian General Authority of Survey</td>
                      <td className="p-3 font-mono">19.5°</td>
                      <td className="p-3 font-mono">17.5°</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-amber-300/85 bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl">
                <strong>Adherence to Local Mosque:</strong> Astronomical timetables provide high mathematical precision. However, believers praying in congregation (Jama'ah) should always adhere to their local masjid’s established schedule.
              </p>
            </section>

            {/* Section 5 */}
            <section id="qibla" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>5. Qibla Bearing & Great-Circle Azimuth</span>
              </h2>
              <p>
                The direction towards the Holy Kaaba in Makkah al-Mukarramah (21.4225° N, 39.8262° E) is determined using the spherical trigonometric <strong>Forward Azimuth Formula</strong>:
              </p>
              <div className="bg-[#031c14] border border-white/10 rounded-2xl p-4 font-mono text-xs text-emerald-300 overflow-x-auto">
                θ = atan2(sin(Δλ) · cos(φ₂), cos(φ₁) · sin(φ₂) − sin(φ₁) · cos(φ₂) · cos(Δλ))
              </div>
              <p className="text-xs text-emerald-300/80">
                Our compass combines gyroscope sensor readings with an Exponential Moving Average (EMA) filter and a deadband threshold to prevent jitter while maintaining instant responsiveness.
              </p>
            </section>

            {/* Section 6 */}
            <section id="calendar" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>6. Hijri Calendar & Moon Sightings</span>
              </h2>
              <p>
                The Hijri lunar calendar in Noor-e-ilahi is based on the <em>Umm al-Qura astronomical lunar calendar</em>. Because Islamic months commence with the physical or verified sighting of the nascent crescent moon (Hilal), <strong>dates may differ by ±1 day</strong> depending on your geographic region and local Hilal committee announcements.
              </p>
            </section>

            {/* Section 7 */}
            <section id="zakat" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>7. Zakat & Nisab Calculations</span>
              </h2>
              <p>
                Our Zakat calculator serves as an educational estimation utility adhering to standard Shariah parameters:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-emerald-300/80 pl-2">
                <li><strong>Gold Nisab Benchmark:</strong> 85 grams of 24k gold (or 7.5 tola).</li>
                <li><strong>Silver Nisab Benchmark:</strong> 595 grams of pure silver (or 52.5 tola).</li>
                <li><strong>Obligatory Rate:</strong> 2.5% (one-fortieth) applied to eligible surplus wealth held for one full lunar year (Hawl).</li>
              </ul>
              <p className="text-xs text-emerald-400/80">
                For intricate fiqh situations—such as complex corporate share vesting, commercial real estate development, or mixed debt obligations—users are advised to consult a qualified local Islamic scholar or mufti.
              </p>
            </section>

            {/* Section 8 */}
            <section id="ziyarat" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Building className="w-5 h-5 text-amber-400" />
                <span>8. Ziyarat & Historical Heritage</span>
              </h2>
              <p>
                Our directory of 31+ historical Islamic shrines, mosques, and heritage sites spans Makkah, Madinah, Jerusalem, Baghdad, Najaf, Karbala, Cairo, Damascus, Delhi, Ajmer, Gulbarga, and Istanbul.
              </p>
              <p>
                We maintain a strict neutral tone: avoiding exaggerated claims ("supreme sanctuary", "greatest", "premier") and ranking of holy sites. Instead, each profile documents:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-emerald-300/80 pl-2">
                <li>Historical chronicle references (Ibn Kathir, Al-Dhahabi, Tabari, contemporary Waqf records).</li>
                <li>Distinction between documented history and traditional regional attribution.</li>
                <li>Verified GPS coordinates, visiting hours, and annual Urs conventions.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="media" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>9. Media Licensing & Copyright</span>
              </h2>
              <p>
                We do not assume that images found online are free to use. All visual and media assets are governed by verified licensing:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-emerald-300/80 pl-2">
                <li>Wikimedia Commons under Creative Commons (CC BY, CC BY-SA) with full attribution.</li>
                <li>Public Domain (CC0) and historical archival photography.</li>
                <li>Authorized original NOOR photography and UI assets.</li>
                <li>Live Haramain video feeds embedded directly from official satellite broadcast partners via YouTube.</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section id="ai-policy" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>10. AI Information Assistant Guidelines</span>
              </h2>
              <p>
                <strong>Ask NOOR</strong> is an AI-powered Islamic information assistant designed for discovery and search across verified Islamic knowledge. It operates under strict guardrails:
              </p>
              <div className="bg-[#031c14] border border-amber-500/30 rounded-2xl p-5 space-y-2 text-xs">
                <p><strong>Informational Only:</strong> Ask NOOR does <em>not</em> issue religious fatwas or binding rulings.</p>
                <p><strong>Scholarly Disagreement:</strong> Where fiqh opinions differ among the classical Madhabs, the assistant is instructed to state: <em>"Scholarly opinions differ on this matter."</em></p>
                <p><strong>Citation Transparency:</strong> Answers prioritize direct references to Qur'an ayahs, Sahih Hadiths, and documented classical commentaries.</p>
              </div>
            </section>

            {/* Section 11 */}
            <section id="corrections" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Flag className="w-5 h-5 text-amber-400" />
                <span>11. Corrections & Scholarly Review</span>
              </h2>
              <p>
                We view scholarly feedback and community peer review as essential to our platform. If you discover a typographical error, timing discrepancy, incorrect GPS location, or disputed reference:
              </p>
              
              <div className="bg-gradient-to-r from-[#031d15] to-[#01140e] border border-amber-500/30 rounded-2xl p-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>Report a Correction or Issue</span>
                  </h4>
                  <p className="text-xs text-emerald-300/80">
                    Our editorial team reviews all submissions against canonical Islamic literature within 48 hours.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs transition-colors shrink-0 shadow-lg shadow-amber-500/20"
                >
                  Submit Correction →
                </Link>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
