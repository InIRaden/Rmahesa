import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { type ReactNode } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { getSettings } from '@/lib/content';

const uiFont = Manrope({ subsets: ['latin'], variable: '--font-ui' });
const serifFont = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600', '700'] });

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings.seoTitle ?? settings.siteTitle,
    description: settings.seoDescription ?? settings.siteDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')
  };
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${uiFont.variable} ${serifFont.variable} bg-paper font-sans text-ink antialiased transition-colors dark:bg-[#0f0f10] dark:text-[#f4efe8]`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
