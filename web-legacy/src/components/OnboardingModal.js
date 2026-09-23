// NOOR 6-Screen Interactive Onboarding Modal Component
import { LANGUAGES } from '../data/languages.js';
import { CALCULATION_METHODS, ASR_METHODS, POPULAR_LOCATIONS } from '../data/prayerData.js';

export function renderOnboardingModal(currentStep = 1) {
  return `
    <div class="modal-overlay ${currentStep <= 6 ? 'open' : ''}" id="onboarding-overlay">
      <div class="modal-content" style="max-width: 520px; text-align: left;">
        <!-- Step Progress Indicator -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <span class="badge badge-gold">Step ${currentStep} of 6</span>
          <button class="btn btn-ghost btn-sm" id="onboarding-skip-btn">Skip</button>
        </div>

        <!-- SCREEN 1: Welcome -->
        <div class="onboarding-step" id="onboarding-step-1" style="display: ${currentStep === 1 ? 'block' : 'none'}; text-align: center;">
          <div style="width: 72px; height: 72px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #0F4C3A, #186F56); margin: 0 auto var(--space-4) auto; display: flex; align-items: center; justify-content: center; color: #C5A059; font-size: 2rem; font-weight: 800; box-shadow: var(--shadow-emerald);">
            ن
          </div>
          <h1 class="font-display" style="color: var(--color-primary); margin-bottom: var(--space-2);">NOOR</h1>
          <p class="font-h3" style="color: var(--color-accent-gold-dark); margin-bottom: var(--space-4);">“Your Deen. Your Daily Companion.”</p>
          <p class="font-body" style="color: var(--text-secondary); margin-bottom: var(--space-8);">
            A peaceful, trusted, and modern Islamic ecosystem uniting Prayer, Quran, Hadith, Duas, and Islamic knowledge into one harmonious daily sanctuary.
          </p>
          <button class="btn btn-primary btn-lg" style="width: 100%;" onclick="window.nextOnboardingStep(2)">Get Started</button>
        </div>

        <!-- SCREEN 2: Goals & Needs Multi-Select -->
        <div class="onboarding-step" id="onboarding-step-2" style="display: ${currentStep === 2 ? 'block' : 'none'};">
          <h2 class="font-h2" style="margin-bottom: var(--space-2);">What would you like Noor to help you with?</h2>
          <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">Choose the dimensions of your Deen you wish to prioritize:</p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); margin-bottom: var(--space-6);" id="onboarding-goals-grid">
            ${['Prayer Times', 'Quran Reading', 'Daily Duas', 'Islamic Learning', 'Hadith Study', 'Islamic Videos', 'News & Ummah', 'Ramadan Mode', 'Hajj & Umrah'].map(goal => `
              <label class="card card-interactive" style="padding: var(--space-3); display: flex; align-items: center; gap: var(--space-2); cursor: pointer;">
                <input type="checkbox" checked style="accent-color: var(--color-primary);">
                <span class="font-caption" style="font-weight: 600;">${goal}</span>
              </label>
            `).join('')}
          </div>

          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-secondary" onclick="window.nextOnboardingStep(1)">Back</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="window.nextOnboardingStep(3)">Continue</button>
          </div>
        </div>

        <!-- SCREEN 3: Choose Language -->
        <div class="onboarding-step" id="onboarding-step-3" style="display: ${currentStep === 3 ? 'block' : 'none'};">
          <h2 class="font-h2" style="margin-bottom: var(--space-1);">Choose Your Language</h2>
          <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">Default is English. Instant translation & RTL support available across 80+ languages.</p>

          <input type="text" id="onboarding-lang-search" class="search-bar" placeholder="Search language (English, العربية, اردو, Türkçe...)" style="margin-bottom: var(--space-3);">

          <div style="max-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-6);" id="onboarding-lang-list">
            ${LANGUAGES.slice(0, 10).map(l => `
              <div class="card card-interactive" style="padding: var(--space-3); display: flex; justify-content: space-between; align-items: center;" onclick="window.selectOnboardingLanguage('${l.code}')">
                <div>
                  <strong>${l.nativeName}</strong>
                  <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">(${l.name})</span>
                </div>
                <span class="badge ${l.dir === 'rtl' ? 'badge-gold' : 'badge-emerald'}">${l.dir.toUpperCase()}</span>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-secondary" onclick="window.nextOnboardingStep(2)">Back</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="window.nextOnboardingStep(4)">Continue</button>
          </div>
        </div>

        <!-- SCREEN 4: Location -->
        <div class="onboarding-step" id="onboarding-step-4" style="display: ${currentStep === 4 ? 'block' : 'none'};">
          <h2 class="font-h2" style="margin-bottom: var(--space-1);">Set Your Location</h2>
          <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">Used strictly for calculating exact Prayer Times, Qibla compass, and finding nearby Mosques.</p>

          <div style="margin-bottom: var(--space-4);">
            <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">Select or Search City:</label>
            <select class="search-bar" id="onboarding-city-select" style="width: 100%; padding: var(--space-3); border-radius: var(--radius-md);">
              ${POPULAR_LOCATIONS.map(loc => `
                <option value="${loc.city}">${loc.city}, ${loc.country}</option>
              `).join('')}
            </select>
          </div>

          <div class="card card-sand" style="margin-bottom: var(--space-6); font-size: 0.8125rem;">
            🔒 <strong>Privacy Assurance:</strong> NOOR never tracks or sells your location data. Calculations occur locally on your device.
          </div>

          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-secondary" onclick="window.nextOnboardingStep(3)">Back</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="window.nextOnboardingStep(5)">Continue</button>
          </div>
        </div>

        <!-- SCREEN 5: Prayer Settings -->
        <div class="onboarding-step" id="onboarding-step-5" style="display: ${currentStep === 5 ? 'block' : 'none'};">
          <h2 class="font-h2" style="margin-bottom: var(--space-1);">Prayer Calculation Settings</h2>
          <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">Tailor the prayer times to your region and school of thought:</p>

          <div style="margin-bottom: var(--space-3);">
            <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">Calculation Method:</label>
            <select class="search-bar" id="onboarding-calc-method" style="width: 100%; padding: var(--space-3); border-radius: var(--radius-md);">
              ${CALCULATION_METHODS.map(m => `
                <option value="${m.id}">${m.name}</option>
              `).join('')}
            </select>
          </div>

          <div style="margin-bottom: var(--space-6);">
            <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">Asr Juristic Method:</label>
            <select class="search-bar" id="onboarding-asr-method" style="width: 100%; padding: var(--space-3); border-radius: var(--radius-md);">
              ${ASR_METHODS.map(a => `
                <option value="${a.id}">${a.name}</option>
              `).join('')}
            </select>
          </div>

          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-secondary" onclick="window.nextOnboardingStep(4)">Back</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="window.nextOnboardingStep(6)">Continue</button>
          </div>
        </div>

        <!-- SCREEN 6: Notifications Setup -->
        <div class="onboarding-step" id="onboarding-step-6" style="display: ${currentStep === 6 ? 'block' : 'none'};">
          <h2 class="font-h2" style="margin-bottom: var(--space-1);">Mindful Reminders</h2>
          <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">Select what spiritual reminders you wish to receive. No spam, ever.</p>

          <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-6);">
            ${[
              { id: 'notif-azan', title: 'Adhan Notifications', desc: 'Serene audio alert at prayer times' },
              { id: 'notif-ayah', title: 'Daily Quranic Ayah', desc: 'One inspiring verse every morning' },
              { id: 'notif-adhkar', title: 'Morning & Evening Adhkar', desc: 'Sunnah supplications at sunrise and sunset' },
              { id: 'notif-friday', title: 'Friday Jumu‘ah Reminder', desc: 'Surah Al-Kahf reminder on Fridays' }
            ].map(n => `
              <label style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-3); background: var(--bg-surface-subtle); border-radius: var(--radius-md); cursor: pointer;">
                <div>
                  <strong>${n.title}</strong>
                  <p class="font-caption" style="color: var(--text-muted);">${n.desc}</p>
                </div>
                <input type="checkbox" checked style="accent-color: var(--color-primary); width: 18px; height: 18px;">
              </label>
            `).join('')}
          </div>

          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-secondary" onclick="window.nextOnboardingStep(5)">Back</button>
            <button class="btn btn-primary btn-lg" style="flex: 1;" onclick="window.completeOnboarding()">Enter NOOR</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
