// NOOR Pixabay Media Viewer Modal (Video Player & High-Res Image Viewer)

export function renderMediaViewerModal() {
  return `
    <div class="modal-overlay" id="media-viewer-modal-overlay">
      <div class="modal-content" style="max-width: 720px; padding: var(--space-4); background: #0D110F; border: 1px solid rgba(197, 160, 89, 0.3); color: #FAF8F5;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
          <div style="display: flex; align-items: center; gap: var(--space-2);">
            <span class="badge badge-gold" id="media-type-badge">Pixabay Video</span>
            <h3 class="font-h3" id="media-modal-title" style="color: #FFFFFF; font-size: 1rem; margin: 0;">Islamic Media</h3>
          </div>
          <button class="btn-icon btn-icon-sm" id="close-media-modal" style="background: rgba(255,255,255,0.1); color: white;">✕</button>
        </div>

        <!-- Video Player Container -->
        <div id="media-video-container" style="display: none; width: 100%; border-radius: var(--radius-md); overflow: hidden; background: #000000; position: relative;">
          <video id="media-video-player" controls playsinline style="width: 100%; max-height: 440px; display: block;">
            <source src="" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
        </div>

        <!-- Image Viewer Container -->
        <div id="media-image-container" style="display: none; width: 100%; text-align: center;">
          <img id="media-image-display" src="" alt="Islamic Photography" style="max-width: 100%; max-height: 480px; border-radius: var(--radius-md); object-fit: contain;">
        </div>

        <!-- Media Info & Credits -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-3); padding-top: var(--space-2); border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; color: rgba(255,255,255,0.7);">
          <span id="media-creator-info">Provided by Pixabay</span>
          <a id="media-external-link" href="https://pixabay.com" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent-gold-light); text-decoration: none;">View on Pixabay ↗</a>
        </div>
      </div>
    </div>
  `;
}
