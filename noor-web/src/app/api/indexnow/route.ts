import { NextResponse } from 'next/server';

const INDEXNOW_KEY = '41192c07eace4062b21bc95faf05ff6a';
const HOST = 'www.nooreilahi.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const URLS = [
  'https://www.nooreilahi.com',
  'https://www.nooreilahi.com/prayer-times',
  'https://www.nooreilahi.com/quran',
  'https://www.nooreilahi.com/ziyarat',
  'https://www.nooreilahi.com/duas',
  'https://www.nooreilahi.com/qibla',
  'https://www.nooreilahi.com/calendar',
  'https://www.nooreilahi.com/media',
  'https://www.nooreilahi.com/app-preview',
  'https://www.nooreilahi.com/guides',
  'https://www.nooreilahi.com/zakat',
  'https://www.nooreilahi.com/hajj-umrah',
  'https://www.nooreilahi.com/nikah',
  'https://www.nooreilahi.com/janazah',
  'https://www.nooreilahi.com/kids',
  'https://www.nooreilahi.com/travel',
  'https://www.nooreilahi.com/etiquette',
  'https://www.nooreilahi.com/watch',
  'https://www.nooreilahi.com/contact',
  'https://www.nooreilahi.com/search',
];

export async function POST(request: Request) {
  try {
    let customUrls: string[] = [];
    try {
      const body = await request.json();
      if (Array.isArray(body?.urls)) {
        customUrls = body.urls;
      }
    } catch {
      // Body is optional
    }

    const urlList = customUrls.length > 0 ? customUrls : URLS;

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    };

    // Ping Bing IndexNow endpoint
    const bingRes = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // Ping IndexNow main gateway
    const apiRes = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      submittedUrls: urlList.length,
      bingStatus: bingRes.status,
      indexNowStatus: apiRes.status,
      keyLocation: KEY_LOCATION,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Submission failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'IndexNow configured',
    host: HOST,
    keyLocation: KEY_LOCATION,
    keyFile: `https://${HOST}/${INDEXNOW_KEY}.txt`,
  });
}
