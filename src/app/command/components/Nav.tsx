'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const navItems = [
  { href: '/command', label: 'Overview' },
  { href: '/command/reports', label: 'Reports' },
  { href: '/command/providers', label: 'Providers' },
  { href: '/command/settings', label: 'Settings' },
];

export function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const keyParam = searchParams.get('key');

  const getHref = (path: string) => {
    return keyParam ? `${path}?key=${encodeURIComponent(keyParam)}` : path;
  };

  const isActive = (href: string) => {
    if (href === '/command') {
      return pathname === '/command';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={getHref(item.href)}
              className={`py-4 px-1 border-b-2 text-sm font-medium ${
                isActive(item.href)
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
