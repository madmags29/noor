'use client';

// ============================================================
// NOOR Web — Monetization, Pro Membership & Mobile Store Showcase
// ============================================================

import React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Sparkles,
  Check,
  Apple,
  Play,
  ShieldCheck,
  Heart,
  Crown,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MonetizationSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* 1. App Store & Google Play Hero Banner */}
      <div className="liquid-glass-gold rounded-[2.5rem] p-8 sm:p-12 border border-amber-500/40 relative overflow-hidden mb-12 shadow-2xl">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 liquid-pill px-3.5 py-1 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('proBannerBadge')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {t('carryLightHeading')}
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl leading-relaxed">
              {t('carryLightDesc')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/app-preview"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-xs shadow-xl shadow-amber-500/30 transition-all flex items-center gap-2 border border-white/25 hover:scale-[1.02] whitespace-nowrap"
              >
                <Smartphone className="w-4 h-4" />
                <span>{t('openSimulator')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/app-preview"
                className="liquid-pill px-5 py-3.5 rounded-2xl text-xs font-bold text-white hover:text-amber-300 flex items-center gap-2 whitespace-nowrap"
              >
                <Apple className="w-4 h-4" />
                <span>{t('appStoreDetails')}</span>
              </Link>

              <Link
                href="/app-preview"
                className="liquid-pill px-5 py-3.5 rounded-2xl text-xs font-bold text-white hover:text-amber-300 flex items-center gap-2 whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{t('googlePlayPackage')}</span>
              </Link>
            </div>
          </div>

          {/* Quick Pricing Badge */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="liquid-glass rounded-3xl p-6 border border-white/20 text-center w-full max-w-sm space-y-3">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                {t('ethicalHalalModel')}
              </span>
              <div className="text-3xl font-black text-white font-mono">
                {t('freeForever')}
              </div>
              <span className="text-xs text-amber-300 font-bold block">
                {t('optionalSupporter')}
              </span>
              <p className="text-[11px] text-emerald-300/70 leading-normal">
                {t('supporterDesc')}
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="text-xs text-amber-400 hover:text-white font-bold inline-flex items-center gap-1 underline"
                >
                  {t('viewTelemetry')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Three Pillars of Ethical Monetization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold mb-4 border border-amber-500/30">
              <Crown className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">{t('proMembershipTitle')}</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">
              {t('proMembershipDesc')}
            </p>
            <ul className="space-y-1.5 text-xs text-emerald-300/80 font-medium">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('proFeat1')}</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('proFeat2')}</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('proFeat3')}</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-white/10 mt-5 text-xs text-amber-300 font-bold">
            {t('proPrice')}
          </div>
        </div>

        <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold mb-4 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">{t('verifiedDirectoryTitle')}</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">
              {t('verifiedDirectoryDesc')}
            </p>
            <ul className="space-y-1.5 text-xs text-emerald-300/80 font-medium">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('halalFeat1')}</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('halalFeat2')}</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('halalFeat3')}</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-white/10 mt-5 text-xs text-amber-300 font-bold">
            {t('halalTag')}
          </div>
        </div>

        <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold mb-4 border border-teal-500/30">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">{t('digitalWaqfTitle')}</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">
              {t('digitalWaqfDesc')}
            </p>
            <ul className="space-y-1.5 text-xs text-emerald-300/80 font-medium">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('waqfFeat1')}</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('waqfFeat2')}</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> {t('waqfFeat3')}</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-white/10 mt-5 text-xs text-amber-300 font-bold">
            {t('waqfTag')}
          </div>
        </div>
      </div>
    </section>
  );
};
