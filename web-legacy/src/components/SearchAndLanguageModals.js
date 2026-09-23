// NOOR Universal Search and Global Language Selector Modals
import { LANGUAGES } from '../data/languages.js';
import { SURAHS_LIST, FEATURED_VERSES } from '../data/quranData.js';
import { HADITHS_LIST } from '../data/hadithData.js';
import { DUAS_LIST } from '../data/duasData.js';
import { pixabayService } from '../services/pixabayService.js';

export function renderLanguageSelectorModal() {
  const recommended = LANGUAGES.filter(l => l.popular);
  const others = LANGUAGES.filter(l => !l.popular);

  return `
    <div class="modal-overlay" id="language-modal-overlay">
      <div class="modal-content" style="max-width: 580px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <div>
            <h2 class="font-h2">Choose your language</h2>
            <p class="font-caption" style="color: var(--text-muted);">80+ World Languages Supported • Instant RTL Mirroring</p>
          </div>
          <button class="btn-icon btn-icon-sm" id="close-language-modal">✕</button>
        </div>

        <div class="search-bar" style="margin-bottom: var(--space-4);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="lang-modal-search" placeholder="Search language name (English, العربية, اردو, Türkçe, বাংলা)...">
        </div>

        <div style="max-height: 420px; overflow-y: auto; padding-right: 4px;" id="languages-scroll-container">
          <!-- Recommended / Widely Used -->
          <div style="margin-bottom: var(--space-4);" id="recommended-languages-section">
            <span class="font-caption" style="color: var(--text-muted); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: var(--space-2);">
              Recommended & Major Islamic Languages
            </span>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2);">
              ${recommended.map(l => `
                <div class="card card-interactive lang-item-card" data-lang-code="${l.code}" style="padding: var(--space-3); display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <span style="font-weight: 700; font-size: 1rem; display: block;">${l.nativeName}</span>
                    <span class="font-caption" style="color: var(--text-muted);">${l.name}</span>
                  </div>
                  <span class="badge ${l.dir === 'rtl' ? 'badge-gold' : 'badge-emerald'}" style="font-size: 0.65rem;">${l.dir.toUpperCase()}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- All Languages -->
          <div id="all-languages-section">
            <span class="font-caption" style="color: var(--text-muted); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: var(--space-2);">
              All Global Languages (${LANGUAGES.length})
            </span>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2);">
              ${others.map(l => `
                <div class="card card-interactive lang-item-card" data-lang-code="${l.code}" style="padding: var(--space-3); display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <span style="font-weight: 600; font-size: 0.9375rem; display: block;">${l.nativeName}</span>
                    <span class="font-caption" style="color: var(--text-muted);">${l.name}</span>
                  </div>
                  <span class="badge ${l.dir === 'rtl' ? 'badge-gold' : 'badge-emerald'}" style="font-size: 0.65rem;">${l.dir.toUpperCase()}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderUniversalSearchModal() {
  return `
    <div class="modal-overlay" id="search-modal-overlay">
      <div class="modal-content" style="max-width: 680px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <div style="display: flex; align-items: center; gap: var(--space-2);">
            <div class="brand-emblem" style="width: 28px; height: 28px; font-size: 0.9rem;">ن</div>
            <h2 class="font-h2">Universal Islamic Search</h2>
          </div>
          <button class="btn-icon btn-icon-sm" id="close-search-modal">✕</button>
        </div>

        <div class="search-bar" style="margin-bottom: var(--space-4); padding: var(--space-3) var(--space-4);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="universal-search-input" placeholder="Search Quran, Hadith, Duas, or Pixabay Media (e.g. mosque, sabr, makkah)..." autofocus>
        </div>

        <!-- Quick filter chips -->
        <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-4); overflow-x: auto; scrollbar-width: none;">
          <button class="chip active" data-search-filter="all">All (Connected)</button>
          <button class="chip" data-search-filter="quran">Quran Verses</button>
          <button class="chip" data-search-filter="hadith">Hadiths</button>
          <button class="chip" data-search-filter="duas">Duas</button>
          <button class="chip" data-search-filter="media">Pixabay Media</button>
        </div>

        <!-- Results Stream -->
        <div id="universal-search-results" style="max-height: 420px; overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-3);">
          <div style="text-align: center; padding: var(--space-8); color: var(--text-muted);">
            <p>Type keywords to search verified Islamic knowledge and Pixabay media.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function performUniversalSearch(query) {
  if (!query || query.trim().length === 0) {
    return `<div style="text-align: center; padding: var(--space-8); color: var(--text-muted);">Type keywords to search verified Islamic knowledge.</div>`;
  }

  const q = query.toLowerCase().trim();
  const matchedQuran = FEATURED_VERSES.filter(v => 
    v.surahName.toLowerCase().includes(q) || 
    v.translationEn.toLowerCase().includes(q) || 
    v.arabic.includes(query)
  );
  const matchedHadiths = HADITHS_LIST.filter(h => 
    h.translation.toLowerCase().includes(q) || 
    h.category.toLowerCase().includes(q) || 
    h.arabic.includes(query)
  );
  const matchedDuas = DUAS_LIST.filter(d => 
    d.title.toLowerCase().includes(q) || 
    d.translation.toLowerCase().includes(q) || 
    d.arabic.includes(query)
  );

  // Also query Pixabay for media matches
  let pixabayMedia = [];
  try {
    const images = await pixabayService.fetchIslamicImages(q, 4);
    pixabayMedia = images;
  } catch (e) {
    console.warn('Pixabay search fetch error', e);
  }

  let html = '';

  if (matchedQuran.length > 0) {
    html += `
      <div>
        <span class="font-caption" style="color: var(--color-primary); font-weight: 700; text-transform: uppercase;">Quranic Verses (${matchedQuran.length})</span>
        <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: 4px;">
          ${matchedQuran.map(v => `
            <div class="card" style="padding: var(--space-3); border-left: 3px solid var(--color-primary);">
              <span class="badge badge-gold" style="font-size: 0.65rem;">${v.reference}</span>
              <p class="font-arabic-quran" style="font-size: 1.1rem; line-height: 1.8; margin: 4px 0;">${v.arabic}</p>
              <p class="font-body-sm">${v.translationEn}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (matchedHadiths.length > 0) {
    html += `
      <div style="margin-top: var(--space-2);">
        <span class="font-caption" style="color: var(--color-accent-gold-dark); font-weight: 700; text-transform: uppercase;">Hadith Library (${matchedHadiths.length})</span>
        <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: 4px;">
          ${matchedHadiths.map(h => `
            <div class="card" style="padding: var(--space-3); border-left: 3px solid var(--color-accent-gold);">
              <span class="badge badge-emerald" style="font-size: 0.65rem;">${h.collection} • ${h.grade}</span>
              <p class="font-arabic-quran" style="font-size: 1.1rem; line-height: 1.8; margin: 4px 0;">${h.arabic}</p>
              <p class="font-body-sm">"${h.translation}"</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (matchedDuas.length > 0) {
    html += `
      <div style="margin-top: var(--space-2);">
        <span class="font-caption" style="color: var(--color-primary); font-weight: 700; text-transform: uppercase;">Duas & Adhkar (${matchedDuas.length})</span>
        <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: 4px;">
          ${matchedDuas.map(d => `
            <div class="card" style="padding: var(--space-3);">
              <strong>${d.title}</strong>
              <p class="font-arabic-quran" style="font-size: 1.1rem; line-height: 1.8; margin: 4px 0;">${d.arabic}</p>
              <p class="font-body-sm">${d.translation}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (pixabayMedia.length > 0) {
    html += `
      <div style="margin-top: var(--space-3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span class="font-caption" style="color: var(--color-accent-gold-dark); font-weight: 700; text-transform: uppercase;">Pixabay Islamic Media (${pixabayMedia.length})</span>
          <span class="badge badge-gold" style="font-size: 0.6rem;">Live API</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2);">
          ${pixabayMedia.map(m => `
            <div class="card card-interactive pixabay-photo-card" data-img-url="${m.largeImageUrl || m.webformatUrl}" data-title="${m.title}" data-creator="${m.user}" style="padding: 0; overflow: hidden; height: 90px; border-radius: var(--radius-sm);">
              <img src="${m.previewUrl}" alt="${m.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (!html) {
    html = `<div style="text-align: center; padding: var(--space-8); color: var(--text-muted);">No matches found for "${query}". Try searching for terms like "mosque", "patience", or "fasting".</div>`;
  }

  return html;
}
