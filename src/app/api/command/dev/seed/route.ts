import { NextRequest, NextResponse } from 'next/server';
import { checkCommandAuth } from '@/src/lib/command/auth';
import { seedSampleEvents } from '@/src/lib/command/events';

export async function POST(request: NextRequest) {
  // Only allow in non-production environments
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

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
    const count = parseInt(searchParams.get('count') || '50', 10);
    const events = seedSampleEvents(Math.min(count, 100));
    
    return NextResponse.json({
      success: true,
      count: events.length,
      message: `Seeded ${events.length} sample events`,
    });
  } catch {
    // Never throw 500
    return NextResponse.json({
      success: false,
      count: 0,
      message: 'Failed to seed events',
    }, { status: 200 });
  }
}
