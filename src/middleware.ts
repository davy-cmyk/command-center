import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the cookie "cc_gate" is set to "1"
  const gateCookie = request.cookies.get('cc_gate');
  const isAuthenticated = gateCookie?.value === '1';

  if (!isAuthenticated) {
    // Redirect to root with next parameter
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/command/:path*'],
};
