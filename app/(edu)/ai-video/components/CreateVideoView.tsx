'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { Wand2, Sparkles, Loader2, Film, SlidersHorizontal } from 'lucide-react';
import VideoCard, { VideoWork } from './VideoCard';

// 模拟我的视频制作数据
const generateMyVideos = (): VideoWork[] => {
  const durations = ['00:30', '00:45', '01:00', '01:30', '02:00'];
  return Array.from({ length: 24 }, (_, i) => ({
    id: `my-video-${i + 1}`,
    coverUrl: `https://picsum.photos/seed/video${i + 1}/400/600`,
    prompt: `创意短视频 ${i + 1}：融合多场景镜头、动效与字幕，突出故事节奏与氛围`,
    author: '我',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
    likes: Math.floor(Math.random() * 2000),
    downloads: Math.floor(Math.random() * 800),
    duration: durations[Math.floor(Math.random() * durations.length)],
    style: ['纪实', '潮流', '剧情', '科幻', '动画'][Math.floor(Math.random() * 5)],
    ratio: ['9:16', '1:1', '16:9'][Math.floor(Math.random() * 3)],
  }));
};

export default function CreateVideoView() {
  const [videos, setVideos] = useState<VideoWork[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<VideoWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 生成选项
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('剧情');
  const [ratio, setRatio] = useState('9:16');
  const [duration, setDuration] = useState('00:30');
  const [isGenerating, setIsGenerating] = useState(false);

  // 初始化显示（前12条）
  useEffect(() => {
    if (videos.length === 0) {
      const data = generateMyVideos();
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

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newVideo: VideoWork = {
        id: `my-video-${Date.now()}`,
        coverUrl: `https://picsum.photos/seed/newvideo${Date.now()}/400/600`,
        prompt,
        author: '我',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
        likes: 0,
        downloads: 0,
        duration,
        style,
        ratio,
      };
      const updated = [newVideo, ...videos];
      setVideos(updated);
      setDisplayedVideos(updated.slice(0, Math.min(12, updated.length)));
      setHasMore(updated.length > 12);
      setPrompt('');
      setIsGenerating(false);
    }, 1500);
  };

  const breakpointColumnsObj = {
    default: 3,
    1536: 4,
    1280: 3,
    1024: 3,
    640: 2,
  };

  return (
    <div className="flex gap-6 p-4 md:p-8 pt-6 bg-[var(--color-bg)] min-h-screen">
      {/* 左侧：我的视频瀑布流 */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">我的视频</h2>
          <p className="text-sm text-[var(--color-text-tertiary)]">共 {videos.length} 个作品</p>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {displayedVideos.map((video) => (
            <div key={video.id} className="mb-4 md:mb-6">
              <VideoCard video={video} showAuthor={false} />
            </div>
          ))}
        </Masonry>

        {/* 触底加载触发器 */}
        <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
          {isLoading && <div className="text-[var(--color-text-tertiary)] text-sm">加载中...</div>}
          {!hasMore && displayedVideos.length > 0 && (
            <div className="text-[var(--color-text-tertiary)] text-sm">— 没有更多了 —</div>
          )}
        </div>
      </div>

      {/* 右侧：生成选项 */}
      <div className="w-80 flex-shrink-0 hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <div className="rounded-2xl bg-[var(--color-card)] border border-[var(--color-border-soft)] p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Film size={20} className="text-[var(--color-accent)]" />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">AI 视频制作</h3>
            </div>

            {/* 提示词 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                视频脚本 / 提示词
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="描述故事、画面、镜头、字幕等…"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none resize-none transition-colors"
              />
            </div>

            {/* 风格 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">风格</label>
              <div className="grid grid-cols-2 gap-2">
                {['剧情', '纪实', '科幻', '潮流', '动画', '混剪'].map((s) => (
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

            {/* 画幅 & 时长 */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">画幅</label>
                <div className="grid grid-cols-2 gap-2">
                  {['9:16', '16:9', '1:1', '4:5'].map((r) => (
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

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">时长</label>
                <div className="grid grid-cols-2 gap-2">
                  {['00:30', '00:45', '01:00', '01:30', '02:00', '03:00'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-3 py-2 rounded-full text-sm transition-all cursor-pointer border ${
                        duration === d
                          ? 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-md shadow-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/30 border-transparent'
                          : 'bg-[var(--color-card)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] border-[var(--color-border-soft)]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2 font-medium transition-all active:scale-95 shadow-md shadow-[var(--color-accent)]/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>生成中...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>开始生成视频</span>
                </>
              )}
            </button>
          </div>

          {/* 小提示 */}
          <div className="rounded-xl bg-[var(--color-card)] border border-[var(--color-border-soft)] p-4">
            <div className="flex items-start space-x-3">
              <SlidersHorizontal size={18} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
              <div className="text-sm text-[var(--color-text-tertiary)]">
                <p className="font-medium text-[var(--color-text-primary)] mb-1">提示技巧</p>
                <p>• 补充镜头、场景、字幕、转场、音乐偏好</p>
                <p>• 明确节奏与情绪，如“快节奏”“温暖”</p>
                <p>• 可指定分镜数量、字幕风格与配音语言</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

