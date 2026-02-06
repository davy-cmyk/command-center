import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const gateCookie = request.cookies.get('cc_gate');
  const isAuthenticated = gateCookie?.value === '1';

  return NextResponse.json({ authenticated: isAuthenticated });
}
