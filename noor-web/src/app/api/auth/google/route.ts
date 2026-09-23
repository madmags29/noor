import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// NOOR Web — Google OAuth Verification Endpoint
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        { error: 'Google credential token is required' },
        { status: 400 }
      );
    }

    // Verify token with Google's tokeninfo endpoint
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: 'Invalid Google credential token', details: err },
        { status: 401 }
      );
    }

    const payload = await response.json();

    const user = {
      name: payload.name || payload.given_name || 'Google User',
      email: payload.email,
      picture: payload.picture,
      verified: payload.email_verified === 'true' || payload.email_verified === true,
      provider: 'google',
    };

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('Google Auth Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error verifying Google token' },
      { status: 500 }
    );
  }
}
