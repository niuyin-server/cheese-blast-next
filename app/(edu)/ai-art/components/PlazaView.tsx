'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { Sparkles, Palette, TrendingUp, Users } from 'lucide-react';
import ArtworkCard, { Artwork } from './ArtworkCard';

// 模拟广场作品数据
const generatePlazaArtworks = (): Artwork[] => {
  const authors = ['艺术家A', '创作者B', '设计师C', '画师D', '艺术爱好者E', '创意达人F'];
  return Array.from({ length: 50 }, (_, i) => ({
    id: `plaza-art-${i + 1}`,
    imageUrl: `https://picsum.photos/seed/plaza${i + 1}/400/600`,
    prompt: `惊艳的AI艺术作品 ${i + 1}，融合了现代艺术与古典美学，展现独特的视觉魅力`,
    author: authors[Math.floor(Math.random() * authors.length)],
    authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authors[Math.floor(Math.random() * authors.length)]}`,
    likes: Math.floor(Math.random() * 5000),
    downloads: Math.floor(Math.random() * 2000),
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    style: ['写实', '抽象', '水彩', '油画', '数字艺术', '卡通', '科幻'][Math.floor(Math.random() * 7)],
    ratio: ['1:1', '3:4', '4:3', '16:9'][Math.floor(Math.random() * 4)],
  }));
};

const slogans = [
  {
    icon: Sparkles,
    title: '无限创意，AI赋能',
    description: '用AI释放你的艺术想象力，每一笔都是创新',
  },
  {
    icon: Palette,
    title: '艺术无界，灵感无限',
    description: '探索AI绘画的无限可能，发现属于你的艺术风格',
  },
  {
    icon: TrendingUp,
    title: '热门创作，趋势前沿',
    description: '发现最受欢迎的AI艺术作品，紧跟艺术潮流',
  },
  {
    icon: Users,
    title: '社区共创，灵感碰撞',
    description: '与全球创作者一起，分享你的AI艺术创作',
  },
];

export default function PlazaView() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 初始化显示的作品（首次加载显示前12个）
  useEffect(() => {
    if (artworks.length === 0) {
      const data = generatePlazaArtworks();
      setArtworks(data);
      setDisplayedArtworks(data.slice(0, Math.min(12, data.length)));
      setHasMore(data.length > 12);
    }
  }, [artworks.length]);

  // 触底加载更多
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const currentCount = displayedArtworks.length;
    const nextBatch = artworks.slice(currentCount, currentCount + 12);

    if (nextBatch.length > 0) {
      setTimeout(() => {
        setDisplayedArtworks((prev) => [...prev, ...nextBatch]);
        setHasMore(currentCount + nextBatch.length < artworks.length);
        setIsLoading(false);
      }, 300);
    } else {
      setHasMore(false);
      setIsLoading(false);
    }
  }, [displayedArtworks.length, isLoading, hasMore, artworks]);

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

  const breakpointColumnsObj = {
    default: 6,
    1536: 6,
    1280: 5,
    1024: 4,
    640: 3,
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
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {slogan.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">
                  {slogan.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 瀑布流作品展示 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">热门作品</h2>
        <p className="text-sm text-[var(--color-text-tertiary)]">
          发现来自全球创作者的精彩AI艺术作品
        </p>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {displayedArtworks.map((artwork) => (
          <div key={artwork.id} className="mb-4 md:mb-6">
            <ArtworkCard artwork={artwork} showAuthor={true} />
          </div>
        ))}
      </Masonry>

      {/* 触底加载触发器 */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
        {isLoading && (
          <div className="text-[var(--color-text-tertiary)] text-sm">加载中...</div>
        )}
        {!hasMore && displayedArtworks.length > 0 && (
          <div className="text-[var(--color-text-tertiary)] text-sm">— 没有更多内容了 —</div>
        )}
      </div>
    </div>
  );
}

