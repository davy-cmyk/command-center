import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const expectedPassword = process.env.COMMAND_CENTER_GATE_PASSWORD;

  // Check if password is configured
  if (!expectedPassword) {
    return NextResponse.json(
      { ok: false, error: 'Gate password not configured.' },
      { status: 500 }
    );
  }

  // Parse request body
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false },
      { status: 400 }
    );
  }

  const { password } = body;

  // Validate password
  if (password !== expectedPassword) {
    return NextResponse.json(
      { ok: false },
      { status: 401 }
    );
  }

  // Set cookie
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: 'cc_gate',
    value: '1',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60, // 8 hours in seconds
  });

  return response;
}
