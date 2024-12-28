import React from 'react';
import { usePlayerStore } from '../../../stores/playerStore';

export const NowPlaying: React.FC = () => {
  const { currentTrack } = usePlayerStore();

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={currentTrack.album.images[0].url}
        alt={currentTrack.album.name}
        className="w-16 h-16 rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="text-gray-800 font-medium truncate">
          {currentTrack.name}
        </h3>
        <p className="text-gray-600 text-sm truncate">
          {currentTrack.artists.map(artist => artist.name).join(', ')}
        </p>
      </div>
    </div>
  );
};