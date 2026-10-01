import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_SECRET =
  process.env.SUPER_ADMIN_JWT_SECRET || 'noor_super_admin_ultra_secure_secret_2026_majid_khan_786';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    const inputEmail = String(email || '').trim().toLowerCase();
    const inputPass = String(password || '').trim();

    if (!inputEmail || !inputPass) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 1. Infallible Master Credentials Check
    const validEmails = [
      'noor@nooreilahi.com',
      'mails365@gmail.com',
      'admin@nooreilahi.com',
      'salam@nooreilahi.com',
      'majid@nooreilahi.com',
    ];

    const isEmailMatched =
      validEmails.includes(inputEmail) ||
      inputEmail.includes('noor') ||
      inputEmail.includes('admin') ||
      inputEmail.includes('majid') ||
      inputEmail.includes('mails365');

    const isPassMatched =
      inputPass === 'Majid5426!@#' ||
      inputPass === 'Majid5426!@' ||
      inputPass.toLowerCase() === 'majid5426!@#' ||
      inputPass.toLowerCase() === 'majid5426!@' ||
      inputPass.startsWith('Majid5426');

    if (isEmailMatched && isPassMatched) {
      // Create cryptographically signed session token
      const issuedAt = Date.now();
      const expiresAt = issuedAt + 24 * 60 * 60 * 1000; // 24 hours
      const payload = JSON.stringify({ email: inputEmail, role: 'super_admin', issuedAt, expiresAt });
      const payloadB64 = Buffer.from(payload).toString('base64url');
      const signature = crypto
        .createHmac('sha256', ADMIN_SECRET)
        .update(payloadB64)
        .digest('base64url');
      const token = `${payloadB64}.${signature}`;

      const response = NextResponse.json({
        success: true,
        message: 'Super Admin credentials verified. Access granted.',
        token,
        user: {
          id: 'super-admin-01',
          email: inputEmail,
          name: 'Majid Khan (Owner)',
          role: 'super_admin',
          verified: true,
        },
      });

      response.cookies.set('noor_super_admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60,
        path: '/',
      });

      return response;
    }

    // If credentials do not match
    return NextResponse.json(
      {
        error: 'Authentication failed: Invalid Super Admin credentials.',
        remainingAttempts: 3,
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('Super Admin login error:', error);
    return NextResponse.json(
      { error: 'An unexpected security error occurred during authorization.' },
      { status: 500 }
    );
  }
}
