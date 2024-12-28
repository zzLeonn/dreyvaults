import React from 'react';
import { usePlayerStore } from '../../../stores/playerStore';
import { sdk } from '../../../utils/spotify/auth';

export const VolumeControl: React.FC = () => {
  const { volume, setVolume } = usePlayerStore();

  const handleVolumeChange = async (newVolume: number) => {
    setVolume(newVolume);
    await sdk.player.setVolume(newVolume * 100);
  };

  return (
    <div className="flex items-center space-x-2">
      <svg
        className="w-5 h-5 text-gray-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        className="w-24 accent-primary"
      />
    </div>
  );
};