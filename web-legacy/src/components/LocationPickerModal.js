// NOOR Worldwide Location Picker & Auto-Detection Modal
import { locationService, GLOBAL_LOCATIONS } from '../services/locationService.js';

export function renderLocationPickerModal() {
  const currentLoc = locationService.getCurrentLocation();

  return `
    <div class="modal-overlay" id="location-modal-overlay">
      <div class="modal-content" style="max-width: 540px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <div>
            <h3 class="font-h2">Select Location</h3>
            <p class="font-caption" style="color: var(--text-muted);">Prayer times and Qibla bearing calculate from your exact coordinates</p>
          </div>
          <button class="btn-icon btn-icon-sm" id="close-location-modal">✕</button>
        </div>

        <!-- Auto-Detect Location Button -->
        <div class="card card-emerald" style="margin-bottom: var(--space-4); display: flex; justify-content: space-between; align-items: center; padding: var(--space-4);">
          <div>
            <span class="badge badge-gold" style="font-size: 0.65rem;">GPS & IP Auto-Detect</span>
            <h4 class="font-h3" style="color: white; margin-top: 4px;" id="loc-detected-label">
              ${currentLoc.isAutoDetected ? `📍 ${currentLoc.city}, ${currentLoc.country}` : `Current: ${currentLoc.city}, ${currentLoc.country}`}
            </h4>
          </div>
          <button class="btn btn-gold btn-sm" id="btn-detect-gps">
            🧭 Detect My Location
          </button>
        </div>

        <!-- Search All Locations -->
        <div class="search-bar" style="margin-bottom: var(--space-4);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="location-search-input" placeholder="Search any city or country (e.g. Makkah, Cairo, Dubai, Jakarta, London, Dallas)...">
        </div>

        <!-- Region Filter Pills -->
        <div style="display: flex; gap: var(--space-2); overflow-x: auto; padding-bottom: 6px; margin-bottom: var(--space-3); scrollbar-width: none;">
          <button class="chip active loc-region-chip" data-region="All">All Regions</button>
          <button class="chip loc-region-chip" data-region="Middle East">Middle East</button>
          <button class="chip loc-region-chip" data-region="South Asia">South Asia</button>
          <button class="chip loc-region-chip" data-region="Southeast Asia">Southeast Asia</button>
          <button class="chip loc-region-chip" data-region="Europe">Europe</button>
          <button class="chip loc-region-chip" data-region="North America">North America</button>
          <button class="chip loc-region-chip" data-region="Africa">Africa</button>
        </div>

        <!-- Scrollable Cities List -->
        <div id="locations-list-scroll" style="max-height: 340px; overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-2); padding-right: 4px;">
          ${GLOBAL_LOCATIONS.map(loc => `
            <div class="card card-interactive loc-item-card ${loc.city === currentLoc.city ? 'active' : ''}" 
                 data-city="${loc.city}" data-country="${loc.country}" data-lat="${loc.lat}" data-lng="${loc.lng}" data-region="${loc.region}"
                 style="padding: var(--space-3) var(--space-4); display: flex; justify-content: space-between; align-items: center; ${loc.city === currentLoc.city ? 'border-color: var(--color-primary); background: var(--color-primary-subtle);' : ''}">
              <div>
                <strong class="font-body">${loc.city}</strong>
                <span class="font-caption" style="color: var(--text-muted); margin-left: 6px;">${loc.country}</span>
              </div>
              <span class="badge badge-gold" style="font-size: 0.65rem;">${loc.region}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
