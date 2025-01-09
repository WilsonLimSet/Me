import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
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
    <ViewTransitions>
      <html lang="en" className={`${inter.className} h-full`}>
        <body className="antialiased tracking-tight h-full">
          <div className="min-h-full flex flex-col p-8 bg-white text-gray-900">
            <main className="flex-1 max-w-[60ch] mx-auto w-full space-y-6 pt-0 md:pt-8">
              {children}
            </main>
            <Footer />
            <SpeedInsights />
            <Analytics />
          </div>
        </body>
      </html>
    </ViewTransitions>
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
    <footer className="mt-auto pt-8 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
