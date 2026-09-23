'use client';

// ============================================================
// NOOR Web — Dedicated Islamic Media Gallery Page (Pixabay API)
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  Video,
  ArrowLeft,
  Search,
  Heart,
  Eye,
  Play,
  X,
  Sparkles,
  Download
} from 'lucide-react';
import {
  fetchPixabayImages,
  fetchPixabayVideos,
  PixabayImageItem,
  PixabayVideoItem,
  FALLBACK_IMAGES
} from '../../lib/pixabayService';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

export default function MediaPage() {
  const [mediaType, setMediaType] = useState<'photos' | 'videos'>('photos');
  const [query, setQuery] = useState('islamic mosque');
  const [images, setImages] = useState<PixabayImageItem[]>(FALLBACK_IMAGES);
  const [videos, setVideos] = useState<PixabayVideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<PixabayImageItem | PixabayVideoItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (mediaType === 'photos') {
      fetchPixabayImages(query, 24)
        .then(res => { if (isMounted) setImages(res); })
        .finally(() => { if (isMounted) setLoading(false); });
    } else {
      fetchPixabayVideos(query, 12)
        .then(res => { if (isMounted) setVideos(res); })
        .finally(() => { if (isMounted) setLoading(false); });
    }

    return () => { isMounted = false; };
  }, [mediaType, query]);

  const preset = ['Makkah', 'Madinah', 'Holy Quran', 'Islamic Architecture', 'Calligraphy', 'Mosque Twilight'];

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Universal Global Navigation Dock */}
      <GlobalNavbar />

      {/* Sub-Header Breadcrumb & Title */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-3 mt-1 sm:mt-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white">Islamic Visual Gallery</h1>
              <p className="text-[10px] text-emerald-300/70">
                High-Resolution Photos & 4K Cinematography Powered by Pixabay API
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-black/40 p-1.5 rounded-full border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setMediaType('photos')}
                className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  mediaType === 'photos'
                    ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => setMediaType('videos')}
                className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  mediaType === 'videos'
                    ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Videos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-8">
        {/* Preset Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {preset.map(p => (
            <button
              key={p}
              onClick={() => setQuery(p)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                query.toLowerCase() === p.toLowerCase()
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'liquid-pill text-emerald-200 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="py-24 text-center text-amber-300 font-bold flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span>Loading sacred imagery from Pixabay...</span>
          </div>
        ) : mediaType === 'photos' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(img => (
              <div
                key={img.id}
                onClick={() => setPreview(img)}
                className="group relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 aspect-[4/3] cursor-pointer hover:border-amber-400/60 transition-all hover:scale-[1.02] shadow-xl"
              >
                <img
                  src={img.webformatUrl || img.previewUrl}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=85';
                  }}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-xs font-bold text-white truncate">{img.title}</span>
                  <div className="flex items-center gap-3 text-[10px] text-emerald-300/80 mt-1">
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-amber-400" /> {img.likes}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {img.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(vid => (
              <div
                key={vid.id}
                onClick={() => setPreview(vid)}
                className="group relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 aspect-video cursor-pointer hover:border-amber-400/60 transition-all shadow-xl"
              >
                {vid.thumbnail ? (
                  <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-950">
                    <Video className="w-8 h-8 text-emerald-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-emerald-950 ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Fullscreen Preview */}
        {preview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 animate-in fade-in">
            <div className="relative max-w-4xl w-full liquid-glass rounded-3xl overflow-hidden border border-white/20 p-4 shadow-2xl">
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-amber-400"
              >
                <X className="w-5 h-5" />
              </button>

              {'videoUrl' in preview && preview.videoUrl ? (
                <video src={preview.videoUrl} controls autoPlay className="w-full max-h-[75vh] rounded-2xl object-contain" />
              ) : (
                <img
                  src={(preview as PixabayImageItem).largeImageUrl || (preview as PixabayImageItem).webformatUrl}
                  alt={preview.title}
                  className="w-full max-h-[75vh] rounded-2xl object-contain"
                />
              )}

              <div className="flex items-center justify-between pt-3 px-2 text-xs text-emerald-200">
                <span className="font-bold text-white">{preview.title}</span>
                <span>Photographer: {preview.user}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
