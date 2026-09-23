// NOOR Comprehensive Zakat Calculator Component
import { ZAKAT_DEFAULTS } from '../data/pilgrimageRamadanData.js';

export function renderZakatCalculator() {
  const goldNisabValue = Math.round(ZAKAT_DEFAULTS.goldPricePerGramUSD * ZAKAT_DEFAULTS.nisabGoldGrams);
  const silverNisabValue = Math.round(ZAKAT_DEFAULTS.silverPricePerGramUSD * ZAKAT_DEFAULTS.nisabSilverGrams);

  return `
    <div class="zakat-card card" style="padding: var(--space-6);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
        <div>
          <span class="badge badge-gold">The 3rd Pillar of Islam</span>
          <h2 class="font-h2" style="margin-top: var(--space-1);">Zakat Calculator</h2>
          <p class="font-body-sm" style="color: var(--text-secondary);">Calculate your annual 2.5% wealth purification based on live Nisab values</p>
        </div>
      </div>

      <!-- Live Nisab Threshold Cards -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-6);">
        <div style="background: var(--bg-surface-subtle); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <span class="font-caption" style="color: var(--text-muted);">Gold Nisab (85g)</span>
          <p class="font-h3" style="color: var(--color-accent-gold-dark);">$${goldNisabValue.toLocaleString()} USD</p>
        </div>
        <div style="background: var(--bg-surface-subtle); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <span class="font-caption" style="color: var(--text-muted);">Silver Nisab (595g)</span>
          <p class="font-h3" style="color: var(--text-secondary);">$${silverNisabValue.toLocaleString()} USD</p>
        </div>
      </div>

      <!-- Assets Input Form -->
      <form id="zakat-form" style="display: flex; flex-direction: column; gap: var(--space-4);" onsubmit="return false;">
        <div>
          <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">1. Cash in Hand & Bank Accounts ($)</label>
          <input type="number" id="zakat-cash" class="search-bar" placeholder="0" min="0" style="padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); width: 100%; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary);">
        </div>

        <div>
          <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">2. Gold & Silver Value ($)</label>
          <input type="number" id="zakat-precious" class="search-bar" placeholder="0" min="0" style="padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); width: 100%; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary);">
        </div>

        <div>
          <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">3. Shares, Crypto & Mutual Funds ($)</label>
          <input type="number" id="zakat-investments" class="search-bar" placeholder="0" min="0" style="padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); width: 100%; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary);">
        </div>

        <div>
          <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px;">4. Business Merchandise & Inventory ($)</label>
          <input type="number" id="zakat-business" class="search-bar" placeholder="0" min="0" style="padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); width: 100%; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary);">
        </div>

        <div>
          <label class="font-caption" style="font-weight: 600; display: block; margin-bottom: 4px; color: var(--color-error);">Less: Short-Term Debts & Immediate Bills ($)</label>
          <input type="number" id="zakat-debts" class="search-bar" placeholder="0" min="0" style="padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); width: 100%; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary);">
        </div>
      </form>

      <!-- Live Calculation Breakdown Output -->
      <div id="zakat-summary-box" style="margin-top: var(--space-6); padding: var(--space-5); background: var(--color-primary-subtle); border: 1px solid rgba(15, 76, 58, 0.2); border-radius: var(--radius-lg);">
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
          <span class="font-body-sm" style="color: var(--text-secondary);">Net Zakatable Assets:</span>
          <strong id="zakat-net-assets" class="font-body-sm">$0.00</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-4);">
          <span class="font-body-sm" style="color: var(--text-secondary);">Nisab Threshold Status:</span>
          <span id="zakat-nisab-status" class="badge badge-gold">Enter Assets</span>
        </div>
        <div style="border-top: 1px solid var(--border-color); padding-top: var(--space-3); display: flex; justify-content: space-between; align-items: baseline;">
          <span class="font-h3" style="color: var(--color-primary);">Zakat Payable (2.5%):</span>
          <span id="zakat-payable-val" class="font-display" style="color: var(--color-primary); font-size: 1.85rem;">$0.00</span>
        </div>
      </div>

      <div style="margin-top: var(--space-4); font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">
        * Note: Zakat is due once every lunar year on eligible wealth surpassing the Nisab threshold after deducting current liabilities. Consult local scholars for complex holdings.
      </div>
    </div>
  `;
}
