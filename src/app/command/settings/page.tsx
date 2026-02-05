import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { checkCommandAuth, getKeyStatus } from '@/src/lib/command/auth';
import { SettingsCard } from './components/SettingsCard';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function SettingsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = params.key;
  
  const headersList = await headers();
  const headerKey = headersList.get('x-command-key');
  
  const auth = checkCommandAuth(key, headerKey || undefined);
  
  if (!auth.authorized) {
    redirect('/404');
  }

  const keyStatus = getKeyStatus();

  const settings = [
    {
      name: 'NODE_ENV',
      value: process.env.NODE_ENV || 'unknown',
      description: 'Current environment mode',
    },
    {
      name: 'COMMAND_CENTER_KEY',
      value: keyStatus.configured ? `Configured (${keyStatus.hint})` : 'Not set',
      description: 'Access key for command center',
      status: keyStatus.configured ? ('success' as const) : ('error' as const),
    },
    {
      name: 'DEBUG_ALLOWED',
      value: process.env.DEBUG_ALLOWED || 'false',
      description: 'Debug mode enabled',
    },
    {
      name: 'CONTRACT_STRICT_MODE',
      value: process.env.CONTRACT_STRICT_MODE || 'false',
      description: 'Contract validation strict mode',
    },
    {
      name: 'CANONICAL_CONTRACT_VERSION',
      value: process.env.CANONICAL_CONTRACT_VERSION || 'not set',
      description: 'Contract version',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      </div>
      <div className="grid gap-4">
        {settings.map((setting) => (
          <SettingsCard
            key={setting.name}
            name={setting.name}
            value={setting.value}
            description={setting.description}
            status={setting.status}
          />
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <SettingsContent {...props} />
    </Suspense>
  );
}
