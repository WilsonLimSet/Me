import { get } from '@vercel/edge-config';

export const dynamic = 'force-dynamic';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID;
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString('base64');

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing';

// Server-side cache
let cache: {
  data: SpotifyData | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

// In-memory last played (loaded from Edge Config on first request)
let lastPlayed: SpotifyData | null = null;
let lastPlayedLoaded = false;

const CACHE_DURATION = 1000; // 1 second cache

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

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  return response.json();
}

async function getLastPlayedFromEdgeConfig(): Promise<SpotifyData | null> {
  try {
    const data = await get<SpotifyData>('lastPlayed');
    return data || null;
  } catch (error) {
    console.error('Error reading from Edge Config:', error);
    return null;
  }
}

async function saveLastPlayedToEdgeConfig(data: SpotifyData): Promise<void> {
  if (!EDGE_CONFIG_ID || !VERCEL_API_TOKEN) return;

  try {
    await fetch(
      `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'upsert',
              key: 'lastPlayed',
              value: data,
            },
          ],
        }),
      }
    );
  } catch (error) {
    console.error('Error saving to Edge Config:', error);
  }
}

async function getNowPlaying(): Promise<SpotifyData> {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const data = await response.json();

  if (!data.item) {
    return { isPlaying: false };
  }

  const isEpisode = data.currently_playing_type === 'episode';

  if (isEpisode) {
    // Podcast episode
    return {
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.show?.name || 'Podcast',
      album: data.item.show?.name,
      albumImageUrl: data.item.images?.[0]?.url || data.item.show?.images?.[0]?.url,
      songUrl: data.item.external_urls.spotify,
      progress: data.progress_ms,
      duration: data.item.duration_ms,
    };
  }

  // Music track
  return {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0]?.url,
    songUrl: data.item.external_urls.spotify,
    progress: data.progress_ms,
    duration: data.item.duration_ms,
  };
}

export async function GET() {
  const now = Date.now();

  // Load last played from Edge Config on first request
  if (!lastPlayedLoaded) {
    lastPlayed = await getLastPlayedFromEdgeConfig();
    lastPlayedLoaded = true;
  }

  // Return cached data if still fresh
  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    return Response.json(cache.data);
  }

  try {
    const data = await getNowPlaying();

    // If playing, save as last played
    if (data.isPlaying && data.title) {
      // Only save if it's a different song
      if (!lastPlayed || lastPlayed.title !== data.title || lastPlayed.artist !== data.artist) {
        lastPlayed = { ...data };
        // Save to Edge Config (don't await to avoid slowing down response)
        saveLastPlayedToEdgeConfig(lastPlayed);
      }
    }

    // If not playing but we have a last played song, return it
    if (!data.isPlaying && lastPlayed) {
      const result = { ...lastPlayed, isPlaying: false };
      cache = { data: result, timestamp: now };
      return Response.json(result);
    }

    // Update cache
    cache = {
      data,
      timestamp: now,
    };

    return Response.json(data);
  } catch (error) {
    console.error('Spotify API error:', error);
    // Return last played on error too
    if (lastPlayed) {
      return Response.json({ ...lastPlayed, isPlaying: false });
    }
    return Response.json({ isPlaying: false });
  }
}
