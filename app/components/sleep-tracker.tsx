'use client';

import { useEffect, useState } from 'react';

interface SleepData {
  sleepScore: number;
  lastUpdated: string;
}

export function SleepTracker() {
  const [sleepScore, setSleepScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSleepData() {
      try {
        const response = await fetch('/api/whoop');
        if (!response.ok) throw new Error('Failed to fetch sleep data');
        const data = await response.json();
        setSleepScore(data.sleepScore);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSleepData();
  }, []);

  if (loading || !sleepScore) return <span>...</span>;

  return <span>{sleepScore}/100</span>;
} 