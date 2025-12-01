'use client';

import { useEffect, useRef, useState } from 'react';

import { Video } from '@/types/content';
import FeedVideoItem from './FeedVideoItem';

type RecommendedFeedViewProps = {
  videos: Video[];
};

const RecommendedFeedView = ({ videos }: RecommendedFeedViewProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setCurrentIndex(0);
    }
  }, [videos.length, videos[0]?.id]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const availableHeight = window.innerHeight - 64;
    const scrollY = containerRef.current.scrollTop;
    const newIndex = Math.round(scrollY / availableHeight);
    setCurrentIndex(newIndex);
  };

  if (videos.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center text-gray-500 text-lg">
        该UP主暂无最新动态
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100vh-64px)] overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth"
      onScroll={handleScroll}
    >
      {videos.map((video, index) => (
        <div
          key={`${video.id}-${index}`}
          className="snap-start w-full h-[calc(100vh-64px)] flex items-center justify-center p-4 xl:p-8"
        >
          <FeedVideoItem video={video} isActive={index === currentIndex} />
        </div>
      ))}
      <div className="snap-start w-full h-[calc(100vh-64px)] flex items-center justify-center text-gray-600">
        — 已加载全部关注内容 —
      </div>
    </div>
  );
};

export default RecommendedFeedView;

