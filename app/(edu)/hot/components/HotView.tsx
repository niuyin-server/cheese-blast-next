'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Flame, TrendingUp } from 'lucide-react';
import Masonry from 'react-masonry-css';

import WaterfallVideoCard from '@/app/(edu)/explore/components/WaterfallVideoCard';
import { HOT_SEARCH_TERMS, HOT_VIDEOS } from '@/app/data/content';
import { Video } from '@/types/content';

type HotViewProps = {
  onVideoClick: (video: Video) => void;
};

const HotView = ({ onVideoClick }: HotViewProps) => {
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 初始化前 12 条
  useEffect(() => {
    if (HOT_VIDEOS.length > 0 && displayedVideos.length === 0) {
      setDisplayedVideos(HOT_VIDEOS.slice(0, Math.min(12, HOT_VIDEOS.length)));
      setHasMore(HOT_VIDEOS.length > 12);
    }
  }, [displayedVideos.length]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const currentCount = displayedVideos.length;
    const nextBatch = HOT_VIDEOS.slice(currentCount, currentCount + 12);

    if (nextBatch.length > 0) {
      setTimeout(() => {
        setDisplayedVideos((prev) => [...prev, ...nextBatch]);
        setHasMore(currentCount + nextBatch.length < HOT_VIDEOS.length);
        setIsLoading(false);
      }, 240);
    } else {
      setHasMore(false);
      setIsLoading(false);
    }
  }, [displayedVideos.length, hasMore, isLoading]);

  // 触底加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '120px',
        threshold: 0.1,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isLoading, loadMore]);

  const breakpointColumnsObj = {
    default: 6,
    1536: 6,
    1280: 5,
    1024: 4,
    640: 3,
  };

  return (
    <div className="p-4 md:p-8 pt-6 bg-[var(--color-bg)] min-h-screen space-y-6">
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-2xl p-4 md:p-6 shadow-lg shadow-cyan-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center shadow-md">
              <Flame size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="text-lg font-semibold text-[var(--color-text-primary)]">全站热搜</div>
              <div className="text-sm text-[var(--color-text-tertiary)]">实时热度，看看大家都在搜什么</div>
            </div>
          </div>
          <div className="hidden md:flex items-center cursor-pointer text-xs text-[var(--color-text-tertiary)] bg-white/10 transition-all duration-300 dark:bg-gray-300/10 border border-white/20 dark:border-gray-400/20 hover:shadow-md hover:border-white/30 dark:hover:border-gray-400/40 rounded-full px-3 py-1 backdrop-blur-lg">
            <TrendingUp size={14} className="mr-1 text-[var(--color-accent)]" />
            实时榜单
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {HOT_SEARCH_TERMS.map((term, idx) => (
            <button
              key={term}
              className="group cursor-pointer flex items-center justify-between px-3 py-2 rounded-full text-sm transition-all duration-300 backdrop-blur-lg bg-white/10 dark:bg-gray-400/10 border border-white/20 dark:border-gray-300/20 hover:shadow-md hover:border-white/30 dark:hover:border-gray-400/40"
            >
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${idx < 3 ? 'bg-gradient-to-br from-orange-400 to-rose-500 text-white' : 'bg-white/20 dark:bg-gray-800/40 text-[var(--color-text-primary)]'}`}>
                  {idx + 1}
                </span>
                <span className="text-[var(--color-text-primary)]">{term}</span>
              </div>
              <Flame size={16} className="text-orange-400 opacity-70 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-2xl p-4 md:p-6 shadow-lg shadow-cyan-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center shadow-md">
              <Flame size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="text-lg font-semibold text-[var(--color-text-primary)]">热门视频</div>
              <div className="text-sm text-[var(--color-text-tertiary)]">瀑布流展示，和探索页一致的浏览体验</div>
            </div>
          </div>
          <div className="hidden md:flex text-xs text-[var(--color-text-tertiary)] bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-full px-3 py-1 backdrop-blur-lg">
            今日榜单 · {HOT_VIDEOS.length} 条
          </div>
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

        <div ref={observerTarget} className="h-20 flex items-center justify-center mt-4">
          {isLoading && (
            <div className="text-[var(--color-text-tertiary)] text-sm">加载中...</div>
          )}
          {!hasMore && displayedVideos.length > 0 && (
            <div className="text-[var(--color-text-tertiary)] text-sm">— 没有更多内容了 —</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotView;


