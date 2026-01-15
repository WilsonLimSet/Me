'use client';

import { useEffect, useState } from 'react';

type SpotifyData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
};

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 1000);

    return () => clearInterval(interval);
  }, []);

  // No data at all - show fallback
  if (!data || (!data.isPlaying && !data.title)) {
    return (
      <div>
        <h2 className="font-medium mb-3">Last listened to</h2>
        <div className="flex items-center gap-3 text-sm text-neutral-400">
          <div className="w-10 h-10 rounded bg-neutral-200 flex items-center justify-center">
            <SpotifyIcon className="w-5 h-5 text-neutral-400" />
          </div>
          <span>Nothing yet</span>
        </div>
      </div>
    );
  }

  const progress = data.progress && data.duration
    ? (data.progress / data.duration) * 100
    : 0;

  return (
    <div>
      <h2 className="font-medium mb-3 flex items-center gap-2">
        <span>{data.isPlaying ? 'Currently listening to' : 'Last listened to'}</span>
        <SpotifyIcon className="w-4 h-4 text-neutral-300" />
      </h2>
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group p-3 -ml-3 rounded-xl transition-all duration-300 ease-out hover:bg-neutral-100 hover:scale-[1.02] hover:-translate-y-0.5 max-w-sm"
      >
        {data.albumImageUrl && (
          <img
            src={data.albumImageUrl}
            alt={data.album}
            className={`w-10 h-10 rounded shadow-sm ${!data.isPlaying ? 'opacity-60' : ''}`}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium truncate group-hover:text-neutral-600 transition-colors ${!data.isPlaying ? 'text-neutral-500' : ''}`}>
              {data.title}
            </span>
            {data.isPlaying && <SoundBars />}
          </div>
          <p className="text-xs text-neutral-500 truncate">{data.artist}</p>
          {data.isPlaying && (
            <div className="mt-1 h-0.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1DB954] transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function SoundBars() {
  return (
    <div className="flex items-end gap-[2px] h-2.5 flex-shrink-0">
      <span
        className="w-[2px] bg-[#1DB954] rounded-sm"
        style={{ animation: 'soundbar 0.4s ease-in-out infinite alternate' }}
      />
      <span
        className="w-[2px] bg-[#1DB954] rounded-sm"
        style={{ animation: 'soundbar 0.4s ease-in-out infinite alternate 0.2s' }}
      />
      <span
        className="w-[2px] bg-[#1DB954] rounded-sm"
        style={{ animation: 'soundbar 0.4s ease-in-out infinite alternate 0.4s' }}
      />
    </div>
  );
}
