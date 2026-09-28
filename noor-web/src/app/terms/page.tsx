'use client';

// ============================================================
// NOOR Web & Mobile — Terms & Conditions of Service
// Covers: Website (www.nooreilahi.com) & Mobile Apps (Android / iOS)
// Built with comprehensive legal, religious calculation disclaimers, and Shariah ethics
// ============================================================

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Scale,
  ShieldAlert,
  Compass,
  Coins,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Clock,
  Globe,
  Smartphone,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

export default function TermsPage() {
  const lastUpdated = 'September 28, 2026';

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'scope-services', title: '2. Description of Services (Web & App)' },
    { id: 'religious-disclaimer', title: '3. Religious & Astronomical Timetable Disclaimer' },
    { id: 'zakat-disclaimer', title: '4. Zakat Calculator & Fiqh Estimates' },
    { id: 'intellectual-property', title: '5. Intellectual Property & Sacred Texts' },
    { id: 'user-conduct', title: '6. User Conduct & Acceptable Use' },
    { id: 'third-party-media', title: '7. Third-Party Links & Live Broadcasts' },
    { id: 'warranty-disclaimer', title: '8. Disclaimer of Warranties' },
    { id: 'liability-limitation', title: '9. Limitation of Liability' },
    { id: 'governing-law', title: '10. Governing Law & Modifications' },
    { id: 'contact', title: '11. Official Contact Information' },
  ];

  return (
    <div className="min-h-screen bg-[#02120d] text-[#f3f4f6] flex flex-col selection:bg-amber-500 selection:text-black">
      <GlobalNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-emerald-400/80 mb-6 font-mono">
          <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Terms & Conditions</span>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063828] via-[#021c14] to-[#010e0a] border border-emerald-500/20 p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <Scale className="w-4 h-4" />
              <span>Legal & Religious Terms</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Terms & Conditions
            </h1>

            <p className="text-base sm:text-lg text-emerald-200/85 leading-relaxed mb-6">
              These Terms and Conditions govern your access to and use of the <strong>Noor-e-ilahi</strong> website, mobile applications, and spiritual digital services. By utilizing our ecosystem, you agree to these mutual standards.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-300/80 font-mono pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Effective: {lastUpdated}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Web: www.nooreilahi.com
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                Mobile: Android & iOS
              </span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Free Spiritual Utility</h3>
              <p className="text-xs text-emerald-300/75 leading-relaxed">
                Provided free of charge for the spiritual benefit of Muslims worldwide without mandatory paywalls.
              </p>
            </div>
          </div>

          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Calculation Guidelines</h3>
              <p className="text-xs text-emerald-300/75 leading-relaxed">
                Astronomical prayer calculations and Qibla bearings are mathematical estimations; follow local masjids for Jama'ah.
              </p>
            </div>
          </div>

          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Authentic Scholarship</h3>
              <p className="text-xs text-emerald-300/75 leading-relaxed">
                Quran texts, Hadiths, and Duas are sourced from authentic classical collections (Sahih Bukhari, Muslim, Hisn al-Muslim).
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout with Quick Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 bg-[#031711] border border-white/10 rounded-2xl p-4 space-y-1.5 text-xs">
              <p className="font-bold text-amber-400 uppercase tracking-wider text-[11px] mb-2 px-2">
                Table of Contents
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

          {/* Main Legal Text */}
          <div className="lg:col-span-3 space-y-10 text-sm leading-relaxed text-emerald-100/90">
            
            {/* Section 1 */}
            <section id="acceptance" className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <span>1.</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p>
                By downloading, accessing, browsing, or using the <strong>Noor-e-ilahi</strong> website (<Link href="https://www.nooreilahi.com" className="text-amber-300 underline underline-offset-2">www.nooreilahi.com</Link>) or our mobile applications (on Android via Google Play or iOS via Apple App Store), you agree to be bound by these Terms and Conditions and our accompanying <Link href="/privacy" className="text-amber-300 underline underline-offset-2">Privacy Policy</Link>.
              </p>
              <p>
                If you do not agree with any part of these Terms, you must discontinue using our services and uninstall the application from your device.
              </p>
            </section>

            {/* Section 2 */}
            <section id="scope-services" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <span>2.</span>
                <span>Description of Services (Web & Mobile)</span>
              </h2>
              <p>
                Noor-e-ilahi provides a comprehensive digital Islamic worship suite, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-emerald-200/80 pl-2">
                <li><strong>Precision Prayer Timetables:</strong> Solar calculation algorithms with adhan notification options.</li>
                <li><strong>The Noble Qur'an:</strong> 114 Surahs with continuous Mushaf flow, ayah translations, and audio recitations.</li>
                <li><strong>Smooth Qibla Compass:</strong> Gyroscope and magnetometer orientation pointing towards the Holy Kaaba in Makkah.</li>
                <li><strong>Zakat & Nisab Calculator:</strong> Shariah-compliant 2.5% asset valuation in multiple global currencies.</li>
                <li><strong>Hisn al-Muslim & Authentic Duas:</strong> Categorized supplications with Arabic script, transliteration, and audio.</li>
                <li><strong>Islamic Guides:</strong> Step-by-step guides for Wudu, Ghusl, Salah, Janazah, Hajj & Umrah, and the 5 Pillars of Nikah.</li>
                <li><strong>Ziyarat Directory:</strong> Verified historical Islamic shrines and spiritual heritage documentation.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="religious-disclaimer" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>3. Religious & Astronomical Timetable Disclaimer</span>
              </h2>
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Important Note on Salah Times & Qibla Direction</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  Prayer timetables are computed utilizing established astronomical solar equations and recognized calculation conventions (e.g., Umm Al-Qura University Makkah, Muslim World League, ISNA, Egyptian General Authority, University of Islamic Sciences Karachi).
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-emerald-300/80 pl-2">
                  <li><strong>Local Congregation (Jama'ah):</strong> Atmospheric anomalies, altitude differences, or differing local fiqh rulings can introduce slight variations. We strongly urge all believers to adhere to their local masjid for congregation prayer times.</li>
                  <li><strong>Qibla Compass Accuracy:</strong> Smartphone compass sensors are subject to magnetic interference from metal structures, phone cases, and uncalibrated magnetometers. We advise waving your phone in a figure-8 motion before prayer.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="zakat-disclaimer" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>4. Zakat Calculator & Fiqh Estimates</span>
              </h2>
              <p>
                The Zakat Calculator tool on our website and mobile application is designed as an <strong>educational estimation utility</strong> based on classic Shariah parameters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs text-emerald-300/80 pl-2">
                <li>Gold Nisab benchmarked at 85 grams (or 7.5 tola).</li>
                <li>Silver Nisab benchmarked at 595 grams (or 52.5 tola).</li>
                <li>Standard 2.5% rate applied to net liquid assets held for one full lunar year (Hawl).</li>
              </ul>
              <p className="text-xs text-emerald-400/80">
                While we strive for precision in live market conversions, complex financial questions (such as mixed corporate shares, non-standard real estate, retirement 401k vesting, or inheritance settlement) should be referred to a qualified Islamic scholar or local mufti.
              </p>
            </section>

            {/* Section 5 */}
            <section id="intellectual-property" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>5. Intellectual Property & Sacred Texts</span>
              </h2>
              <p>
                <strong>The Divine Scripture:</strong> The Arabic text of the Holy Qur'an is the divine word of Allah (SWT) and belongs to the sacred heritage of humanity. Translated meanings and recitations are credited to their respective scholars and reciters.
              </p>
              <p>
                <strong>Software & Branding:</strong> The Noor-e-ilahi platform code, application user interface, logos, graphics, compilation of guides, and domain names are the intellectual property of Noor-e-ilahi. You may not decompile, reverse-engineer, copy, redistribute, or exploit any proprietary code or brand assets for commercial purposes without prior written consent.
              </p>
            </section>

            {/* Section 6 */}
            <section id="user-conduct" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Scale className="w-5 h-5 text-amber-400" />
                <span>6. User Conduct & Acceptable Use</span>
              </h2>
              <p>
                You agree to use Noor-e-ilahi solely for lawful, spiritual, and educational purposes. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-emerald-300/80 pl-2">
                <li>Attempt to bypass, disrupt, or overwhelm our API servers or databases via denial-of-service (DoS) or automated scraping.</li>
                <li>Transmit malicious software, worms, or harmful viruses.</li>
                <li>Misrepresent yourself as a representative or scholar of Noor-e-ilahi.</li>
                <li>Use contact forms to transmit spam, abusive language, or defamatory content.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="third-party-media" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Globe className="w-5 h-5 text-amber-400" />
                <span>7. Third-Party Links & Live Broadcasts</span>
              </h2>
              <p>
                Our services include embeds to live 24/7 official broadcasts of Masjid al-Haram (Makkah) and Masjid an-Nabawi (Madinah) hosted via YouTube. We do not control or endorse the infrastructure of third-party platforms. Your interaction with external services is subject to their respective terms of service.
              </p>
            </section>

            {/* Section 8 */}
            <section id="warranty-disclaimer" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>8. Disclaimer of Warranties</span>
              </h2>
              <p>
                The services, software, data, and content provided on Noor-e-ilahi are delivered on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without warranties of any kind, whether express or implied.
              </p>
              <p className="text-xs text-emerald-300/80">
                While we exert every technical effort to ensure uninterrupted availability and accurate calculations, we do not warrant that our servers will be completely error-free, uninterrupted, or that network-dependent adhan notifications will trigger without device battery-saver interruptions.
              </p>
            </section>

            {/* Section 9 */}
            <section id="liability-limitation" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Scale className="w-5 h-5 text-amber-400" />
                <span>9. Limitation of Liability</span>
              </h2>
              <p>
                To the fullest extent permitted by applicable law, Noor-e-ilahi, its developers, volunteers, and contributors shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-emerald-300/80 pl-2">
                <li>Your use or inability to use the platform.</li>
                <li>Any reliance on prayer timetables, Qibla compass readings, or Zakat calculation estimates.</li>
                <li>Hardware inaccuracies or GPS deviations on user devices.</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section id="governing-law" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>10. Governing Law & Modifications</span>
              </h2>
              <p>
                These Terms shall be interpreted and governed in accordance with applicable general law, guided fundamentally by Islamic principles of equity, mutual consent, and ethical transparency.
              </p>
              <p>
                We reserve the right to revise these Terms at any time. When modifications occur, the "Effective Date" at the top of this document will be updated. Continued use of our apps or website constitutes acceptance of the amended terms.
              </p>
            </section>

            {/* Section 11 */}
            <section id="contact" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Mail className="w-5 h-5 text-amber-400" />
                <span>11. Official Contact Information</span>
              </h2>
              <p>
                If you have questions, feedback, or legal inquiries concerning these Terms and Conditions, please contact our team:
              </p>
              
              <div className="bg-gradient-to-r from-[#031d15] to-[#01140e] border border-amber-500/30 rounded-2xl p-6 mt-4">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Reach Out to the Noor-e-ilahi Team</span>
                </h4>
                <p className="text-xs text-emerald-300/80 mb-4">
                  We welcome feedback from scholars, community members, and users worldwide:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <a
                    href="mailto:salam@nooreilahi.com"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-500/25 transition-colors"
                  >
                    <span>✉️</span>
                    <span>salam@nooreilahi.com</span>
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold hover:bg-emerald-500/25 transition-colors"
                  >
                    <span>Official Contact Portal →</span>
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
