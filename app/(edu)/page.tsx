'use client';

import { useEffect, useState } from 'react';
import RecommendedFeedView from "@/app/(edu)/components/feed/RecommendedFeedView";
import { HOME_VIDEOS } from "@/app/data/content";
import { fetchVideoFeed } from '@/app/api/video';
import { adaptApiVideoToVideo } from '@/app/utils/videoAdapter';
import { Video } from '@/types/content';

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>(HOME_VIDEOS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchVideoFeed();
        
        if (response.code === 200 && response.data) {
          const adaptedVideos = response.data.map((item, index) => 
            adaptApiVideoToVideo(item, index)
          );
          setVideos(adaptedVideos);
        } else {
          // API返回错误，使用默认数据
          console.warn('API returned error, using default videos:', response.msg);
          setVideos(HOME_VIDEOS);
        }
      } catch (err) {
        console.error('Failed to fetch video feed:', err);
        setError(err instanceof Error ? err.message : '加载失败');
        // 出错时使用默认数据
        setVideos(HOME_VIDEOS);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center text-[var(--color-text-tertiary)] text-lg">
        加载中...
      </div>
    );
  }

  if (error) {
    console.warn('Video feed error:', error);
  }

  return <RecommendedFeedView videos={videos} />;
}


