import { NextRequest, NextResponse } from 'next/server';
import { checkCommandAuth } from '@/src/lib/command/auth';
import { getAllData } from '@/src/lib/command/events';

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

  // Get limit parameter
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    const data = getAllData(limit);
    return NextResponse.json(data);
  } catch {
    // Never throw 500, return empty data with ok: false
    return NextResponse.json({
      events: [],
      stats: { reports24h: 0, reports7d: 0, limitedPercent: 0, avgComposeTime: 0, ok: false },
    });
  }
}
