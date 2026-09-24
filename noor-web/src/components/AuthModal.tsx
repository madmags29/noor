'use client';

// ============================================================
// NOOR Web — Official Google Authentication Modal
// Clean, Dedicated Google OAuth 2.0 Sign-In
// ============================================================

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, AlertCircle, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { saveCurrentUser } from '../lib/userDataService';

export interface AuthUser {
  name: string;
  email: string;
  picture?: string;
  provider?: 'google' | 'email';
  verified?: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

// Official Google SVG Logo
export const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGsiReady, setIsGsiReady] = useState(false);

  const GOOGLE_CLIENT_ID =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    '419653061982-6p0q94rb00qv96n2e8tjmemmfklaalo3.apps.googleusercontent.com';

  // Handle Google Identity Services Credential Response (JWT)
  const handleGoogleCredentialResponse = (response: any) => {
    try {
      setLoading(true);
      setError('');
      
      // Decode JWT payload
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const data = JSON.parse(jsonPayload);

      const user: AuthUser = {
        name: data.name || data.given_name || 'Google User',
        email: data.email,
        picture: data.picture,
        provider: 'google',
        verified: true,
      };

      // Persist in localStorage and update application state
      saveCurrentUser(user);
      onLoginSuccess(user);
      setLoading(false);
      onClose();
    } catch (err) {
      console.error('Failed to parse Google Credential:', err);
      setError('Google Sign In authentication failed. Please try again.');
      setLoading(false);
    }
  };

  // Load and initialize Google Identity Services SDK
  useEffect(() => {
    if (!isOpen) return;

    const setupGsi = () => {
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          setIsGsiReady(true);

          // Render into official container if available
          const btnEl = document.getElementById('google-official-button-container');
          if (btnEl) {
            btnEl.innerHTML = '';
            (window as any).google.accounts.id.renderButton(btnEl, {
              type: 'standard',
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
              shape: 'pill',
              width: 320,
              logo_alignment: 'left',
            });
          }
        } catch (e) {
          console.warn('Google GSI initialization notice:', e);
        }
      }
    };

    if (typeof window !== 'undefined') {
      if (!(window as any).google?.accounts?.id) {
        let script = document.getElementById('google-gsi-client') as HTMLScriptElement;
        if (!script) {
          script = document.createElement('script');
          script.id = 'google-gsi-client';
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;
          script.onload = setupGsi;
          document.body.appendChild(script);
        } else {
          script.onload = setupGsi;
        }
      } else {
        setupGsi();
      }
    }
  }, [isOpen]);

  // Direct trigger when user clicks the custom "Continue with Google" button
  const handleDirectGoogleLogin = () => {
    setError('');
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            // If One Tap is blocked or not displayed, use OAuth Token Client
            launchGoogleOAuthClient();
          } else {
            setLoading(false);
          }
        });
      } catch (err) {
        launchGoogleOAuthClient();
      }
    } else {
      launchGoogleOAuthClient();
    }
  };

  // Google OAuth 2.0 Token Client fallback
  const launchGoogleOAuthClient = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2) {
        const client = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const data = await res.json();
                const user: AuthUser = {
                  name: data.name || data.given_name || 'Google User',
                  email: data.email,
                  picture: data.picture,
                  provider: 'google',
                  verified: true,
                };
                saveCurrentUser(user);
                onLoginSuccess(user);
                setLoading(false);
                onClose();
              } catch (e) {
                setError('Failed to fetch Google profile. Please try again.');
                setLoading(false);
              }
            } else {
              setLoading(false);
            }
          },
        });
        client.requestAccessToken();
      } else {
        // Fallback popup if GSI script is blocked
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
          GOOGLE_CLIENT_ID
        )}&redirect_uri=${encodeURIComponent(
          window.location.origin
        )}&response_type=token&scope=email%20profile%20openid&prompt=select_account`;
        window.open(authUrl, 'GoogleSignIn', 'width=500,height=600');
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setError('Google Sign-In could not be opened. Please check pop-up blocker.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-[#031c15] border border-amber-500/30 rounded-3xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 shadow-2xl relative text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-emerald-400/80 hover:text-white p-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-3 shadow-xl shadow-amber-500/10 border border-white/20">
            <GoogleLogo className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">Sign in with Google</h3>
          <p className="text-xs text-emerald-200/80 mt-1.5 max-w-xs mx-auto leading-relaxed">
            Choose an account to continue to <span className="text-amber-300 font-bold">Noor-e-ilahi</span> and sync your personal Islamic dashboard.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Google OAuth 2.0 Secure Sign-In</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Primary Google Login Section */}
        <div className="space-y-3.5 my-2">
          {/* Official Google Identity Button Container */}
          <div
            id="google-official-button-container"
            className="flex justify-center w-full min-h-[44px] empty:hidden"
          />

          {/* Premium Fallback/Direct Google Button */}
          <button
            type="button"
            onClick={handleDirectGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-gray-100 text-gray-800 font-bold text-sm flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] cursor-pointer disabled:opacity-60"
          >
            <GoogleLogo className="w-5 h-5 shrink-0" />
            <span>{loading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Security & Sync Highlights */}
        <div className="mt-6 pt-5 border-t border-emerald-900/60 space-y-2 text-[11px] text-emerald-300/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Sync prayer tracking, bookmarks & recitation preferences</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Verified single sign-on with Google account safety</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Zero passwords stored — your credentials remain private</span>
          </div>
        </div>
      </div>
    </div>
  );
};
