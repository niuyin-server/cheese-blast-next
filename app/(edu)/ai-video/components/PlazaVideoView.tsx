'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { Sparkles, Palette, TrendingUp, Users } from 'lucide-react';
import VideoCard, { VideoWork } from './VideoCard';

// 模拟广场视频数据
const generatePlazaVideos = (): VideoWork[] => {
  const durations = ['00:30', '00:45', '01:00', '01:30', '02:00', '03:00'];
  const authors = ['创作者A', '影像师B', '导演C', '短视频达人D', '剪辑师E', '创意团队F'];
  return Array.from({ length: 60 }, (_, i) => ({
    id: `plaza-video-${i + 1}`,
    coverUrl: `https://picsum.photos/seed/plazavideo${i + 1}/400/600`,
    prompt: `高质感AI视频 ${i + 1}：结合剧情分镜、动效字幕与配乐，呈现沉浸式视听体验`,
    author: authors[Math.floor(Math.random() * authors.length)],
    authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authors[Math.floor(Math.random() * authors.length)]}`,
    likes: Math.floor(Math.random() * 8000),
    downloads: Math.floor(Math.random() * 3000),
    duration: durations[Math.floor(Math.random() * durations.length)],
    style: ['剧情', '纪实', '潮流', '科幻', '动画', '混剪'][Math.floor(Math.random() * 6)],
    ratio: ['9:16', '16:9', '1:1', '4:5'][Math.floor(Math.random() * 4)],
  }));
};

const slogans = [
  { icon: Sparkles, title: 'AI 视频，灵感即成片', description: '用提示词快速拉齐分镜、动效与字幕，出片更高效' },
  { icon: Palette, title: '风格百变，随心混剪', description: '剧情、纪实、潮流、动画，多种风格一键切换' },
  { icon: TrendingUp, title: '热点趋势，灵感迭代', description: '参考热门案例与模板，快速生成上手' },
  { icon: Users, title: '创作者广场', description: '和创作者们一起讨论脚本、分镜、音乐与字幕' },
];

export default function PlazaVideoView() {
  const [videos, setVideos] = useState<VideoWork[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<VideoWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 初始化显示（前12条）
  useEffect(() => {
    if (videos.length === 0) {
      const data = generatePlazaVideos();
      setVideos(data);
      setDisplayedVideos(data.slice(0, Math.min(12, data.length)));
      setHasMore(data.length > 12);
    }
  }, [videos.length]);

  // 触底加载更多
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const currentCount = displayedVideos.length;
    const nextBatch = videos.slice(currentCount, currentCount + 12);

    if (nextBatch.length > 0) {
      setTimeout(() => {
        setDisplayedVideos((prev) => [...prev, ...nextBatch]);
        setHasMore(currentCount + nextBatch.length < videos.length);
        setIsLoading(false);
      }, 300);
    } else {
      setHasMore(false);
      setIsLoading(false);
    }
  }, [displayedVideos.length, isLoading, hasMore, videos]);

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
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isLoading, loadMore]);

  const breakpointColumnsObj = {
    default: 4,
    1536: 5,
    1280: 4,
    1024: 3,
    640: 2,
  };

  return (
    <div className="p-4 md:p-8 pt-6 bg-[var(--color-bg)] min-h-screen">
      {/* 个性标语区域 */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {slogans.map((slogan, index) => {
            const Icon = slogan.icon;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[var(--color-card)] border border-[var(--color-border-soft)] p-6 transition-all cursor-pointer group hover:bg-[var(--color-surface)]"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{slogan.title}</h3>
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">{slogan.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 瀑布流作品展示 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">热门视频</h2>
        <p className="text-sm text-[var(--color-text-tertiary)]">发现来自创作者的精彩 AI 视频作品</p>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {displayedVideos.map((video) => (
          <div key={video.id} className="mb-4 md:mb-6">
            <VideoCard video={video} showAuthor />
          </div>
        ))}
      </Masonry>

      {/* 触底加载触发器 */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
        {isLoading && <div className="text-[var(--color-text-tertiary)] text-sm">加载中...</div>}
        {!hasMore && displayedVideos.length > 0 && (
          <div className="text-[var(--color-text-tertiary)] text-sm">— 没有更多内容了 —</div>
        )}
      </div>
    </div>
  );
}

