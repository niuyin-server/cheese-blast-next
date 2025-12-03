'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';

import { CATEGORIES, HOME_VIDEOS } from '@/app/data/content';
import { Video } from '@/types/content';
import WaterfallVideoCard from './WaterfallVideoCard';

type ExploreViewProps = {
  onVideoClick: (video: Video) => void;
};

const ExploreView = ({ onVideoClick }: ExploreViewProps) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 初始化显示的视频（首次加载显示前12个）
  useEffect(() => {
    if (HOME_VIDEOS.length > 0 && displayedVideos.length === 0) {
      setDisplayedVideos(HOME_VIDEOS.slice(0, Math.min(12, HOME_VIDEOS.length)));
      setHasMore(HOME_VIDEOS.length > 12);
    }
  }, [displayedVideos.length]);

  // 触底加载更多
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const currentCount = displayedVideos.length;
    const nextBatch = HOME_VIDEOS.slice(currentCount, currentCount + 12);

    if (nextBatch.length > 0) {
      setTimeout(() => {
        setDisplayedVideos((prev) => [...prev, ...nextBatch]);
        setHasMore(currentCount + nextBatch.length < HOME_VIDEOS.length);
        setIsLoading(false);
      }, 300);
    } else {
      setHasMore(false);
      setIsLoading(false);
    }
  }, [displayedVideos.length, isLoading, hasMore]);

  // Intersection Observer 监听触底
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  // 切换分类时重置列表
  useEffect(() => {
    setDisplayedVideos(HOME_VIDEOS.slice(0, Math.min(12, HOME_VIDEOS.length)));
    setHasMore(HOME_VIDEOS.length > 12);
  }, [activeCategory]);

  // 响应式列数配置
  const breakpointColumnsObj = {
    default: 6,
    1536: 6, // xl
    1280: 5, // lg
    1024: 4, // md
    640: 3,  // sm
  };

  return (
    <div className="p-4 md:p-8 pt-6 bg-[var(--color-bg)] min-h-screen">
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(idx)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
              activeCategory === idx
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-md shadow-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/30'
                : 'bg-[var(--color-card)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] border-[var(--color-border-soft)] hover:border-[var(--color-border-strong)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {displayedVideos.map((video, idx) => (
          <div key={`${video.id}-${idx}`} className="mb-4 md:mb-6">
            <WaterfallVideoCard video={video} onClick={onVideoClick} />
          </div>
        ))}
      </Masonry>

      {/* 触底加载触发器 */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
        {isLoading && (
          <div className="text-[var(--color-text-tertiary)] text-sm">加载中...</div>
        )}
        {!hasMore && displayedVideos.length > 0 && (
          <div className="text-[var(--color-text-tertiary)] text-sm">— 没有更多内容了 —</div>
        )}
      </div>
    </div>
  );
};

export default ExploreView;

