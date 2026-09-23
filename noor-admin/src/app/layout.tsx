import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NOOR Admin — Global Islamic Content Management Dashboard',
  description: 'Executive CMS and platform management for the NOOR global Islamic digital ecosystem.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#031712] text-[#f3f4f6]">
        {children}
      </body>
    </html>
  );
}
