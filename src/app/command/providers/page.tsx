import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { checkCommandAuth } from '@/src/lib/command/auth';
import { getProviderStats } from '@/src/lib/command/events';
import { ProviderDetailCard } from './components/ProviderDetailCard';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProvidersContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = params.key;
  
  const headersList = await headers();
  const headerKey = headersList.get('x-command-key');
  
  const auth = checkCommandAuth(key, headerKey || undefined);
  
  if (!auth.authorized) {
    redirect('/404');
  }

  const providers = getProviderStats();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Provider Statistics</h2>
      </div>
      <div className="space-y-4">
        {providers.map((provider) => (
          <ProviderDetailCard
            key={provider.provider}
            name={provider.provider}
            successRate={provider.successRate}
            failures={provider.failures}
            lastFailure={provider.lastFailure}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProvidersPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ProvidersContent {...props} />
    </Suspense>
  );
}
