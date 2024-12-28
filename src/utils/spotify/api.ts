import { sdk } from './auth';
import type { SimplifiedPlaylist, Track, Episode } from '@spotify/web-api-ts-sdk';

export interface SpotifyPlaylist extends Omit<SimplifiedPlaylist, 'tracks'> {
  tracks: {
    href: string;
    total: number;
  };
}

export type SpotifyTrack = Track;
export type SpotifyEpisode = Episode;
export type SpotifyPlayingItem = SpotifyTrack | SpotifyEpisode;

export async function getUserPlaylists(): Promise<SpotifyPlaylist[]> {
  try {
    const response = await sdk.currentUser.playlists.playlists();
    return response.items.map(playlist => ({
      ...playlist,
      tracks: {
        href: playlist.tracks.href,
        total: playlist.tracks.total
      }
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
}

export async function getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
  try {
    const response = await sdk.playlists.getPlaylistItems(playlistId);
    return response.items
      .map(item => item.track)
      .filter((track): track is Track => track !== null && track.type === 'track');
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    return [];
  }
}

export async function getCurrentlyPlaying(): Promise<SpotifyPlayingItem | null> {
  try {
    const response = await sdk.player.getCurrentlyPlayingTrack();
    if (response?.item) {
      if (response.item.type === 'track') {
        return response.item as SpotifyTrack;
      } else if (response.item.type === 'episode') {
        return response.item as SpotifyEpisode;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching current track:', error);
    return null;
  }
}