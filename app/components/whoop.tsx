'use client';

import { useEffect, useState } from 'react';

interface SleepData {
  actualSleepTime: number;
}

interface ErrorResponse {
  error: string;
  details: string;
  authUrl?: string;
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
  const [error, setError] = useState<ErrorResponse | null>(null);

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
        const errorData =
          err instanceof Error
            ? { error: err.message, details: '' }
            : { error: 'Failed to fetch sleep data', details: '' };
        setError(errorData as ErrorResponse);
      } finally {
        setLoading(false);
      }
    }

    fetchSleepData();
  }, []);

  if (loading) return <span className="text-gray-400">Loading...</span>;
  if (error) {
    if (error.authUrl) {
      return (
        <a href={error.authUrl} className="text-blue-500 hover:underline">
          Connect Whoop
        </a>
      );
    }
    return (
      <span className="text-gray-400" title={error.details || error.error}>
        Error loading sleep data
      </span>
    );
  }
  if (!sleepTime) return null;

  return (
    <span className="font-semibold italic">
      {formatSleepTime(sleepTime)}&nbsp;
    </span>
  );
}
