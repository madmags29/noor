// NOOR Pixabay Media Service: Real-time Islamic Images & Videos Integration
const PIXABAY_API_KEY = '1205054-735c0124dcc9779aa853f29fc';
const BASE_IMG_URL = 'https://pixabay.com/api/';
const BASE_VIDEO_URL = 'https://pixabay.com/api/videos/';

class PixabayService {
  constructor() {
    this.cache = new Map();
  }

  // Fetch Islamic images by topic (e.g. 'islamic architecture', 'makkah', 'quran', 'mosque')
  async fetchIslamicImages(query = 'islamic architecture', perPage = 12) {
    const cacheKey = `img_${query}_${perPage}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const url = `${BASE_IMG_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=true&per_page=${perPage}&order=popular`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Pixabay API error: ${res.status}`);
      const data = await res.json();
      const hits = (data.hits || []).map(hit => ({
        id: hit.id,
        title: hit.tags.split(',').slice(0, 3).join(' • '),
        tags: hit.tags,
        previewUrl: hit.previewURL,
        webformatUrl: hit.webformatURL,
        largeImageUrl: hit.largeImageURL,
        likes: hit.likes,
        views: hit.views,
        user: hit.user,
        pageUrl: hit.pageURL
      }));
      this.cache.set(cacheKey, hits);
      return hits;
    } catch (err) {
      console.warn('Failed to fetch Pixabay images, using fallback', err);
      return [];
    }
  }

  // Fetch Islamic videos by topic (e.g. 'islamic mosque', 'makkah', 'medina')
  async fetchIslamicVideos(query = 'islamic mosque', perPage = 8) {
    const cacheKey = `video_${query}_${perPage}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const url = `${BASE_VIDEO_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&safesearch=true&per_page=${perPage}&order=popular`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Pixabay Videos API error: ${res.status}`);
      const data = await res.json();
      const hits = (data.hits || []).map(hit => {
        const videoFiles = hit.videos || {};
        const bestVideo = videoFiles.medium || videoFiles.small || videoFiles.large || {};
        return {
          id: hit.id,
          title: hit.tags.split(',').slice(0, 3).join(' • '),
          tags: hit.tags,
          duration: hit.duration,
          videoUrl: bestVideo.url,
          thumbnail: bestVideo.thumbnail || (videoFiles.tiny && videoFiles.tiny.thumbnail) || '',
          views: hit.views,
          likes: hit.likes,
          user: hit.user,
          pageUrl: hit.pageURL
        };
      });
      this.cache.set(cacheKey, hits);
      return hits;
    } catch (err) {
      console.warn('Failed to fetch Pixabay videos, using fallback', err);
      return [];
    }
  }
}

export const pixabayService = new PixabayService();
