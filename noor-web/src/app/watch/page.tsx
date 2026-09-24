'use client';

// ============================================================
// NOOR Web — NOOR Watch (Curated Permitted Islamic Media Hub)
// Licensed & Permitted Embeds: Quran, Seerah, History, Hajj, Kids
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Film,
  Sparkles,
  Radio,
  BookOpen,
  Compass,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { PERMITTED_VIDEOS, PermittedVideo } from '../../data/islamicCoreData';

export default function WatchPage() {
  const [activeVideo, setActiveVideo] = useState<PermittedVideo>(PERMITTED_VIDEOS[0]);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const filteredVideos = PERMITTED_VIDEOS.filter(v => {
    return selectedCat === 'All' || v.category === selectedCat;
  });

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
      </div>

      <GlobalNavbar />

      {/* Header Breadcrumb */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                  NOOR Watch
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Licensed & Permitted Embeds
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                24/7 Makkah & Madinah Live • Master Quran Recitations • Seerah Documentaries
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* Featured Video Player */}
        <div className="bg-[#031c15] border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl">
          <div className="aspect-video w-full bg-black relative">
            <iframe
              src={activeVideo.sourceUrl}
              title={activeVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#031c15] border-t border-white/10">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeVideo.category} • {activeVideo.duration}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                {activeVideo.title}
              </h2>
              <p className="text-xs text-emerald-300 mt-0.5">
                {activeVideo.subtitle}
              </p>
            </div>

            <span className="text-xs font-mono text-zinc-400 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
              Strictly Licensed & Permitted Embed
            </span>
          </div>
        </div>

        {/* Video Library Catalog */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-serif text-white">
              Curated Islamic Video Library
            </h3>

            {/* Category filter */}
            <div className="flex items-center gap-1.5 text-xs">
              {['All', 'Live', 'Quran', 'Seerah'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    selectedCat === cat
                      ? 'bg-amber-500 text-black shadow'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map(vid => {
              const isPlaying = activeVideo.id === vid.id;
              return (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-all group ${
                    isPlaying
                      ? 'border-amber-500 bg-[#042d22] shadow-lg'
                      : 'border-white/5 bg-[#031c15] hover:border-emerald-500/40'
                  }`}
                >
                  <div className="aspect-video relative overflow-hidden bg-black/50">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="w-10 h-10 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </span>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 block uppercase font-mono">
                      {vid.category}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {vid.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">
                      {vid.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
