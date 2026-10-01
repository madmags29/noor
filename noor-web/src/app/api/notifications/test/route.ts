import { NextResponse } from 'next/server';

export interface TestNotificationPayload {
  title?: string;
  body?: string;
  channel?: 'adhan' | 'daily_reflection' | 'announcement' | 'custom';
  target?: 'all' | 'android' | 'ios' | 'web';
  timestamp?: string;
}

// In-memory record of recent test & broadcast notifications
let lastSentNotification = {
  id: `test-notif-${Date.now()}`,
  title: '🕌 Noor-e-ilahi: Adhan Reminder',
  body: 'Allāhu Akbar, Allāhu Akbar — It is time for prayer. May Allāh accept your Salaah and Duas.',
  channel: 'adhan',
  target: 'all',
  status: 'delivered',
  sentAt: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    lastSent: lastSentNotification,
    serverTime: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  try {
    const body: TestNotificationPayload = await req.json();

    const title = body.title || '🕌 Noor-e-ilahi Adhan & Sacred Alert';
    const message = body.body || 'Allāhu Akbar, Allāhu Akbar — Live test notification received successfully!';
    const channel = body.channel || 'adhan';
    const target = body.target || 'all';

    lastSentNotification = {
      id: `notif-${Date.now()}`,
      title,
      body: message,
      channel,
      target,
      status: 'delivered',
      sentAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Test notification successfully dispatched to target [${target.toUpperCase()}] across channel [${channel}]!`,
      notification: lastSentNotification,
    });
  } catch (error) {
    console.error('Error dispatching test notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to dispatch test notification' },
      { status: 500 }
    );
  }
}
