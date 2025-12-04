import { ApiFeedResponse } from '@/types/api';

const API_BASE_URL = 'http://43.240.221.8:9090';

/**
 * 获取推荐视频列表
 */
export async function fetchVideoFeed(): Promise<ApiFeedResponse> {
  const response = await fetch(`${API_BASE_URL}/recommend/api/v1/video/feed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // 如果需要跨域，可能需要添加 credentials 或其他配置
    // credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch video feed: ${response.statusText}`);
  }

  return response.json();
}

