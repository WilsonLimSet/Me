import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'experimental-edge';

export async function GET(req: NextRequest) {
  let date = new Date();
  date.setDate(date.getDate()-1 );
  console.log(`Querying data for ${date.toISOString().slice(0, 10)}`);

    try {
        const response = await fetch(`https://api.ouraring.com/v2/usercollection/sleep?start_date=${date.toISOString().slice(0, 10)}`, {
            headers: {
                'Authorization': `Bearer ${process.env.OURA_PERSONAL_ACCESS_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        console.log(responseData.data);

        if (responseData.data && responseData.data.length > 0) {
            const totalSleepDuration = responseData.data[0].total_sleep_duration;
            return new NextResponse(JSON.stringify({ date: date, total_sleep_duration: totalSleepDuration }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new NextResponse(JSON.stringify({ date: date, message: 'No sleep data available' }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        console.error(`Error querying sleep data: ${error.message}`);
        return new NextResponse(JSON.stringify({ message: 'Failed to retrieve sleep data', error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
