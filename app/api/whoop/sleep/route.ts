import { NextResponse } from 'next/server';
import { getWhoopToken } from '../whoop';

export async function GET() {
  try {
    const token = await getWhoopToken();
    console.log('Got token:', token.substring(0, 10) + '...');

    const response = await fetch(
      'https://api.prod.whoop.com/developer/v1/activity/sleep',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Whoop API returned ${response.status}`);
    }

    const sleepData = await response.json();
    console.log('Raw sleep data:', JSON.stringify(sleepData, null, 2));

    const scoredSleep = sleepData.records?.find(
      (record: { score_state: string; nap: boolean }) =>
        record.score_state === 'SCORED' && !record.nap
    );

    console.log('Scored sleep record:', JSON.stringify(scoredSleep, null, 2));

    if (!scoredSleep) {
      throw new Error('No scored sleep data available');
    }

    // Calculate total time in milliseconds
    const startTime = new Date(scoredSleep.start);
    const endTime = new Date(scoredSleep.end);

    console.log('Time data:', {
      start: scoredSleep.start,
      end: scoredSleep.end,
      startParsed: startTime,
      endParsed: endTime,
    });

    const totalTimeMs = endTime.getTime() - startTime.getTime();
    const efficiency = scoredSleep.score?.sleep_efficiency_percentage || 100;
    const actualSleepTime = Math.round(totalTimeMs * (efficiency / 100));

    console.log('Sleep calculation:', {
      totalTimeMs,
      efficiency,
      actualSleepTime,
      actualSleepHours: actualSleepTime / (1000 * 60 * 60),
    });

    return NextResponse.json({ actualSleepTime });
  } catch (error) {
    console.error('Whoop API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sleep data' },
      { status: 500 }
    );
  }
}
