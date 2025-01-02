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

export interface YouTubeError {
  message: string;
  code?: string;
}