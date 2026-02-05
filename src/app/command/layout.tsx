import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Nav } from './components/Nav';

export const metadata: Metadata = {
  title: 'Command Center',
  description: 'Internal Dashboard',
};

export default function CommandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">⚡ Command Center</h1>
            </div>
            <div className="text-sm text-slate-400">
              Internal Dashboard
            </div>
          </div>
        </div>
      </header>
      <Suspense fallback={<div className="bg-white border-b border-gray-200 h-14" />}>
        <Nav />
      </Suspense>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
