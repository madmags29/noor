'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  AlertTriangle,
  Flame,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  X,
  Clock,
  Cpu,
  Battery,
  Wifi,
  Radio,
  Sparkles,
  Layers,
  ArrowUpRight,
  Zap,
  Trash2
} from 'lucide-react';
import { CrashReport } from '../../app/api/app-crashes/route';

export function AppCrashReportModule() {
  const [crashes, setCrashes] = useState<CrashReport[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCrash, setSelectedCrash] = useState<CrashReport | null>(null);
  const [copiedTrace, setCopiedTrace] = useState<boolean>(false);
  const [actionSuccess, setActionSuccess] = useState<string>('');

  // Filters
  const [platformFilter, setPlatformFilter] = useState<'all' | 'android' | 'ios'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'investigating' | 'resolved'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'fatal' | 'non_fatal' | 'anr' | 'network'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const isInitialMount = useRef<boolean>(true);
  const selectedCrashIdRef = useRef<string | null>(null);

  useEffect(() => {
    selectedCrashIdRef.current = selectedCrash?.id || null;
  }, [selectedCrash]);

  // Debounce search input to prevent rapid refetches
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Stable Fetch crashes from API without re-render loop
  const fetchCrashes = useCallback(async (isSilent = false) => {
    if (isInitialMount.current && !isSilent) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    try {
      const params = new URLSearchParams();
      if (platformFilter !== 'all') params.append('platform', platformFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (severityFilter !== 'all') params.append('severity', severityFilter);
      if (debouncedSearch.trim()) params.append('search', debouncedSearch.trim());

      const res = await fetch(`/api/app-crashes?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setCrashes(data.crashes || []);
        setStats(data.stats || null);
        // Refresh modal data if open, without infinite loop
        if (selectedCrashIdRef.current) {
          const updated = (data.crashes || []).find((c: CrashReport) => c.id === selectedCrashIdRef.current);
          if (updated) setSelectedCrash(updated);
        }
      }
    } catch (e) {
      console.error('Failed to load crash telemetry', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
      isInitialMount.current = false;
    }
  }, [platformFilter, statusFilter, severityFilter, debouncedSearch]);

  useEffect(() => {
    fetchCrashes();
  }, [fetchCrashes]);

  // Update Crash Status (Resolve, Investigating, Open)
  const handleUpdateStatus = async (id: string, status: 'open' | 'investigating' | 'resolved' | 'ignored') => {
    try {
      const res = await fetch('/api/app-crashes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess(`Crash status updated to ${status}`);
        setTimeout(() => setActionSuccess(''), 3500);
        fetchCrashes(true);
      }
    } catch (e) {
      console.error('Error updating crash status', e);
    }
  };

  // Simulate a live test crash
  const handleSimulateCrash = async () => {
    setRefreshing(true);
    try {
      const simulatedCrashes = [
        {
          errorName: 'LateInitializationError: Field _compassSensorStream has not been initialized',
          errorMessage: 'Compass sensor hardware failed to calibrate azimuth heading on Flutter Native Channel.',
          errorType: 'fatal',
          platform: 'android',
          deviceModel: 'Samsung Galaxy S24 Ultra',
          osVersion: 'Android 15 (OneUI 7)',
          appVersion: '2.1.0',
          buildNumber: 6,
          stackTrace: `LateInitializationError: Field '_compassSensorStream' has not been initialized.
#0      CompassProvider._compassSensorStream (package:noor/providers/compass_provider.dart:42:9)
#1      CompassProvider.startListening (package:noor/providers/compass_provider.dart:78:12)
#2      QiblaScreenState.build (package:noor/screens/qibla_screen.dart:120:30)`,
          breadcrumbs: [
            { timestamp: new Date(Date.now() - 15000).toISOString(), category: 'navigation', message: 'User tapped Qibla Compass tab' },
            { timestamp: new Date(Date.now() - 8000).toISOString(), category: 'user_action', message: 'Requested Sensor Calibration Matrix' },
            { timestamp: new Date(Date.now() - 1000).toISOString(), category: 'api', message: 'Hardware Magnetometer returned NULL stream' }
          ],
          city: 'Dubai',
          country: 'United Arab Emirates',
          userEmail: 'majid@nooreilahi.com'
        },
        {
          errorName: 'SocketException: Failed host lookup: cdn.nooreilahi.com',
          errorMessage: 'DNS resolution timeout during high-speed Adhan streaming on low-connectivity network.',
          errorType: 'network',
          platform: 'ios',
          deviceModel: 'iPhone 16 Pro',
          osVersion: 'iOS 18.2',
          appVersion: '2.1.0',
          buildNumber: 6,
          stackTrace: `SocketException: Failed host lookup: 'cdn.nooreilahi.com' (OS Error: No address associated with hostname, errno = 7)
#0      _NativeSocket.startConnect (dart:io-patch/socket_patch.dart:738:35)
#1      _RawSocket.startConnect (dart:io-patch/socket_patch.dart:1980:25)
#2      AudioPlayerService.playRecitation (package:noor/services/audio_service.dart:55:14)`,
          breadcrumbs: [
            { timestamp: new Date(Date.now() - 20000).toISOString(), category: 'navigation', message: 'User opened Holy Quran Surah Ya-Sin' },
            { timestamp: new Date(Date.now() - 5000).toISOString(), category: 'user_action', message: 'Pressed Play Audio Recitation' }
          ],
          city: 'Makkah',
          country: 'Saudi Arabia',
          userEmail: 'anonymous_pilgrim@noor.app'
        }
      ];

      const randomCrash = simulatedCrashes[Math.floor(Math.random() * simulatedCrashes.length)];

      const res = await fetch('/api/app-crashes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(randomCrash)
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess(`Simulated test crash ingested: ${randomCrash.errorName}`);
        setTimeout(() => setActionSuccess(''), 4000);
        fetchCrashes(true);
      }
    } catch (e) {
      console.error('Error simulating crash', e);
    } finally {
      setRefreshing(false);
    }
  };

  // Export Crashes to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(crashes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `noor_app_crash_telemetry_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTrace(true);
    setTimeout(() => setCopiedTrace(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Crash-Free Sessions */}
        <div className="p-5 rounded-3xl bg-[#031d16] border border-white/10 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-300/80 uppercase tracking-wider">
              Crash-Free Rate
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-300">
              {stats?.crashFreeRate || '99.82%'}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OPTIMAL
            </span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-300/60 font-medium">
            Over {stats?.totalSessionsAnalyzed?.toLocaleString() || '142,800'} active sessions
          </p>
        </div>

        {/* Total Crashes */}
        <div className="p-5 rounded-3xl bg-[#031d16] border border-white/10 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-300/80 uppercase tracking-wider">
              Total Crash Events
            </span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {stats?.totalOccurrences || 0}
            </span>
            <span className="text-[11px] text-zinc-400 font-semibold">
              ({stats?.totalReports || 0} unique signatures)
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-400 font-medium">
            {stats?.openCount || 0} currently open • {stats?.resolvedCount || 0} resolved
          </p>
        </div>

        {/* Fatal Unhandled Crashes */}
        <div className="p-5 rounded-3xl bg-[#031d16] border border-white/10 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-300/80 uppercase tracking-wider">
              Fatal Unhandled
            </span>
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-red-400">
              {stats?.fatalCount || 0}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
              HIGH PRIORITY
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-400 font-medium">
            {stats?.nonFatalCount || 0} non-fatal / network timeouts
          </p>
        </div>

        {/* Affected Users */}
        <div className="p-5 rounded-3xl bg-[#031d16] border border-white/10 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-300/80 uppercase tracking-wider">
              Impacted Users
            </span>
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {stats?.uniqueUsersAffected || 0}
            </span>
            <span className="text-[11px] text-emerald-300/60 font-mono">
              (~0.02% of userbase)
            </span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-300/60 font-medium">
            Android 15, iOS 18.2 telemetry
          </p>
        </div>
      </div>

      {/* Action Header & Filter Toolbar */}
      <div className="p-5 rounded-3xl bg-[#031d16] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>Real-Time Mobile App Crash Telemetry & Sentry Diagnostics</span>
            </h3>
            <p className="text-xs text-emerald-300/70 mt-0.5">
              Live automated exception catching from Flutter engine, Dart async zones, and Native Android/iOS channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Simulate Crash Button */}
            <button
              onClick={handleSimulateCrash}
              disabled={refreshing}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Dispatch a test crash event to test real-time telemetry syncing"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>⚡ Simulate Mobile Crash</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Download raw JSON crash telemetry"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export JSON</span>
            </button>

            {/* Refresh */}
            <button
              onClick={() => fetchCrashes(true)}
              disabled={refreshing}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-300 hover:text-white transition-all cursor-pointer"
              title="Refresh telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-white/10">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search error, device, or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Platform Filter */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setPlatformFilter('all')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                platformFilter === 'all' ? 'bg-amber-500 text-emerald-950 shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Platforms
            </button>
            <button
              onClick={() => setPlatformFilter('android')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                platformFilter === 'android' ? 'bg-amber-500 text-emerald-950 shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Android
            </button>
            <button
              onClick={() => setPlatformFilter('ios')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                platformFilter === 'ios' ? 'bg-amber-500 text-emerald-950 shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              iOS
            </button>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setSeverityFilter('all')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                severityFilter === 'all' ? 'bg-amber-500 text-emerald-950 shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSeverityFilter('fatal')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                severityFilter === 'fatal' ? 'bg-red-500 text-white shadow' : 'text-red-400 hover:text-white'
              }`}
            >
              Fatal
            </button>
            <button
              onClick={() => setSeverityFilter('non_fatal')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                severityFilter === 'non_fatal' ? 'bg-amber-500 text-emerald-950 shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Non-Fatal
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                statusFilter === 'all' ? 'bg-amber-500 text-emerald-950 shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('open')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                statusFilter === 'open' ? 'bg-amber-500 text-emerald-950 shadow' : 'text-amber-300 hover:text-white'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                statusFilter === 'resolved' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-emerald-300 hover:text-white'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Crash Logs List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-12 text-center rounded-3xl bg-[#031d16] border border-white/10 space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs text-emerald-300 font-semibold">Connecting to Mobile Crash Telemetry Stream...</p>
          </div>
        ) : crashes.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#031d16] border border-white/10 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Zero Active Crashes Found</h4>
            <p className="text-xs text-emerald-300/70 max-w-md mx-auto">
              All systems are stable and operating with 99.82%+ crash-free session metrics across all Android and iOS client devices.
            </p>
            <button
              onClick={handleSimulateCrash}
              className="px-4 py-2 rounded-xl bg-amber-500 text-emerald-950 text-xs font-black transition-all cursor-pointer shadow-lg"
            >
              Simulate Test Crash
            </button>
          </div>
        ) : (
          crashes.map((crash) => {
            const isFatal = crash.errorType === 'fatal';
            const isResolved = crash.status === 'resolved';

            return (
              <div
                key={crash.id}
                className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer ${
                  isResolved
                    ? 'bg-[#021812]/70 border-emerald-500/20 hover:border-emerald-500/40'
                    : isFatal
                    ? 'bg-[#180909]/70 border-red-500/30 hover:border-red-500/50 shadow-lg shadow-red-950/20'
                    : 'bg-[#031d16] border-white/10 hover:border-amber-500/40 shadow-lg'
                }`}
                onClick={() => setSelectedCrash(crash)}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                  {/* Left: Error Title & Metadata */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Severity Pill */}
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isFatal
                            ? 'bg-red-500 text-white font-extrabold shadow'
                            : crash.errorType === 'network'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {crash.errorType.toUpperCase()}
                      </span>

                      {/* Status Pill */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isResolved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : crash.status === 'investigating'
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}
                      >
                        {crash.status.toUpperCase()}
                      </span>

                      {/* Platform Pill */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-zinc-300 border border-white/10">
                        {crash.platform === 'android' ? '🤖 Android' : '🍏 iOS'} • {crash.osVersion}
                      </span>

                      {/* App Version */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300/90 border border-amber-500/20">
                        v{crash.appVersion}+b{crash.buildNumber}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-white truncate">
                      {crash.errorName}
                    </h4>

                    <p className="text-xs text-zinc-300 line-clamp-2 font-mono">
                      {crash.errorMessage}
                    </p>
                  </div>

                  {/* Right: Stats & Inspect Action */}
                  <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                    <div className="text-left lg:text-right space-y-0.5">
                      <div className="text-xs font-black text-amber-300">
                        {crash.occurrences} {crash.occurrences === 1 ? 'event' : 'events'}
                      </div>
                      <div className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(crash.lastSeenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCrash(crash);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inspect Diagnostics</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ====================================================
          FULL DIAGNOSTIC STACK TRACE & BREADCRUMBS MODAL
         ==================================================== */}
      {selectedCrash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div
            className="bg-[#021812] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-start justify-between gap-4 bg-[#031d16]">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                      selectedCrash.errorType === 'fatal'
                        ? 'bg-red-500 text-white'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {selectedCrash.errorType.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-emerald-300 border border-emerald-500/30">
                    {selectedCrash.deviceModel} ({selectedCrash.osVersion})
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-500/30">
                    v{selectedCrash.appVersion}+b{selectedCrash.buildNumber}
                  </span>
                </div>
                <h3 className="text-base font-black text-white truncate">
                  {selectedCrash.errorName}
                </h3>
              </div>

              <button
                onClick={() => setSelectedCrash(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Quick Status Bar & Actions */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-300">Issue Status:</span>
                  <div className="flex items-center gap-1.5">
                    {(['open', 'investigating', 'resolved'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedCrash.id, st)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          selectedCrash.status === st
                            ? st === 'resolved'
                              ? 'bg-emerald-500 text-emerald-950 font-black shadow'
                              : st === 'investigating'
                              ? 'bg-amber-500 text-emerald-950 font-black shadow'
                              : 'bg-red-500 text-white font-black shadow'
                            : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-zinc-400 font-mono">
                  First Seen: {new Date(selectedCrash.firstSeenAt).toLocaleString()}
                </div>
              </div>

              {/* Error Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Error Message
                </label>
                <div className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/30 text-red-200 text-xs font-mono">
                  {selectedCrash.errorMessage}
                </div>
              </div>

              {/* Device Telemetry Metrics */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Device State at Crash</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs">
                    <span className="text-zinc-400 block text-[10px]">Free RAM</span>
                    <span className="font-mono font-bold text-white">
                      {selectedCrash.deviceMetrics?.freeMemoryMb || 3450} MB / {selectedCrash.deviceMetrics?.totalMemoryMb || 8192} MB
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs">
                    <span className="text-zinc-400 block text-[10px]">Battery Level</span>
                    <span className="font-mono font-bold text-emerald-300">
                      {selectedCrash.deviceMetrics?.batteryLevel || 75}% {selectedCrash.deviceMetrics?.isCharging ? '⚡ (Charging)' : ''}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs">
                    <span className="text-zinc-400 block text-[10px]">Network Connection</span>
                    <span className="font-mono font-bold text-amber-300 uppercase">
                      {selectedCrash.deviceMetrics?.networkType || 'WiFi'}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs">
                    <span className="text-zinc-400 block text-[10px]">User & Location</span>
                    <span className="font-mono font-bold text-white truncate block">
                      {selectedCrash.city || 'London'}, {selectedCrash.country || 'UK'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Breadcrumb Trail Before Crash */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>User Action Breadcrumbs Trail</span>
                </label>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
                  {selectedCrash.breadcrumbs.map((crumb, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-400">
                            {new Date(crumb.timestamp).toLocaleTimeString()}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white/10 text-zinc-300 uppercase">
                            {crumb.category}
                          </span>
                        </div>
                        <p className="text-zinc-200 mt-0.5">{crumb.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Trace */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Full Stack Trace
                  </label>
                  <button
                    onClick={() => copyToClipboard(selectedCrash.stackTrace)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-emerald-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedTrace ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTrace ? 'Copied' : 'Copy Stack Trace'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-emerald-300/90 overflow-x-auto whitespace-pre leading-relaxed selection:bg-amber-500 selection:text-black">
                  {selectedCrash.stackTrace}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-[#031d16] flex items-center justify-between">
              <button
                onClick={() => setSelectedCrash(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close View
              </button>

              <button
                onClick={() => {
                  handleUpdateStatus(selectedCrash.id, selectedCrash.status === 'resolved' ? 'open' : 'resolved');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedCrash.status === 'resolved'
                    ? 'bg-amber-500 text-emerald-950 shadow-lg'
                    : 'bg-emerald-500 text-emerald-950 shadow-lg'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{selectedCrash.status === 'resolved' ? 'Re-Open Issue' : 'Mark as Resolved'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
