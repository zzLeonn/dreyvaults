import React from 'react';
import { useEffect, useState } from 'react';
import type { SpotifyPlaylist } from '../../utils/spotify/types';
import { getUserPlaylists } from '../../utils/spotify/api';

export const PlaylistList: React.FC = () => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await getUserPlaylists();
      setPlaylists(data);
      setLoading(false);
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading playlists...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={playlist.images[0]?.url}
            alt={playlist.name}
            className="w-full aspect-square object-cover"
          />
          <div className="p-4">
            <h3 className="font-serif text-lg font-medium mb-2">{playlist.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{playlist.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{playlist.tracks.total} tracks</span>
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors"
              >
                Open in Spotify
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};