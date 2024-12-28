import { SpotifyApi } from '@spotify/web-api-ts-sdk';

// Ensure environment variables are loaded properly
const CLIENT_ID = import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.PUBLIC_SPOTIFY_REDIRECT_URI;

if (!CLIENT_ID || !REDIRECT_URI) {
  throw new Error('Missing Spotify CLIENT_ID or REDIRECT_URI in environment variables.');
}

console.log('CLIENT_ID:', CLIENT_ID);
console.log('REDIRECT_URI:', REDIRECT_URI);

const SCOPES: string[] = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
];

// Initialize the Spotify SDK with user authorization
export const sdk = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);

/**
 * Authenticates the user and retrieves the Spotify access token.
 * @returns {Promise<string | null>} The access token or null if authentication fails.
 */
export async function getAccessToken(): Promise<string | null> {
  try {
    // Trigger the authentication flow
    await sdk.authenticate();

    // Get the access token from the SDK
    const token = await sdk.getAccessToken();
    if (!token || !token.access_token) {
      throw new Error('Failed to retrieve access token.');
    }

    return token.access_token;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}
