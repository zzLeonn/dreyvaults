declare namespace Spotify {
  interface Device {
    id: string;
    name: string;
    type: string;
  }

  interface Player {
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(event: string, callback: (state: any) => void): void;
    getCurrentState(): Promise<any>;
    setVolume(volume: number): Promise<void>;
    togglePlay(): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    previousTrack(): Promise<void>;
    nextTrack(): Promise<void>;
    seek(position_ms: number): Promise<void>;
  }

  interface Album {
    images: { url: string }[];
    name: string;
  }

  interface Artist {
    name: string;
  }

  interface Track {
    id: string;
    name: string;
    album: Album;
    artists: Artist[];
    duration_ms: number;
  }
}

interface Window {
  Spotify: {
    Player: new (config: {
      name: string;
      getOAuthToken: (cb: (token: string) => void) => void;
    }) => Spotify.Player;
  };
  onSpotifyWebPlaybackSDKReady: () => void;
}