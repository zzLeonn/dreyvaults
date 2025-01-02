import { debounce } from './debounce.ts';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  channelIcon: string;
  viewCount: number;
  publishedAt: string;
}

const API_KEY = 'AIzaSyCcXOTUXm17jmiXDlwpJfHtywkqi7WJpOE';

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
  throw new Error('Failed to fetch after retries');
}

export const fetchYouTubeVideos = debounce(async (videoIds: string[]): Promise<YouTubeVideo[]> => {
  try {
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}&key=${API_KEY}`;
    const channelIds = new Set<string>();
    
    const videoResponse = await fetchWithRetry(videoUrl);
    const videoData = await videoResponse.json();
    
    if (!videoData.items?.length) {
      throw new Error('No videos found');
    }
    
    videoData.items.forEach((item: any) => {
      channelIds.add(item.snippet.channelId);
    });

  
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${Array.from(channelIds).join(',')}&key=${API_KEY}`;
    const channelResponse = await fetchWithRetry(channelUrl);
    const channelData = await channelResponse.json();

    const channelIcons = new Map(
      channelData.items.map((channel: any) => [
        channel.id,
        channel.snippet.thumbnails.default.url
      ])
    );

    return videoData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      channelIcon: channelIcons.get(item.snippet.channelId) || '',
      viewCount: parseInt(item.statistics.viewCount),
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw new Error('Failed to load videos. Please try again later.');
  }
}, 300);