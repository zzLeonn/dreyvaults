import type { YouTubeVideo } from '../youtube.ts';
import { fetchWithRetry } from './fetchWithRetry';

const API_KEY = 'AIzaSyCcXOTUXm17jmiXDlwpJfHtywkqi7WJpOE';

export async function fetchYouTubeVideos(videoIds: string[]): Promise<YouTubeVideo[]> {
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

    const channelIcons = await fetchChannelIcons(Array.from(channelIds));

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
}

async function fetchChannelIcons(channelIds: string[]): Promise<Map<string, string>> {
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds.join(',')}&key=${API_KEY}`;
  const channelResponse = await fetchWithRetry(channelUrl);
  const channelData = await channelResponse.json();

  return new Map(
    channelData.items.map((channel: any) => [
      channel.id,
      channel.snippet.thumbnails.default.url
    ])
  );
}