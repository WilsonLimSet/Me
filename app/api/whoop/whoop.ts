const WHOOP_AUTH_URL = 'https://api.prod.whoop.com/oauth/oauth2/auth';
const WHOOP_TOKEN_URL = 'https://api.prod.whoop.com/oauth/oauth2/token';
const WHOOP_API_URL = 'https://api.prod.whoop.com/developer/v1';

// Define redirect URI as a constant to ensure consistency
const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://wilsonlimsetiawan.com/api/whoop/callback'
    : 'http://localhost:3000/api/whoop/callback';

export async function getWhoopAuthUrl() {
  const state = generateRandomString(8);

  const params = new URLSearchParams({
    client_id: process.env.WHOOP_CLIENT_ID!,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'offline read:cycles read:sleep',
    state,
  });

  const fullUrl = `${WHOOP_AUTH_URL}?${params.toString()}`;
  console.log('Auth request:', {
    url: fullUrl,
    redirect_uri: REDIRECT_URI,
    client_id: process.env.WHOOP_CLIENT_ID,
  });
  return fullUrl;
}

export async function getSleepData(token: string) {
  // Get the latest sleep data
  const query = new URLSearchParams({
    limit: '1',
  });

  console.log(
    'Making sleep request with token:',
    token.substring(0, 10) + '...'
  );

  const response = await fetch(`${WHOOP_API_URL}/sleep?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    console.log('Sleep API response:', {
      status: response.status,
      body: data,
    });

    if (!data.records?.[0]) {
      throw new Error('No sleep data found');
    }

    return data.records[0];
  } else {
    throw new Error(`Received ${response.status} status from Whoop`);
  }
}

export async function exchangeCodeForToken(code: string) {
  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: process.env.WHOOP_CLIENT_ID!,
      client_secret: process.env.WHOOP_CLIENT_SECRET!,
      redirect_uri: REDIRECT_URI,
    });

    const response = await fetch(WHOOP_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const responseText = await response.text();
    console.log('Token exchange response:', {
      status: response.status,
      body: responseText,
    });

    if (!response.ok) {
      throw new Error(`Failed to exchange code for token: ${responseText}`);
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error('Token exchange error:', error);
    throw error;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.WHOOP_CLIENT_ID!,
      client_secret: process.env.WHOOP_CLIENT_SECRET!,
      scope: 'offline',
    });

    const response = await fetch(WHOOP_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const responseText = await response.text();
    console.log('Token refresh response:', {
      status: response.status,
      body: responseText,
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      scope: data.scope,
      token_type: data.token_type,
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}

export async function getWhoopToken() {
  const token = process.env.WHOOP_ACCESS_TOKEN;
  if (!token) {
    const refreshToken = process.env.WHOOP_REFRESH_TOKEN;
    if (!refreshToken) {
      throw new Error('No tokens found - please authenticate');
    }

    // Try to refresh the token
    const tokens = await refreshAccessToken(refreshToken);
    process.env.WHOOP_ACCESS_TOKEN = tokens.access_token;
    process.env.WHOOP_REFRESH_TOKEN = tokens.refresh_token;
    return tokens.access_token;
  }
  return token;
}

function generateRandomString(length: number) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export { WHOOP_API_URL };
