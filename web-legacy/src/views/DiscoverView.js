// NOOR Mobile App: Discover View (News, Pixabay Videos, Pixabay Photos, Podcasts, Mosques, Ummah)
import { NEWS_ARTICLES, PODCASTS_MEDIA } from '../data/newsData.js';
import { NEARBY_MOSQUES } from '../data/mosquesData.js';
import { UPCOMING_HOLY_EVENTS } from '../data/calendarData.js';

export function renderDiscoverView(activeSubSection = 'news', pixabayVideos = [], pixabayPhotos = []) {
  return `
    <div class="mobile-screen-content" style="padding: var(--space-4);">
      <!-- Header -->
      <div style="margin-bottom: var(--space-4);">
        <span class="badge badge-gold">The Global Ummah</span>
        <h2 class="font-h1" style="margin-top: 2px;">Discover & Connect</h2>
        <p class="font-caption" style="color: var(--text-muted);">Powered by Pixabay API & NOOR Editorial</p>
      </div>

      <!-- Category Filter Pills -->
      <div style="display: flex; gap: var(--space-2); overflow-x: auto; padding-bottom: var(--space-3); margin-bottom: var(--space-4); scrollbar-width: none;">
        <button class="chip ${activeSubSection === 'news' ? 'active' : ''}" data-discover-pill="news">Editorial News</button>
        <button class="chip ${activeSubSection === 'videos' ? 'active' : ''}" data-discover-pill="videos">🎥 Islamic Videos</button>
        <button class="chip ${activeSubSection === 'photos' ? 'active' : ''}" data-discover-pill="photos">🖼️ Photo Gallery</button>
        <button class="chip ${activeSubSection === 'podcasts' ? 'active' : ''}" data-discover-pill="podcasts">Podcasts</button>
        <button class="chip ${activeSubSection === 'mosques' ? 'active' : ''}" data-discover-pill="mosques">Nearby Mosques</button>
        <button class="chip ${activeSubSection === 'calendar' ? 'active' : ''}" data-discover-pill="calendar">Islamic Calendar</button>
      </div>

      <!-- SubSection 1: Editorial News -->
      <div id="discover-content-news" style="display: ${activeSubSection === 'news' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${NEWS_ARTICLES.map((art, idx) => {
            const fallbackImg = pixabayPhotos[idx] ? pixabayPhotos[idx].webformatUrl : 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&q=80';
            return `
              <div class="card card-interactive news-card" data-article-id="${art.id}" style="overflow: hidden; padding: 0;">
                <div style="height: 140px; background-image: url('${fallbackImg}'); background-size: cover; background-position: center; position: relative;">
                  <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%);"></div>
                  <span class="badge badge-emerald" style="position: absolute; top: 12px; left: 12px;">${art.category}</span>
                </div>
                <div style="padding: var(--space-4);">
                  <span class="font-caption" style="color: var(--text-muted);">${art.readTime} • ${art.date}</span>
                  <h3 class="font-h3" style="margin: 4px 0 8px 0;">${art.title}</h3>
                  <p class="font-body-sm" style="color: var(--text-secondary); margin-bottom: var(--space-3);">${art.summary}</p>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: var(--space-2);">
                    <span>By ${art.author}</span>
                    <span style="color: var(--color-primary); font-weight: 600;">Read Full Story ❯</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- SubSection 2: Pixabay Live Islamic Videos -->
      <div id="discover-content-videos" style="display: ${activeSubSection === 'videos' ? 'block' : 'none'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
          <span class="font-caption" style="color: var(--text-muted); font-weight: 600;">STREAMING FROM PIXABAY</span>
          <div style="display: flex; gap: 4px;">
            <button class="chip active video-filter-chip" data-video-query="islamic mosque" style="font-size: 0.7rem; padding: 2px 8px;">Mosques</button>
            <button class="chip video-filter-chip" data-video-query="makkah kaaba" style="font-size: 0.7rem; padding: 2px 8px;">Makkah</button>
            <button class="chip video-filter-chip" data-video-query="quran reading" style="font-size: 0.7rem; padding: 2px 8px;">Quran</button>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-4);" id="pixabay-video-list">
          ${pixabayVideos.length > 0 ? pixabayVideos.map(v => `
            <div class="card card-interactive pixabay-video-card" data-video-url="${v.videoUrl}" data-title="${v.title}" data-creator="${v.user}" style="overflow: hidden; padding: 0;">
              <div style="height: 160px; background: #121815 url('${v.thumbnail}') center/cover no-repeat; position: relative; display: flex; align-items: center; justify-content: center;">
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.35);"></div>
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(15, 76, 58, 0.9); border: 2px solid var(--color-accent-gold); display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 1.3rem; z-index: 2; box-shadow: 0 4px 16px rgba(0,0,0,0.4); transition: transform 0.2s ease;">
                  ▶
                </div>
                <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; z-index: 2;">
                  ${v.duration ? `${v.duration}s` : 'HD'}
                </span>
                <span class="badge badge-gold" style="position: absolute; top: 8px; left: 8px; z-index: 2; font-size: 0.65rem;">Pixabay HD</span>
              </div>
              <div style="padding: var(--space-3) var(--space-4);">
                <h4 class="font-h3" style="font-size: 1rem; margin-bottom: 2px;">${v.title || 'Islamic Spiritual Moment'}</h4>
                <p class="font-caption" style="color: var(--text-muted);">Creator: ${v.user} • ${v.views?.toLocaleString() || 1200} views</p>
              </div>
            </div>
          `).join('') : `
            <div style="text-align: center; padding: var(--space-8); color: var(--text-muted);">
              <div class="state-icon-circle" style="margin: 0 auto 12px auto;">🎥</div>
              <p>Loading high-definition Islamic videos from Pixabay API...</p>
            </div>
          `}
        </div>
      </div>

      <!-- SubSection 3: Pixabay Islamic Photo Gallery -->
      <div id="discover-content-photos" style="display: ${activeSubSection === 'photos' ? 'block' : 'none'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
          <span class="font-caption" style="color: var(--text-muted); font-weight: 600;">HERITAGE PHOTOGRAPHY</span>
          <div style="display: flex; gap: 4px;">
            <button class="chip active photo-filter-chip" data-photo-query="islamic architecture" style="font-size: 0.7rem; padding: 2px 8px;">Architecture</button>
            <button class="chip photo-filter-chip" data-photo-query="makkah madinah" style="font-size: 0.7rem; padding: 2px 8px;">Holy Sites</button>
            <button class="chip photo-filter-chip" data-photo-query="ramadan lantern" style="font-size: 0.7rem; padding: 2px 8px;">Ramadan</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);" id="pixabay-photo-grid">
          ${pixabayPhotos.length > 0 ? pixabayPhotos.map(p => `
            <div class="card card-interactive pixabay-photo-card" data-img-url="${p.largeImageUrl || p.webformatUrl}" data-title="${p.title}" data-creator="${p.user}" style="padding: 0; overflow: hidden; height: 160px; position: relative;">
              <img src="${p.webformatUrl}" alt="${p.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
              <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 8px; background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%); color: white; font-size: 0.7rem;">
                <span style="font-weight: 600; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.title}</span>
                <span style="opacity: 0.8; font-size: 0.65rem;">📷 ${p.user}</span>
              </div>
            </div>
          `).join('') : `
            <div style="grid-column: span 2; text-align: center; padding: var(--space-8); color: var(--text-muted);">
              <div class="state-icon-circle" style="margin: 0 auto 12px auto;">🖼️</div>
              <p>Loading curated Islamic photography from Pixabay API...</p>
            </div>
          `}
        </div>
      </div>

      <!-- SubSection 4: Podcasts -->
      <div id="discover-content-podcasts" style="display: ${activeSubSection === 'podcasts' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${PODCASTS_MEDIA.map(p => `
            <div class="card card-interactive podcast-card" style="display: flex; gap: var(--space-3); align-items: center;">
              <div style="width: 56px; height: 56px; border-radius: var(--radius-md); background: var(--color-primary-subtle); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                🎙️
              </div>
              <div style="flex: 1;">
                <h4 class="font-h3" style="font-size: 1rem;">${p.title}</h4>
                <p class="font-caption" style="color: var(--color-primary); font-weight: 600;">Host: ${p.host}</p>
                <p class="font-caption" style="color: var(--text-muted);">Latest: ${p.latestEpisode} (${p.duration})</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SubSection 5: Mosques -->
      <div id="discover-content-mosques" style="display: ${activeSubSection === 'mosques' ? 'block' : 'none'};">
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${NEARBY_MOSQUES.map(m => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-1);">
                <h4 class="font-h3">${m.name}</h4>
                <span class="badge badge-emerald">${m.distance}</span>
              </div>
              <p class="font-caption" style="color: var(--text-muted); margin-bottom: var(--space-2);">${m.address}</p>
              <div style="display: flex; gap: var(--space-1); flex-wrap: wrap; margin-bottom: var(--space-3);">
                ${m.facilities.slice(0, 3).map(f => `<span class="chip" style="font-size: 0.7rem; padding: 2px 8px;">✓ ${f}</span>`).join('')}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: var(--space-2);">
                <span class="font-caption" style="font-weight: 600;">Jumu‘ah: ${m.jumuahTimes[0]}</span>
                <button class="btn btn-sm btn-outline">Directions ↗</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SubSection 6: Islamic Calendar -->
      <div id="discover-content-calendar" style="display: ${activeSubSection === 'calendar' ? 'block' : 'none'};">
        <div class="card card-emerald" style="margin-bottom: var(--space-4);">
          <span style="font-size: 0.75rem; color: var(--color-accent-gold-light); text-transform: uppercase;">Current Islamic Month</span>
          <h3 class="font-display" style="color: #FFFFFF; margin: 4px 0;">Rabi al-Awwal 1448 AH</h3>
          <p class="font-body-sm" style="color: rgba(255, 255, 255, 0.9);">The blessed month of the birth of the Prophet Muhammad ﷺ</p>
        </div>

        <h3 class="font-h3" style="margin-bottom: var(--space-3);">Upcoming Sacred Observances</h3>
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${UPCOMING_HOLY_EVENTS.map(ev => `
            <div class="card" style="border-left: 4px solid var(--color-accent-gold);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 class="font-h3">${ev.title}</h4>
                <span class="badge badge-gold">${ev.hijriDate}</span>
              </div>
              <p class="font-body-sm" style="color: var(--text-secondary); margin-top: var(--space-1);">${ev.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
