import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken } from '../../../../lib/adminSecurity';

export async function GET(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('noor_super_admin_session')?.value;
    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    const token = cookieToken || bearerToken;
    const verification = verifyAdminSessionToken(token);

    if (!verification.valid) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: 'super-admin-01',
        email: verification.email || 'noor@nooreilahi.com',
        name: 'Super Administrator',
        role: 'super_admin',
        expiresAt: verification.expiresAt,
      },
    });
  } catch (error) {
    console.error('Super Admin verify error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
