// NOOR Mobile App: Home Dashboard View
import { i18n } from '../services/i18n.js';
import { storageService } from '../services/storageService.js';
import { FEATURED_VERSES } from '../data/quranData.js';

export function renderHomeView(currentCity = 'London, UK') {
  const featuredAyah = FEATURED_VERSES[0];
  const completedPrayers = storageService.get('completedPrayers') || {};

  return `
    <div class="mobile-screen-content" style="padding: var(--space-4);">
      <!-- Greeting Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
        <div>
          <span class="font-caption" id="home-change-city-btn" style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="Change Location">
            12 Rabi al-Awwal 1448 AH • 📍 <span style="text-decoration: underline; text-underline-offset: 2px;">${currentCity}</span>
          </span>
          <h1 class="font-h1" style="color: var(--text-primary); margin-top: 2px;">
            ${i18n.t('greeting')}
          </h1>
        </div>
        <button class="btn-icon btn-icon-sm" id="btn-quick-assistant" title="Open Noor AI Assistant" style="background: var(--color-primary-subtle); color: var(--color-primary);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          </svg>
        </button>
      </div>

      <!-- Main Hero: Next Prayer Card -->
      <div class="card card-emerald arch-card" style="margin-bottom: var(--space-4); box-shadow: var(--shadow-emerald);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-accent-gold-light); font-weight: 600;">
              ${i18n.t('next_prayer')}
            </span>
            <h2 class="font-display" style="color: #FFFFFF; font-size: 2rem; margin: 2px 0;">Dhuhr</h2>
            <p style="font-size: 1.1rem; color: #FFFFFF; font-weight: 600;">12:54 PM</p>
          </div>
          <div style="text-align: right;">
            <span class="badge badge-gold" style="font-size: 0.75rem;">18 mins left</span>
          </div>
        </div>

        <!-- Prayer Timeline Progress -->
        <div style="margin: var(--space-4) 0 var(--space-3) 0;">
          <div class="progress-bar-bg" style="background: rgba(255, 255, 255, 0.2); height: 6px;">
            <div class="progress-bar-fill" style="width: 78%; background: linear-gradient(90deg, #C5A059, #FFFFFF);"></div>
          </div>
        </div>

        <!-- Quick Card Actions -->
        <div style="display: flex; gap: var(--space-2); padding-top: var(--space-2); border-top: 1px solid rgba(255, 255, 255, 0.15);">
          <button class="btn btn-sm btn-gold" id="hero-listen-azan" style="font-size: 0.75rem; padding: 6px 12px;">
            🔔 Preview Adhan
          </button>
          <button class="btn btn-sm btn-ghost" id="hero-open-qibla" style="color: #FFFFFF; font-size: 0.75rem; padding: 6px 12px;">
            🧭 Qibla Compass
          </button>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2); margin-bottom: var(--space-6);">
        <div class="card card-interactive" id="quick-action-qibla" style="padding: var(--space-3) var(--space-2); text-align: center; border-radius: var(--radius-md);">
          <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--color-primary-subtle); color: var(--color-primary); margin: 0 auto var(--space-1) auto; display: flex; align-items: center; justify-content: center;">
            🧭
          </div>
          <span class="font-caption" style="font-weight: 600;">Qibla</span>
        </div>

        <div class="card card-interactive" id="quick-action-quran" style="padding: var(--space-3) var(--space-2); text-align: center; border-radius: var(--radius-md);">
          <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--color-accent-gold-subtle); color: var(--color-accent-gold-dark); margin: 0 auto var(--space-1) auto; display: flex; align-items: center; justify-content: center;">
            📖
          </div>
          <span class="font-caption" style="font-weight: 600;">Quran</span>
        </div>

        <div class="card card-interactive" id="quick-action-duas" style="padding: var(--space-3) var(--space-2); text-align: center; border-radius: var(--radius-md);">
          <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--color-primary-subtle); color: var(--color-primary); margin: 0 auto var(--space-1) auto; display: flex; align-items: center; justify-content: center;">
            🤲
          </div>
          <span class="font-caption" style="font-weight: 600;">Duas</span>
        </div>

        <div class="card card-interactive" id="quick-action-tasbih" style="padding: var(--space-3) var(--space-2); text-align: center; border-radius: var(--radius-md);">
          <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--color-accent-gold-subtle); color: var(--color-accent-gold-dark); margin: 0 auto var(--space-1) auto; display: flex; align-items: center; justify-content: center;">
            📿
          </div>
          <span class="font-caption" style="font-weight: 600;">Tasbih</span>
        </div>
      </div>

      <!-- Today's Ayah -->
      <div class="card card-sand" style="margin-bottom: var(--space-6); border-radius: var(--radius-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
          <span class="badge badge-gold">${i18n.t('todays_ayah')}</span>
          <span class="font-caption" style="color: var(--text-muted);">${featuredAyah.reference}</span>
        </div>

        <p class="font-arabic-quran" style="margin: var(--space-3) 0; font-size: 1.5rem; line-height: 2.2; color: var(--color-charcoal);">
          ${featuredAyah.arabic}
        </p>

        <p class="font-arabic-translation" style="margin-bottom: var(--space-4);">
          "${featuredAyah.translationEn}"
        </p>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: var(--space-3);">
          <button class="btn btn-sm btn-primary" id="btn-listen-today-ayah" data-surah="${featuredAyah.surahNumber}" data-ayah="${featuredAyah.ayahNumber}">
            ▶ ${i18n.t('listen')}
          </button>
          <div style="display: flex; gap: var(--space-2);">
            <button class="btn-icon btn-icon-sm" id="btn-tafsir-today-ayah" title="Read Tafsir">📜</button>
            <button class="btn-icon btn-icon-sm" id="btn-bookmark-today-ayah" title="Save Ayah">🔖</button>
          </div>
        </div>
      </div>

      <!-- Continue Quran Reading Progress -->
      <div class="card card-interactive" id="card-continue-quran" style="margin-bottom: var(--space-6); display: flex; align-items: center; justify-content: space-between; gap: var(--space-3);">
        <div>
          <span class="font-caption" style="color: var(--color-accent-gold-dark); text-transform: uppercase; font-weight: 700;">Continue Reading</span>
          <h4 class="font-h3" style="margin: 2px 0;">Surah Al-Kahf (18:24)</h4>
          <p class="font-caption" style="color: var(--text-muted);">Juz 15 • Page 296 • 24% Completed</p>
        </div>
        <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-primary-subtle); display: flex; align-items: center; justify-content: center; color: var(--color-primary); font-size: 1.2rem;">
          📖
        </div>
      </div>

      <!-- Today's Deen Tracker Checklist -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
          <h3 class="font-h3">${i18n.t('todays_deen')}</h3>
          <span class="font-caption" style="color: var(--color-primary); font-weight: 700;">2/5 Prayers Done</span>
        </div>

        <div style="display: flex; justify-content: space-between; gap: var(--space-2);">
          ${['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(pr => {
            const key = pr.toLowerCase();
            const isDone = completedPrayers[key];
            return `
              <div class="prayer-check-pill card-interactive ${isDone ? 'active' : ''}" data-prayer="${key}"
                style="flex: 1; padding: var(--space-2) var(--space-1); text-align: center; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: ${isDone ? 'var(--color-primary-subtle)' : 'var(--bg-surface-subtle)'};">
                <span class="font-caption" style="display: block; font-weight: 600; color: ${isDone ? 'var(--color-primary)' : 'var(--text-muted)'};">${pr}</span>
                <span style="font-size: 0.9rem;">${isDone ? '✓' : '○'}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
