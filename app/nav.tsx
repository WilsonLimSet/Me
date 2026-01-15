'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', url: '/' },
  { name: 'Work', url: '/work' },
  { name: 'Writing', url: '/writing' },
  { name: 'Links', url: '/favlinks' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="max-w-[60ch] mx-auto w-full">
      <div className="flex items-center gap-4 md:gap-6">
        {links.map((link) => {
          const isActive =
            link.url === '/'
              ? pathname === '/'
              : pathname.startsWith(link.url);

          return (
            <Link
              key={link.name}
              href={link.url}
              className={`text-sm transition-all duration-200 ease-out hover:-translate-y-0.5 ${
                isActive
                  ? 'text-neutral-900 font-medium'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
