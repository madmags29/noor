// NOOR Interactive Qibla Compass Component
import { calculateQibla } from '../data/prayerData.js';

export function renderQiblaCompass(lat = 51.5074, lng = -0.1278) {
  const { bearing, distanceKm } = calculateQibla(lat, lng);

  return `
    <div class="qibla-container card" style="text-align: center; padding: var(--space-6);">
      <div style="margin-bottom: var(--space-4);">
        <span class="badge badge-gold">Interactive Compass</span>
        <h3 class="font-h2" style="margin-top: var(--space-2);">Qibla Direction</h3>
        <p class="font-body-sm" style="color: var(--text-secondary);">Accurate bearing to the Holy Kaaba in Makkah</p>
      </div>

      <!-- 360 Degree Compass Dial -->
      <div class="compass-wrapper" style="position: relative; width: 260px; height: 260px; margin: var(--space-4) auto;">
        <svg viewBox="0 0 300 300" style="width: 100%; height: 100%; transform: rotate(0deg); transition: transform 0.5s ease-out;" id="qibla-svg-compass">
          <!-- Outer Compass Ring -->
          <circle cx="150" cy="150" r="140" fill="var(--bg-surface-subtle)" stroke="var(--border-color)" stroke-width="2"/>
          <circle cx="150" cy="150" r="130" fill="none" stroke="var(--border-color)" stroke-dasharray="4 6" stroke-width="1.5"/>

          <!-- Cardinal Direction Labels -->
          <text x="150" y="32" text-anchor="middle" font-size="14" font-weight="700" fill="var(--color-primary)">N</text>
          <text x="272" y="155" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text-muted)">E</text>
          <text x="150" y="278" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text-muted)">S</text>
          <text x="28" y="155" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text-muted)">W</text>

          <!-- Degree Ticks -->
          ${Array.from({ length: 24 }).map((_, i) => {
            const angle = i * 15;
            const isMajor = angle % 90 === 0;
            const r1 = 138;
            const r2 = isMajor ? 124 : 130;
            const rad = (angle - 90) * (Math.PI / 180);
            const x1 = 150 + r1 * Math.cos(rad);
            const y1 = 150 + r1 * Math.sin(rad);
            const x2 = 150 + r2 * Math.cos(rad);
            const y2 = 150 + r2 * Math.sin(rad);
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--text-muted)" stroke-width="${isMajor ? 2 : 1}" opacity="0.6"/>`;
          }).join('')}

          <!-- Qibla Target Needle Group (Rotated to bearing) -->
          <g transform="rotate(${bearing}, 150, 150)">
            <!-- Kaaba Pointer -->
            <polygon points="150,30 160,150 140,150" fill="var(--color-accent-gold)" filter="drop-shadow(0 2px 4px rgba(197, 160, 89, 0.4))"/>
            <polygon points="150,270 160,150 140,150" fill="var(--color-gray-light)"/>
            
            <!-- Kaaba Cube Icon at Needle Tip -->
            <rect x="142" y="18" width="16" height="16" rx="2" fill="#1A1A1A" stroke="var(--color-accent-gold)" stroke-width="1.5"/>
            <line x1="142" y1="23" x2="158" y2="23" stroke="var(--color-accent-gold)" stroke-width="1"/>
          </g>

          <!-- Center Pivot Pivot -->
          <circle cx="150" cy="150" r="10" fill="var(--color-primary)" stroke="#FFFFFF" stroke-width="3"/>
        </svg>
      </div>

      <!-- Distance and Heading Metrics -->
      <div style="display: flex; justify-content: space-around; margin: var(--space-4) 0; padding: var(--space-3) 0; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
        <div>
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Heading</span>
          <p class="font-h2" style="color: var(--color-primary);">${bearing}° ESE</p>
        </div>
        <div style="border-right: 1px solid var(--border-color);"></div>
        <div>
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Distance to Kaaba</span>
          <p class="font-h2" style="color: var(--color-accent-gold-dark);">${distanceKm.toLocaleString()} km</p>
        </div>
      </div>

      <!-- Calibration & Sensor Guide -->
      <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-2); color: var(--text-muted); font-size: 0.8125rem;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
        <span>Rotate device in a figure-8 motion for optimal calibration</span>
      </div>
    </div>
  `;
}
