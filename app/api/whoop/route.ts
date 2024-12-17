import { NextResponse } from 'next/server';

const WHOOP_API_URL = 'https://api.whoop.com/v1';

async function getWhoopToken() {
  // You'll need to implement OAuth2 flow or store your token securely
  // For now, we'll assume you have a token stored in an environment variable
  return process.env.WHOOP_API_TOKEN;
}

export async function GET() {
  try {
    const token = await getWhoopToken();
    
    const response = await fetch(`${WHOOP_API_URL}/users/me/cycles`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Whoop data');
    }

    const data = await response.json();
    
    // Get the most recent sleep data
    const latestSleep = data.cycles[0].sleep;
    
    return NextResponse.json({
      sleepScore: latestSleep.score,
      sleepDuration: latestSleep.qualityDuration,
      lastUpdated: latestSleep.endTime,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sleep data' },
      { status: 500 }
    );
  }
} 