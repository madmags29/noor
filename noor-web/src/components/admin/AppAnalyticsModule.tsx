'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  Smartphone,
  Globe2,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Clock,
  Compass,
  Volume2,
  BookOpen,
  Heart,
  Sparkles,
  Search,
  Filter,
  Flame,
  MousePointerClick,
  MapPin,
  CheckCircle2,
  Radio,
  Zap
} from 'lucide-react';
import { AnalyticsEvent } from '../../app/api/analytics/route';

interface AnalyticsSummary {
  totalEvents: number;
  activeToday: number;
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  retentionRate: string;
  avgSessionDuration: string;
  platformCounts: Record<string, number>;
  eventTypeCounts: Record<string, number>;
  topScreens: { screen: string; count: number }[];
  topLocations: { location: string; count: number }[];
  recentEvents: AnalyticsEvent[];
}

export const AppAnalyticsModule: React.FC = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterPlatform, setFilterPlatform] = useState<'all' | 'android' | 'ios' | 'web'>('all');
  const [filterEvent, setFilterEvent] = useState<string>('all');
  const [isLivePolling, setIsLivePolling] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      if (data.success && data.summary) {
        setSummary(data.summary);
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    if (!isLivePolling) return;
    const interval = setInterval(fetchAnalytics, 15000); // 15s live refresh
    return () => clearInterval(interval);
  }, [isLivePolling]);

  if (loading || !summary) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-emerald-300/80">Aggregating Global Mobile App Analytics...</span>
      </div>
    );
  }

  const filteredEvents = summary.recentEvents.filter((ev) => {
    if (filterPlatform !== 'all' && ev.platform !== filterPlatform) return false;
    if (filterEvent !== 'all' && ev.eventType !== filterEvent) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#031d16] p-5 rounded-3xl border border-emerald-500/20 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-emerald-950 flex items-center justify-center shadow-lg font-black">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-tight">Real-Time Mobile Behavior & Telemetry</h2>
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Feed</span>
              </span>
            </div>
            <p className="text-xs text-emerald-300/70">
              Real-time user journeys, popular Surahs, shrine visits, prayer alarms, and session engagement metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLivePolling(!isLivePolling)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isLivePolling
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                : 'bg-white/5 text-zinc-400 border-white/10'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isLivePolling ? 'animate-pulse text-emerald-400' : ''}`} />
            <span>{isLivePolling ? 'Live Sync Active' : 'Sync Paused'}</span>
          </button>

          <button
            onClick={fetchAnalytics}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-[#021812] border border-white/10 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-300/70 font-semibold">
            <span>Daily Active Users (DAU)</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{summary.dailyActiveUsers.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.8% vs last week
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-[#021812] border border-white/10 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-300/70 font-semibold">
            <span>Monthly Active Users (MAU)</span>
            <Globe2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{summary.monthlyActiveUsers.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +28.4% monthly growth
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-[#021812] border border-white/10 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-300/70 font-semibold">
            <span>Day-7 Retention Rate</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{summary.retentionRate}</div>
          <span className="text-[10px] text-amber-300 font-semibold">
            Top tier spiritual app benchmark
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-[#021812] border border-white/10 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-300/70 font-semibold">
            <span>Avg Session Duration</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white">{summary.avgSessionDuration}</div>
          <span className="text-[10px] text-zinc-400">
            Across Quran & Prayer tracking
          </span>
        </div>
      </div>

      {/* Grid: Screen Popularity & Geographic Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Top Active Screens & Features */}
        <div className="lg:col-span-6 bg-[#021812] p-5 rounded-3xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>Most Visited App Features & Screens</span>
            </h3>
            <span className="text-[10px] text-emerald-300/70 font-mono">Real-time Ranking</span>
          </div>

          <div className="space-y-2">
            {summary.topScreens.map(({ screen, count }, idx) => {
              const maxCount = summary.topScreens[0]?.count || 1;
              const pct = Math.round((count / maxCount) * 100);
              return (
                <div key={screen} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium capitalize flex items-center gap-1.5">
                      <span className="w-4 text-[10px] text-amber-400 font-mono">#{idx + 1}</span>
                      <span>{screen.replace(/_/g, ' ')}</span>
                    </span>
                    <span className="text-emerald-300 font-mono text-[11px] font-bold">{count} visits</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 6 Cols: Geographic Distribution & Platforms */}
        <div className="lg:col-span-6 bg-[#021812] p-5 rounded-3xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>Top User Cities & Regions</span>
            </h3>
            <span className="text-[10px] text-emerald-300/70 font-mono">GPS + IP Geo</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {summary.topLocations.map(({ location, count }) => (
              <div key={location} className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate text-white text-[11px]">{location}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* Platform Distribution Row */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200">
            <span className="font-bold text-white">Platform Breakdown:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px]">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Android: <strong>{summary.platformCounts.android || 0}</strong></span>
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>iOS: <strong>{summary.platformCounts.ios || 0}</strong></span>
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <Globe2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Web: <strong>{summary.platformCounts.web || 0}</strong></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time User Behavior Live Event Feed */}
      <div className="bg-[#021812] p-5 sm:p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Live Ingested User Behavior Stream</span>
            </h3>
            <p className="text-[11px] text-emerald-300/70">
              Showing real-time events triggered by app users in active sessions.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value as any)}
              className="px-2.5 py-1 rounded-xl bg-black/40 border border-white/15 text-white text-[11px] outline-none"
            >
              <option value="all">All Platforms</option>
              <option value="android">Android App</option>
              <option value="ios">iOS App</option>
              <option value="web">Web Browser</option>
            </select>

            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-black/40 border border-white/15 text-white text-[11px] outline-none"
            >
              <option value="all">All Events</option>
              <option value="quran_recite">Quran Recitations</option>
              <option value="prayer_alarm">Prayer Alarms</option>
              <option value="ziyarat_view">Ziyarat Visits</option>
              <option value="ai_query">AI Questions</option>
              <option value="app_launch">App Launches</option>
            </select>
          </div>
        </div>

        {/* Events Table / List */}
        <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                  ev.eventType === 'quran_recite' ? 'bg-amber-400/20 text-amber-300' :
                  ev.eventType === 'prayer_alarm' ? 'bg-emerald-400/20 text-emerald-300' :
                  ev.eventType === 'ziyarat_view' ? 'bg-teal-400/20 text-teal-300' :
                  ev.eventType === 'ai_query' ? 'bg-purple-400/20 text-purple-300' :
                  'bg-white/10 text-white'
                }`}>
                  {ev.eventType === 'quran_recite' ? '📖' :
                   ev.eventType === 'prayer_alarm' ? '🕌' :
                   ev.eventType === 'ziyarat_view' ? '🏛️' :
                   ev.eventType === 'ai_query' ? '✨' : '📱'}
                </span>

                <div className="min-w-0">
                  <div className="text-white font-bold truncate flex items-center gap-1.5">
                    <span>{ev.featureName || ev.screen}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-emerald-300 font-mono">
                      {ev.eventType}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 truncate flex items-center gap-2 mt-0.5">
                    <span>📍 {ev.city}, {ev.country}</span>
                    <span>•</span>
                    <span className="capitalize">{ev.platform} {ev.appVersion ? `v${ev.appVersion}` : ''}</span>
                    {ev.userEmail && (
                      <>
                        <span>•</span>
                        <span className="text-amber-300/80">{ev.userEmail}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-400">
              No events match the selected platform and event filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
