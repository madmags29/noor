// NOOR Audio Manager: Web Audio Synthesizer & Quran Recitation Streamer

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.currentAudio = null;
    this.isPlaying = false;
    this.currentTrack = null;
    this.listeners = [];
  }

  getAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  // Play subtle realistic tactile click for Tasbih bead
  playTasbihClick() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.warn('Audio click not available', e);
    }
  }

  // Play a spiritual serene chime for Azan preview / notification
  playSereneChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const freqs = [440, 554.37, 659.25]; // A major serene chord
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 1.8);
      });
    } catch (e) {
      console.warn('Chime audio error', e);
    }
  }

  // Play real Quran recitation audio stream (EveryAyah CDN / Alafasy recitation)
  playQuranAyah(surah = 1, ayah = 1, reciter = 'Alafasy') {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }

    // Format Surah and Ayah with 3 digits e.g. 001001.mp3
    const sStr = String(surah).padStart(3, '0');
    const aStr = String(ayah).padStart(3, '0');
    const url = `https://everyayah.com/data/Alafasy_128kbps/${sStr}${aStr}.mp3`;

    this.currentTrack = {
      title: `Surah ${surah}, Ayah ${ayah}`,
      artist: `Reciter: Mishary Rashid Alafasy`,
      url
    };

    const audio = new Audio(url);
    this.currentAudio = audio;
    this.isPlaying = true;
    this.notify();

    audio.play().catch(() => {
      // Fallback to serene chime if offline or blocked
      this.playSereneChime();
    });

    audio.onended = () => {
      this.isPlaying = false;
      this.notify();
    };
  }

  togglePlayPause() {
    if (!this.currentAudio) return;
    if (this.isPlaying) {
      this.currentAudio.pause();
      this.isPlaying = false;
    } else {
      this.currentAudio.play();
      this.isPlaying = true;
    }
    this.notify();
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.isPlaying = false;
    this.currentTrack = null;
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb({
      isPlaying: this.isPlaying,
      track: this.currentTrack
    }));
  }
}

export const audioManager = new AudioManager();
