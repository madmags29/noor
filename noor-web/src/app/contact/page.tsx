'use client';

// ============================================================
// NOOR Web — Contact & Inquiries Gateway
// Dedicated portal for Business, Feedback, Complaints & Islamic Support
// Direct routing to salam@nooreilahi.com
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Send,
  Briefcase,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Phone,
  Building,
  User,
  Info
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { MuslimLogo } from '../../components/MuslimLogo';
import { useLanguage } from '../../context/LanguageContext';

type QueryCategory = 'business' | 'feedback' | 'complaint' | 'general';

interface CategoryOption {
  id: QueryCategory;
  label: string;
  icon: React.ReactNode;
  badge: string;
  description: string;
  placeholder: string;
}

export default function ContactPage() {
  const { t } = useLanguage();

  const [category, setCategory] = useState<QueryCategory>('business');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [shariahAgreement, setShariahAgreement] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ ticketId: string; message: string } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const CATEGORIES: CategoryOption[] = [
    {
      id: 'business',
      label: 'Business Queries & Partnerships',
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      badge: 'B2B & Halal',
      description: 'Explore Halal ecosystem partnerships, API licenses, Zakat integrations, or pilgrimage services.',
      placeholder: 'Describe your organization, proposal, and how we can collaborate in service of the global Ummah...',
    },
    {
      id: 'feedback',
      label: 'Feedback & Feature Suggestions',
      icon: <MessageSquare className="w-4 h-4 text-emerald-400" />,
      badge: 'Community',
      description: 'Share ideas to improve Noor-e-ilahi: new Quran reciters, UI enhancements, or mobile features.',
      placeholder: 'We cherish your perspective! Tell us what features or refinements you would love to see...',
    },
    {
      id: 'complaint',
      label: 'Complaints & Technical Issues',
      icon: <AlertCircle className="w-4 h-4 text-rose-400" />,
      badge: 'High Priority',
      description: 'Report prayer time variances, audio streaming bugs, or application anomalies.',
      placeholder: 'Please provide exact details (city name, device type, or error screen) so our engineers can resolve it swiftly...',
    },
    {
      id: 'general',
      label: 'General & Classical Inquiries',
      icon: <HelpCircle className="w-4 h-4 text-sky-400" />,
      badge: 'Deen Support',
      description: 'Questions regarding platform authenticity, classical sources (Hisn al-Muslim, Ziyarat), or foundation activities.',
      placeholder: 'Write your inquiry here with any relevant context or questions...',
    },
  ];

  const activeCategoryConfig = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('salam@nooreilahi.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address so we can reply.');
      return;
    }
    if (!subject.trim()) {
      setErrorMsg('Please specify a subject for your inquiry.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Please write your message in detail (at least 10 characters).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          organization,
          category,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccessData({
        ticketId: data.ticketId,
        message: data.message,
      });

      // Reset fields
      setName('');
      setEmail('');
      setPhone('');
      setOrganization('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error submitting inquiry. You can also email us directly at salam@nooreilahi.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02120d] text-emerald-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <GlobalNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-12">
        
        {/* Top Hero & Salam Greeting */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-amber-300 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Official Communication</span>
          </div>

          <p className="text-sm font-arabic text-amber-400/90 tracking-widest pt-1">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ • السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-200 to-amber-400">Noor-e-ilahi</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-300/80 leading-relaxed">
            Whether you have a strategic business partnership proposal, platform feedback, a technical bug report, or a classical knowledge inquiry, our team is at your service.
          </p>
        </section>

        {/* Highlighted Official Email Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/90 via-[#031d16] to-[#04241b] border border-amber-400/30 p-6 sm:p-8 shadow-2xl shadow-emerald-950/50">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Mail className="w-4 h-4" />
                <span>Primary Islamic & Business Inbox</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-white selection:bg-amber-300 selection:text-black">
                  salam@nooreilahi.com
                </span>
                
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 text-xs font-bold transition-all active:scale-95"
                  title="Copy email to clipboard"
                >
                  {emailCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{emailCopied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                </button>
              </div>

              <p className="text-xs text-emerald-300/80 max-w-xl">
                All inquiries submitted through this form or sent directly to <strong className="text-white">salam@nooreilahi.com</strong> are monitored round the clock by our dedicated support and executive team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="mailto:salam@nooreilahi.com?subject=Inquiry%20from%20Noor-e-ilahi%20Visitor"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#02120d] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Mail App</span>
              </a>

              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 text-xs text-emerald-200">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24-Hour Reply Commitment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid: Interactive Form & Sidebar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (8 cols): The Form */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#031812] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Send a Direct Message</span>
                  <span className="text-xs font-normal text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Routes to salam@nooreilahi.com
                  </span>
                </h2>
                <p className="text-xs text-emerald-300/70 mt-1">
                  Choose the category that best describes your request for prompt handling:
                </p>
              </div>

              {/* Category Selector Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-900/40 border-amber-400 shadow-md shadow-amber-400/10 ring-1 ring-amber-400/50'
                          : 'bg-[#02140e]/60 border-white/5 hover:border-emerald-500/30 hover:bg-[#021912]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 font-bold text-xs text-white">
                          {cat.icon}
                          <span>{cat.label}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                          isSelected ? 'bg-amber-400 text-black' : 'bg-white/10 text-emerald-300/80'
                        }`}>
                          {cat.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-300/60 leading-tight">
                        {cat.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Success Notification Banner */}
              {successData && (
                <div className="mb-8 p-6 rounded-2xl bg-emerald-950/90 border border-emerald-400/50 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white">
                        Inquiry Received at salam@nooreilahi.com!
                      </h3>
                      <p className="text-xs text-emerald-200/90 leading-relaxed">
                        {successData.message}
                      </p>
                      <div className="inline-flex items-center gap-2 pt-2">
                        <span className="text-[11px] text-emerald-400 font-mono">
                          Reference Ticket: <strong className="text-amber-300">{successData.ticketId}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-500/20 flex justify-end">
                    <button
                      onClick={() => setSuccessData(null)}
                      className="text-xs text-amber-300 hover:text-white underline font-medium"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Name <span className="text-rose-400">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Tariq Mansoor"
                      className="w-full bg-[#010e0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-800 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>Email Address <span className="text-rose-400">*</span></span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. tariq@domain.com"
                      className="w-full bg-[#010e0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-800 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Organization (Optional) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Organization / Company (Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Al-Noor Islamic Foundation"
                      className="w-full bg-[#010e0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-800 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp (Optional) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Phone / WhatsApp (Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +966 50 123 4567"
                      className="w-full bg-[#010e0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-800 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-emerald-200">
                    Subject Line <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={`e.g. [${activeCategoryConfig.badge}] Regarding Noor-e-ilahi platform collaboration`}
                    className="w-full bg-[#010e0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-800 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-emerald-200">
                      Message & Details <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-emerald-400/60">
                      Minimum 10 characters
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={activeCategoryConfig.placeholder}
                    className="w-full bg-[#010e0a] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-emerald-800 focus:outline-none focus:border-amber-400 transition-colors resize-y leading-relaxed"
                  />
                </div>

                {/* Shariah & Confidentiality Pledge */}
                <div className="pt-1 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="shariahCheck"
                    checked={shariahAgreement}
                    onChange={(e) => setShariahAgreement(e.target.checked)}
                    className="mt-0.5 accent-amber-400 rounded cursor-pointer"
                  />
                  <label htmlFor="shariahCheck" className="text-[11px] text-emerald-300/70 select-none cursor-pointer">
                    I verify that this inquiry is authentic and adheres to ethical, lawful, and sincere standards. All messages are treated with utmost confidentiality.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-emerald-400/60 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Transmitted securely to salam@nooreilahi.com</span>
                  </p>

                  <button
                    type="submit"
                    disabled={loading || !shariahAgreement}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-[#02120d] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-[#02120d] border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting to salam@nooreilahi.com...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>

          {/* Right Column (4 cols): Context, Guidelines & FAQs */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Contact Info Card */}
            <div className="bg-[#031812] border border-emerald-500/20 rounded-3xl p-6 space-y-5 shadow-lg">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Contact Channels</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-2xl bg-[#02120d] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-amber-400">Official Email</span>
                  <p className="text-white font-mono font-bold text-sm">salam@nooreilahi.com</p>
                  <p className="text-[11px] text-emerald-300/60">Primary correspondence for Ummah, B2B, and technical feedback.</p>
                </div>

                <div className="p-3 rounded-2xl bg-[#02120d] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">Response Window</span>
                  <p className="text-white font-bold">Within 24 Hours</p>
                  <p className="text-[11px] text-emerald-300/60">Monitored continuously across Makkah, London, and international timezones.</p>
                </div>

                <div className="p-3 rounded-2xl bg-[#02120d] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-sky-400">Mobile App Companion</span>
                  <p className="text-white font-bold">iOS & Android App</p>
                  <p className="text-[11px] text-emerald-300/60">Available on App Store & Google Play with in-app support chat.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <Link
                  href="/app-preview"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-200 text-xs font-medium flex items-center justify-between transition-colors"
                >
                  <span>Explore Mobile App Suite</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>
            </div>

            {/* Inquiries FAQ Accordion */}
            <div className="bg-[#031812] border border-emerald-500/20 rounded-3xl p-6 space-y-4 shadow-lg">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-100">How do I propose a Halal business partnership?</p>
                  <p className="text-[11px] text-emerald-300/70 leading-relaxed">
                    Select <strong>Business Queries</strong> above or write to <strong>salam@nooreilahi.com</strong> outlining your venture, alignment with Islamic ethics, and integration ideas.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-white/5">
                  <p className="font-semibold text-emerald-100">I noticed a prayer time discrepancy in my city</p>
                  <p className="text-[11px] text-emerald-300/70 leading-relaxed">
                    Please select <strong>Complaints & Technical Issues</strong> and provide your exact city name or GPS coordinates. Our astronomical calculation team audits calculations against local Awqaf authorities.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-white/5">
                  <p className="font-semibold text-emerald-100">Are my messages and email protected?</p>
                  <p className="text-[11px] text-emerald-300/70 leading-relaxed">
                    Yes. Noor-e-ilahi maintains a zero-data-monetization policy. Your details are never rented, sold, or shared with third-party advertisers.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
