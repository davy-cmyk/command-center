import { NextRequest, NextResponse } from 'next/server';
import { checkCommandAuth } from '@/src/lib/command/auth';
import { getProviderStats } from '@/src/lib/command/events';

export async function GET(request: NextRequest) {
  // Check auth via query param or header
  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get('key') || undefined;
  const headerKey = request.headers.get('x-command-key') || undefined;

  const auth = checkCommandAuth(queryKey, headerKey);

  if (!auth.authorized) {
    // Return 404 (not 401) as specified
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const providers = getProviderStats();
    return NextResponse.json({ providers });
  } catch {
    // Never throw 500, return empty array with ok: false
    return NextResponse.json({ providers: [], ok: false });
  }
}
