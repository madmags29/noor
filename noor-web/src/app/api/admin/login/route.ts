import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  verifySuperAdminCredentials,
  generateAdminSessionToken,
} from '../../../../lib/adminSecurity';

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    // 1. Check Rate Limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `High-Security Lockout: Too many failed login attempts. Please wait ${Math.ceil(
            rateLimit.lockoutRemainingSeconds / 60
          )} minutes before retrying.`,
          lockoutRemainingSeconds: rateLimit.lockoutRemainingSeconds,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 2. Validate Credentials
    const isValid = verifySuperAdminCredentials(email, password);

    if (!isValid) {
      const failed = recordFailedAttempt(ip);
      const isLocked = failed.remainingAttempts <= 0;

      return NextResponse.json(
        {
          error: isLocked
            ? `Security Alert: 5 consecutive failed attempts. Your IP has been temporarily locked out for 15 minutes.`
            : `Authentication failed: Invalid Super Admin credentials. (${failed.remainingAttempts} attempts remaining before temporary lockout).`,
          remainingAttempts: failed.remainingAttempts,
          lockoutRemainingSeconds: failed.lockoutRemainingSeconds,
        },
        { status: 401 }
      );
    }

    // 3. Successful Login — Reset rate limits and issue secure session
    resetRateLimit(ip);
    const token = generateAdminSessionToken(email.toLowerCase());

    const response = NextResponse.json({
      success: true,
      message: 'Super Admin credentials verified. Access granted.',
      token,
      user: {
        id: 'super-admin-01',
        email: 'noor@nooreilahi.com',
        name: 'Super Administrator',
        role: 'super_admin',
        verified: true,
      },
    });

    // 4. Set HttpOnly Secure Session Cookie
    response.cookies.set('noor_super_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60, // 2 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Super Admin login error:', error);
    return NextResponse.json(
      { error: 'An unexpected security error occurred during authorization.' },
      { status: 500 }
    );
  }
}
