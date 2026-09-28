'use client';

// ============================================================
// NOOR Web — Interactive Global Islamic Map (OpenStreetMap)
// World's Dargahs, Ziyarat Points, Mosques & Holy Sanctuaries
// ============================================================

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Search,
  Compass,
  Navigation,
  ExternalLink,
  Layers,
  Sparkles,
  Maximize2,
  X,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  ISLAMIC_MAP_POINTS,
  IslamicMapPoint,
  MapPointType
} from '../data/islamicMapData';
import { NOOR_FALLBACK_SVG } from './NoorPlaceholderImage';
import { calculateHaversineDistance } from '../lib/ziyaratService';

interface IslamicWorldMapProps {
  initialPointId?: string;
}

export const IslamicWorldMap: React.FC<IslamicWorldMapProps> = ({ initialPointId }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [id: string]: any }>({});
  const [selectedPoint, setSelectedPoint] = useState<IslamicMapPoint | null>(null);
  const [filterType, setFilterType] = useState<MapPointType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [tileTheme, setTileTheme] = useState<'carto-dark' | 'osm' | 'voyager'>('carto-dark');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Filtered points
  const filteredPoints = useMemo(() => {
    return ISLAMIC_MAP_POINTS.filter((p) => {
      const matchesType = filterType === 'all' || p.type === filterType;
      const matchesRegion = selectedRegion === 'all' || p.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        (p.arabicUrduName && p.arabicUrduName.toLowerCase().includes(q)) ||
        p.shortContent.toLowerCase().includes(q);

      return matchesType && matchesRegion && matchesSearch;
    });
  }, [filterType, selectedRegion, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: ISLAMIC_MAP_POINTS.length,
      mosque: ISLAMIC_MAP_POINTS.filter((p) => p.type === 'mosque').length,
      dargah: ISLAMIC_MAP_POINTS.filter((p) => p.type === 'dargah').length,
      holy_site: ISLAMIC_MAP_POINTS.filter((p) => p.type === 'holy_site').length
    };
  }, []);

  // Regions
  const regions = useMemo(() => {
    const set = new Set(ISLAMIC_MAP_POINTS.map((p) => p.region));
    return Array.from(set);
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;
      // Inject Leaflet CSS if not already loaded
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!mapInstanceRef.current && isMounted && mapContainerRef.current) {
        // Center around Middle East / South Asia
        const map = L.map(mapContainerRef.current, {
          center: [25.0, 55.0],
          zoom: 4,
          minZoom: 2,
          maxZoom: 18,
          zoomControl: false
        });

        // Add zoom control top-right
        L.control.zoom({ position: 'topright' }).addTo(map);

        mapInstanceRef.current = map;
        setMapLoaded(true);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Switch Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    let tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    let attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';

    if (tileTheme === 'osm') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    } else if (tileTheme === 'voyager') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    }

    // Remove existing tile layer
    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof (window as any).L?.TileLayer || layer._url) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    const L = (window as any).L;
    if (L) {
      L.tileLayer(tileUrl, {
        attribution,
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(mapInstanceRef.current);
    }
  }, [tileTheme, mapLoaded]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;
    const L = (window as any).L;
    if (!L) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker: any) => {
      marker.remove();
    });
    markersRef.current = {};

    filteredPoints.forEach((point) => {
      // Determine Icon Styling
      let iconColor = '#10b981'; // emerald for mosque
      let iconBg = 'from-emerald-500 to-emerald-800';
      let iconBorder = 'border-emerald-300';
      let iconSymbol = '🕌';
      let haloColor = 'rgba(16, 185, 129, 0.4)';

      if (point.type === 'dargah') {
        iconColor = '#f59e0b'; // amber for dargah
        iconBg = 'from-amber-400 to-amber-700';
        iconBorder = 'border-amber-300';
        iconSymbol = '🏛️';
        haloColor = 'rgba(245, 158, 11, 0.45)';
      } else if (point.type === 'holy_site') {
        iconColor = '#fbbf24'; // gold for holy sanctuaries
        iconBg = 'from-amber-300 via-amber-500 to-yellow-600';
        iconBorder = 'border-yellow-200';
        iconSymbol = '🕋';
        haloColor = 'rgba(251, 191, 36, 0.6)';
      }

      const isSelected = selectedPoint?.id === point.id;

      const html = `
        <div class="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 ${
          isSelected ? 'scale-125 z-50' : 'hover:scale-110'
        }" style="width: 38px; height: 38px;">
          <!-- Pulsing Halo -->
          <div class="absolute inset-0 rounded-full animate-ping opacity-30" style="background-color: ${haloColor}; animation-duration: 3s;"></div>
          <!-- Outer Ring -->
          <div class="w-9 h-9 rounded-2xl bg-gradient-to-br ${iconBg} p-[1.5px] shadow-[0_4px_12px_rgba(0,0,0,0.6)] ${iconBorder} border flex items-center justify-center">
            <div class="w-full h-full rounded-[14px] bg-[#021711]/90 flex items-center justify-center text-sm filter drop-shadow">
              ${iconSymbol}
            </div>
          </div>
          <!-- Label Tooltip -->
          <div class="absolute bottom-full mb-1 hidden group-hover:block bg-[#021711]/95 text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg border border-white/20 whitespace-nowrap shadow-xl z-50 pointer-events-none">
            ${point.name.split('(')[0]}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([point.latitude, point.longitude], {
        icon: customIcon,
        title: point.name
      }).addTo(mapInstanceRef.current);

      marker.on('click', () => {
        handleSelectPoint(point);
      });

      markersRef.current[point.id] = marker;
    });

    // If initialPointId specified
    if (initialPointId && markersRef.current[initialPointId]) {
      const target = ISLAMIC_MAP_POINTS.find((p) => p.id === initialPointId);
      if (target) handleSelectPoint(target);
    }
  }, [filteredPoints, selectedPoint, mapLoaded, initialPointId]);

  const handleSelectPoint = (point: IslamicMapPoint) => {
    setSelectedPoint(point);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([point.latitude, point.longitude], 12, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  };

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setLocating(false);

        if (mapInstanceRef.current) {
          const L = (window as any).L;
          if (L) {
            const userIcon = L.divIcon({
              className: 'user-marker',
              html: `
                <div class="relative flex items-center justify-center" style="width: 24px; height: 24px;">
                  <div class="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-60"></div>
                  <div class="w-4 h-4 rounded-full bg-sky-400 border-2 border-white shadow-lg"></div>
                </div>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });
            L.marker([latitude, longitude], { icon: userIcon, title: 'Your Location' }).addTo(
              mapInstanceRef.current
            );
          }

          mapInstanceRef.current.flyTo([latitude, longitude], 8, { duration: 1.5 });
        }
      },
      () => {
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleFlyToRegion = (regionCoords: [number, number], zoom: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(regionCoords, zoom, { duration: 1.2 });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-52px)] min-h-[600px] flex flex-col md:flex-row overflow-hidden bg-[#02120d]">
      {/* 1. Map Canvas (OpenStreetMap) */}
      <div className="relative flex-1 h-full w-full">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Top Control Bar Floating Over Map */}
        <div className="absolute top-3 left-3 right-3 md:left-4 md:right-auto md:max-w-xl z-20 space-y-2 pointer-events-auto">
          {/* Search & Location Bar */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#021711]/95 border border-white/15 backdrop-blur-xl shadow-2xl">
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-emerald-400/80 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search world dargahs, mosques, or cities (e.g. Ajmer, Makkah, Istanbul)..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 text-xs text-white placeholder:text-emerald-100/40 outline-none focus:bg-white/10 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-emerald-300/60 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Locate Me */}
            <button
              onClick={handleLocateUser}
              disabled={locating}
              title="Locate me & show nearby places"
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/30 to-amber-600/20 hover:from-emerald-600/50 hover:to-amber-600/40 border border-emerald-500/30 text-emerald-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <Navigation className={`w-3.5 h-3.5 text-amber-400 ${locating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Near Me</span>
            </button>

            {/* Tile Style Toggle */}
            <div className="flex items-center bg-white/5 rounded-xl p-0.5 border border-white/10">
              <button
                onClick={() => setTileTheme('carto-dark')}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  tileTheme === 'carto-dark'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'text-emerald-200/60 hover:text-white'
                }`}
                title="Dark Emerald Mode"
              >
                🌙 Dark
              </button>
              <button
                onClick={() => setTileTheme('osm')}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  tileTheme === 'osm'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'text-emerald-200/60 hover:text-white'
                }`}
                title="Standard OpenStreetMap"
              >
                🗺️ OSM
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all backdrop-blur-md cursor-pointer ${
                filterType === 'all'
                  ? 'bg-amber-400 text-emerald-950 shadow-[0_2px_8px_rgba(245,158,11,0.4)]'
                  : 'bg-[#021711]/90 text-emerald-100/80 hover:text-white border border-white/15'
              }`}
            >
              All Sanctuaries ({counts.all})
            </button>

            <button
              onClick={() => setFilterType('holy_site')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all backdrop-blur-md flex items-center gap-1 cursor-pointer ${
                filterType === 'holy_site'
                  ? 'bg-amber-400 text-emerald-950 shadow-[0_2px_8px_rgba(245,158,11,0.4)]'
                  : 'bg-[#021711]/90 text-amber-300/90 hover:text-white border border-white/15'
              }`}
            >
              <span>🕋</span>
              <span>Holy Sites ({counts.holy_site})</span>
            </button>

            <button
              onClick={() => setFilterType('mosque')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all backdrop-blur-md flex items-center gap-1 cursor-pointer ${
                filterType === 'mosque'
                  ? 'bg-emerald-400 text-emerald-950 shadow-[0_2px_8px_rgba(16,185,129,0.4)]'
                  : 'bg-[#021711]/90 text-emerald-300/90 hover:text-white border border-white/15'
              }`}
            >
              <span>🕌</span>
              <span>Mosques ({counts.mosque})</span>
            </button>

            <button
              onClick={() => setFilterType('dargah')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all backdrop-blur-md flex items-center gap-1 cursor-pointer ${
                filterType === 'dargah'
                  ? 'bg-amber-500 text-emerald-950 shadow-[0_2px_8px_rgba(245,158,11,0.4)]'
                  : 'bg-[#021711]/90 text-amber-300/90 hover:text-white border border-white/15'
              }`}
            >
              <span>🏛️</span>
              <span>Dargahs & Ziyarat ({counts.dargah})</span>
            </button>
          </div>

          {/* Quick Jump Cities */}
          <div className="hidden sm:flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-[10px]">
            <span className="text-emerald-300/50 uppercase font-mono tracking-wider text-[9px] mr-1">
              Quick Jump:
            </span>
            <button
              onClick={() => handleFlyToRegion([21.4225, 39.8262], 12)}
              className="px-2 py-0.5 rounded-md bg-[#021711]/80 hover:bg-white/10 text-emerald-200 border border-white/10 transition-colors"
            >
              Makkah
            </button>
            <button
              onClick={() => handleFlyToRegion([24.4672, 39.6109], 12)}
              className="px-2 py-0.5 rounded-md bg-[#021711]/80 hover:bg-white/10 text-emerald-200 border border-white/10 transition-colors"
            >
              Madinah
            </button>
            <button
              onClick={() => handleFlyToRegion([31.7761, 35.2358], 12)}
              className="px-2 py-0.5 rounded-md bg-[#021711]/80 hover:bg-white/10 text-emerald-200 border border-white/10 transition-colors"
            >
              Jerusalem
            </button>
            <button
              onClick={() => handleFlyToRegion([41.0082, 28.9784], 12)}
              className="px-2 py-0.5 rounded-md bg-[#021711]/80 hover:bg-white/10 text-emerald-200 border border-white/10 transition-colors"
            >
              Istanbul
            </button>
            <button
              onClick={() => handleFlyToRegion([26.4562, 74.6277], 12)}
              className="px-2 py-0.5 rounded-md bg-[#021711]/80 hover:bg-white/10 text-emerald-200 border border-white/10 transition-colors"
            >
              Ajmer
            </button>
            <button
              onClick={() => handleFlyToRegion([28.6139, 77.209], 11)}
              className="px-2 py-0.5 rounded-md bg-[#021711]/80 hover:bg-white/10 text-emerald-200 border border-white/10 transition-colors"
            >
              Delhi
            </button>
            <button
              onClick={() => handleFlyToRegion([31.5882, 74.3105], 12)}
              className="px-2 py-0.5 rounded-md bg-[#021711]/80 hover:bg-white/10 text-emerald-200 border border-white/10 transition-colors"
            >
              Lahore
            </button>
            <button
              onClick={() => handleFlyToRegion([32.6164, 44.0324], 12)}
              className="px-2 py-0.5 rounded-md bg-[#021711]/80 hover:bg-white/10 text-emerald-200 border border-white/10 transition-colors"
            >
              Karbala
            </button>
          </div>
        </div>

        {/* Selected Sanctuary Floating Drawer / Card */}
        {selectedPoint && (
          <div className="absolute bottom-4 left-3 right-3 md:left-auto md:right-4 md:w-96 z-30 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="rounded-3xl bg-[#021711]/98 border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Header Image with Fallback */}
              <div className="relative h-44 w-full bg-black/60 overflow-hidden">
                <img
                  src={selectedPoint.thumbnailUrl || NOOR_FALLBACK_SVG}
                  alt={selectedPoint.name}
                  onError={(e) => {
                    e.currentTarget.src = NOOR_FALLBACK_SVG;
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021711] via-[#021711]/30 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPoint(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#021711]/90 border border-amber-400/40 text-[11px] font-bold text-amber-300 shadow">
                  <span>
                    {selectedPoint.type === 'mosque'
                      ? '🕌 Mosque'
                      : selectedPoint.type === 'holy_site'
                      ? '🕋 Holy Sanctuary'
                      : '🏛️ Sacred Dargah'}
                  </span>
                </div>

                {/* Distance Badge if available */}
                {userCoords && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                    📍{' '}
                    {calculateHaversineDistance(
                      userCoords.lat,
                      userCoords.lng,
                      selectedPoint.latitude,
                      selectedPoint.longitude
                    )}{' '}
                    km away
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2.5">
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {selectedPoint.name}
                  </h3>
                  {selectedPoint.arabicUrduName && (
                    <div className="text-xs text-amber-300 font-arabic mt-0.5">
                      {selectedPoint.arabicUrduName}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-200/80">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    {selectedPoint.city}, {selectedPoint.country}
                  </span>
                  {selectedPoint.century && (
                    <>
                      <span>•</span>
                      <span className="text-[11px] text-zinc-400">{selectedPoint.century}</span>
                    </>
                  )}
                </div>

                {selectedPoint.architecturalStyle && (
                  <div className="text-[11px] text-emerald-400/80 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 line-clamp-1">
                    🏛️ {selectedPoint.architecturalStyle}
                  </div>
                )}

                <p className="text-xs text-emerald-100/80 leading-relaxed line-clamp-3">
                  {selectedPoint.shortContent}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  {selectedPoint.googleMapsUrl && (
                    <a
                      href={selectedPoint.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(245,158,11,0.3)] transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </a>
                  )}

                  {selectedPoint.slug && (
                    <Link
                      href={`/ziyarat/${selectedPoint.slug}`}
                      className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors border border-white/15"
                    >
                      <span>Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Side Panel — Sanctuary List (Collapsible on mobile) */}
      <div
        className={`${
          sidebarOpen ? 'w-full md:w-80 lg:w-96' : 'hidden md:flex md:w-12'
        } shrink-0 bg-[#021711] border-t md:border-t-0 md:border-l border-white/10 flex flex-col h-72 md:h-full z-10 transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs">
              🗺️
            </span>
            <span className="text-xs font-bold text-white">
              {filteredPoints.length} Sacred Sanctuaries
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-emerald-300/60 hover:text-white p-1"
            title="Toggle Sanctuary Panel"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1.5">
          {filteredPoints.map((point) => {
            const isSelected = selectedPoint?.id === point.id;

            return (
              <div
                key={point.id}
                onClick={() => handleSelectPoint(point)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 group ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400/60 shadow-lg'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black/40 border border-white/10 relative">
                  <img
                    src={point.thumbnailUrl || NOOR_FALLBACK_SVG}
                    alt={point.name}
                    onError={(e) => {
                      e.currentTarget.src = NOOR_FALLBACK_SVG;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 right-0 p-0.5 bg-black/70 rounded-tl text-[9px]">
                    {point.type === 'mosque' ? '🕌' : point.type === 'holy_site' ? '🕋' : '🏛️'}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`text-xs font-semibold truncate ${
                        isSelected ? 'text-amber-300' : 'text-white group-hover:text-amber-200'
                      }`}
                    >
                      {point.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-emerald-300/70 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                    <span className="truncate">
                      {point.city}, {point.country}
                    </span>
                  </div>

                  <p className="text-[10px] text-zinc-400 line-clamp-1 mt-1 leading-tight">
                    {point.shortContent}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
