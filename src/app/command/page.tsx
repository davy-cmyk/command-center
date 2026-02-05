import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { checkCommandAuth } from '@/src/lib/command/auth';
import { getAllData, getProviderStats } from '@/src/lib/command/events';
import { StatsCard } from './components/StatsCard';
import { ProviderTile } from './components/ProviderTile';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function OverviewContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = params.key;
  
  const headersList = await headers();
  const headerKey = headersList.get('x-command-key');
  
  const auth = checkCommandAuth(key, headerKey || undefined);
  
  if (!auth.authorized) {
    redirect('/404');
  }

  const { stats } = getAllData();
  const providers = getProviderStats();

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Reports (24h)"
            value={stats.reports24h}
            icon="📊"
          />
          <StatsCard
            title="Reports (7d)"
            value={stats.reports7d}
            icon="📈"
          />
          <StatsCard
            title="Limited %"
            value={`${stats.limitedPercent}%`}
            icon="⚠️"
            warning={stats.limitedPercent > 10}
          />
          <StatsCard
            title="Avg Compose Time"
            value={`${stats.avgComposeTime}ms`}
            icon="⏱️"
          />
        </div>
      </div>

      {/* Provider Tiles */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Provider Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {providers.map((provider) => (
            <ProviderTile
              key={provider.provider}
              name={provider.provider}
              successRate={provider.successRate}
              failures={provider.failures}
              lastFailure={provider.lastFailure}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CommandPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <OverviewContent {...props} />
    </Suspense>
  );
}
