// NOOR Mobile App: Quran Hub & Reader View
import { SURAHS_LIST, FEATURED_VERSES, RECITERS } from '../data/quranData.js';
import { i18n } from '../services/i18n.js';

export function renderQuranView(activeSurahNumber = 1) {
  const selectedSurah = SURAHS_LIST.find(s => s.number === activeSurahNumber) || SURAHS_LIST[0];
  const versesData = FEATURED_VERSES.find(v => v.surahNumber === activeSurahNumber);

  return `
    <div class="mobile-screen-content" style="padding: var(--space-4);">
      <!-- Quran Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <div>
          <span class="badge badge-gold">The Noble Quran</span>
          <h2 class="font-h1" style="margin-top: 2px;">Al-Quran Al-Kareem</h2>
        </div>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn-icon btn-icon-sm" id="btn-quran-settings" title="Reader Settings">⚙️</button>
        </div>
      </div>

      <!-- Quick Search Bar -->
      <div class="search-bar" style="margin-bottom: var(--space-4);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="quran-search-input" placeholder="Search Surah by name or number (e.g. 18, Al-Kahf)...">
      </div>

      <!-- Sub Tabs: Surahs, Juz, Bookmarks -->
      <div class="tabs-container" style="margin-bottom: var(--space-4);">
        <button class="tab-btn active" data-quran-tab="surahs">Surahs (114)</button>
        <button class="tab-btn" data-quran-tab="juz">Juz (30)</button>
        <button class="tab-btn" data-quran-tab="bookmarks">Bookmarks</button>
      </div>

      <!-- Active Surah Reader Showcase -->
      <div class="card card-emerald arch-card" style="margin-bottom: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-3);">
          <div>
            <span class="badge badge-gold" style="font-size: 0.7rem;">Surah ${selectedSurah.number} • ${selectedSurah.revelationType}</span>
            <h3 class="font-h2" style="color: #FFFFFF; margin-top: 4px;">${selectedSurah.englishName}</h3>
            <span class="font-caption" style="color: var(--color-accent-gold-light);">${selectedSurah.englishNameTranslation}</span>
          </div>
          <span class="font-arabic-display" style="font-size: 1.85rem; color: #FFFFFF;">${selectedSurah.name}</span>
        </div>

        <!-- Bismillah Header for Surahs (except At-Tawbah) -->
        <div style="text-align: center; padding: var(--space-3) 0; border-top: 1px solid rgba(255, 255, 255, 0.15); border-bottom: 1px solid rgba(255, 255, 255, 0.15); margin-bottom: var(--space-4);">
          <p class="font-arabic-quran" style="color: #FFFFFF; font-size: 1.4rem; line-height: 2;">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        <!-- Verses Stream -->
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${versesData && versesData.ayahs ? versesData.ayahs.map(a => `
            <div style="background: rgba(255, 255, 255, 0.08); padding: var(--space-3); border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                <span class="badge badge-gold" style="font-size: 0.65rem;">Ayah ${a.number}</span>
                <button class="btn-icon btn-icon-sm play-single-ayah" data-surah="${selectedSurah.number}" data-ayah="${a.number}" style="background: transparent; color: white;">
                  ▶
                </button>
              </div>
              <p class="font-arabic-quran" style="color: #FFFFFF; font-size: 1.5rem; line-height: 2.2; margin-bottom: var(--space-2);">
                ${a.arabic}
              </p>
              <p class="font-body-sm" style="color: #FAF8F5; opacity: 0.9;">
                ${a.translation}
              </p>
            </div>
          `).join('') : `
            <div style="background: rgba(255, 255, 255, 0.08); padding: var(--space-4); border-radius: var(--radius-md);">
              <p class="font-arabic-quran" style="color: #FFFFFF; font-size: 1.5rem; line-height: 2.2;">
                ${FEATURED_VERSES[0].arabic}
              </p>
              <p class="font-body-sm" style="color: #FAF8F5; margin-top: var(--space-2);">
                ${FEATURED_VERSES[0].translationEn}
              </p>
            </div>
          `}
        </div>

        <!-- Audio Reciter Bar -->
        <div style="margin-top: var(--space-4); display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-3); border-top: 1px solid rgba(255, 255, 255, 0.15);">
          <span class="font-caption" style="color: var(--color-accent-gold-light);">Reciter: Mishary Alafasy</span>
          <button class="btn btn-sm btn-gold" id="btn-play-full-surah" data-surah="${selectedSurah.number}">
            ▶ Listen Surah
          </button>
        </div>
      </div>

      <!-- Surah Catalog List -->
      <h3 class="font-h3" style="margin-bottom: var(--space-3);">Surah Directory</h3>
      <div style="display: flex; flex-direction: column; gap: var(--space-2);" id="surahs-list-container">
        ${SURAHS_LIST.map(s => `
          <div class="card card-interactive surah-select-row ${s.number === activeSurahNumber ? 'active' : ''}" data-surah-num="${s.number}" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-3) var(--space-4);">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <div style="width: 34px; height: 34px; border-radius: var(--radius-sm); background: var(--bg-surface-subtle); display: flex; align-items: center; justify-content: center; font-size: 0.8125rem; font-weight: 700; color: var(--color-primary);">
                ${s.number}
              </div>
              <div>
                <strong class="font-body">${s.englishName}</strong>
                <p class="font-caption" style="color: var(--text-muted);">${s.englishNameTranslation} • ${s.numberOfAyahs} Verses</p>
              </div>
            </div>
            <span class="font-arabic-display" style="color: var(--color-primary); font-size: 1.25rem;">${s.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
