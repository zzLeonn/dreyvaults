import React from 'react';
import { usePlayerStore } from '../../../stores/playerStore';
import { sdk } from '../../../utils/spotify/auth';

export const Controls: React.FC = () => {
  const { isPlaying, currentTrack, progress, duration } = usePlayerStore();

  // Handle toggling play/pause
  const togglePlay = async () => {
    if (!sdk.player) return; // Ensure the player is available
    if (isPlaying) {
      await sdk.player.pause();
    } else {
      await sdk.player.play();
    }
  };

  // Skip track functionality
  const skipTrack = async (forward = true) => {
    if (!sdk.player) return; // Ensure the player is available
    if (forward) {
      await sdk.player.next();
    } else {
      await sdk.player.previous();
    }
  };

  // Format time (milliseconds to minutes:seconds format)
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Ensure progress and duration are defined
  const currentProgress = progress ?? 0;
  const currentDuration = duration ?? 0;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        {/* Skip previous track */}
        <button
          onClick={() => skipTrack(false)}
          className="text-gray-600 hover:text-primary transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Skip next track */}
        <button
          onClick={() => skipTrack()}
          className="text-gray-600 hover:text-primary transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full flex items-center space-x-2">
        <span className="text-sm text-gray-600">{formatTime(currentProgress)}</span>
        <div className="flex-1 h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${(currentProgress / currentDuration) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{formatTime(currentDuration)}</span>
      </div>
    </div>
  );
};
