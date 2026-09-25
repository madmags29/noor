const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WIDTH = 1200;
const HEIGHT = 630;
const TOTAL_FRAMES = 24; // 24 frames for smooth 15fps 1.6s loop
const TEMP_DIR = path.join(__dirname, 'temp_og_frames');

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function generateSvgFrame(frameIndex, totalFrames) {
  const progress = frameIndex / totalFrames; // 0.0 to 1.0
  const orbitAngle = progress * 360; // 0 to 360 deg
  const sparkAngleRad = (progress * 2 * Math.PI) - Math.PI / 2;
  
  // Star pulse & subtle rotation
  const pulsePhase = Math.sin(progress * 2 * Math.PI);
  const starScale = 1.0 + 0.18 * Math.max(0, pulsePhase);
  const starRotate = pulsePhase * 15; // -15 to +15 deg
  const starGlowOpacity = 0.5 + 0.5 * Math.max(0, pulsePhase);

  // Crescent subtle breathe
  const crescentBreathe = 1.0 + 0.02 * Math.sin(progress * 2 * Math.PI);
  const glowPulse = 0.35 + 0.15 * Math.sin(progress * 2 * Math.PI);

  // Spark coordinate on radius 78 (scaled up from 26 in 64x64 viewbox)
  // Center of emblem is at cx = 600, cy = 205
  const emblemCx = 600;
  const emblemCy = 205;
  const emblemScale = 3.6; // Scale 64x64 up to ~230x230
  
  const sparkR = 26 * emblemScale;
  const sparkX = emblemCx + sparkR * Math.cos(sparkAngleRad);
  const sparkY = emblemCy + sparkR * Math.sin(sparkAngleRad);

  // Secondary sparks at 180 deg offset
  const spark2AngleRad = sparkAngleRad + Math.PI;
  const spark2X = emblemCx + (sparkR * 0.75) * Math.cos(spark2AngleRad);
  const spark2Y = emblemCy + (sparkR * 0.75) * Math.sin(spark2AngleRad);

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#064e3b" stop-opacity="0.85" />
      <stop offset="45%" stop-color="#022c22" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#02120d" stop-opacity="1" />
    </radialGradient>

    <!-- Liquid Gold Gradients -->
    <linearGradient id="crescentGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="25%" stop-color="#FDE047" />
      <stop offset="55%" stop-color="#F59E0B" />
      <stop offset="85%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>

    <linearGradient id="textGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FEF3C7" />
      <stop offset="35%" stop-color="#FDE68A" />
      <stop offset="65%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#FBBF24" />
    </linearGradient>

    <linearGradient id="borderGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#10B981" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#D97706" stop-opacity="0.6" />
    </linearGradient>

    <!-- Sacred Emerald Jewel Gradient -->
    <linearGradient id="emeraldBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="45%" stop-color="#047857" />
      <stop offset="75%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>

    <!-- Radiant Star Core Gradient -->
    <radialGradient id="starShine" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#FEF08A" />
      <stop offset="75%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </radialGradient>

    <!-- Star Glow Filter -->
    <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glowSpark" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- 1. Background Fill -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#02120d" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGlow)" />

  <!-- 2. Decorative Outer Islamic Geometric Border -->
  <rect x="24" y="24" width="${WIDTH - 48}" height="${HEIGHT - 48}" rx="20" fill="none" stroke="url(#borderGold)" stroke-width="1.5" />
  <rect x="32" y="32" width="${WIDTH - 64}" height="${HEIGHT - 64}" rx="14" fill="none" stroke="rgba(245, 158, 11, 0.15)" stroke-width="1" stroke-dasharray="8 8" />

  <!-- Corner Flourishes -->
  <!-- Top-Left -->
  <path d="M 44 64 L 44 44 L 64 44" fill="none" stroke="#F59E0B" stroke-width="2" />
  <circle cx="44" cy="44" r="3" fill="#FDE68A" />
  <!-- Top-Right -->
  <path d="M ${WIDTH - 64} 44 L ${WIDTH - 44} 44 L ${WIDTH - 44} 64" fill="none" stroke="#F59E0B" stroke-width="2" />
  <circle cx="${WIDTH - 44}" cy="44" r="3" fill="#FDE68A" />
  <!-- Bottom-Left -->
  <path d="M 44 ${HEIGHT - 64} L 44 ${HEIGHT - 44} L 64 ${HEIGHT - 44}" fill="none" stroke="#F59E0B" stroke-width="2" />
  <circle cx="44" cy="${HEIGHT - 44}" r="3" fill="#FDE68A" />
  <!-- Bottom-Right -->
  <path d="M ${WIDTH - 64} ${HEIGHT - 44} L ${WIDTH - 44} ${HEIGHT - 44} L ${WIDTH - 44} ${HEIGHT - 64}" fill="none" stroke="#F59E0B" stroke-width="2" />
  <circle cx="${WIDTH - 44}" cy="${HEIGHT - 44}" r="3" fill="#FDE68A" />

  <!-- 3. Ambient Central Halo Glow Behind Emblem -->
  <circle cx="${emblemCx}" cy="${emblemCy}" r="140" fill="#F59E0B" opacity="${glowPulse * 0.4}" filter="url(#glowGold)" />
  <circle cx="${emblemCx}" cy="${emblemCy}" r="110" fill="#10B981" opacity="${glowPulse * 0.3}" filter="url(#glowGold)" />

  <!-- 4. Grand Emblem Group centered at (600, 205) -->
  <g transform="translate(${emblemCx}, ${emblemCy})">
    <!-- Emblem Background Container (60x60 scaled) -->
    <rect
      x="${-30 * emblemScale}"
      y="${-30 * emblemScale}"
      width="${60 * emblemScale}"
      height="${60 * emblemScale}"
      rx="${18 * emblemScale}"
      fill="url(#emeraldBase)"
      stroke="rgba(255, 255, 255, 0.25)"
      stroke-width="${1.2 * emblemScale}"
    />

    <!-- Celestial Orbit Ring with Dynamic Rotation -->
    <circle
      cx="0"
      cy="0"
      r="${26 * emblemScale}"
      stroke="#FDE68A"
      stroke-opacity="0.75"
      stroke-width="${1.2 * emblemScale}"
      stroke-dasharray="${4 * emblemScale} ${6 * emblemScale} ${12 * emblemScale} ${6 * emblemScale}"
      fill="none"
      transform="rotate(${orbitAngle})"
    />

    <!-- Authentic Sacred Crescent Moon (Hilal) -->
    <g transform="translate(${-32 * emblemScale}, ${-32 * emblemScale})">
      <path
        d="M ${34.61 * emblemScale} ${15.8 * emblemScale} A ${17.5 * emblemScale} ${17.5 * emblemScale} 0 1 0 ${34.61 * emblemScale} ${48.2 * emblemScale} A ${16.5 * emblemScale} ${16.5 * emblemScale} 0 0 1 ${34.61 * emblemScale} ${15.8 * emblemScale} Z"
        fill="url(#crescentGold)"
        filter="url(#glowGold)"
        transform="scale(${crescentBreathe}) translate(${-(crescentBreathe - 1) * 32 * emblemScale}, ${-(crescentBreathe - 1) * 32 * emblemScale})"
      />
      <!-- Shimmer Spine Highlight -->
      <path
        d="M ${30 * emblemScale} ${18 * emblemScale} A ${16 * emblemScale} ${16 * emblemScale} 0 0 0 ${13 * emblemScale} ${32 * emblemScale} A ${16 * emblemScale} ${16 * emblemScale} 0 0 0 ${30 * emblemScale} ${46 * emblemScale} A ${15.5 * emblemScale} ${15.5 * emblemScale} 0 0 1 ${14.5 * emblemScale} ${32 * emblemScale} A ${15.5 * emblemScale} ${15.5 * emblemScale} 0 0 1 ${30 * emblemScale} ${18 * emblemScale} Z"
        fill="#FFFFFF"
        opacity="0.3"
      />
    </g>

    <!-- Islamic Eight-Pointed Star (Rub el Hizb ۞) -->
    <g transform="translate(${3 * emblemScale}, 0) scale(${starScale}) rotate(${starRotate})">
      <!-- Glow rays behind star -->
      <circle cx="0" cy="0" r="${10 * emblemScale}" fill="#F59E0B" opacity="${starGlowOpacity * 0.4}" filter="url(#glowGold)" />
      <!-- Square 1 -->
      <rect
        x="${-4.5 * emblemScale}"
        y="${-4.5 * emblemScale}"
        width="${9 * emblemScale}"
        height="${9 * emblemScale}"
        rx="${1 * emblemScale}"
        fill="url(#starShine)"
      />
      <!-- Square 2 (Rotated 45 deg) -->
      <rect
        x="${-4.5 * emblemScale}"
        y="${-4.5 * emblemScale}"
        width="${9 * emblemScale}"
        height="${9 * emblemScale}"
        rx="${1 * emblemScale}"
        transform="rotate(45)"
        fill="url(#starShine)"
      />
      <!-- Star Core Radiant Diamond -->
      <circle cx="0" cy="0" r="${1.8 * emblemScale}" fill="#FFFFFF" />
      <circle cx="0" cy="0" r="${0.8 * emblemScale}" fill="#B45309" />
    </g>
  </g>

  <!-- 5. Orbiting Divine Light Sparks -->
  <!-- Primary Spark -->
  <circle cx="${sparkX}" cy="${sparkY}" r="6.5" fill="#FFFFFF" filter="url(#glowSpark)" />
  <circle cx="${sparkX}" cy="${sparkY}" r="4" fill="#FEF08A" />
  <!-- Spark 2 -->
  <circle cx="${spark2X}" cy="${spark2Y}" r="4.5" fill="#34D399" opacity="0.8" filter="url(#glowSpark)" />

  <!-- 6. Arabic Calligraphy -->
  <text x="600" y="375" text-anchor="middle" font-family="'Amiri', 'Traditional Arabic', 'Scheherazade New', serif" font-size="36" font-weight="bold" fill="#FDE68A" letter-spacing="2">
    نُورِ اِلٰہی
  </text>

  <!-- 7. Brand Title (NOOR-E-ILAHI) -->
  <text x="600" y="440" text-anchor="middle" font-family="'Cinzel', 'Outfit', 'Inter', system-ui, sans-serif" font-size="52" font-weight="900" fill="url(#textGold)" letter-spacing="10">
    NOOR-E-ILAHI
  </text>

  <!-- 8. Tagline & Positioning -->
  <text x="600" y="482" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="20" font-weight="600" fill="#A7F3D0" letter-spacing="3">
    YOUR DEEN. YOUR DAILY COMPANION.
  </text>

  <!-- 9. Feature Badges Pill Row -->
  <g transform="translate(600, 528)">
    <rect x="-420" y="-18" width="840" height="36" rx="18" fill="rgba(6, 78, 59, 0.6)" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1" />
    <text x="0" y="5" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="600" fill="#FEF3C7" letter-spacing="1">
      PRAYER TIMES • NOBLE QURAN AUDIO • 3D QIBLA • ZAKAT • DUAS • 31 ZIYARAT
    </text>
  </g>

  <!-- 10. Platform Meta Footer -->
  <text x="600" y="585" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="500" fill="#9CA3AF" letter-spacing="2">
    100% FREE &amp; AD-FREE • GLOBAL ISLAMIC DIGITAL ECOSYSTEM • WWW.NOOREILAHI.COM
  </text>
</svg>
`;
}

async function main() {
  console.log(`Rendering ${TOTAL_FRAMES} frames of animated logo OpenGraph card...`);
  
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const svgStr = generateSvgFrame(i, TOTAL_FRAMES);
    const framePath = path.join(TEMP_DIR, `frame_${String(i).padStart(3, '0')}.png`);
    await sharp(Buffer.from(svgStr))
      .png()
      .toFile(framePath);
    process.stdout.write(`.`);
  }
  console.log('\nAll frames rendered to PNG!');

  // Also save frame 0 as static high-res fallback og-image.png in noor-web/public
  const publicDir = path.join(__dirname, '../public');
  const staticPngPath = path.join(publicDir, 'og-image.png');
  fs.copyFileSync(path.join(TEMP_DIR, 'frame_000.png'), staticPngPath);
  console.log('Saved static fallback: ' + staticPngPath);

  // Compile frames into animated GIF and animated WebP using Python Pillow
  console.log('Assembling animated GIF & animated WebP using Pillow...');
  const pyScript = `
import os
from PIL import Image

temp_dir = '${TEMP_DIR}'
public_dir = '${publicDir}'
files = sorted([f for f in os.listdir(temp_dir) if f.startswith('frame_') and f.endswith('.png')])
print(f'Found {len(files)} frames')

images = [Image.open(os.path.join(temp_dir, f)) for f in files]

# 1. Save Animated WebP (Full Quality, 60ms per frame = ~16.6 fps)
webp_path = os.path.join(public_dir, 'og-animated.webp')
images[0].save(
    webp_path,
    save_all=True,
    append_images=images[1:],
    duration=65,
    loop=0,
    quality=88,
    method=4
)
print('Saved animated WebP:', webp_path, os.path.getsize(webp_path), 'bytes')

# 2. Save Animated GIF (Quantized adaptive palette for optimal web size)
# Convert frames to P mode with adaptive palette for crisp GIF rendering
gif_frames = []
for im in images:
    # Resize slightly for GIF to keep size ultra-efficient (~1.5MB) or keep full 1200x630
    p_im = im.convert('RGB').quantize(colors=128, method=Image.Quantize.MEDIANCUT)
    gif_frames.append(p_im)

gif_path = os.path.join(public_dir, 'og-animated.gif')
gif_frames[0].save(
    gif_path,
    save_all=True,
    append_images=gif_frames[1:],
    duration=65,
    loop=0,
    optimize=True
)
print('Saved animated GIF:', gif_path, os.path.getsize(gif_path), 'bytes')
`;

  execSync(`python3 -c "${pyScript.replace(/\n/g, ' ')}"`, { stdio: 'inherit' });
  console.log('Done generating animated OpenGraph assets!');
}

main().catch(err => {
  console.error('Error generating OG animation:', err);
  process.exit(1);
});
