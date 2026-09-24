// ============================================================
// NOOR Web — Super Admin Executive Security & Cryptography Engine
// High-grade server-side security, rate-limiting, timing-safe checks
// ============================================================

import crypto from 'crypto';

export const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'noor@nooreilahi.com';
export const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || 'Majid5426!@#';
const ADMIN_SECRET =
  process.env.SUPER_ADMIN_JWT_SECRET || 'noor_super_admin_ultra_secure_secret_2026_majid_khan_786';

const SESSION_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

interface RateLimitRecord {
  attempts: number;
  firstAttempt: number;
  lockedUntil: number | null;
}

// In-memory sliding window for rate-limiting
const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Check if the client IP / identifier is currently rate limited
 */
export function checkRateLimit(clientId: string): {
  allowed: boolean;
  remainingAttempts: number;
  lockoutRemainingSeconds: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(clientId);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_FAILED_ATTEMPTS, lockoutRemainingSeconds: 0 };
  }

  // Check if actively locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      lockoutRemainingSeconds: remainingSeconds,
    };
  }

  // If lockout window passed, reset
  if (now - record.firstAttempt > LOCKOUT_WINDOW_MS) {
    rateLimitMap.delete(clientId);
    return { allowed: true, remainingAttempts: MAX_FAILED_ATTEMPTS, lockoutRemainingSeconds: 0 };
  }

  const remaining = Math.max(0, MAX_FAILED_ATTEMPTS - record.attempts);
  return { allowed: remaining > 0, remainingAttempts: remaining, lockoutRemainingSeconds: 0 };
}

/**
 * Register a failed attempt
 */
export function recordFailedAttempt(clientId: string): {
  remainingAttempts: number;
  lockoutRemainingSeconds: number;
} {
  const now = Date.now();
  let record = rateLimitMap.get(clientId);

  if (!record || now - record.firstAttempt > LOCKOUT_WINDOW_MS) {
    record = {
      attempts: 1,
      firstAttempt: now,
      lockedUntil: null,
    };
  } else {
    record.attempts += 1;
  }

  if (record.attempts >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_WINDOW_MS;
    rateLimitMap.set(clientId, record);
    return {
      remainingAttempts: 0,
      lockoutRemainingSeconds: Math.ceil(LOCKOUT_WINDOW_MS / 1000),
    };
  }

  rateLimitMap.set(clientId, record);
  return {
    remainingAttempts: MAX_FAILED_ATTEMPTS - record.attempts,
    lockoutRemainingSeconds: 0,
  };
}

/**
 * Reset rate limit upon successful authentication
 */
export function resetRateLimit(clientId: string): void {
  rateLimitMap.delete(clientId);
}

/**
 * Timing-safe string comparison to protect against side-channel timing attacks
 */
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Constant time dummy comparison
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Validate Super Admin Credentials
 */
export function verifySuperAdminCredentials(emailInput: string, passwordInput: string): boolean {
  if (!emailInput || !passwordInput) return false;
  const normalizedEmail = emailInput.trim().toLowerCase();
  const targetEmail = SUPER_ADMIN_EMAIL.toLowerCase();

  const isEmailValid = safeCompare(normalizedEmail, targetEmail);
  const isPasswordValid = safeCompare(passwordInput.trim(), SUPER_ADMIN_PASSWORD);

  return isEmailValid && isPasswordValid;
}

/**
 * Create a cryptographically signed Super Admin session token
 */
export function generateAdminSessionToken(email: string): string {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_EXPIRY_MS;
  const payload = JSON.stringify({ email, role: 'super_admin', issuedAt, expiresAt });
  const payloadB64 = Buffer.from(payload).toString('base64url');

  const signature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify a Super Admin session token
 */
export function verifyAdminSessionToken(token: string | null | undefined): {
  valid: boolean;
  email?: string;
  expiresAt?: number;
} {
  if (!token || !token.includes('.')) {
    return { valid: false };
  }

  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) {
    return { valid: false };
  }

  const expectedSig = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(payloadB64)
    .digest('base64url');

  if (!safeCompare(signature, expectedSig)) {
    return { valid: false };
  }

  try {
    const jsonStr = Buffer.from(payloadB64, 'base64url').toString('utf-8');
    const data = JSON.parse(jsonStr);

    if (data.role !== 'super_admin') return { valid: false };
    if (Date.now() > data.expiresAt) return { valid: false };

    return { valid: true, email: data.email, expiresAt: data.expiresAt };
  } catch {
    return { valid: false };
  }
}
