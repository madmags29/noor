// NOOR Responsive Web Portal Pages (12-Column Desktop & Tablet Layout)
import { SURAHS_LIST, FEATURED_VERSES } from '../data/quranData.js';
import { getPrayerTimes } from '../data/prayerData.js';
import { LEARNING_COURSES } from '../data/learningData.js';
import { NEWS_ARTICLES, VIDEOS_MEDIA } from '../data/newsData.js';
import { DUAS_LIST, DUA_CATEGORIES } from '../data/duasData.js';
import { HADITHS_LIST } from '../data/hadithData.js';
import { NEARBY_MOSQUES } from '../data/mosquesData.js';
import { UPCOMING_HOLY_EVENTS } from '../data/calendarData.js';
import { UMRAH_STEPS, HAJJ_DAYS } from '../data/pilgrimageRamadanData.js';
import { i18n } from '../services/i18n.js';

export function renderWebsitePortal(activePage = 'home') {
  const prayerTimes = getPrayerTimes();
  const featuredAyah = FEATURED_VERSES[0];

  return `
    <div class="website-portal">
      <!-- Desktop Sticky Navigation Header -->
      <header class="site-header">
        <div class="container header-inner">
          <a href="#" class="header-brand" data-web-nav="home">
            <div class="brand-emblem">ن</div>
            <span class="brand-title">NOOR</span>
          </a>

          <nav class="header-nav">
            <a class="nav-link ${activePage === 'home' ? 'active' : ''}" data-web-nav="home">Home</a>
            <a class="nav-link ${activePage === 'prayer' ? 'active' : ''}" data-web-nav="prayer">Prayer Times</a>
            <a class="nav-link ${activePage === 'quran' ? 'active' : ''}" data-web-nav="quran">Quran Online</a>
            <a class="nav-link ${activePage === 'duas' ? 'active' : ''}" data-web-nav="duas">Duas & Adhkar</a>
            <a class="nav-link ${activePage === 'learn' ? 'active' : ''}" data-web-nav="learn">Learning Paths</a>
            <a class="nav-link ${activePage === 'news' ? 'active' : ''}" data-web-nav="news">Editorial News</a>
            <a class="nav-link ${activePage === 'hajj' ? 'active' : ''}" data-web-nav="hajj">Hajj & Umrah</a>
          </nav>

          <div class="header-actions">
            <button class="btn btn-sm btn-ghost" id="web-search-trigger" title="Universal Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button class="btn btn-sm btn-outline" id="web-assistant-trigger">
              ✨ Noor Assistant
            </button>
            <button class="btn btn-sm btn-primary" id="web-download-cta">
              Download App
            </button>
          </div>
        </div>
      </header>

      <!-- MAIN PAGE CONTENT CONTAINER -->
      <main>
        ${activePage === 'home' ? renderWebHomePage(prayerTimes, featuredAyah) : ''}
        ${activePage === 'prayer' ? renderWebPrayerPage(prayerTimes) : ''}
        ${activePage === 'quran' ? renderWebQuranPage() : ''}
        ${activePage === 'duas' ? renderWebDuasPage() : ''}
        ${activePage === 'learn' ? renderWebLearnPage() : ''}
        ${activePage === 'news' ? renderWebNewsPage() : ''}
        ${activePage === 'hajj' ? renderWebHajjPage() : ''}
      </main>

      <!-- DESKTOP 12-COL FOOTER -->
      <footer class="site-footer">
        <div class="container">
          <div class="grid-12">
            <div style="grid-column: span 4;">
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
                <div class="brand-emblem">ن</div>
                <span class="brand-title" style="font-size: 1.4rem;">NOOR</span>
              </div>
              <p class="font-body-sm" style="color: var(--text-secondary); max-width: 320px; margin-bottom: var(--space-4);">
                “Your Deen. Your Daily Companion.” A peaceful, trusted global Islamic ecosystem designed for Muslims worldwide.
              </p>
              <span class="badge badge-emerald">Default Language: English (80+ Global Available)</span>
            </div>

            <div style="grid-column: span 2;">
              <h4 class="footer-col-title">Worship</h4>
              <ul class="footer-links">
                <li><a class="footer-link" data-web-nav="prayer">Prayer Times</a></li>
                <li><a class="footer-link" data-web-nav="quran">Noble Quran</a></li>
                <li><a class="footer-link" data-web-nav="duas">Duas & Adhkar</a></li>
                <li><a class="footer-link" id="footer-tasbih-btn">Digital Tasbih</a></li>
                <li><a class="footer-link" id="footer-qibla-btn">Qibla Compass</a></li>
              </ul>
            </div>

            <div style="grid-column: span 2;">
              <h4 class="footer-col-title">Knowledge</h4>
              <ul class="footer-links">
                <li><a class="footer-link" data-web-nav="learn">Islamic Courses</a></li>
                <li><a class="footer-link" data-web-nav="learn">Hadith Library</a></li>
                <li><a class="footer-link" data-web-nav="news">Editorial Articles</a></li>
                <li><a class="footer-link" data-web-nav="hajj">Hajj & Umrah</a></li>
                <li><a class="footer-link" id="footer-zakat-btn">Zakat Calculator</a></li>
              </ul>
            </div>

            <div style="grid-column: span 2;">
              <h4 class="footer-col-title">Platform</h4>
              <ul class="footer-links">
                <li><a class="footer-link">About NOOR</a></li>
                <li><a class="footer-link">Content Standards</a></li>
                <li><a class="footer-link">Privacy & Amanah</a></li>
                <li><a class="footer-link">Accessibility</a></li>
                <li><a class="footer-link">Open API</a></li>
              </ul>
            </div>

            <div style="grid-column: span 2;">
              <h4 class="footer-col-title">Get Mobile App</h4>
              <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                <button class="btn btn-secondary btn-sm" style="text-align: left;"> App Store</button>
                <button class="btn btn-secondary btn-sm" style="text-align: left;">▶ Google Play</button>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <p>© 2026 NOOR Global Islamic Platform. Dedicated to universal Islamic knowledge and peaceful worship.</p>
            <div style="display: flex; gap: var(--space-4);">
              <span>English (Default)</span>
              <span>•</span>
              <span>12 Rabi al-Awwal 1448 AH</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}

// 1. Homepage Section
function renderWebHomePage(prayerTimes, featuredAyah) {
  return `
    <section class="web-hero bg-islamic-pattern">
      <div class="container web-hero-content">
        <div class="hero-badge-container">
          <span class="badge badge-gold">✦ Unified Global Islamic Ecosystem</span>
          <span class="font-caption" style="color: var(--text-muted);">12 Rabi al-Awwal 1448 AH</span>
        </div>

        <h1 class="web-hero-title">
          “Your Deen. <span>Your Daily Companion.</span>”
        </h1>

        <p class="web-hero-subtitle">
          Prayer times, authentic Quran with recitations, verified Hadiths, daily Duas, Islamic learning, and ethical news — thoughtfully brought together into one peaceful sanctuary.
        </p>

        <div class="hero-cta-group">
          <button class="btn btn-primary btn-lg" data-web-nav="quran">Read Quran Online</button>
          <button class="btn btn-gold btn-lg" id="btn-hero-launch-app">Explore Mobile App View</button>
          <button class="btn btn-secondary btn-lg" data-web-nav="prayer">Check Prayer Times</button>
        </div>

        <!-- Prayer Times Strip -->
        <div class="hero-prayer-strip">
          <div style="text-align: left;">
            <span class="badge badge-emerald" style="font-size: 0.7rem;">London, UK</span>
            <h4 class="font-h3" style="margin-top: 2px;">Today's Prayers</h4>
          </div>

          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
            ${prayerTimes.map(p => `
              <div class="prayer-strip-item ${p.id === 'dhuhr' ? 'active' : ''}">
                <span class="prayer-strip-name">${p.name}</span>
                <span class="prayer-strip-time">${p.time}</span>
              </div>
            `).join('')}
          </div>

          <button class="btn btn-sm btn-primary" id="web-azan-preview-btn">
            🔔 Preview Adhan
          </button>
        </div>
      </div>
    </section>

    <!-- Core Pillars Feature Grid -->
    <section class="section-padding container">
      <div class="section-header">
        <div>
          <span class="badge badge-gold">Powerful Underneath. Simple on the Surface.</span>
          <h2 class="section-title" style="margin-top: var(--space-2);">Everything For Your Deen in One Place</h2>
        </div>
      </div>

      <div class="grid-12">
        <div style="grid-column: span 4;">
          <div class="feature-box">
            <div class="feature-icon-wrapper">📖</div>
            <h3 class="font-h2" style="margin-bottom: var(--space-2);">The Noble Quran</h3>
            <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
              Crystal-clear Arabic Uthmani typography, translations in 80+ global languages, multiple reciters, word-by-word transliteration, and authentic Tafsir Ibn Kathir.
            </p>
            <a class="nav-link" data-web-nav="quran" style="padding: 0; color: var(--color-primary); font-weight: 700;">Explore Quran ❯</a>
          </div>
        </div>

        <div style="grid-column: span 4;">
          <div class="feature-box">
            <div class="feature-icon-wrapper">🧭</div>
            <h3 class="font-h2" style="margin-bottom: var(--space-2);">Prayer & Qibla</h3>
            <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
              High-accuracy astronomical calculation methods (MWL, ISNA, Umm Al-Qura), customizable Asr jurisprudence, serene audio Adhans, and an interactive 360° Qibla compass.
            </p>
            <a class="nav-link" data-web-nav="prayer" style="padding: 0; color: var(--color-primary); font-weight: 700;">View Prayers ❯</a>
          </div>
        </div>

        <div style="grid-column: span 4;">
          <div class="feature-box">
            <div class="feature-icon-wrapper">🤲</div>
            <h3 class="font-h2" style="margin-bottom: var(--space-2);">Duas & Adhkar</h3>
            <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
              Organized by user intent: Morning, Evening, Before Sleep, Protection, Travel, and Hardship. Complete with authentic references from Hisn al-Muslim and audio.
            </p>
            <a class="nav-link" data-web-nav="duas" style="padding: 0; color: var(--color-primary); font-weight: 700;">Browse Duas ❯</a>
          </div>
        </div>

        <div style="grid-column: span 4;">
          <div class="feature-box">
            <div class="feature-icon-wrapper">🎓</div>
            <h3 class="font-h2" style="margin-bottom: var(--space-2);">Islamic Learning</h3>
            <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
              Structured courses on Islam 101, Seerah, Stories of the Prophets, and Tajweed taught by reliable scholars with tracked lesson progress.
            </p>
            <a class="nav-link" data-web-nav="learn" style="padding: 0; color: var(--color-primary); font-weight: 700;">Start Learning ❯</a>
          </div>
        </div>

        <div style="grid-column: span 4;">
          <div class="feature-box">
            <div class="feature-icon-wrapper">⚖️</div>
            <h3 class="font-h2" style="margin-bottom: var(--space-2);">Live Zakat Calculator</h3>
            <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
              Calculate your annual 2.5% Zakat using live Gold and Silver Nisab benchmark thresholds across cash, gold, investments, and business stock.
            </p>
            <a class="nav-link" id="web-zakat-open-cta" style="padding: 0; color: var(--color-primary); font-weight: 700; cursor: pointer;">Calculate Zakat ❯</a>
          </div>
        </div>

        <div style="grid-column: span 4;">
          <div class="feature-box">
            <div class="feature-icon-wrapper">🕋</div>
            <h3 class="font-h2" style="margin-bottom: var(--space-2);">Hajj & Umrah Companion</h3>
            <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">
              Step-by-step interactive ritual guidance, Tawaf & Sa'i circuit counters, Ihram checklists, and offline cached guides for pilgrims with low connectivity.
            </p>
            <a class="nav-link" data-web-nav="hajj" style="padding: 0; color: var(--color-primary); font-weight: 700;">Pilgrimage Guide ❯</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Pixabay Islamic Visuals & Videos Showcase -->
    <section class="section-padding container" style="border-top: 1px solid var(--border-color); background: var(--bg-surface-sand);">
      <div class="section-header">
        <div>
          <span class="badge badge-gold">✦ Real-time Pixabay API Integration</span>
          <h2 class="section-title" style="margin-top: var(--space-2);">Islamic Sacred Spaces & Heritage Media</h2>
          <p class="section-subtitle">High-definition videos and photography streaming live from across the Muslim world</p>
        </div>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn-sm btn-outline web-media-topic-btn active" data-topic="islamic mosque">Mosques</button>
          <button class="btn btn-sm btn-outline web-media-topic-btn" data-topic="makkah kaaba">Makkah</button>
          <button class="btn btn-sm btn-outline web-media-topic-btn" data-topic="islamic architecture">Architecture</button>
        </div>
      </div>

      <div class="grid-12" id="web-pixabay-showcase-grid">
        <div style="grid-column: span 12; text-align: center; padding: var(--space-8); color: var(--text-muted);">
          <p>Connecting to Pixabay API for Islamic video and photography stream...</p>
        </div>
      </div>
    </section>
  `;
}

// 2. Prayer Times Web Page
function renderWebPrayerPage(prayerTimes) {
  return `
    <div class="container section-padding">
      <div class="section-header">
        <div>
          <span class="badge badge-emerald">Astronomical Accuracy</span>
          <h1 class="section-title">Today's Prayer Times for London, UK</h1>
          <p class="section-subtitle">Calculated with Muslim World League standard • 12 Rabi al-Awwal 1448 AH</p>
        </div>
      </div>

      <div class="grid-12">
        <div style="grid-column: span 7;">
          <div class="card" style="padding: var(--space-4);">
            ${prayerTimes.map(p => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); border-bottom: 1px solid var(--border-color); ${p.id === 'dhuhr' ? 'background: var(--color-primary-subtle); border-radius: var(--radius-md);' : ''}">
                <div>
                  <strong class="font-h3">${p.name}</strong>
                  ${p.id === 'dhuhr' ? `<span class="badge badge-gold" style="margin-left: 8px;">Next</span>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: var(--space-4);">
                  <span class="font-h2" style="color: var(--color-primary);">${p.time}</span>
                  <button class="btn-icon btn-icon-sm play-azan-single" data-prayer-id="${p.id}" title="Play Adhan sound">🔔</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="grid-column: span 5;">
          <div class="card card-emerald arch-card" style="margin-bottom: var(--space-4);">
            <span class="badge badge-gold">Qibla Direction</span>
            <h3 class="font-h2" style="color: #FFFFFF; margin: var(--space-2) 0;">119° ESE from London</h3>
            <p style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem; margin-bottom: var(--space-4);">
              Distance to the Holy Kaaba: 4,792 km. Face south-east when offering Salah in London.
            </p>
            <button class="btn btn-gold" id="btn-web-qibla-modal">Open 360° Qibla Compass</button>
          </div>

          <div class="card card-sand">
            <h4 class="font-h3" style="margin-bottom: var(--space-2);">Jumu‘ah at Local Mosques</h4>
            <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-3);">
              East London Mosque: 12:30 PM & 01:30 PM<br>
              Regent's Park Mosque: 01:15 PM
            </p>
            <button class="btn btn-sm btn-outline" id="btn-web-mosque-modal">Find Mosques Near Me</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 3. Quran Web Page
function renderWebQuranPage() {
  return `
    <div class="container section-padding">
      <div class="section-header">
        <div>
          <span class="badge badge-gold">Al-Quran Al-Kareem</span>
          <h1 class="section-title">Read the Noble Quran Online</h1>
          <p class="section-subtitle">Explore 114 Surahs with authentic Arabic Uthmani text, multi-language translations, and recitations</p>
        </div>
      </div>

      <div class="grid-12">
        <div style="grid-column: span 12; margin-bottom: var(--space-6);">
          <div class="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="web-quran-search" placeholder="Search Surah by name or number (e.g. Al-Baqarah, Yasin, Al-Mulk, 18)...">
          </div>
        </div>

        ${SURAHS_LIST.map(s => `
          <div style="grid-column: span 4;">
            <div class="card card-interactive web-surah-card" data-surah-num="${s.number}" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-3);">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--color-primary-subtle); color: var(--color-primary); font-weight: 700; display: flex; align-items: center; justify-content: center;">
                  ${s.number}
                </div>
                <span class="font-arabic-display" style="color: var(--color-primary); font-size: 1.4rem;">${s.name}</span>
              </div>

              <div>
                <h3 class="font-h3">${s.englishName}</h3>
                <p class="font-caption" style="color: var(--text-muted);">${s.englishNameTranslation}</p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-4); border-top: 1px solid var(--border-color); padding-top: var(--space-2); font-size: 0.75rem; color: var(--text-muted);">
                <span>${s.numberOfAyahs} Ayahs</span>
                <span class="badge badge-emerald">${s.revelationType}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 4. Duas Web Page
function renderWebDuasPage() {
  return `
    <div class="container section-padding">
      <div class="section-header">
        <div>
          <span class="badge badge-gold">Supplications & Remembrance</span>
          <h1 class="section-title">Duas & Adhkar Library</h1>
          <p class="section-subtitle">Authentic supplications from the Quran and Sunnah arranged by human need and intent</p>
        </div>
      </div>

      <div class="grid-12">
        ${DUAS_LIST.map(d => `
          <div style="grid-column: span 6;">
            <div class="card" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                  <span class="badge badge-gold">${d.category.toUpperCase()}</span>
                  <span class="badge badge-emerald">Target: ${d.targetCount}x</span>
                </div>
                <h3 class="font-h3" style="margin-bottom: var(--space-3);">${d.title}</h3>
                <p class="font-arabic-quran" style="font-size: 1.45rem; line-height: 2.2; color: var(--color-charcoal); margin-bottom: var(--space-2);">
                  ${d.arabic}
                </p>
                <p class="font-transliteration" style="margin-bottom: var(--space-2);">${d.transliteration}</p>
                <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">"${d.translation}"</p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: var(--space-3); font-size: 0.75rem; color: var(--text-muted);">
                <span>Ref: ${d.source}</span>
                <button class="btn btn-sm btn-outline btn-play-dua-audio">▶ Audio</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 5. Learn Web Page
function renderWebLearnPage() {
  return `
    <div class="container section-padding">
      <div class="section-header">
        <div>
          <span class="badge badge-emerald">Comprehensive Islamic Curriculum</span>
          <h1 class="section-title">Islamic Learning Paths</h1>
          <p class="section-subtitle">Explore foundations of Islam, Seerah, Quranic sciences, and ethics with structured courses</p>
        </div>
      </div>

      <div class="grid-12">
        ${LEARNING_COURSES.map(c => `
          <div style="grid-column: span 6;">
            <div class="card" style="height: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-3);">
                <span class="badge badge-gold">${c.category}</span>
                <span class="badge badge-emerald">${c.level}</span>
              </div>
              <h2 class="font-h2" style="margin-bottom: var(--space-2);">${c.title}</h2>
              <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">${c.summary}</p>
              
              <div style="background: var(--bg-surface-subtle); padding: var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-4);">
                <h4 class="font-h3" style="font-size: 0.9375rem; margin-bottom: var(--space-2);">Course Syllabus:</h4>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-1); font-size: 0.875rem;">
                  ${c.lessons.map(l => `
                    <li style="display: flex; justify-content: space-between; color: var(--text-secondary);">
                      <span>• ${l.title}</span>
                      <span>${l.duration}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="font-caption" style="color: var(--text-muted);">Instructor: ${c.instructor}</span>
                <button class="btn btn-primary btn-sm">Start Course</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 6. News Web Page
function renderWebNewsPage() {
  return `
    <div class="container section-padding">
      <div class="section-header">
        <div>
          <span class="badge badge-emerald">Ethical Journalism</span>
          <h1 class="section-title">Editorial News & Muslim World Stories</h1>
          <p class="section-subtitle">Curated developments across science, culture, heritage, and communities worldwide</p>
        </div>
      </div>

      <div class="grid-12">
        ${NEWS_ARTICLES.map(art => `
          <div style="grid-column: span 4;">
            <div class="card" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <span class="badge badge-gold" style="margin-bottom: var(--space-2);">${art.category}</span>
                <h3 class="font-h2" style="font-size: 1.25rem; margin-bottom: var(--space-3); line-height: 1.35;">${art.title}</h3>
                <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-4);">${art.summary}</p>
              </div>

              <div style="border-top: 1px solid var(--border-color); padding-top: var(--space-3); font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between;">
                <span>By ${art.author}</span>
                <span>${art.date}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 7. Hajj & Umrah Web Page
function renderWebHajjPage() {
  return `
    <div class="container section-padding">
      <div class="section-header">
        <div>
          <span class="badge badge-gold">Pilgrimage Center</span>
          <h1 class="section-title">Complete Hajj & Umrah Guide</h1>
          <p class="section-subtitle">Ritual steps, preparatory checklists, and interactive guidance for the sacred journey to Makkah</p>
        </div>
      </div>

      <div class="grid-12">
        <div style="grid-column: span 7;">
          <h2 class="font-h2" style="margin-bottom: var(--space-4);">Umrah Rituals Step-by-Step</h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            ${UMRAH_STEPS.map(s => `
              <div class="card" style="border-left: 4px solid var(--color-primary);">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <h3 class="font-h3">Step ${s.step}: ${s.name}</h3>
                  <span class="font-arabic-display" style="font-size: 1.15rem; color: var(--color-primary);">${s.arabic}</span>
                </div>
                <p class="font-caption" style="color: var(--color-accent-gold-dark); margin: 2px 0 6px 0;">Location: ${s.location}</p>
                <p class="font-body-sm" style="color: var(--text-secondary);">${s.summary}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="grid-column: span 5;">
          <div class="card card-emerald arch-card" style="margin-bottom: var(--space-6);">
            <span class="badge badge-gold">Pilgrim Mode on Mobile</span>
            <h3 class="font-h2" style="color: #FFFFFF; margin: var(--space-2) 0;">Offline Hajj & Umrah Companion</h3>
            <p style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem; margin-bottom: var(--space-4);">
              When performing Tawaf or Sa'i under intense crowding, use NOOR mobile offline counters with one-tap tactile feedback.
            </p>
            <button class="btn btn-gold" id="btn-web-open-tawaf-modal">Launch Tawaf Counter</button>
          </div>

          <h3 class="font-h3" style="margin-bottom: var(--space-3);">Hajj Days Overview</h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${HAJJ_DAYS.map(h => `
              <div class="card card-sand">
                <span class="badge badge-gold" style="font-size: 0.7rem;">${h.day}</span>
                <h4 class="font-h3" style="margin: 2px 0;">${h.name}</h4>
                <p class="font-caption" style="color: var(--text-secondary);">${h.summary}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
