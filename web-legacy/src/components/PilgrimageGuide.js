// NOOR Hajj & Umrah Pilgrimage Guide with Interactive Tawaf & Sa'i Counters
import { UMRAH_STEPS, HAJJ_DAYS } from '../data/pilgrimageRamadanData.js';

export function renderPilgrimageGuide(activeTab = 'umrah', tawafCount = 0, saiLap = 0) {
  return `
    <div class="pilgrimage-card card" style="padding: var(--space-6);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <div>
          <span class="badge badge-gold">Pilgrimage Companion</span>
          <h2 class="font-h2" style="margin-top: var(--space-1);">Hajj & Umrah Guide</h2>
        </div>
        <span class="badge badge-emerald">Offline Cached</span>
      </div>

      <!-- Tab Switcher -->
      <div class="tabs-container" style="margin-bottom: var(--space-6);">
        <button class="tab-btn ${activeTab === 'umrah' ? 'active' : ''}" data-pilgrim-tab="umrah">Umrah Guide</button>
        <button class="tab-btn ${activeTab === 'tawaf' ? 'active' : ''}" data-pilgrim-tab="tawaf">Tawaf Counter</button>
        <button class="tab-btn ${activeTab === 'sai' ? 'active' : ''}" data-pilgrim-tab="sai">Sa‘i Counter</button>
        <button class="tab-btn ${activeTab === 'hajj' ? 'active' : ''}" data-pilgrim-tab="hajj">Hajj Days</button>
        <button class="tab-btn ${activeTab === 'checklist' ? 'active' : ''}" data-pilgrim-tab="checklist">Ihram Checklist</button>
      </div>

      <!-- Tab Content: Umrah Steps -->
      <div id="pilgrim-content-umrah" style="display: ${activeTab === 'umrah' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${UMRAH_STEPS.map(s => `
            <div style="background: var(--bg-surface-subtle); padding: var(--space-4); border-radius: var(--radius-md); border-left: 4px solid var(--color-primary);">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h4 class="font-h3">Step ${s.step}: ${s.name}</h4>
                <span class="font-arabic-display" style="font-size: 1.1rem; color: var(--color-primary);">${s.arabic}</span>
              </div>
              <p class="font-caption" style="color: var(--color-accent-gold-dark); margin: 2px 0 6px 0;">Location: ${s.location}</p>
              <p class="font-body-sm" style="color: var(--text-secondary);">${s.summary}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab Content: Interactive Tawaf Counter -->
      <div id="pilgrim-content-tawaf" style="display: ${activeTab === 'tawaf' ? 'block' : 'none'}; text-align: center;">
        <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
          Perform 7 anti-clockwise circuits around the Kaaba, beginning each round at the Black Stone (Hajar al-Aswad) with "Allahu Akbar".
        </p>
        
        <div style="width: 190px; height: 190px; margin: 0 auto var(--space-6) auto; border-radius: 50%; border: 6px solid var(--color-primary); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg-surface-subtle);">
          <span class="font-caption" style="color: var(--text-muted); text-transform: uppercase;">Circuit</span>
          <span id="tawaf-count-num" class="font-display" style="font-size: 3.5rem; line-height: 1; color: var(--color-primary);">${tawafCount}</span>
          <span class="font-caption" style="color: var(--color-accent-gold-dark);">of 7 Circuits</span>
        </div>

        <div style="display: flex; justify-content: center; gap: var(--space-3);">
          <button class="btn btn-primary btn-lg" id="tawaf-tap-btn" ${tawafCount >= 7 ? 'disabled' : ''}>
            ${tawafCount >= 7 ? 'Tawaf Completed!' : '+ Circuit Completed'}
          </button>
          <button class="btn btn-outline" id="tawaf-reset-btn">Reset</button>
        </div>
      </div>

      <!-- Tab Content: Interactive Sa'i Counter -->
      <div id="pilgrim-content-sai" style="display: ${activeTab === 'sai' ? 'block' : 'none'}; text-align: center;">
        <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
          Walk 7 laps between Mount Safa and Mount Marwah. Lap 1 begins on Safa and ends on Marwah; Lap 7 ends on Marwah.
        </p>

        <div style="width: 190px; height: 190px; margin: 0 auto var(--space-6) auto; border-radius: 50%; border: 6px solid var(--color-accent-gold); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg-surface-subtle);">
          <span class="font-caption" style="color: var(--text-muted); text-transform: uppercase;">Lap</span>
          <span id="sai-lap-num" class="font-display" style="font-size: 3.5rem; line-height: 1; color: var(--color-accent-gold-dark);">${saiLap}</span>
          <span class="font-caption" style="color: var(--text-secondary);">${saiLap % 2 === 1 ? 'Towards Marwah' : 'Towards Safa'}</span>
        </div>

        <div style="display: flex; justify-content: center; gap: var(--space-3);">
          <button class="btn btn-gold btn-lg" id="sai-tap-btn" ${saiLap >= 7 ? 'disabled' : ''}>
            ${saiLap >= 7 ? 'Sa‘i Completed!' : '+ Lap Completed'}
          </button>
          <button class="btn btn-outline" id="sai-reset-btn">Reset</button>
        </div>
      </div>

      <!-- Tab Content: Hajj Days -->
      <div id="pilgrim-content-hajj" style="display: ${activeTab === 'hajj' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${HAJJ_DAYS.map(h => `
            <div style="background: var(--bg-surface-subtle); padding: var(--space-4); border-radius: var(--radius-md); border-left: 4px solid var(--color-accent-gold);">
              <span class="badge badge-gold" style="margin-bottom: var(--space-2);">${h.day}</span>
              <h4 class="font-h3">${h.name}</h4>
              <p class="font-caption" style="color: var(--text-muted); margin: 2px 0 6px 0;">Location: ${h.location}</p>
              <p class="font-body-sm" style="color: var(--text-secondary);">${h.summary}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab Content: Ihram Checklist -->
      <div id="pilgrim-content-checklist" style="display: ${activeTab === 'checklist' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          <label style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <input type="checkbox" checked style="accent-color: var(--color-primary); width: 18px; height: 18px;">
            <span>Two white unstitched Ihram sheets (Men) / Modest clothing (Women)</span>
          </label>
          <label style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <input type="checkbox" checked style="accent-color: var(--color-primary); width: 18px; height: 18px;">
            <span>Waist belt / money pouch for passport, cards & phone</span>
          </label>
          <label style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <input type="checkbox" style="accent-color: var(--color-primary); width: 18px; height: 18px;">
            <span>Unscented soap, deodorant, and petroleum jelly</span>
          </label>
          <label style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <input type="checkbox" style="accent-color: var(--color-primary); width: 18px; height: 18px;">
            <span>Comfortable walking sandals suitable for long walking intervals</span>
          </label>
        </div>
      </div>
    </div>
  `;
}
