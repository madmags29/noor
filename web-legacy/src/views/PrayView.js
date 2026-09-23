// NOOR Mobile App: Dedicated Worship Dashboard (PrayView)
import { getPrayerTimes } from '../data/prayerData.js';
import { storageService } from '../services/storageService.js';
import { i18n } from '../services/i18n.js';

export function renderPrayView(currentCity = 'London, UK') {
  const prayerTimes = getPrayerTimes();
  const completedPrayers = storageService.get('completedPrayers') || {};

  return `
    <div class="mobile-screen-content" style="padding: var(--space-4);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <div>
          <span class="badge badge-emerald">Worship Dashboard</span>
          <h2 class="font-h1" style="margin-top: 2px;">Prayer Times</h2>
        </div>
        <button class="btn btn-sm btn-outline" id="btn-change-prayer-city">${currentCity} ▾</button>
      </div>

      <!-- Prayer Schedule List -->
      <div class="card" style="padding: var(--space-3); margin-bottom: var(--space-6);">
        ${prayerTimes.map(p => {
          const isNext = p.id === 'dhuhr';
          const isDone = completedPrayers[p.id];
          return `
            <div class="prayer-row ${isNext ? 'card-emerald' : ''}" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); margin-bottom: 4px; ${isNext ? '' : 'border-bottom: 1px solid var(--border-color);'}">
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                ${p.id !== 'sunrise' ? `
                  <button class="prayer-check-btn btn-icon btn-icon-sm" data-prayer-check="${p.id}" style="border-radius: 50%; ${isDone ? 'background: var(--color-primary); color: white;' : ''}">
                    ${isDone ? '✓' : ''}
                  </button>
                ` : `<span style="width: 32px; text-align: center; color: var(--color-accent-gold);">☀️</span>`}
                <div>
                  <strong class="font-body" style="${isNext ? 'color: #FFFFFF;' : ''}">${p.name}</strong>
                  ${isNext ? `<span class="badge badge-gold" style="font-size: 0.65rem; margin-left: 6px;">Next Prayer</span>` : ''}
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <span class="font-h3" style="${isNext ? 'color: #FFFFFF;' : 'color: var(--text-primary);'}">${p.time}</span>
                <button class="btn-icon btn-icon-sm play-azan-single" data-prayer-id="${p.id}" title="Adhan sound" style="${isNext ? 'background: rgba(255,255,255,0.2); color: white;' : ''}">
                  🔔
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Worship Shortcuts -->
      <h3 class="font-h3" style="margin-bottom: var(--space-3);">Spiritual Utilities</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-6);">
        <div class="card card-interactive" id="pray-to-qibla" style="padding: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
          <span style="font-size: 1.5rem;">🧭</span>
          <div>
            <strong>Qibla Compass</strong>
            <p class="font-caption" style="color: var(--text-muted);">Facing 119° Makkah</p>
          </div>
        </div>

        <div class="card card-interactive" id="pray-to-tasbih" style="padding: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
          <span style="font-size: 1.5rem;">📿</span>
          <div>
            <strong>Digital Tasbih</strong>
            <p class="font-caption" style="color: var(--text-muted);">Target: 33 / 99</p>
          </div>
        </div>

        <div class="card card-interactive" id="pray-to-ramadan" style="padding: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
          <span style="font-size: 1.5rem;">🌙</span>
          <div>
            <strong>Ramadan Hub</strong>
            <p class="font-caption" style="color: var(--text-muted);">Suhoor & Iftar Timings</p>
          </div>
        </div>

        <div class="card card-interactive" id="pray-to-zakat" style="padding: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
          <span style="font-size: 1.5rem;">⚖️</span>
          <div>
            <strong>Zakat Calculator</strong>
            <p class="font-caption" style="color: var(--text-muted);">2.5% Wealth Purifier</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
