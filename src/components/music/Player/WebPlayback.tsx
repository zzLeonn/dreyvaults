import React, { useEffect, useState } from 'react';
import { usePlayerStore } from '../../../stores/playerStore';

declare global {
  interface Window {
    spotifyPlayer: Spotify.Player;
  }
}

export const WebPlayback: React.FC = () => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const { setIsPlaying, setCurrentTrack, setProgress, setDuration, setDevice } = usePlayerStore();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = new window.Spotify.Player({
        name: "Drey's Vault Web Player",
        getOAuthToken: async (cb) => {
          // Replace this with your token retrieval logic
          const token = 'your-token-here';
          cb(token);
        }
      });

      player.addListener('ready', ({ device_id }) => {
        setDevice({ id: device_id, name: "Drey's Vault Web Player", type: 'Computer' });
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) return;

        setIsPlaying(!state.paused);
        setCurrentTrack(state.track_window.current_track);
        setProgress(state.position);
        setDuration(state.duration);
      });

      await player.connect();
      window.spotifyPlayer = player;
      setPlayer(player);
    };

    return () => {
      player?.disconnect();
      script.remove();
    };
  }, []);

  return null;
};