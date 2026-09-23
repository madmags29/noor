// NOOR Ramadan Mode Dashboard Component

export function renderRamadanHub(currentDay = 12, completedFasts = 11, taraweehRakat = 8) {
  return `
    <div class="ramadan-card card" style="padding: var(--space-6); background: linear-gradient(180deg, var(--bg-surface-sand) 0%, var(--bg-surface) 100%);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <div>
          <span class="badge badge-gold">The Blessed Month</span>
          <h2 class="font-h2" style="margin-top: var(--space-1);">Ramadan Hub</h2>
          <p class="font-body-sm" style="color: var(--text-secondary);">Day ${currentDay} of 30 • 1448 AH</p>
        </div>
        <span class="badge badge-emerald">Active Mode</span>
      </div>

      <!-- Suhoor & Iftar Countdowns -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-6);">
        <!-- Suhoor Countdown -->
        <div style="background: var(--bg-surface); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
          <span class="font-caption" style="color: var(--text-muted); text-transform: uppercase;">Suhoor Ends (Fajr)</span>
          <p class="font-h3" style="color: var(--color-primary); margin: 4px 0;">05:14 AM</p>
          <span class="badge badge-emerald" style="font-size: 0.7rem;">In 4h 32m</span>
        </div>

        <!-- Iftar Countdown -->
        <div style="background: var(--bg-surface); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
          <span class="font-caption" style="color: var(--text-muted); text-transform: uppercase;">Iftar Time (Maghrib)</span>
          <p class="font-h3" style="color: var(--color-accent-gold-dark); margin: 4px 0;">07:08 PM</p>
          <span class="badge badge-gold" style="font-size: 0.7rem;">In 11h 16m</span>
        </div>
      </div>

      <!-- Fasting Tracker Progress -->
      <div style="background: var(--bg-surface); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: var(--space-4);">
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
          <span class="font-body-sm" style="font-weight: 600;">Fasting Progress</span>
          <span class="font-body-sm" style="color: var(--color-primary); font-weight: 700;">${completedFasts} / 30 Fasts</span>
        </div>
        <div class="progress-bar-bg" style="height: 8px;">
          <div class="progress-bar-fill" style="width: ${(completedFasts / 30) * 100}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: var(--space-3); font-size: 0.8125rem;">
          <span>Taraweeh Tracker: <strong>${taraweehRakat} Rakat Offered</strong></span>
          <button class="btn btn-sm btn-outline" id="ramadan-fast-toggle">+ Record Today's Fast</button>
        </div>
      </div>

      <!-- Daily Ramadan Dua -->
      <div style="background: var(--color-accent-gold-subtle); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid rgba(197, 160, 89, 0.3);">
        <span class="font-caption" style="color: var(--color-accent-gold-dark); font-weight: 700; text-transform: uppercase;">Iftar Dua (Upon Breaking Fast)</span>
        <p class="font-arabic-display" style="font-size: 1.15rem; color: var(--color-charcoal); margin: var(--space-2) 0; direction: rtl;">
          ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ
        </p>
        <p class="font-transliteration" style="font-size: 0.8125rem; margin-bottom: 2px;">
          Dhahabadh-dhama'u, wabtallatil-'urooqu, wa thabatal-ajru in sha Allah.
        </p>
        <p class="font-body-sm" style="font-size: 0.8125rem; color: var(--text-secondary);">
          "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills." (Sunan Abi Dawud 2357)
        </p>
      </div>
    </div>
  `;
}
