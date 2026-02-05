import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { checkCommandAuth } from '@/src/lib/command/auth';
import { getEvents } from '@/src/lib/command/events';
import { ReportsTable } from './components/ReportsTable';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ReportsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = params.key;
  
  const headersList = await headers();
  const headerKey = headersList.get('x-command-key');
  
  const auth = checkCommandAuth(key, headerKey || undefined);
  
  if (!auth.authorized) {
    redirect('/404');
  }

  const events = getEvents(50);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        <span className="text-sm text-gray-500">Last 50 events</span>
      </div>
      <ReportsTable events={events} />
    </div>
  );
}

export default function ReportsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ReportsContent {...props} />
    </Suspense>
  );
}
