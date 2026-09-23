// NOOR Mobile App: Profile & Settings View (ProfileView)
import { storageService } from '../services/storageService.js';
import { i18n } from '../services/i18n.js';
import { authService } from '../services/authService.js';

export function renderProfileView() {
  const currentLangMeta = i18n.getLanguageMeta();
  const user = authService.getCurrentUser();

  return `
    <div class="mobile-screen-content" style="padding: var(--space-4);">
      <!-- Profile Header -->
      <div class="card card-emerald arch-card" style="margin-bottom: var(--space-6); text-align: center;">
        <div style="width: 68px; height: 68px; border-radius: 50%; background: #FAF8F5; color: var(--color-primary); font-size: 1.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-2) auto; overflow: hidden; border: 2px solid var(--color-accent-gold);">
          ${user && user.avatar ? `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">` : (user ? user.name.charAt(0) : 'N')}
        </div>
        <h2 class="font-h2" style="color: #FFFFFF;">${user ? user.name : 'Servant of Allah'}</h2>
        <p class="font-caption" style="color: var(--color-accent-gold-light);">${user ? `${user.email} • ${user.provider === 'google' ? 'Google Account' : 'Verified Member'}` : 'Guest Mode • Sign in to sync across devices'}</p>

        <div style="display: flex; justify-content: space-around; margin-top: var(--space-4); padding-top: var(--space-3); border-top: 1px solid rgba(255, 255, 255, 0.15);">
          <div>
            <strong style="color: #FFFFFF; font-size: 1.2rem;">${user ? user.stats.daysStreak : 14}</strong>
            <p class="font-caption" style="color: rgba(255, 255, 255, 0.8);">Days Streak</p>
          </div>
          <div>
            <strong style="color: #FFFFFF; font-size: 1.2rem;">${user ? user.stats.prayersCompleted : 86}</strong>
            <p class="font-caption" style="color: rgba(255, 255, 255, 0.8);">Prayers Logged</p>
          </div>
          <div>
            <strong style="color: #FFFFFF; font-size: 1.2rem;">${user ? user.stats.quranPagesRead : 3}</strong>
            <p class="font-caption" style="color: rgba(255, 255, 255, 0.8);">Quran Pages</p>
          </div>
        </div>
      </div>

      ${!user ? `
        <!-- Sign in prompt card -->
        <div class="card card-sand" style="margin-bottom: var(--space-4); display: flex; align-items: center; justify-content: space-between;">
          <div>
            <strong style="font-size: 0.9375rem; display: block;">Sync Your Deen</strong>
            <span class="font-caption" style="color: var(--text-secondary);">Save bookmarks & prayer streaks</span>
          </div>
          <button class="btn btn-sm btn-primary" id="profile-signin-btn">Sign In / Google</button>
        </div>
      ` : ''}

      <!-- Settings & Preferences Groups -->
      <h3 class="font-h3" style="margin-bottom: var(--space-3);">General Preferences</h3>
      <div class="card" style="padding: 0; margin-bottom: var(--space-4); overflow: hidden;">
        <div class="profile-menu-row" id="profile-open-location" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); border-bottom: 1px solid var(--border-color); cursor: pointer;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span>📍</span>
            <span>Location & Coordinates</span>
          </div>
          <span style="color: var(--color-primary); font-weight: 600; font-size: 0.875rem;">Select ❯</span>
        </div>

        <div class="profile-menu-row" id="profile-manage-account" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); border-bottom: 1px solid var(--border-color); cursor: pointer;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span>👤</span>
            <span>${user ? 'Account & Session' : 'Sign In / Register'}</span>
          </div>
          <span style="color: var(--color-primary); font-weight: 600; font-size: 0.875rem;">${user ? 'Active ❯' : 'Login ❯'}</span>
        </div>

        <div class="profile-menu-row" id="profile-open-lang" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); border-bottom: 1px solid var(--border-color); cursor: pointer;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span>🌐</span>
            <span>Language</span>
          </div>
          <span style="color: var(--color-primary); font-weight: 600; font-size: 0.875rem;">${currentLangMeta.nativeName} (${currentLangMeta.code.toUpperCase()}) ❯</span>
        </div>

        <div class="profile-menu-row" id="profile-open-calc" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); border-bottom: 1px solid var(--border-color); cursor: pointer;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span>🕌</span>
            <span>Prayer Calculation Method</span>
          </div>
          <span style="color: var(--text-muted); font-size: 0.875rem;">Muslim World League ❯</span>
        </div>

        <div class="profile-menu-row" id="profile-open-offline" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); border-bottom: 1px solid var(--border-color); cursor: pointer;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span>📥</span>
            <span>Offline Worship Content</span>
          </div>
          <span class="badge badge-emerald">3 Packs Saved</span>
        </div>

        <div class="profile-menu-row" id="profile-replay-onboarding" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); cursor: pointer;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span>✨</span>
            <span>Replay Onboarding Tour</span>
          </div>
          <span style="color: var(--text-muted); font-size: 0.875rem;">Launch ❯</span>
        </div>
      </div>

      <h3 class="font-h3" style="margin-bottom: var(--space-3);">Privacy & Trust</h3>
      <div class="card card-sand" style="font-size: 0.8125rem; line-height: 1.5;">
        <p style="margin-bottom: var(--space-2);">
          🔒 <strong>Zero Telemetry Selling:</strong> NOOR operates as a sacred trust (Amanah). Your prayers, Dhikr counts, and location queries are calculated locally and never monetized.
        </p>
        <span style="color: var(--text-muted);">Version 1.0.0 Global Edition • Build 2026.09</span>
      </div>
    </div>
  `;
}
