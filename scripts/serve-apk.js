#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT_DIR = path.resolve(__dirname, '..');
const APK_NAME = 'noor-e-ilahi-release.apk';
const APK_PATH = path.join(ROOT_DIR, APK_NAME);
const AAB_NAME = 'noor-e-ilahi-release.aab';
const AAB_PATH = path.join(ROOT_DIR, AAB_NAME);

function serveFile(req, res, filePath, fileName, mimeType) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end(`File ${fileName} not found on server.`);
  }

  const stat = fs.statSync(filePath);
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    const chunksize = end - start + 1;
    const stream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    return stream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
    });
    return fs.createReadStream(filePath).pipe(res);
  }
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Direct APK download or alias
  if (urlPath === `/${APK_NAME}` || urlPath === '/noor-release.apk' || urlPath === '/noor-e-ilahi-v1.0.0+10.apk' || urlPath === '/download' || urlPath === '/apk') {
    return serveFile(req, res, path.join(ROOT_DIR, 'noor-e-ilahi-v1.0.0+10.apk'), 'noor-e-ilahi-v1.0.0+10.apk', 'application/vnd.android.package-archive');
  }

  // Direct AAB download or alias
  if (urlPath === `/${AAB_NAME}` || urlPath === '/noor-release.aab' || urlPath === '/noor-e-ilahi-v1.0.0+10.aab' || urlPath === '/aab' || urlPath === '/download-aab') {
    return serveFile(req, res, path.join(ROOT_DIR, 'noor-e-ilahi-v1.0.0+10.aab'), 'noor-e-ilahi-v1.0.0+10.aab', 'application/octet-stream');
  }

  // Beautiful mobile-friendly download page
  let apkSizeMb = 'Pending';
  if (fs.existsSync(APK_PATH)) {
    apkSizeMb = (fs.statSync(APK_PATH).size / (1024 * 1024)).toFixed(1) + ' MB';
  }
  let aabSizeMb = 'Pending';
  if (fs.existsSync(AAB_PATH)) {
    aabSizeMb = (fs.statSync(AAB_PATH).size / (1024 * 1024)).toFixed(1) + ' MB';
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download Noor-e-ilahi APK</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #02120d;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      text-align: center;
    }
    .card {
      background: #04241b;
      border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 28px;
      padding: 36px 24px;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    }
    .badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #f59e0b;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 6px 14px;
      border-radius: 20px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 26px;
      font-weight: 900;
      margin-bottom: 8px;
      color: #ffffff;
    }
    p {
      color: #a7f3d0;
      font-size: 13.5px;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #f59e0b;
      color: #02120d;
      font-size: 16px;
      font-weight: 900;
      text-decoration: none;
      padding: 16px 28px;
      border-radius: 18px;
      width: 100%;
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.35);
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .btn:active {
      transform: scale(0.98);
      background: #d97706;
    }
    .details {
      margin-top: 20px;
      padding-top: 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 12px;
      color: #6ee7b7;
      display: flex;
      justify-content: space-between;
    }
    .instructions {
      margin-top: 24px;
      text-align: left;
      background: rgba(0, 0, 0, 0.3);
      padding: 16px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 12px;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .instructions strong { color: #f59e0b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Signed Release Build</div>
    <h1>Noor-e-ilahi</h1>
    <p>Daily Islamic App • Pixabay Media Gallery • Live Prayer Times • Noble Quran</p>

    <a href="/${APK_NAME}" class="btn" download="${APK_NAME}">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Download APK (${apkSizeMb})
    </a>

    <div style="height: 12px;"></div>

    <a href="/${AAB_NAME}" class="btn" download="${AAB_NAME}" style="background: #059669; color: #ffffff; box-shadow: 0 10px 25px rgba(5, 150, 105, 0.35);">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
      Download App Bundle (.AAB - ${aabSizeMb})
    </a>

    <div class="details">
      <span>Version: 1.0.0+10 (Closed Testing Release)</span>
      <span>APK: ${apkSizeMb}</span>
      <span>AAB: ${aabSizeMb}</span>
    </div>

    <div class="instructions">
      <strong>Installation & Deployment:</strong><br>
      • <strong>APK:</strong> Tap "Download APK" above to install directly on any Android device.<br>
      • <strong>AAB:</strong> Tap "Download App Bundle (.AAB)" for Google Play Console publishing.
    </div>
  </div>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Direct APK download: http://192.168.3.45:${PORT}/${APK_NAME}`);
});
