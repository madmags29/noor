// NOOR: World-Class Global Islamic Digital Ecosystem Main Application Bootstrap
import { i18n } from './services/i18n.js';
import { audioManager } from './services/audioManager.js';
import { storageService } from './services/storageService.js';

// Views
import { renderHomeView } from './views/HomeView.js';
import { renderPrayView } from './views/PrayView.js';
import { renderQuranView } from './views/QuranView.js';
import { renderLearnView } from './views/LearnView.js';
import { renderDiscoverView } from './views/DiscoverView.js';
import { renderProfileView } from './views/ProfileView.js';
import { renderWebsitePortal } from './views/WebsitePages.js';

// Components & Modals
import { renderQiblaCompass } from './components/QiblaCompass.js';
import { renderTasbih, DHIKR_PRESETS } from './components/TasbihCounter.js';
import { renderZakatCalculator } from './components/ZakatCalculator.js';
import { renderPilgrimageGuide } from './components/PilgrimageGuide.js';
import { renderRamadanHub } from './components/RamadanHub.js';
import { renderAiAssistant, formatAiResponseHTML } from './components/AiAssistant.js';
import { getAssistantResponse } from './services/aiAssistantService.js';
import { renderOnboardingModal } from './components/OnboardingModal.js';
import { renderLanguageSelectorModal, renderUniversalSearchModal, performUniversalSearch } from './components/SearchAndLanguageModals.js';
import { renderMediaViewerModal } from './components/PixabayMediaModal.js';
import { pixabayService } from './services/pixabayService.js';
import { authService } from './services/authService.js';
import { locationService } from './services/locationService.js';
import { renderAuthModal } from './components/AuthModal.js';
import { renderLocationPickerModal } from './components/LocationPickerModal.js';
import { NEARBY_MOSQUES } from './data/mosquesData.js';
import { LANGUAGES } from './data/languages.js';
import { ZAKAT_DEFAULTS } from './data/pilgrimageRamadanData.js';

class NoorApp {
  constructor() {
    this.viewMode = 'mobile'; // 'mobile' | 'web'
    this.mobileScreen = 'home'; // 'home' | 'pray' | 'quran' | 'learn' | 'discover' | 'me'
    this.webPage = 'home';
    this.currentTheme = localStorage.getItem('noor_theme') || 'light';
    this.isSignUpMode = false;
    
    // Interactive tool states
    this.tasbihCount = storageService.get('tasbihCount') || 0;
    this.tasbihTarget = storageService.get('tasbihTarget') || 33;
    this.tasbihDhikrIdx = 0;

    this.tawafCount = 0;
    this.saiLap = 0;
    this.pilgrimTab = 'umrah';
    this.learnTab = 'courses';
    this.discoverTab = 'news';

    this.selectedQuranSurah = 1;
    this.onboardingStep = 1;

    // Pixabay live media state
    this.pixabayVideos = [];
    this.pixabayPhotos = [];
  }

  init() {
    // 1. Initialize i18n
    i18n.init();

    // 2. Apply theme
    this.applyTheme(this.currentTheme);

    // 3. Render Top Controls & Language Label
    this.updateTopBar();

    // 4. Setup Global Modals Mounts
    this.mountModals();

    // 5. Render Primary Active View
    this.renderCurrentView();

    // 6. Bind Global Event Handlers
    this.bindEvents();

    // 7. Start Clock Ticker
    this.startClock();

    // 8. Fetch live Pixabay Islamic Media
    this.loadPixabayMedia();

    // 9. Auto-detect user country & location
    locationService.detectUserLocation().then(() => {
      this.updateTopBar();
      this.renderCurrentView();
    });

    // 10. Subscribe to Location and Auth State Changes
    locationService.subscribe(() => {
      this.updateTopBar();
      this.renderCurrentView();
      const qiblaMount = document.getElementById('qibla-compass-mount');
      const loc = locationService.getCurrentLocation();
      if (qiblaMount) qiblaMount.innerHTML = renderQiblaCompass(loc.lat, loc.lng);
    });

    authService.subscribe(() => {
      this.updateTopBar();
      this.mountModals();
      this.renderCurrentView();
    });

    // 11. Check Onboarding
    const onboardingDone = storageService.get('onboardingCompleted');
    if (!onboardingDone) {
      this.openOnboarding();
    }

    console.log("NOOR Islamic Digital Ecosystem Initialized. Default Language: English. Location & Auth Active.");
  }

  updateTopBar() {
    const meta = i18n.getLanguageMeta();
    const label = document.getElementById('top-lang-label');
    if (label) {
      label.textContent = `${meta.nativeName} (${meta.code.toUpperCase()})`;
    }

    const loc = locationService.getCurrentLocation();
    const locLabel = document.getElementById('top-loc-label');
    if (locLabel) {
      locLabel.textContent = `${loc.city}, ${loc.country}`;
    }

    const user = authService.getCurrentUser();
    const userLabel = document.getElementById('top-user-label');
    if (userLabel) {
      userLabel.textContent = user ? user.name.split(' ')[0] : 'Sign In';
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('noor_theme', theme);
    const themeBtn = document.getElementById('btn-top-theme');
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  toggleTheme() {
    this.applyTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }

  renderCurrentView() {
    const mobileContainer = document.getElementById('mobile-view-container');
    const webContainer = document.getElementById('website-view-container');

    if (this.viewMode === 'mobile') {
      if (mobileContainer) mobileContainer.style.display = 'flex';
      if (webContainer) webContainer.style.display = 'none';
      this.renderMobileScreen();
    } else {
      if (mobileContainer) mobileContainer.style.display = 'none';
      if (webContainer) {
        webContainer.style.display = 'block';
        webContainer.innerHTML = renderWebsitePortal(this.webPage);
        this.bindWebPortalEvents();
        this.renderWebMediaShowcase();
      }
    }
  }

  async loadPixabayMedia(videoQuery = 'islamic mosque', photoQuery = 'islamic architecture') {
    try {
      const [videos, photos] = await Promise.all([
        pixabayService.fetchIslamicVideos(videoQuery, 6),
        pixabayService.fetchIslamicImages(photoQuery, 10)
      ]);
      this.pixabayVideos = videos;
      this.pixabayPhotos = photos;

      if (this.viewMode === 'mobile' && this.mobileScreen === 'discover') {
        this.renderMobileScreen();
      }
      this.renderWebMediaShowcase();
    } catch (e) {
      console.warn('Error loading Pixabay media', e);
    }
  }

  renderWebMediaShowcase() {
    const showcase = document.getElementById('web-pixabay-showcase-grid');
    if (!showcase) return;

    if (this.pixabayVideos.length === 0 && this.pixabayPhotos.length === 0) {
      showcase.innerHTML = `<div style="grid-column: span 12; text-align: center; padding: var(--space-8); color: var(--text-muted);">Loading Pixabay media...</div>`;
      return;
    }

    let html = '';
    if (this.pixabayVideos[0]) {
      const v = this.pixabayVideos[0];
      html += `
        <div style="grid-column: span 6;">
          <div class="card card-interactive pixabay-video-card" data-video-url="${v.videoUrl}" data-title="${v.title}" data-creator="${v.user}" style="padding: 0; overflow: hidden; height: 100%;">
            <div style="height: 240px; background: #000 url('${v.thumbnail}') center/cover no-repeat; position: relative; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.35);"></div>
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-primary); border: 2px solid var(--color-accent-gold); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; z-index: 2;">
                ▶
              </div>
              <span class="badge badge-gold" style="position: absolute; top: 12px; left: 12px; z-index: 2;">Featured Video • ${v.duration}s</span>
            </div>
            <div style="padding: var(--space-4);">
              <h3 class="font-h3">${v.title}</h3>
              <p class="font-caption" style="color: var(--text-muted); margin-top: 2px;">Creator: ${v.user} • ${v.views?.toLocaleString()} views</p>
            </div>
          </div>
        </div>
      `;
    }

    html += `
      <div style="grid-column: span 6; display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
        ${this.pixabayPhotos.slice(0, 4).map(p => `
          <div class="card card-interactive pixabay-photo-card" data-img-url="${p.largeImageUrl || p.webformatUrl}" data-title="${p.title}" data-creator="${p.user}" style="padding: 0; overflow: hidden; height: 155px; position: relative;">
            <img src="${p.webformatUrl}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 8px; background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%); color: white; font-size: 0.75rem;">
              <span style="font-weight: 600; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.title}</span>
              <span style="opacity: 0.8; font-size: 0.65rem;">📷 ${p.user}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    showcase.innerHTML = html;
  }

  renderMobileScreen() {
    const viewport = document.getElementById('phone-screen-viewport');
    if (!viewport) return;

    const loc = locationService.getCurrentLocation();
    const cityLabel = `${loc.city}, ${loc.country}`;

    switch (this.mobileScreen) {
      case 'home':
        viewport.innerHTML = renderHomeView(cityLabel);
        break;
      case 'pray':
        viewport.innerHTML = renderPrayView(cityLabel);
        break;
      case 'quran':
        viewport.innerHTML = renderQuranView(this.selectedQuranSurah);
        break;
      case 'learn':
        viewport.innerHTML = renderLearnView(this.learnTab);
        break;
      case 'discover':
        viewport.innerHTML = renderDiscoverView(this.discoverTab, this.pixabayVideos, this.pixabayPhotos);
        break;
      case 'me':
        viewport.innerHTML = renderProfileView();
        break;
      default:
        viewport.innerHTML = renderHomeView(cityLabel);
    }

    this.bindMobileScreenEvents();
    this.updateBottomNavState();
    viewport.scrollTop = 0;
  }

  updateBottomNavState() {
    document.querySelectorAll('#mobile-bottom-nav .nav-item').forEach(btn => {
      const navTarget = btn.getAttribute('data-nav');
      if (navTarget === this.mobileScreen) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  mountModals() {
    const mount = document.getElementById('modal-mount-point');
    if (mount) {
      mount.innerHTML = `
        ${renderLanguageSelectorModal()}
        ${renderUniversalSearchModal()}
        ${renderOnboardingModal(this.onboardingStep)}
        ${renderMediaViewerModal()}
        ${renderAuthModal(this.isSignUpMode)}
        ${renderLocationPickerModal()}
      `;
    }

    // Mount dedicated tool contents
    const qiblaMount = document.getElementById('qibla-compass-mount');
    if (qiblaMount) qiblaMount.innerHTML = renderQiblaCompass();

    const tasbihMount = document.getElementById('tasbih-counter-mount');
    if (tasbihMount) tasbihMount.innerHTML = renderTasbih(this.tasbihCount, this.tasbihTarget, this.tasbihDhikrIdx);

    const zakatMount = document.getElementById('zakat-calculator-mount');
    if (zakatMount) zakatMount.innerHTML = renderZakatCalculator();

    const pilgrimMount = document.getElementById('pilgrim-guide-mount');
    if (pilgrimMount) pilgrimMount.innerHTML = renderPilgrimageGuide(this.pilgrimTab, this.tawafCount, this.saiLap);

    const ramadanMount = document.getElementById('ramadan-hub-mount');
    if (ramadanMount) ramadanMount.innerHTML = renderRamadanHub();

    const assistantMount = document.getElementById('assistant-mount');
    if (assistantMount) assistantMount.innerHTML = renderAiAssistant();

    const mosqueMount = document.getElementById('mosque-finder-mount');
    if (mosqueMount) {
      mosqueMount.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${NEARBY_MOSQUES.map(m => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h4 class="font-h3">${m.name}</h4>
                <span class="badge badge-emerald">${m.distance}</span>
              </div>
              <p class="font-caption" style="color: var(--text-muted); margin: 2px 0 6px 0;">${m.address}</p>
              <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;">
                ${m.facilities.map(f => `<span class="chip" style="font-size: 0.7rem; padding: 2px 8px;">✓ ${f}</span>`).join('')}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 6px;">
                <span class="font-caption" style="font-weight: 600;">Jumu‘ah: ${m.jumuahTimes[0]}</span>
                <span class="font-caption" style="color: var(--text-muted);">📞 ${m.phone}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  bindEvents() {
    // 1. Top Control Bar Switchers
    document.getElementById('btn-mode-mobile')?.addEventListener('click', () => {
      this.viewMode = 'mobile';
      document.getElementById('btn-mode-mobile')?.classList.add('active');
      document.getElementById('btn-mode-web')?.classList.remove('active');
      this.renderCurrentView();
    });

    document.getElementById('btn-mode-web')?.addEventListener('click', () => {
      this.viewMode = 'web';
      document.getElementById('btn-mode-web')?.classList.add('active');
      document.getElementById('btn-mode-mobile')?.classList.remove('active');
      this.renderCurrentView();
    });

    document.getElementById('btn-top-theme')?.addEventListener('click', () => {
      this.toggleTheme();
    });

    document.getElementById('btn-top-language')?.addEventListener('click', () => {
      this.openModal('language-modal-overlay');
    });

    document.getElementById('btn-top-search')?.addEventListener('click', () => {
      this.openModal('search-modal-overlay');
    });

    document.getElementById('btn-top-assistant')?.addEventListener('click', () => {
      this.openModal('assistant-modal-overlay');
    });

    document.getElementById('btn-top-location')?.addEventListener('click', () => {
      this.openModal('location-modal-overlay');
    });

    document.getElementById('btn-top-auth')?.addEventListener('click', () => {
      this.openModal('auth-modal-overlay');
    });

    // 2. Mobile Bottom Navigation
    document.querySelectorAll('#mobile-bottom-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-nav');
        if (target) {
          this.mobileScreen = target;
          this.renderMobileScreen();
        }
      });
    });

    // 3. Modals Close Handlers
    document.getElementById('close-language-modal')?.addEventListener('click', () => this.closeModal('language-modal-overlay'));
    document.getElementById('close-search-modal')?.addEventListener('click', () => this.closeModal('search-modal-overlay'));
    document.getElementById('close-qibla-modal')?.addEventListener('click', () => this.closeModal('qibla-modal-overlay'));
    document.getElementById('close-tasbih-modal')?.addEventListener('click', () => this.closeModal('tasbih-modal-overlay'));
    document.getElementById('close-zakat-modal')?.addEventListener('click', () => this.closeModal('zakat-modal-overlay'));
    document.getElementById('close-pilgrim-modal')?.addEventListener('click', () => this.closeModal('pilgrim-modal-overlay'));
    document.getElementById('close-ramadan-modal')?.addEventListener('click', () => this.closeModal('ramadan-modal-overlay'));
    document.getElementById('close-assistant-modal')?.addEventListener('click', () => this.closeModal('assistant-modal-overlay'));
    document.getElementById('close-mosque-modal')?.addEventListener('click', () => this.closeModal('mosque-modal-overlay'));
    document.getElementById('close-location-modal')?.addEventListener('click', () => this.closeModal('location-modal-overlay'));
    document.getElementById('close-auth-modal')?.addEventListener('click', () => this.closeModal('auth-modal-overlay'));

    // Pixabay Media modal close
    document.getElementById('close-media-modal')?.addEventListener('click', () => {
      const vid = document.getElementById('media-video-player');
      if (vid) {
        vid.pause();
        vid.src = '';
      }
      this.closeModal('media-viewer-modal-overlay');
    });

    // Backdrop click dismiss for all modals
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          const vid = document.getElementById('media-video-player');
          if (vid && overlay.id === 'media-viewer-modal-overlay') {
            vid.pause();
            vid.src = '';
          }
          overlay.classList.remove('open');
        }
      });
    });

    // Pixabay Video & Image Card Click Handlers
    document.addEventListener('click', (e) => {
      // 1. Pixabay Video Card
      const videoCard = e.target.closest('.pixabay-video-card');
      if (videoCard) {
        const url = videoCard.getAttribute('data-video-url');
        const title = videoCard.getAttribute('data-title');
        const creator = videoCard.getAttribute('data-creator');
        if (url) {
          const videoContainer = document.getElementById('media-video-container');
          const imgContainer = document.getElementById('media-image-container');
          const player = document.getElementById('media-video-player');
          const titleEl = document.getElementById('media-modal-title');
          const creatorEl = document.getElementById('media-creator-info');
          const badgeEl = document.getElementById('media-type-badge');

          if (badgeEl) badgeEl.textContent = 'Pixabay HD Video';
          if (titleEl) titleEl.textContent = title || 'Islamic Video';
          if (creatorEl) creatorEl.textContent = `Video by ${creator || 'Pixabay Creator'}`;

          if (videoContainer) videoContainer.style.display = 'block';
          if (imgContainer) imgContainer.style.display = 'none';

          if (player) {
            player.src = url;
            player.play().catch(() => {});
          }

          this.openModal('media-viewer-modal-overlay');
        }
      }

      // 2. Pixabay Photo Card
      const photoCard = e.target.closest('.pixabay-photo-card');
      if (photoCard) {
        const url = photoCard.getAttribute('data-img-url');
        const title = photoCard.getAttribute('data-title');
        const creator = photoCard.getAttribute('data-creator');
        if (url) {
          const videoContainer = document.getElementById('media-video-container');
          const imgContainer = document.getElementById('media-image-container');
          const imgEl = document.getElementById('media-image-display');
          const player = document.getElementById('media-video-player');
          const titleEl = document.getElementById('media-modal-title');
          const creatorEl = document.getElementById('media-creator-info');
          const badgeEl = document.getElementById('media-type-badge');

          if (player) {
            player.pause();
            player.src = '';
          }

          if (badgeEl) badgeEl.textContent = 'Pixabay High-Res Photo';
          if (titleEl) titleEl.textContent = title || 'Islamic Sacred Photography';
          if (creatorEl) creatorEl.textContent = `Photo by ${creator || 'Pixabay Photographer'}`;

          if (videoContainer) videoContainer.style.display = 'none';
          if (imgContainer) imgContainer.style.display = 'block';
          if (imgEl) imgEl.src = url;

          this.openModal('media-viewer-modal-overlay');
        }
      }

      // 3. Filter chips in Discover view
      const vChip = e.target.closest('.video-filter-chip');
      if (vChip) {
        document.querySelectorAll('.video-filter-chip').forEach(c => c.classList.remove('active'));
        vChip.classList.add('active');
        const q = vChip.getAttribute('data-video-query') || 'islamic mosque';
        this.loadPixabayMedia(q, 'islamic architecture');
      }

      const pChip = e.target.closest('.photo-filter-chip');
      if (pChip) {
        document.querySelectorAll('.photo-filter-chip').forEach(c => c.classList.remove('active'));
        pChip.classList.add('active');
        const q = pChip.getAttribute('data-photo-query') || 'islamic architecture';
        this.loadPixabayMedia('islamic mosque', q);
      }

      // 4. Topic buttons in Website mode
      const topicBtn = e.target.closest('.web-media-topic-btn');
      if (topicBtn) {
        document.querySelectorAll('.web-media-topic-btn').forEach(b => b.classList.remove('active'));
        topicBtn.classList.add('active');
        const topic = topicBtn.getAttribute('data-topic') || 'islamic mosque';
        this.loadPixabayMedia(topic, topic);
      }
    });

    // 4. Bind Search & Language filter logic
    this.bindSearchAndLangModalEvents();

    // 5. Bind Tasbih interactive clicker
    this.bindTasbihEvents();

    // 6. Bind Zakat live calculation
    this.bindZakatEvents();

    // 7. Bind Pilgrimage & Tawaf
    this.bindPilgrimageEvents();

    // 8. Bind AI Assistant
    this.bindAiAssistantEvents();

    // 9. Bind Audio Bar Controls
    this.bindAudioBarEvents();

    // 10. Bind Worldwide Location Picker & Auto-Detection
    this.bindLocationEvents();

    // 11. Bind User Authentication & 1-Click Google Login
    this.bindAuthEvents();

    // 12. Listen to language changes
    i18n.subscribe(() => {
      this.updateTopBar();
      this.renderCurrentView();
    });
  }

  bindMobileScreenEvents() {
    const viewport = document.getElementById('phone-screen-viewport');
    if (!viewport) return;

    // Home view actions
    viewport.querySelector('#btn-quick-assistant')?.addEventListener('click', () => this.openModal('assistant-modal-overlay'));
    viewport.querySelector('#hero-open-qibla')?.addEventListener('click', () => this.openModal('qibla-modal-overlay'));
    viewport.querySelector('#quick-action-qibla')?.addEventListener('click', () => this.openModal('qibla-modal-overlay'));
    viewport.querySelector('#quick-action-quran')?.addEventListener('click', () => {
      this.mobileScreen = 'quran';
      this.renderMobileScreen();
    });
    viewport.querySelector('#quick-action-duas')?.addEventListener('click', () => {
      this.mobileScreen = 'learn';
      this.learnTab = 'duas';
      this.renderMobileScreen();
    });
    viewport.querySelector('#quick-action-tasbih')?.addEventListener('click', () => this.openModal('tasbih-modal-overlay'));
    viewport.querySelector('#card-continue-quran')?.addEventListener('click', () => {
      this.mobileScreen = 'quran';
      this.renderMobileScreen();
    });

    // Adhan audio preview
    viewport.querySelectorAll('.play-azan-single, #hero-listen-azan').forEach(btn => {
      btn.addEventListener('click', () => {
        audioManager.playSereneChime();
      });
    });

    // Today's Ayah Listen
    viewport.querySelector('#btn-listen-today-ayah')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const s = parseInt(btn.getAttribute('data-surah') || 2);
      const a = parseInt(btn.getAttribute('data-ayah') || 255);
      audioManager.playQuranAyah(s, a);
    });

    // Pray View shortcuts
    viewport.querySelector('#pray-to-qibla')?.addEventListener('click', () => this.openModal('qibla-modal-overlay'));
    viewport.querySelector('#pray-to-tasbih')?.addEventListener('click', () => this.openModal('tasbih-modal-overlay'));
    viewport.querySelector('#pray-to-ramadan')?.addEventListener('click', () => this.openModal('ramadan-modal-overlay'));
    viewport.querySelector('#pray-to-zakat')?.addEventListener('click', () => this.openModal('zakat-modal-overlay'));

    // Prayer check toggles
    viewport.querySelectorAll('.prayer-check-pill, .prayer-check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pr = btn.getAttribute('data-prayer') || btn.getAttribute('data-prayer-check');
        if (pr) {
          storageService.togglePrayer(pr);
          this.renderMobileScreen();
        }
      });
    });

    // Surah Selection in Quran View
    viewport.querySelectorAll('.surah-select-row').forEach(row => {
      row.addEventListener('click', () => {
        const num = parseInt(row.getAttribute('data-surah-num') || 1);
        this.selectedQuranSurah = num;
        this.renderMobileScreen();
      });
    });

    // Quran Ayah Audio play
    viewport.querySelectorAll('.play-single-ayah').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const s = parseInt(btn.getAttribute('data-surah') || 1);
        const a = parseInt(btn.getAttribute('data-ayah') || 1);
        audioManager.playQuranAyah(s, a);
      });
    });

    viewport.querySelector('#btn-play-full-surah')?.addEventListener('click', (e) => {
      const s = parseInt(e.currentTarget.getAttribute('data-surah') || 1);
      audioManager.playQuranAyah(s, 1);
    });

    // Learn view sub tabs
    viewport.querySelectorAll('[data-learn-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.learnTab = btn.getAttribute('data-learn-tab');
        this.renderMobileScreen();
      });
    });

    // Discover view filter pills
    viewport.querySelectorAll('[data-discover-pill]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.discoverTab = btn.getAttribute('data-discover-pill');
        this.renderMobileScreen();
      });
    });

    // Profile preferences & account triggers
    viewport.querySelector('#profile-open-lang')?.addEventListener('click', () => this.openModal('language-modal-overlay'));
    viewport.querySelector('#profile-replay-onboarding')?.addEventListener('click', () => this.openOnboarding());
    viewport.querySelector('#home-change-city-btn')?.addEventListener('click', () => this.openModal('location-modal-overlay'));
    viewport.querySelector('#btn-change-prayer-city')?.addEventListener('click', () => this.openModal('location-modal-overlay'));
    viewport.querySelector('#profile-open-location')?.addEventListener('click', () => this.openModal('location-modal-overlay'));
    viewport.querySelector('#profile-signin-btn')?.addEventListener('click', () => this.openModal('auth-modal-overlay'));
    viewport.querySelector('#profile-manage-account')?.addEventListener('click', () => this.openModal('auth-modal-overlay'));
  }

  bindWebPortalEvents() {
    const portal = document.getElementById('website-view-container');
    if (!portal) return;

    // Desktop Nav Links
    portal.querySelectorAll('[data-web-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-web-nav');
        if (target) {
          this.webPage = target;
          this.renderCurrentView();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    // Hero quick launch mobile app preview
    portal.querySelector('#btn-hero-launch-app')?.addEventListener('click', () => {
      this.viewMode = 'mobile';
      document.getElementById('btn-mode-mobile')?.classList.add('active');
      document.getElementById('btn-mode-web')?.classList.remove('active');
      this.renderCurrentView();
    });

    portal.querySelector('#web-search-trigger')?.addEventListener('click', () => this.openModal('search-modal-overlay'));
    portal.querySelector('#web-assistant-trigger')?.addEventListener('click', () => this.openModal('assistant-modal-overlay'));
    portal.querySelector('#btn-web-qibla-modal')?.addEventListener('click', () => this.openModal('qibla-modal-overlay'));
    portal.querySelector('#btn-web-mosque-modal')?.addEventListener('click', () => this.openModal('mosque-modal-overlay'));
    portal.querySelector('#web-zakat-open-cta')?.addEventListener('click', () => this.openModal('zakat-modal-overlay'));
    portal.querySelector('#footer-zakat-btn')?.addEventListener('click', () => this.openModal('zakat-modal-overlay'));
    portal.querySelector('#footer-tasbih-btn')?.addEventListener('click', () => this.openModal('tasbih-modal-overlay'));
    portal.querySelector('#footer-qibla-btn')?.addEventListener('click', () => this.openModal('qibla-modal-overlay'));
    portal.querySelector('#btn-web-open-tawaf-modal')?.addEventListener('click', () => {
      this.pilgrimTab = 'tawaf';
      const mount = document.getElementById('pilgrim-guide-mount');
      if (mount) mount.innerHTML = renderPilgrimageGuide('tawaf', this.tawafCount, this.saiLap);
      this.openModal('pilgrim-modal-overlay');
    });

    portal.querySelectorAll('.play-azan-single, #web-azan-preview-btn').forEach(btn => {
      btn.addEventListener('click', () => audioManager.playSereneChime());
    });

    portal.querySelectorAll('.btn-play-dua-audio').forEach(btn => {
      btn.addEventListener('click', () => audioManager.playSereneChime());
    });

    // Surah click in web quran directory
    portal.querySelectorAll('.web-surah-card').forEach(card => {
      card.addEventListener('click', () => {
        const num = parseInt(card.getAttribute('data-surah-num') || 1);
        this.selectedQuranSurah = num;
        this.viewMode = 'mobile';
        this.mobileScreen = 'quran';
        document.getElementById('btn-mode-mobile')?.classList.add('active');
        document.getElementById('btn-mode-web')?.classList.remove('active');
        this.renderCurrentView();
      });
    });
  }

  bindSearchAndLangModalEvents() {
    // Language search filtering
    const langSearch = document.getElementById('lang-modal-search');
    if (langSearch) {
      langSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.lang-item-card').forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(q) ? 'flex' : 'none';
        });
      });
    }

    // Language selection card click
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.lang-item-card');
      if (card) {
        const code = card.getAttribute('data-lang-code');
        if (code) {
          i18n.setLanguage(code);
          this.closeModal('language-modal-overlay');
        }
      }
    });

    // Universal Search input
    const searchInput = document.getElementById('universal-search-input');
    const resultsContainer = document.getElementById('universal-search-results');
    if (searchInput && resultsContainer) {
      searchInput.addEventListener('input', async (e) => {
        const q = e.target.value;
        resultsContainer.innerHTML = await performUniversalSearch(q);
      });
    }
  }

  bindTasbihEvents() {
    const tapZone = document.getElementById('tasbih-tap-zone');
    const countDisplay = document.getElementById('tasbih-count-display');
    const progressCircle = document.getElementById('tasbih-progress-circle');
    const resetBtn = document.getElementById('tasbih-reset-btn');
    const targetBtn = document.getElementById('tasbih-target-btn');
    const targetVal = document.getElementById('tasbih-target-val');

    if (tapZone) {
      tapZone.addEventListener('click', () => {
        this.tasbihCount += 1;
        storageService.set('tasbihCount', this.tasbihCount);

        const soundOn = document.getElementById('tasbih-sound-toggle')?.checked;
        if (soundOn) audioManager.playTasbihClick();

        if (navigator.vibrate && document.getElementById('tasbih-vibrate-toggle')?.checked) {
          navigator.vibrate(35);
        }

        if (countDisplay) countDisplay.textContent = this.tasbihCount;
        if (progressCircle) {
          const offset = 440 - (440 * (this.tasbihCount % this.tasbihTarget)) / this.tasbihTarget;
          progressCircle.style.strokeDashoffset = offset;
        }

        // Target reached chime
        if (this.tasbihCount > 0 && this.tasbihCount % this.tasbihTarget === 0) {
          audioManager.playSereneChime();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.tasbihCount = 0;
        storageService.set('tasbihCount', 0);
        if (countDisplay) countDisplay.textContent = 0;
        if (progressCircle) progressCircle.style.strokeDashoffset = 440;
      });
    }

    if (targetBtn) {
      targetBtn.addEventListener('click', () => {
        this.tasbihTarget = this.tasbihTarget === 33 ? 99 : (this.tasbihTarget === 99 ? 100 : 33);
        storageService.set('tasbihTarget', this.tasbihTarget);
        if (targetVal) targetVal.textContent = this.tasbihTarget;
      });
    }

    // Dhikr preset chips in tasbih modal
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-dhikr-idx]');
      if (chip) {
        const idx = parseInt(chip.getAttribute('data-dhikr-idx') || 0);
        this.tasbihDhikrIdx = idx;
        const item = DHIKR_PRESETS[idx];
        const ar = document.getElementById('tasbih-arabic');
        const tr = document.getElementById('tasbih-transliteration');
        const tl = document.getElementById('tasbih-translation');
        if (ar) ar.textContent = item.arabic;
        if (tr) tr.textContent = item.transliteration;
        if (tl) tl.textContent = item.translation;

        document.querySelectorAll('[data-dhikr-idx]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      }
    });
  }

  bindZakatEvents() {
    const form = document.getElementById('zakat-form');
    if (!form) return;

    const compute = () => {
      const cash = parseFloat(document.getElementById('zakat-cash')?.value || 0) || 0;
      const precious = parseFloat(document.getElementById('zakat-precious')?.value || 0) || 0;
      const invest = parseFloat(document.getElementById('zakat-investments')?.value || 0) || 0;
      const business = parseFloat(document.getElementById('zakat-business')?.value || 0) || 0;
      const debts = parseFloat(document.getElementById('zakat-debts')?.value || 0) || 0;

      const net = Math.max((cash + precious + invest + business) - debts, 0);
      const goldNisab = ZAKAT_DEFAULTS.goldPricePerGramUSD * ZAKAT_DEFAULTS.nisabGoldGrams;
      const isMet = net >= goldNisab;

      const payable = isMet ? net * ZAKAT_DEFAULTS.zakatRate : 0;

      const netAssetsEl = document.getElementById('zakat-net-assets');
      const statusEl = document.getElementById('zakat-nisab-status');
      const payableEl = document.getElementById('zakat-payable-val');

      if (netAssetsEl) netAssetsEl.textContent = `$${net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      if (statusEl) {
        statusEl.textContent = isMet ? 'Nisab Met (Zakat Due)' : 'Below Nisab Threshold';
        statusEl.className = `badge ${isMet ? 'badge-emerald' : 'badge-gold'}`;
      }
      if (payableEl) payableEl.textContent = `$${payable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    form.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', compute);
    });
  }

  bindPilgrimageEvents() {
    document.addEventListener('click', (e) => {
      // Tab switcher in pilgrimage modal
      const tabBtn = e.target.closest('[data-pilgrim-tab]');
      if (tabBtn) {
        const tab = tabBtn.getAttribute('data-pilgrim-tab');
        this.pilgrimTab = tab;
        const mount = document.getElementById('pilgrim-guide-mount');
        if (mount) mount.innerHTML = renderPilgrimageGuide(tab, this.tawafCount, this.saiLap);
      }

      // Tawaf increment
      if (e.target.id === 'tawaf-tap-btn') {
        if (this.tawafCount < 7) {
          this.tawafCount += 1;
          audioManager.playTasbihClick();
          const mount = document.getElementById('pilgrim-guide-mount');
          if (mount) mount.innerHTML = renderPilgrimageGuide('tawaf', this.tawafCount, this.saiLap);
          if (this.tawafCount === 7) audioManager.playSereneChime();
        }
      }
      if (e.target.id === 'tawaf-reset-btn') {
        this.tawafCount = 0;
        const mount = document.getElementById('pilgrim-guide-mount');
        if (mount) mount.innerHTML = renderPilgrimageGuide('tawaf', 0, this.saiLap);
      }

      // Sa'i increment
      if (e.target.id === 'sai-tap-btn') {
        if (this.saiLap < 7) {
          this.saiLap += 1;
          audioManager.playTasbihClick();
          const mount = document.getElementById('pilgrim-guide-mount');
          if (mount) mount.innerHTML = renderPilgrimageGuide('sai', this.tawafCount, this.saiLap);
          if (this.saiLap === 7) audioManager.playSereneChime();
        }
      }
      if (e.target.id === 'sai-reset-btn') {
        this.saiLap = 0;
        const mount = document.getElementById('pilgrim-guide-mount');
        if (mount) mount.innerHTML = renderPilgrimageGuide('sai', this.tawafCount, 0);
      }
    });
  }

  bindAiAssistantEvents() {
    const thread = document.getElementById('ai-chat-thread');
    const input = document.getElementById('ai-user-input');
    const sendBtn = document.getElementById('ai-send-btn');

    const handlePrompt = (text) => {
      if (!text || text.trim().length === 0) return;
      if (thread) {
        thread.innerHTML += `
          <div style="align-self: flex-end; background: var(--color-primary); color: white; padding: var(--space-2) var(--space-4); border-radius: var(--radius-lg); font-size: 0.9rem; max-width: 80%;">
            ${text}
          </div>
        `;
        thread.scrollTop = thread.scrollHeight;
      }
      if (input) input.value = '';

      // Simulated streaming / loading
      setTimeout(() => {
        const resp = getAssistantResponse(text);
        if (thread) {
          thread.innerHTML += formatAiResponseHTML(resp);
          thread.scrollTop = thread.scrollHeight;
        }
      }, 350);
    };

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => handlePrompt(input.value));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handlePrompt(input.value);
      });
    }

    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-prompt-chip');
      if (chip) {
        const promptText = chip.getAttribute('data-prompt');
        if (promptText) handlePrompt(promptText);
      }
    });
  }

  bindAudioBarEvents() {
    const bar = document.getElementById('global-audio-bar');
    const titleEl = document.getElementById('audio-bar-title');
    const subEl = document.getElementById('audio-bar-subtitle');
    const toggleBtn = document.getElementById('btn-audio-toggle');
    const closeBtn = document.getElementById('btn-audio-close');

    audioManager.subscribe((state) => {
      if (!bar) return;
      if (state.track) {
        bar.classList.remove('hidden');
        if (titleEl) titleEl.textContent = state.track.title;
        if (subEl) subEl.textContent = state.track.artist;
        if (toggleBtn) toggleBtn.textContent = state.isPlaying ? 'Pause' : 'Play';
      } else {
        bar.classList.add('hidden');
      }
    });

    toggleBtn?.addEventListener('click', () => audioManager.togglePlayPause());
    closeBtn?.addEventListener('click', () => audioManager.stop());
  }

  bindLocationEvents() {
    // 1. GPS Auto-Detect Button
    document.addEventListener('click', async (e) => {
      const gpsBtn = e.target.closest('#btn-detect-gps');
      if (gpsBtn) {
        gpsBtn.disabled = true;
        gpsBtn.textContent = '⏳ Detecting location...';
        try {
          const loc = await locationService.detectUserLocation();
          gpsBtn.textContent = `✓ ${loc.city}, ${loc.country}`;
          const labelEl = document.getElementById('loc-detected-label');
          if (labelEl) labelEl.textContent = `📍 ${loc.city}, ${loc.country}`;
          setTimeout(() => {
            gpsBtn.disabled = false;
            gpsBtn.textContent = '🧭 Detect My Location';
            this.closeModal('location-modal-overlay');
            audioManager.playSereneChime();
          }, 700);
        } catch (err) {
          gpsBtn.disabled = false;
          gpsBtn.textContent = '⚠️ Auto-detect failed';
          setTimeout(() => { gpsBtn.textContent = '🧭 Detect My Location'; }, 2000);
        }
      }
    });

    // 2. Location Search Filter
    const locSearch = document.getElementById('location-search-input');
    if (locSearch) {
      locSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        const activeChip = document.querySelector('.loc-region-chip.active');
        const activeRegion = activeChip ? activeChip.getAttribute('data-region') : 'All';
        document.querySelectorAll('.loc-item-card').forEach(card => {
          const city = (card.getAttribute('data-city') || '').toLowerCase();
          const country = (card.getAttribute('data-country') || '').toLowerCase();
          const region = card.getAttribute('data-region');
          const matchesQuery = !q || city.includes(q) || country.includes(q);
          const matchesRegion = activeRegion === 'All' || region === activeRegion;
          card.style.display = matchesQuery && matchesRegion ? 'flex' : 'none';
        });
      });
    }

    // 3. Region Filter Chips
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.loc-region-chip');
      if (chip) {
        document.querySelectorAll('.loc-region-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const region = chip.getAttribute('data-region');
        const q = (document.getElementById('location-search-input')?.value || '').toLowerCase().trim();
        document.querySelectorAll('.loc-item-card').forEach(card => {
          const cardRegion = card.getAttribute('data-region');
          const city = (card.getAttribute('data-city') || '').toLowerCase();
          const country = (card.getAttribute('data-country') || '').toLowerCase();
          const matchesQuery = !q || city.includes(q) || country.includes(q);
          const matchesRegion = region === 'All' || cardRegion === region;
          card.style.display = matchesQuery && matchesRegion ? 'flex' : 'none';
        });
      }
    });

    // 4. Select Location Card
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.loc-item-card');
      if (card) {
        const city = card.getAttribute('data-city');
        const country = card.getAttribute('data-country');
        const lat = parseFloat(card.getAttribute('data-lat') || 0);
        const lng = parseFloat(card.getAttribute('data-lng') || 0);
        const region = card.getAttribute('data-region');
        locationService.setLocation({ city, country, lat, lng, region });
        this.closeModal('location-modal-overlay');
        audioManager.playSereneChime();
      }
    });

    // 5. General location modal triggers
    document.addEventListener('click', (e) => {
      if (e.target.closest('#btn-change-prayer-city, #home-change-city-btn, #profile-open-location')) {
        this.openModal('location-modal-overlay');
      }
    });
  }

  bindAuthEvents() {
    // 1. 1-Click Google (Gmail) Login
    document.addEventListener('click', async (e) => {
      const googleBtn = e.target.closest('#btn-google-login');
      if (googleBtn) {
        googleBtn.disabled = true;
        googleBtn.innerHTML = `<span>⏳ Signing in with Google (Gmail)...</span>`;
        try {
          await authService.loginWithGoogle();
          this.closeModal('auth-modal-overlay');
          audioManager.playSereneChime();
        } catch (err) {
          console.error('Google auth error', err);
        }
      }
    });

    // 2. Auth Mode Toggle (Sign In <-> Sign Up)
    document.addEventListener('click', (e) => {
      if (e.target.closest('#auth-toggle-mode')) {
        this.isSignUpMode = !this.isSignUpMode;
        const currentModal = document.getElementById('auth-modal-overlay');
        if (currentModal) {
          const temp = document.createElement('div');
          temp.innerHTML = renderAuthModal(this.isSignUpMode);
          const newModal = temp.firstElementChild;
          newModal.classList.add('open');
          currentModal.replaceWith(newModal);
        }
      }
    });

    // 3. Email Form Submit (Sign In / Sign Up)
    document.addEventListener('click', async (e) => {
      const submitBtn = e.target.closest('#auth-submit-btn');
      if (submitBtn) {
        e.preventDefault();
        const email = document.getElementById('auth-email-input')?.value.trim();
        const password = document.getElementById('auth-password-input')?.value;
        const name = document.getElementById('auth-name-input')?.value.trim();
        const errorEl = document.getElementById('auth-error-msg');
        if (errorEl) errorEl.style.display = 'none';

        if (!email || !password) {
          if (errorEl) {
            errorEl.textContent = 'Please enter both email and password.';
            errorEl.style.display = 'block';
          }
          return;
        }

        submitBtn.disabled = true;
        const origText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Verifying...';

        try {
          if (this.isSignUpMode) {
            if (!name) {
              submitBtn.disabled = false;
              submitBtn.textContent = origText;
              if (errorEl) {
                errorEl.textContent = 'Please provide your full name.';
                errorEl.style.display = 'block';
              }
              return;
            }
            await authService.signup(name, email, password);
          } else {
            await authService.loginWithEmail(email, password);
          }
          this.closeModal('auth-modal-overlay');
          audioManager.playSereneChime();
        } catch (err) {
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
          if (errorEl) {
            errorEl.textContent = err.message || 'Authentication error occurred.';
            errorEl.style.display = 'block';
          }
        }
      }
    });

    // 4. Sign Out Button
    document.addEventListener('click', (e) => {
      if (e.target.closest('#auth-signout-btn')) {
        authService.logout();
        this.closeModal('auth-modal-overlay');
        audioManager.playSereneChime();
      }
    });

    // 5. Delegated Close & Open Handlers
    document.addEventListener('click', (e) => {
      if (e.target.closest('#close-auth-modal')) {
        this.closeModal('auth-modal-overlay');
      }
      if (e.target.closest('#close-location-modal')) {
        this.closeModal('location-modal-overlay');
      }
      if (e.target.closest('#profile-signin-btn, #profile-manage-account')) {
        this.openModal('auth-modal-overlay');
      }
    });
  }

  openOnboarding() {
    this.onboardingStep = 1;
    this.mountModals();
    this.openModal('onboarding-overlay');
  }

  openModal(modalId) {
    document.getElementById(modalId)?.classList.add('open');
  }

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('open');
  }

  startClock() {
    const clockEl = document.getElementById('phone-clock');
    const update = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      if (clockEl) clockEl.textContent = `${h}:${m}`;
    };
    update();
    setInterval(update, 30000);
  }
}

// Global window helpers for inline handlers (e.g. Onboarding)
window.nextOnboardingStep = (step) => {
  for (let i = 1; i <= 6; i++) {
    const s = document.getElementById(`onboarding-step-${i}`);
    if (s) s.style.display = i === step ? 'block' : 'none';
  }
};

window.selectOnboardingLanguage = (code) => {
  i18n.setLanguage(code);
  window.nextOnboardingStep(4);
};

window.completeOnboarding = () => {
  storageService.set('onboardingCompleted', true);
  document.getElementById('onboarding-overlay')?.classList.remove('open');
  audioManager.playSereneChime();
};

document.getElementById('onboarding-skip-btn')?.addEventListener('click', () => {
  window.completeOnboarding();
});

// App Initiation on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new NoorApp();
  app.init();
});
