import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '2026-2027 Class 2A',
  description: '26-27 2A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK">
      <body className="bg-slate-900 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
