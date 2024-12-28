import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const sdk = SpotifyApi.withClientCredentials(
  import.meta.env.SPOTIFY_CLIENT_ID,
  import.meta.env.SPOTIFY_CLIENT_SECRET
);

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { total: number };
  external_urls: { spotify: string };
}


export async function getPlaylists(userId: string): Promise<SpotifyPlaylist[]> {
  try {
    const response = await sdk.playlists.getUsersPlaylists(userId);
    return response.items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      images: item.images,
      tracks: { total: item.tracks.total },
      external_urls: item.external_urls
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
}

