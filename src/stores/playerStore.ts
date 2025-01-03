import { create } from 'zustand';

interface PlayerState {
  isPlaying: boolean;
  currentTrack: Spotify.Track | null;
  volume: number;
  progress: number;
  duration: number;
  device: Spotify.Device | null;
  queue: Spotify.Track[];
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: Spotify.Track | null) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setDevice: (device: Spotify.Device | null) => void;
  setQueue: (queue: Spotify.Track[]) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentTrack: null,
  volume: 1,
  progress: 0,
  duration: 0,
  device: null,
  queue: [],
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setDevice: (device) => set({ device }),
  setQueue: (queue) => set({ queue })
}));