import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Nav } from './nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Wilson Lim Setiawan',
    template: '%s | Wilson Lim Setiawan',
  },
  description: 'Building and sharing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="antialiased tracking-tight h-full">
        <div className="min-h-full flex flex-col px-5 py-6 md:p-8 bg-neutral-50 text-neutral-800">
          <Nav />
          <main className="max-w-[60ch] mx-auto w-full space-y-6 pt-8 stagger-children">
            {children}
          </main>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: 'twitter', url: 'https://x.com/WilsonLimSet' },
    { name: 'youtube', url: 'https://www.youtube.com/@wilsonlimset' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/wilsonlimsetiawan/' },
    { name: 'github', url: 'https://github.com/WilsonLimSet' },
  ];

  return (
    <footer className="mt-auto pt-8 max-w-[60ch] mx-auto w-full">
      <div className="border-t border-neutral-200 pt-6">
        <div className="flex justify-center space-x-4 md:space-x-6 tracking-tight">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 transition-all duration-[220ms] ease-out hover:-translate-y-0.5 text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
