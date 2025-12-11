'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { Sparkles, Image as ImageIcon, Settings, Wand2, Loader2 } from 'lucide-react';
import ArtworkCard, { Artwork } from './ArtworkCard';

// 模拟我的创作数据
const generateMyArtworks = (): Artwork[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `my-art-${i + 1}`,
    imageUrl: `https://picsum.photos/seed/art${i + 1}/400/600`,
    prompt: `美丽的风景画 ${i + 1}，充满艺术感的构图，细腻的色彩搭配`,
    author: '我',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
    likes: Math.floor(Math.random() * 1000),
    downloads: Math.floor(Math.random() * 500),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    style: ['写实', '抽象', '水彩', '油画', '数字艺术'][Math.floor(Math.random() * 5)],
    ratio: ['1:1', '3:4', '4:3', '16:9'][Math.floor(Math.random() * 4)],
  }));
};

export default function CreateView() {
  const [myArtworks, setMyArtworks] = useState<Artwork[]>([]);
  const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 生成选项
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('写实');
  const [ratio, setRatio] = useState('3:4');
  const [isGenerating, setIsGenerating] = useState(false);

  // 初始化显示的作品（首次加载显示前12个）
  useEffect(() => {
    if (myArtworks.length === 0) {
      const artworks = generateMyArtworks();
      setMyArtworks(artworks);
      setDisplayedArtworks(artworks.slice(0, Math.min(12, artworks.length)));
      setHasMore(artworks.length > 12);
    }
  }, [myArtworks.length]);

  // 触底加载更多
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const currentCount = displayedArtworks.length;
    const nextBatch = myArtworks.slice(currentCount, currentCount + 12);

    if (nextBatch.length > 0) {
      setTimeout(() => {
        setDisplayedArtworks((prev) => [...prev, ...nextBatch]);
        setHasMore(currentCount + nextBatch.length < myArtworks.length);
        setIsLoading(false);
      }, 300);
    } else {
      setHasMore(false);
      setIsLoading(false);
    }
  }, [displayedArtworks.length, isLoading, hasMore, myArtworks]);

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

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    // 模拟生成过程
    setTimeout(() => {
      const newArtwork: Artwork = {
        id: `my-art-${Date.now()}`,
        imageUrl: `https://picsum.photos/seed/new${Date.now()}/400/600`,
        prompt: prompt,
        author: '我',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
        likes: 0,
        downloads: 0,
        createdAt: new Date(),
        style: style,
        ratio: ratio,
      };
      // 将新作品添加到数组开头
      const updatedArtworks = [newArtwork, ...myArtworks];
      setMyArtworks(updatedArtworks);
      // 更新显示列表，显示前12个（包括新作品）
      setDisplayedArtworks(updatedArtworks.slice(0, Math.min(12, updatedArtworks.length)));
      setHasMore(updatedArtworks.length > 12);
      setPrompt('');
      setIsGenerating(false);
    }, 2000);
  };

  const breakpointColumnsObj = {
    default: 5,
    1536: 3,
    1280: 3,
    1024: 2,
    640: 1,
  };

  return (
    <div className="flex gap-6 p-4 md:p-8 pt-6 bg-[var(--color-bg)] min-h-screen">
      {/* 左侧：我的创作瀑布流 */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">我的创作</h2>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            共 {myArtworks.length} 张作品
          </p>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {displayedArtworks.map((artwork) => (
            <div key={artwork.id} className="mb-4 md:mb-6">
              <ArtworkCard artwork={artwork} showAuthor={false} />
            </div>
          ))}
        </Masonry>

        {/* 触底加载触发器 */}
        <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
          {isLoading && (
            <div className="text-[var(--color-text-tertiary)] text-sm">加载中...</div>
          )}
          {!hasMore && displayedArtworks.length > 0 && (
            <div className="text-[var(--color-text-tertiary)] text-sm">— 没有更多了 —</div>
          )}
        </div>
      </div>

      {/* 右侧：生成选项区域 */}
      <div className="w-80 flex-shrink-0 hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <div className="rounded-2xl bg-[var(--color-card)] border border-[var(--color-border-soft)] p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Wand2 size={20} className="text-[var(--color-accent)]" />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">AI 绘画</h3>
            </div>

            {/* 提示词输入 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                提示词
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="描述你想要生成的画面..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none resize-none transition-colors"
              />
            </div>

            {/* 风格选择 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                风格
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['写实', '抽象', '水彩', '油画', '数字艺术', '卡通'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-4 py-2 rounded-full text-sm transition-all cursor-pointer border ${
                      style === s
                        ? 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-md shadow-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/30 border-transparent'
                        : 'bg-[var(--color-card)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] border-[var(--color-border-soft)]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 比例选择 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                比例
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['1:1', '3:4', '4:3', '16:9'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`px-3 py-2 rounded-full text-sm transition-all cursor-pointer border ${
                      ratio === r
                        ? 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-md shadow-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/30 border-transparent'
                        : 'bg-[var(--color-card)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] border-[var(--color-border-soft)]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2 text-white font-medium transition-all active:scale-95"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>生成中...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>开始生成</span>
                </>
              )}
            </button>
          </div>

          {/* 提示卡片 */}
          <div className="rounded-xl bg-[var(--color-card)] border border-[var(--color-border-soft)] p-4">
            <div className="flex items-start space-x-3">
              <ImageIcon size={18} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
              <div className="text-sm text-[var(--color-text-tertiary)]">
                <p className="font-medium text-[var(--color-text-primary)] mb-1">提示技巧</p>
                <p>• 描述越详细，生成效果越好</p>
                <p>• 可以添加风格关键词，如"超现实主义"、"印象派"</p>
                <p>• 支持中英文提示词</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

