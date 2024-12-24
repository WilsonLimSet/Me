'use client';

import { useEffect, useState } from 'react';

interface SleepData {
  actualSleepTime: number;
}

function formatSleepTime(milliseconds: number): string {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function Whoop() {
  const [sleepTime, setSleepTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSleepData() {
      try {
        const response = await fetch('/api/whoop/sleep');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch sleep data');
        }

        setSleepTime(data.actualSleepTime);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch sleep data'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSleepData();
  }, []);

  if (loading) return <span className="text-gray-400">Loading...</span>;
  if (error)
    return (
      <span className="text-gray-400" title={error}>
        Error loading sleep data
      </span>
    );
  if (!sleepTime) return null;

  return (
    <span className="font-semibold italic">
      {formatSleepTime(sleepTime)}&nbsp;
    </span>
  );
}
