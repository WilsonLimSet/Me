import { NextResponse } from 'next/server';
import { exchangeCodeForToken } from '../whoop';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokens = await exchangeCodeForToken(code);

    // Store tokens in environment variables
    process.env.WHOOP_ACCESS_TOKEN = tokens.access_token;
    process.env.WHOOP_REFRESH_TOKEN = tokens.refresh_token;

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      {
        error: 'Failed to exchange code for token',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
