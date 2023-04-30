import querystring from "querystring";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlaying = async (client_id, client_secret, refresh_token) => {
  const { access_token } = await getAccessToken(
    client_id,
    client_secret,
    refresh_token
  );

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export default async function getNowPlayingItem(
  client_id,
  client_secret,
  refresh_token
) {
  const response = await getNowPlaying(client_id, client_secret, refresh_token);
  if (response.status === 204 || response.status > 400) {
    return false;
  }

  const data = await response.json();
  const isPlaying = data.is_playing;

  if (data.currently_playing_type === "track") {
    const albumImageUrl = data.item.album.images[0].url;
    const artist = data.item.artists.map((_artist) => _artist.name).join(", ");
    const songUrl = data.item.external_urls.spotify;
    const title = data.item.name;
    console.log(data); // logs the entire data object to the console

    return {
      type: "track",
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    };
  } else if (data.currently_playing_type === "episode") {
    const podcastImageUrl = data.item?.images?.[0]?.url || '';
    const showName = data.item?.show?.name || '';
    const episodeUrl = data.item?.external_urls?.spotify || '';
    const title = data.item?.name || '';
    const publisher = data.item?.show?.publisher || '';

    console.log(data); // logs the entire data object to the console



    return {
      type: "episode",
      podcastImageUrl,
      showName,
      isPlaying,
      episodeUrl,
      title,
      publisher,
    };
  } else {
    return false;
  }
}
