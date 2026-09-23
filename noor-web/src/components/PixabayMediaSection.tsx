'use client';

// ============================================================
// NOOR Web — Pixabay Islamic Media Gallery (Photos & Videos)
// ============================================================

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Video, Search, Heart, Eye, Play, X, ExternalLink } from 'lucide-react';
import {
  fetchPixabayImages,
  fetchPixabayVideos,
  PixabayImageItem,
  PixabayVideoItem,
  FALLBACK_IMAGES
} from '../lib/pixabayService';
import { useLanguage } from '../context/LanguageContext';

export const PixabayMediaSection: React.FC = () => {
  const { t } = useLanguage();
  const [mediaType, setMediaType] = useState<'photos' | 'videos'>('photos');
  const [searchQuery, setSearchQuery] = useState('islamic architecture');
  const [images, setImages] = useState<PixabayImageItem[]>(FALLBACK_IMAGES);
  const [videos, setVideos] = useState<PixabayVideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewItem, setPreviewItem] = useState<PixabayImageItem | PixabayVideoItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (mediaType === 'photos') {
      fetchPixabayImages(searchQuery || 'islamic architecture', 12)
        .then(res => {
          if (isMounted) setImages(res);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      fetchPixabayVideos(searchQuery || 'islamic mosque', 8)
        .then(res => {
          if (isMounted) setVideos(res);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => { isMounted = false; };
  }, [mediaType, searchQuery]);

  const presetQueries = ['Makkah', 'Madinah', 'Holy Quran', 'Mosque', 'Islamic Geometric Pattern', 'Calligraphy'];

  return (
    <section id="media-gallery" className="w-full py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{t('visualTreasures')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t('mediaGalleryHeading')}
          </h2>
          <p className="text-sm text-emerald-200/70 mt-1">
            {t('mediaGalleryDesc')}
          </p>
        </div>

        {/* Media Type Switcher */}
        <div className="flex items-center bg-[#06241b] rounded-xl border border-emerald-800/50 p-1">
          <button
            onClick={() => setMediaType('photos')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              mediaType === 'photos'
                ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{t('photosTab')}</span>
          </button>
          <button
            onClick={() => setMediaType('videos')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              mediaType === 'videos'
                ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{t('cinematicVideosTab')}</span>
          </button>
        </div>
      </div>

      {/* Preset Topics Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {presetQueries.map((query) => (
          <button
            key={query}
            onClick={() => setSearchQuery(query)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              searchQuery.toLowerCase() === query.toLowerCase()
                ? 'bg-emerald-800 text-amber-300 border border-amber-400/50 font-bold'
                : 'bg-[#06241b] border border-emerald-800/40 text-emerald-200 hover:text-white'
            }`}
          >
            {query}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-amber-300 flex items-center justify-center gap-2 text-sm font-semibold">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>{t('curatingMedia')}</span>
        </div>
      ) : mediaType === 'photos' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setPreviewItem(img)}
              className="group relative rounded-2xl overflow-hidden bg-emerald-950/60 border border-emerald-800/40 aspect-[4/3] cursor-pointer hover:border-amber-400/60 transition-all hover:scale-[1.02]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-xs font-bold text-white truncate">{img.title}</span>
                <div className="flex items-center gap-3 text-[10px] text-emerald-300/80 mt-1">
                  <span className="flex items-center gap-1">
                    <Heart className="w-2.5 h-2.5 text-amber-400" /> {img.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-2.5 h-2.5" /> {img.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setPreviewItem(vid)}
              className="group relative rounded-2xl overflow-hidden bg-emerald-950/60 border border-emerald-800/40 aspect-video cursor-pointer hover:border-amber-400/60 transition-all"
            >
              {vid.thumbnail ? (
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-emerald-900/40 flex items-center justify-center">
                  <Video className="w-8 h-8 text-emerald-400/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/90 text-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-emerald-950 ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <span className="truncate">{vid.title}</span>
                {vid.duration && <span className="font-mono">{vid.duration}s</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-[#031c15] border border-emerald-700/50 rounded-3xl overflow-hidden shadow-2xl p-4">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-amber-400"
            >
              <X className="w-5 h-5" />
            </button>

            {'videoUrl' in previewItem && previewItem.videoUrl ? (
              <video
                src={previewItem.videoUrl}
                controls
                autoPlay
                className="w-full max-h-[75vh] rounded-2xl object-contain"
              />
            ) : (
              <img
                src={(previewItem as PixabayImageItem).largeImageUrl || (previewItem as PixabayImageItem).webformatUrl}
                alt={previewItem.title}
                className="w-full max-h-[75vh] rounded-2xl object-contain"
              />
            )}

            <div className="flex items-center justify-between pt-3 px-2 text-xs text-emerald-200">
              <span className="font-bold text-white">{previewItem.title}</span>
              <span>{t('creatorLabel')}: {previewItem.user}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
