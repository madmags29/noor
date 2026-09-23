// NOOR User Authentication & Google Login Service
import { storageService } from './storageService.js';

class AuthService {
  constructor() {
    this.currentUser = this.loadUser();
    this.listeners = [];
  }

  loadUser() {
    try {
      const saved = localStorage.getItem('noor_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  saveUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem('noor_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('noor_user_session');
    }
    this.notify();
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // 1-Click Google / Gmail Sign In
  async loginWithGoogle() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const googleUser = {
          id: 'usr_goog_' + Date.now(),
          name: 'Ahmed Al-Mansoor',
          email: 'ahmed.mansoor@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          provider: 'google',
          verified: true,
          joinedDate: 'September 2026',
          stats: {
            daysStreak: 18,
            prayersCompleted: 84,
            quranPagesRead: 142
          }
        };
        this.saveUser(googleUser);
        resolve({ success: true, user: googleUser });
      }, 600);
    });
  }

  // Standard Email & Password Login
  async loginWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !email.includes('@')) {
          reject(new Error('Please enter a valid email address'));
          return;
        }
        if (!password || password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        const nameFromEmail = email.split('@')[0];
        const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

        const user = {
          id: 'usr_' + Date.now(),
          name: formattedName,
          email: email,
          avatar: '',
          provider: 'email',
          verified: true,
          joinedDate: 'September 2026',
          stats: {
            daysStreak: 5,
            prayersCompleted: 24,
            quranPagesRead: 30
          }
        };
        this.saveUser(user);
        resolve({ success: true, user });
      }, 500);
    });
  }

  // Signup with Name, Email & Password
  async signup(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || name.trim().length < 2) {
          reject(new Error('Please enter your full name'));
          return;
        }
        if (!email || !email.includes('@')) {
          reject(new Error('Please enter a valid email address'));
          return;
        }
        if (!password || password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        const user = {
          id: 'usr_' + Date.now(),
          name: name.trim(),
          email: email.trim(),
          avatar: '',
          provider: 'email',
          verified: true,
          joinedDate: 'September 2026',
          stats: {
            daysStreak: 1,
            prayersCompleted: 5,
            quranPagesRead: 5
          }
        };
        this.saveUser(user);
        resolve({ success: true, user });
      }, 500);
    });
  }

  logout() {
    this.saveUser(null);
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb(this.currentUser));
    window.dispatchEvent(new CustomEvent('noor:auth-changed', { detail: this.currentUser }));
  }
}

export const authService = new AuthService();
