import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

// Dynamic Icon Generator for Noor-e-ilahi
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #059669 0%, #064e3b 60%, #022c22 100%)',
          borderRadius: '16px',
          border: '2px solid rgba(253, 230, 138, 0.5)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          position: 'relative',
        }}
      >
        {/* Sacred Crescent Moon & Star (Hilal & Rub el Hizb) */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Golden Crescent Moon */}
          <path
            d="M 34.61 15.8 A 17.5 17.5 0 1 0 34.61 48.2 A 16.5 16.5 0 0 1 34.61 15.8 Z"
            fill="url(#goldGrad)"
          />

          {/* 8-Pointed Star in Cradle */}
          <g transform="translate(35, 32)">
            <rect
              x="-5"
              y="-5"
              width="10"
              height="10"
              rx="1.5"
              fill="#FDE68A"
            />
            <rect
              x="-5"
              y="-5"
              width="10"
              height="10"
              rx="1.5"
              transform="rotate(45)"
              fill="#F59E0B"
            />
            <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
