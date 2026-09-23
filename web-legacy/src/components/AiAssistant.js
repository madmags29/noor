// NOOR Assistant AI Component: Grounded Islamic Intelligence with Verified Citations
import { SUGGESTED_QUERIES, getAssistantResponse } from '../services/aiAssistantService.js';

export function renderAiAssistant() {
  return `
    <div class="ai-assistant-modal card" style="padding: var(--space-6); max-width: 600px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: linear-gradient(135deg, #0F4C3A, #C5A059); display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-h2" style="margin-bottom: 2px;">Noor Assistant</h3>
            <span class="badge badge-gold">Verified Islamic Sources</span>
          </div>
        </div>
      </div>

      <!-- Trust & Fiqh Disclaimer -->
      <div style="background: var(--bg-surface-subtle); padding: var(--space-3); border-radius: var(--radius-md); font-size: 0.75rem; color: var(--text-secondary); margin-bottom: var(--space-4); border: 1px solid var(--border-color);">
        <strong>Core Safety Principle:</strong> Noor Assistant answers using authenticated Quran & Hadith citations. For personal Fatwa rulings, consultation with qualified local scholars is required.
      </div>

      <!-- Dialogue Thread Area -->
      <div id="ai-chat-thread" style="min-height: 200px; max-height: 380px; overflow-y: auto; padding: var(--space-2) 0; margin-bottom: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3);">
        <!-- Welcome Message -->
        <div style="background: var(--bg-surface-sand); padding: var(--space-4); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <p class="font-body-sm">
            Assalamu Alaikum! I am your Noor companion. How can I assist your Islamic learning today? Select a question below or enter your inquiry.
          </p>
        </div>
      </div>

      <!-- Prompt Suggestion Pills -->
      <div style="margin-bottom: var(--space-4);">
        <span class="font-caption" style="color: var(--text-muted); display: block; margin-bottom: var(--space-2);">Suggested Inquiries:</span>
        <div style="display: flex; gap: var(--space-2); overflow-x: auto; padding-bottom: 4px; scrollbar-width: none;">
          ${SUGGESTED_QUERIES.map(q => `
            <button class="chip ai-prompt-chip" data-prompt="${q}" style="font-size: 0.75rem;">${q}</button>
          `).join('')}
        </div>
      </div>

      <!-- Chat Input Field -->
      <div style="display: flex; gap: var(--space-2);">
        <input type="text" id="ai-user-input" class="search-bar" placeholder="Ask about Quran, Hadith, Duas, Salah..." style="flex: 1; border-radius: var(--radius-md);">
        <button class="btn btn-primary" id="ai-send-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `;
}

export function formatAiResponseHTML(response) {
  return `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: var(--space-4); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
      <h4 class="font-h3" style="color: var(--color-primary); margin-bottom: var(--space-3);">${response.topic}</h4>
      ${response.sections.map(sec => `
        <div style="margin-bottom: var(--space-3); padding-bottom: var(--space-2); border-bottom: 1px dashed var(--border-color);">
          <span class="badge ${sec.type === 'Quran' ? 'badge-emerald' : 'badge-gold'}" style="margin-bottom: var(--space-1);">${sec.badge}</span>
          ${sec.text.includes('اللَّ') || sec.text.includes('إِنَّ') ? `<p class="font-arabic-quran" style="font-size: 1.3rem; margin: 4px 0;">${sec.text}</p>` : `<p class="font-body-sm" style="font-weight: 500;">${sec.text}</p>`}
          ${sec.translation ? `<p class="font-caption" style="color: var(--text-secondary); margin-top: 2px;"><em>${sec.translation}</em></p>` : ''}
          ${sec.reference ? `<span style="font-size: 0.7rem; color: var(--color-accent-gold-dark); font-weight: 600;">Ref: ${sec.reference}</span>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}
