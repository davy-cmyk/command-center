import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });

  // Clear the cc_gate cookie
  response.cookies.set({
    name: 'cc_gate',
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
