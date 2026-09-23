// NOOR Mobile App: Islamic Learning Platform View (LearnView)
import { LEARNING_COURSES } from '../data/learningData.js';
import { HADITHS_LIST, HADITH_CATEGORIES } from '../data/hadithData.js';
import { DUAS_LIST, DUA_CATEGORIES } from '../data/duasData.js';

export function renderLearnView(activeTab = 'courses') {
  return `
    <div class="mobile-screen-content" style="padding: var(--space-4);">
      <!-- Header -->
      <div style="margin-bottom: var(--space-4);">
        <span class="badge badge-emerald">Structured Knowledge</span>
        <h2 class="font-h1" style="margin-top: 2px;">Islamic Learning</h2>
        <p class="font-body-sm" style="color: var(--text-secondary);">Authentic paths for personal and spiritual growth</p>
      </div>

      <!-- Main Tabs: Courses, Hadith, Duas -->
      <div class="tabs-container" style="margin-bottom: var(--space-4);">
        <button class="tab-btn ${activeTab === 'courses' ? 'active' : ''}" data-learn-tab="courses">Courses</button>
        <button class="tab-btn ${activeTab === 'hadith' ? 'active' : ''}" data-learn-tab="hadith">Hadith Library</button>
        <button class="tab-btn ${activeTab === 'duas' ? 'active' : ''}" data-learn-tab="duas">Duas & Adhkar</button>
      </div>

      <!-- Tab Content: Courses -->
      <div id="learn-content-courses" style="display: ${activeTab === 'courses' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${LEARNING_COURSES.map(course => `
            <div class="card card-interactive course-card" data-course-id="${course.id}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-2);">
                <span class="badge badge-gold">${course.category}</span>
                <span class="font-caption" style="color: var(--text-muted);">${course.level}</span>
              </div>
              <h3 class="font-h3" style="margin-bottom: var(--space-1);">${course.title}</h3>
              <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-3);">${course.summary}</p>
              
              <div style="margin-bottom: var(--space-3);">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px;">
                  <span>Progress</span>
                  <strong>${course.progress}%</strong>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" style="width: ${course.progress}%;"></div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: var(--space-2);">
                <span>Instructor: ${course.instructor}</span>
                <span>⏱ ${course.duration}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab Content: Hadith Library -->
      <div id="learn-content-hadith" style="display: ${activeTab === 'hadith' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${HADITHS_LIST.map(h => `
            <div class="card" style="border-left: 4px solid var(--color-primary);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                <span class="badge badge-emerald">${h.collection}</span>
                <span class="badge badge-gold" style="font-size: 0.65rem;">${h.grade}</span>
              </div>
              <p class="font-arabic-quran" style="font-size: 1.35rem; line-height: 2.1; margin: var(--space-2) 0; color: var(--color-charcoal);">
                ${h.arabic}
              </p>
              <p class="font-body-sm" style="margin-bottom: var(--space-3); font-weight: 500;">
                "${h.translation}"
              </p>
              <div style="background: var(--bg-surface-subtle); padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); margin-bottom: var(--space-2); font-size: 0.75rem; color: var(--text-secondary);">
                <strong>Scholarly Note:</strong> ${h.commentary}
              </div>
              <span class="font-caption" style="color: var(--text-muted);">Narrator: ${h.narrator} • ${h.source}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab Content: Duas & Adhkar -->
      <div id="learn-content-duas" style="display: ${activeTab === 'duas' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${DUAS_LIST.map(d => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                <span class="badge badge-gold">${d.category.toUpperCase()}</span>
                <span class="badge badge-emerald">Repeat: ${d.targetCount}x</span>
              </div>
              <h4 class="font-h3" style="margin-bottom: var(--space-2);">${d.title}</h4>
              <p class="font-arabic-quran" style="font-size: 1.35rem; line-height: 2.1; margin-bottom: var(--space-2); color: var(--color-charcoal);">
                ${d.arabic}
              </p>
              <p class="font-transliteration" style="margin-bottom: var(--space-2);">
                ${d.transliteration}
              </p>
              <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-2);">
                "${d.translation}"
              </p>
              <span class="font-caption" style="color: var(--text-muted); display: block;">Source: ${d.source}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
