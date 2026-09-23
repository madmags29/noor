// NOOR Minimal Digital Tasbih Component
import { audioManager } from '../services/audioManager.js';
import { storageService } from '../services/storageService.js';

export const DHIKR_PRESETS = [
  { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', translation: 'Glory be to Allah' },
  { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', translation: 'All praise is due to Allah' },
  { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', translation: 'Allah is the Greatest' },
  { id: 'astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', translation: 'I seek forgiveness of Allah' },
  { id: 'lailahaillallah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', transliteration: 'La ilaha illallah', translation: 'There is no deity except Allah' }
];

export function renderTasbih(currentCount = 0, target = 33, activeDhikrIndex = 0) {
  const activeDhikr = DHIKR_PRESETS[activeDhikrIndex] || DHIKR_PRESETS[0];
  const percentage = Math.min(Math.round((currentCount / target) * 100), 100);
  const strokeDashoffset = 440 - (440 * (currentCount % target)) / target;

  return `
    <div class="tasbih-card card" style="text-align: center; padding: var(--space-6);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <span class="badge badge-emerald">Dhikr Companion</span>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn-sm btn-secondary" id="tasbih-target-btn" title="Change Target (33 / 99 / 100)">
            Target: <strong id="tasbih-target-val">${target}</strong>
          </button>
          <button class="btn btn-sm btn-outline" id="tasbih-reset-btn" title="Reset Counter">Reset</button>
        </div>
      </div>

      <!-- Selected Dhikr Phrase -->
      <div style="margin-bottom: var(--space-6);">
        <h2 class="font-arabic-display" id="tasbih-arabic" style="color: var(--color-primary); margin-bottom: var(--space-1);">${activeDhikr.arabic}</h2>
        <p class="font-body" id="tasbih-transliteration" style="font-weight: 600;">${activeDhikr.transliteration}</p>
        <p class="font-caption" id="tasbih-translation" style="color: var(--text-muted);">${activeDhikr.translation}</p>
      </div>

      <!-- Dhikr Selector Pills -->
      <div style="display: flex; gap: var(--space-2); overflow-x: auto; padding-bottom: var(--space-3); margin-bottom: var(--space-6); scrollbar-width: none;">
        ${DHIKR_PRESETS.map((d, i) => `
          <button class="chip ${i === activeDhikrIndex ? 'active' : ''}" data-dhikr-idx="${i}">
            ${d.transliteration}
          </button>
        `).join('')}
      </div>

      <!-- Big Tap Bead Circular Counter Area -->
      <div id="tasbih-tap-zone" style="position: relative; width: 220px; height: 220px; margin: 0 auto; cursor: pointer; user-select: none;">
        <svg viewBox="0 0 160 160" style="width: 100%; height: 100%; transform: rotate(-90deg);">
          <!-- Background Track -->
          <circle cx="80" cy="80" r="70" fill="var(--bg-surface-subtle)" stroke="var(--border-color)" stroke-width="8"/>
          <!-- Progress Stroke -->
          <circle id="tasbih-progress-circle" cx="80" cy="80" r="70" fill="none" stroke="var(--color-primary)" stroke-width="8"
            stroke-dasharray="440" stroke-dashoffset="${strokeDashoffset}" stroke-linecap="round" style="transition: stroke-dashoffset 0.15s ease;"/>
        </svg>

        <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span id="tasbih-count-display" style="font-size: 3.5rem; font-weight: 800; font-family: var(--font-latin-display); color: var(--text-primary); line-height: 1;">
            ${currentCount}
          </span>
          <span style="font-size: 0.8125rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; margin-top: 4px;">
            Tap Anywhere
          </span>
        </div>
      </div>

      <!-- Tactile & Sound Toggles -->
      <div style="display: flex; justify-content: center; gap: var(--space-4); margin-top: var(--space-6); font-size: 0.8125rem; color: var(--text-secondary);">
        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
          <input type="checkbox" id="tasbih-sound-toggle" checked style="accent-color: var(--color-primary);"> Click Sound
        </label>
        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
          <input type="checkbox" id="tasbih-vibrate-toggle" checked style="accent-color: var(--color-primary);"> Haptic Vibrate
        </label>
      </div>
    </div>
  `;
}
