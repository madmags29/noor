// NOOR User Authentication & Google Login Modal
import { authService } from '../services/authService.js';

export function renderAuthModal(isSignUp = false) {
  const user = authService.getCurrentUser();

  if (user) {
    // User already authenticated view
    return `
      <div class="modal-overlay" id="auth-modal-overlay">
        <div class="modal-content" style="max-width: 460px; text-align: center;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <span class="badge badge-emerald">Active Session</span>
            <button class="btn-icon btn-icon-sm" id="close-auth-modal">✕</button>
          </div>

          <div style="width: 80px; height: 80px; border-radius: 50%; margin: 0 auto var(--space-3) auto; overflow: hidden; border: 3px solid var(--color-accent-gold); box-shadow: var(--shadow-md); display: flex; align-items: center; justify-content: center; background: var(--color-primary);">
            ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">` : `<span style="color: white; font-size: 2rem; font-weight: 700;">${user.name.charAt(0)}</span>`}
          </div>

          <h3 class="font-h2">${user.name}</h3>
          <p class="font-caption" style="color: var(--text-muted); margin-bottom: var(--space-4);">${user.email}</p>

          <div class="card card-sand" style="margin-bottom: var(--space-6); display: flex; justify-content: space-around; text-align: center;">
            <div>
              <strong style="font-size: 1.25rem; color: var(--color-primary);">${user.stats.daysStreak}</strong>
              <p class="font-caption" style="color: var(--text-muted);">Days Streak</p>
            </div>
            <div style="border-right: 1px solid var(--border-color);"></div>
            <div>
              <strong style="font-size: 1.25rem; color: var(--color-accent-gold-dark);">${user.stats.prayersCompleted}</strong>
              <p class="font-caption" style="color: var(--text-muted);">Prayers Recorded</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <button class="btn btn-outline" id="auth-signout-btn" style="width: 100%; color: var(--color-error); border-color: var(--color-error);">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="modal-overlay" id="auth-modal-overlay">
      <div class="modal-content" style="max-width: 460px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <div style="display: flex; align-items: center; gap: var(--space-2);">
            <div class="brand-emblem" style="width: 28px; height: 28px; font-size: 0.9rem;">ن</div>
            <h3 class="font-h2" id="auth-title">${isSignUp ? 'Create Your Account' : 'Welcome to NOOR'}</h3>
          </div>
          <button class="btn-icon btn-icon-sm" id="close-auth-modal">✕</button>
        </div>

        <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
          Sync your Quran bookmarks, prayer history, and personalized learning across all your devices.
        </p>

        <!-- 1-Click Google / Gmail Login Button -->
        <button class="btn btn-secondary btn-lg" id="btn-google-login" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: var(--space-3); border: 1px solid var(--border-color); background: var(--bg-surface); margin-bottom: var(--space-4); box-shadow: var(--shadow-sm);">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span style="font-weight: 600;">Continue with Google (Gmail)</span>
        </button>

        <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);">
          <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
          <span class="font-caption" style="color: var(--text-muted); text-transform: uppercase;">or use email</span>
          <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
        </div>

        <!-- Auth Error Alert Container -->
        <div id="auth-error-msg" style="display: none; background: rgba(197, 48, 48, 0.1); color: var(--color-error); padding: var(--space-3); border-radius: var(--radius-md); font-size: 0.8125rem; margin-bottom: var(--space-3); border: 1px solid rgba(197, 48, 48, 0.2);">
        </div>

        <!-- Form Fields -->
        <form id="auth-form" onsubmit="return false;">
          <div id="auth-name-field" style="display: ${isSignUp ? 'block' : 'none'}; margin-bottom: var(--space-3);">
            <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">Full Name</label>
            <input type="text" id="auth-name-input" class="search-bar" placeholder="e.g. Fatima Zahra" style="border-radius: var(--radius-md); width: 100%;">
          </div>

          <div style="margin-bottom: var(--space-3);">
            <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">Email Address</label>
            <input type="email" id="auth-email-input" class="search-bar" placeholder="name@example.com" style="border-radius: var(--radius-md); width: 100%;" required>
          </div>

          <div style="margin-bottom: var(--space-4);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
              <label class="font-caption" style="font-weight: 600;">Password</label>
              ${!isSignUp ? `<a href="#" class="font-caption" style="color: var(--color-primary); text-decoration: none;">Forgot password?</a>` : ''}
            </div>
            <input type="password" id="auth-password-input" class="search-bar" placeholder="••••••••" style="border-radius: var(--radius-md); width: 100%;" required>
          </div>

          <button class="btn btn-primary btn-lg" id="auth-submit-btn" style="width: 100%; margin-bottom: var(--space-4);">
            ${isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style="text-align: center; font-size: 0.875rem;">
          <span style="color: var(--text-secondary);">${isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
          <button class="btn btn-ghost btn-sm" id="auth-toggle-mode" style="color: var(--color-primary); font-weight: 700; margin-left: 4px;">
            ${isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  `;
}
