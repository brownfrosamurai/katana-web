import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/ui/SkipLink';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'
  ),
  title: {
    default: 'Katana | Personal Portfolio',
    template: '%s | Katana',
  },
  description: 'Personal portfolio showcasing projects, blog posts, and more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Katana',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} bg-background font-mono text-foreground antialiased`}>
        <Providers>
          <SkipLink />
          <div className="flex min-h-[100dvh] min-w-0 flex-col">
            <Header />
            <div className="min-w-0 flex-1 overflow-x-clip pt-20">
              <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
