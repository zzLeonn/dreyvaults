import React from 'react';
import { WebPlayback } from './WebPlayback';
import { Controls } from './Controls';
import { NowPlaying } from './NowPlaying';
import { VolumeControl } from './VolumeControl';

export const Player: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <WebPlayback />
      
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
        <NowPlaying />
        <Controls />
        <div className="flex justify-end">
          <VolumeControl />
        </div>
      </div>
    </div>
  );
};