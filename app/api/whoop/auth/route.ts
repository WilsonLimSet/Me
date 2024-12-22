import { NextResponse } from 'next/server';
import { getWhoopAuthUrl } from '../whoop';

export async function GET() {
  try {
    const authUrl = await getWhoopAuthUrl();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Failed to generate auth URL' },
      { status: 500 }
    );
  }
}
