// ============================================================
// NOOR Web — Global Islamic Map Page (OpenStreetMap)
// World's Dargahs, Ziyarat Points, Historic Mosques & Holy Sanctuaries
// ============================================================

import React from 'react';
import type { Metadata } from 'next';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { IslamicWorldMap } from '../../components/IslamicWorldMap';

export const metadata: Metadata = {
  title: 'Global Islamic Map — World Dargahs, Ziyarat Points & Mosques | Noor-e-Ilahi',
  description:
    'Explore an interactive OpenStreetMap of world dargahs, holy ziyarat points, and historic mosques across Makkah, Madinah, Jerusalem, Istanbul, Delhi, Ajmer, Cairo, and Central Asia with verified GPS coordinates and visitor adab.',
  keywords: [
    'Islamic world map',
    'world dargahs map',
    'ziyarat map',
    'holy mosques map',
    'OpenStreetMap islamic places',
    'Ajmer Sharif GPS',
    'Masjid al-Haram map',
    'Masjid an-Nabawi map',
    'Masjid al-Aqsa map',
    'global sufis and shrines'
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/map'
  }
};

export default function MapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristMap',
    name: 'NOOR Global Islamic Heritage & Mosque Map',
    description:
      'Interactive OpenStreetMap guide to the world’s most revered dargahs, holy ziyarat points, and historic mosques.',
    url: 'https://www.nooreilahi.com/map',
    provider: {
      '@type': 'Organization',
      name: 'Noor-e-Ilahi',
      url: 'https://www.nooreilahi.com'
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#02120d] text-white">
      {/* Universal Navigation */}
      <GlobalNavbar />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Full-Height Interactive Map */}
      <main className="flex-1 w-full relative">
        <h1 className="sr-only">
          Global Islamic Map — World Dargahs, Ziyarat Points, Historic Mosques & Holy Sanctuaries
        </h1>
        <IslamicWorldMap />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
