'use client';

// ============================================================
// NOOR Web & Mobile — Comprehensive Privacy Policy
// Covers: Website (www.nooreilahi.com) & Mobile Apps (Android / iOS)
// Built with strict adherence to Google Play Data Safety, Apple Privacy Guidelines, GDPR, and Shariah Amanah
// ============================================================

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  MapPin,
  Volume2,
  Database,
  Smartphone,
  Globe,
  Sparkles,
  CheckCircle2,
  Mail,
  FileText,
  Clock,
  ExternalLink,
  HeartHandshake
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 28, 2026';

  const sections = [
    { id: 'introduction', title: '1. Introduction & Our Sacred Trust (Amanah)' },
    { id: 'scope', title: '2. Scope: Web Platform & Mobile Applications' },
    { id: 'information-we-process', title: '3. Information We Process & Why' },
    { id: 'location-data', title: '4. Location Data (Prayer & Qibla)' },
    { id: 'audio-permissions', title: '5. Audio & Microphone Permissions' },
    { id: 'device-storage', title: '6. On-Device Storage & Preferences' },
    { id: 'third-parties', title: '7. Zero Ads & Third-Party Services' },
    { id: 'children-privacy', title: "8. Children's Privacy (COPPA / GDPR-K)" },
    { id: 'data-security', title: '9. Security & Encryption in Transit' },
    { id: 'user-rights', title: '10. Your Rights & Data Erasure' },
    { id: 'changes', title: '11. Policy Updates & Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#02120d] text-[#f3f4f6] flex flex-col selection:bg-amber-500 selection:text-black">
      <GlobalNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-emerald-400/80 mb-6 font-mono">
          <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Privacy Policy</span>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063828] via-[#021c14] to-[#010e0a] border border-emerald-500/20 p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <ShieldCheck className="w-4 h-4" />
              <span>Amanah & Privacy First</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Privacy Policy
            </h1>

            <p className="text-base sm:text-lg text-emerald-200/85 leading-relaxed mb-6">
              Welcome to <strong>Noor-e-ilahi</strong>. We hold your personal privacy as a sacred trust (<span className="text-amber-300 font-semibold">أمانة</span>). This policy details our uncompromising commitment to your digital dignity across both our <strong>website</strong> and <strong>mobile applications</strong>.
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

        {/* Core Guarantees Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
              <EyeOff className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Zero Ads & Zero Tracking</h3>
              <p className="text-xs text-emerald-300/75 leading-relaxed">
                No third-party ad networks, no retargeting pixels, and no data brokers. We never sell your personal data.
              </p>
            </div>
          </div>

          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Ephemeral Location</h3>
              <p className="text-xs text-emerald-300/75 leading-relaxed">
                GPS is strictly used locally on your device to calculate prayer times and Qibla. Your coordinates are never saved.
              </p>
            </div>
          </div>

          <div className="bg-[#031c14]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Client-Side Storage</h3>
              <p className="text-xs text-emerald-300/75 leading-relaxed">
                Your bookmarks, reciter preferences, and Zakat notes reside exclusively on your physical phone or browser.
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
                Quick Navigation
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
            <section id="introduction" className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <span>1.</span>
                <span>Introduction & Our Sacred Trust (Amanah)</span>
              </h2>
              <p>
                In the Islamic tradition, trust (<span className="text-amber-300 italic">Amanah</span>) is among the most solemn responsibilities a believer can undertake. At <strong>Noor-e-ilahi</strong>, we recognize that your religious devotion, daily prayer schedules, Quranic study, and supplications represent deeply personal spiritual acts.
              </p>
              <p>
                Our philosophy is simple: <strong>Technology should serve your worship, never exploit it.</strong> We have architected both our web platform and mobile applications with a privacy-by-design posture, minimizing data collection to only what is strictly required to execute core Islamic mathematical and informational algorithms.
              </p>
            </section>

            {/* Section 2 */}
            <section id="scope" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <span>2.</span>
                <span>Scope: Web Platform & Mobile Applications</span>
              </h2>
              <p>
                This Privacy Policy uniformly governs all services, software, and platforms operated by Noor-e-ilahi, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-emerald-200/80 pl-2">
                <li>
                  <strong>The Noor-e-ilahi Website:</strong> Accessible at <Link href="https://www.nooreilahi.com" className="text-amber-300 underline underline-offset-2">https://www.nooreilahi.com</Link> and all associated subdomains.
                </li>
                <li>
                  <strong>The Noor-e-ilahi Android Mobile Application:</strong> Distributed via the Google Play Store (<code className="text-amber-300 text-xs bg-black/40 px-1.5 py-0.5 rounded font-mono">com.noor.app</code>).
                </li>
                <li>
                  <strong>The Noor-e-ilahi iOS Mobile Application:</strong> Distributed via the Apple App Store.
                </li>
                <li>
                  <strong>Back-End Calculation APIs:</strong> Real-time astronomical calculation microservices used to deliver accurate prayer timetables.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="information-we-process" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <span>3.</span>
                <span>Information We Process & Why</span>
              </h2>
              <p>
                We collect and process only the minimal information required to deliver high-precision Islamic utility tools:
              </p>
              <div className="bg-[#031a13] border border-emerald-500/20 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-950/60 text-amber-300 border-b border-white/10">
                      <th className="p-3.5 font-bold">Category</th>
                      <th className="p-3.5 font-bold">What is Collected</th>
                      <th className="p-3.5 font-bold">Purpose</th>
                      <th className="p-3.5 font-bold">Storage Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-emerald-200/85">
                    <tr>
                      <td className="p-3.5 font-semibold text-white">Location</td>
                      <td className="p-3.5">Approximate (City) or Precise (GPS) latitude & longitude</td>
                      <td className="p-3.5">Astronomical solar calculation of 5 daily Salah & Qibla direction</td>
                      <td className="p-3.5 text-amber-300 font-mono">Ephemeral (In-Memory Only)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-white">Preferences</td>
                      <td className="p-3.5">Reciter choice, Madhab, calculation method, bookmarked surahs</td>
                      <td className="p-3.5">Personalize your reading and audio experience</td>
                      <td className="p-3.5 text-amber-300 font-mono">Your Device (LocalStorage / AsyncStorage)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-white">Zakat Data</td>
                      <td className="p-3.5">Asset inputs (Cash, Gold, Silver, Debts)</td>
                      <td className="p-3.5">Compute 2.5% Shariah Nisab calculation</td>
                      <td className="p-3.5 text-amber-300 font-mono">Your Device (Never Sent to Servers)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-white">Contact Forms</td>
                      <td className="p-3.5">Name, email, and inquiry message (if voluntarily submitted)</td>
                      <td className="p-3.5">Responding to support or scholarly queries</td>
                      <td className="p-3.5 text-amber-300 font-mono">Secure Support Inbox (salam@nooreilahi.com)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section id="location-data" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>4. Location Data (Prayer Times & Qibla Compass)</span>
              </h2>
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Google Play Data Safety & Apple App Privacy Compliance</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  Both our mobile app and website request access to your device’s location (<code className="text-amber-300 font-mono text-[11px]">ACCESS_FINE_LOCATION</code> and <code className="text-amber-300 font-mono text-[11px]">ACCESS_COARSE_LOCATION</code>). Here is our strict pledge:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-emerald-300/80 pl-2">
                  <li><strong>Ephemeral Processing:</strong> Your geographic coordinates are used strictly in real-time memory to calculate the angle of the sun and the great-circle bearing to the Holy Kaaba in Makkah.</li>
                  <li><strong>Zero Location History:</strong> We do not track your movements, log your travel history, or associate your location with an advertising profile or unique device identifier.</li>
                  <li><strong>Never Shared:</strong> Your location is never sold, shared, or transmitted to third-party advertisers, data aggregators, or brokers.</li>
                  <li><strong>Manual Override:</strong> You can completely deny GPS permission and choose your city manually from our built-in global database of over 10,000 cities.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="audio-permissions" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Volume2 className="w-5 h-5 text-amber-400" />
                <span>5. Audio & Microphone Permissions</span>
              </h2>
              <p>
                Noor-e-ilahi features complete 114 Surahs audio streaming by renowned reciters (Sheikh Mishary Rashid Alafasy, Sheikh Abdul Basit, Sheikh Abdur-Rahman As-Sudais, Sheikh Saad Al-Ghamdi) and Hisn al-Muslim audio supplications.
              </p>
              <div className="bg-[#031c14] border border-white/10 rounded-2xl p-5 space-y-2">
                <p className="text-xs text-emerald-200/90">
                  <strong>Audio Playback Only:</strong> Audio permissions are utilized solely to output Quranic recitation through your device speakers or headphones, including background playback.
                </p>
                <p className="text-xs text-emerald-200/90">
                  <strong>No Microphone Access:</strong> Noor-e-ilahi does <strong>NOT</strong> request or access your microphone. We do not record ambient sound, speech, or conversations.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="device-storage" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Database className="w-5 h-5 text-amber-400" />
                <span>6. On-Device Storage & Preferences</span>
              </h2>
              <p>
                To provide a seamless experience without requiring account creation or passwords, user preferences are stored directly on your physical client hardware:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs text-emerald-300/80 pl-2">
                <li><strong>Web Platform:</strong> Handled through standard browser <code className="text-amber-300 font-mono">localStorage</code>.</li>
                <li><strong>Mobile Applications:</strong> Handled through encrypted sandboxed <code className="text-amber-300 font-mono">AsyncStorage</code>.</li>
                <li><strong>Data Types:</strong> Last-read Surah and Ayah position, font sizing, active translation language, Qada prayer count, and favorite Dhikr bookmarks.</li>
              </ul>
              <p className="text-xs text-emerald-400/80">
                Because this data resides strictly on your hardware, uninstalling the app or clearing your browser cache instantly and completely deletes all saved data.
              </p>
            </section>

            {/* Section 7 */}
            <section id="third-parties" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>7. Zero Obscene Ads & Third-Party Services</span>
              </h2>
              <p>
                Many Islamic apps compromise spiritual purity by embedding commercial ad banners that display inappropriate imagery or invasive trackers. <strong>Noor-e-ilahi is 100% Free and Ad-Free.</strong>
              </p>
              <p>
                We do not include third-party advertising SDKs (such as Google AdMob, Unity, Meta Audience Network, or AppLovin). The only external integrations are:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs text-emerald-300/80 pl-2">
                <li>
                  <strong>Haramain Live Video Streams:</strong> Embedded official 24/7 Makkah and Madinah satellite broadcasts provided via official YouTube embeds (governed by the <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline">Google Privacy Policy</Link>).
                </li>
                <li>
                  <strong>Astronomical Calculation Services:</strong> Public astronomical databases (such as Aladhan API) queried anonymously without personal user identifiers.
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="children-privacy" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <HeartHandshake className="w-5 h-5 text-amber-400" />
                <span>8. Children's Privacy (COPPA & GDPR-K Compliance)</span>
              </h2>
              <p>
                Noor-e-ilahi provides family-friendly Islamic educational content, including Prophetic stories, basic Kalimas, and child-friendly Wudu instructions in our Kids section.
              </p>
              <p>
                We strictly comply with the <strong>Children's Online Privacy Protection Act (COPPA)</strong> and Article 8 of the <strong>GDPR</strong>. We do not knowingly solicit, collect, or retain personally identifiable information from children under the age of 13 (or under 16 in the European Union). The app requires no registration and can be safely used by children under parental supervision.
              </p>
            </section>

            {/* Section 9 */}
            <section id="data-security" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Lock className="w-5 h-5 text-amber-400" />
                <span>9. Security & Encryption in Transit</span>
              </h2>
              <p>
                All communications between the Noor-e-ilahi web client, mobile apps, and our API servers are enforced using <strong>Transport Layer Security (TLS 1.3 / HTTPS)</strong> with strong cipher suites. This prevents eavesdropping, man-in-the-middle attacks, or packet inspection when accessing prayer schedules or Quran audio over public Wi-Fi networks.
              </p>
            </section>

            {/* Section 10 */}
            <section id="user-rights" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>10. Your Rights & Data Erasure</span>
              </h2>
              <p>
                Depending on your jurisdiction (such as the GDPR in Europe, the CCPA in California, or the DPDP Act in India), you possess fundamental data rights, including:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-emerald-300/80 pl-2">
                <li>The right to know what data is collected.</li>
                <li>The right to request the complete deletion of any communications or records.</li>
                <li>The right to withdraw location permissions at any time via your device operating system settings.</li>
              </ul>
              <p>
                Since Noor-e-ilahi operates without mandatory accounts, you have direct, instantaneous autonomy: clearing app cache or uninstalling the app permanently purges all client-side data.
              </p>
            </section>

            {/* Section 11 */}
            <section id="changes" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 text-amber-400">
                <Mail className="w-5 h-5 text-amber-400" />
                <span>11. Policy Updates & Official Contact</span>
              </h2>
              <p>
                We may periodically update this Privacy Policy to reflect changes in legal regulations, platform features, or store requirements. Any modifications will be posted to this page with an updated "Effective Date".
              </p>
              
              <div className="bg-gradient-to-r from-[#031d15] to-[#01140e] border border-amber-500/30 rounded-2xl p-6 mt-4">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Have questions regarding your privacy?</span>
                </h4>
                <p className="text-xs text-emerald-300/80 mb-4">
                  For privacy inquiries, security reports, or data questions, contact our development team directly:
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
