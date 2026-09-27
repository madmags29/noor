'use client';

// ============================================================
// NOOR Web — Real-Time Telemetry Client Broadcaster
// Broadcasts anonymous page-view and session events to Super Admin
// via local BroadcastChannel and Storage events (100% offline-ready & instant)
// ============================================================

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TelemetryClient() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Do not broadcast telemetry from super-admin itself to prevent echo loops
    if (pathname?.startsWith('/super-admin')) return;

    const device = window.innerWidth < 640 ? 'Mobile Smartphone' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop Browser';
    const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
    const os = /iPhone/.test(navigator.userAgent) ? 'iOS' : /Android/.test(navigator.userAgent) ? 'Android' : isApple ? 'macOS' : 'Windows';

    const eventPayload = {
      type: 'PILGRIM_ACTIVITY',
      id: 'sess_' + Math.floor(1000 + Math.random() * 9000),
      page: pathname || '/',
      device,
      os,
      browser: /Chrome/.test(navigator.userAgent) ? 'Chrome' : /Safari/.test(navigator.userAgent) ? 'Safari' : 'Browser',
      timestamp: Date.now(),
      event: `Navigated to ${pathname === '/' ? 'Ecosystem Home' : pathname}`,
    };

    try {
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('noor_live_telemetry');
        channel.postMessage(eventPayload);
        channel.close();
      }
      localStorage.setItem('noor_active_telemetry_event', JSON.stringify(eventPayload));
    } catch {
      // safe fallback
    }
  }, [pathname]);

  return null;
}
