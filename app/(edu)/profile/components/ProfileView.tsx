'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Award, MoreHorizontal } from 'lucide-react';

import { HOME_VIDEOS, USER_PROFILE } from '@/app/data/content';
import ProfileListSection from './tabs/ProfileListSection';
import ProfileWorks from './tabs/ProfileWorks';

type UseInfiniteTitlesResult = {
  displayed: string[];
  triggerRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  hasMore: boolean;
};

const useInfiniteTitles = (
  pool: string[],
  initialBatch: number,
  isActive: boolean,
): UseInfiniteTitlesResult => {
  const [count, setCount] = useState(() => Math.min(initialBatch, pool.length));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(pool.length > initialBatch);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setCount((prev) => {
        const next = Math.min(prev + initialBatch, pool.length);
        if (next >= pool.length) {
          setHasMore(false);
        }
        return next;
      });
      setIsLoading(false);
    }, 400);
  }, [hasMore, initialBatch, isLoading, pool.length]);

  useEffect(() => {
    setCount(Math.min(initialBatch, pool.length));
    setHasMore(pool.length > initialBatch);
  }, [initialBatch, pool]);

  useEffect(() => {
    if (!isActive || !hasMore) return;
    const target = triggerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: '120px', threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isActive, loadMore, hasMore]);

  const displayed = useMemo(() => pool.slice(0, count), [pool, count]);

  return { displayed, triggerRef, isLoading, hasMore };
};

const mergeTitles = (primary: string[]): string[] => {
  const unique = new Set<string>();
  primary.forEach((title) => unique.add(title));
  HOME_VIDEOS.forEach((video) => unique.add(video.title));
  return Array.from(unique);
};

const tabs = [
  { key: 'works', label: '作品', count: '12' },
  { key: 'likes', label: '喜欢', count: '284' },
  { key: 'favorites', label: '收藏', count: '33' },
];

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState<'works' | 'likes' | 'favorites'>('works');

  const worksPool = useMemo(() => HOME_VIDEOS.map((video) => video.title), []);
  const likesPool = useMemo(() => mergeTitles(USER_PROFILE.likedList), []);
  const favoritesPool = useMemo(() => mergeTitles(USER_PROFILE.favoriteList), []);

  const worksState = useInfiniteTitles(worksPool, 10, activeTab === 'works');
  const likesState = useInfiniteTitles(likesPool, 6, activeTab === 'likes');
  const favoritesState = useInfiniteTitles(favoritesPool, 6, activeTab === 'favorites');

  const renderLoadIndicator = (
    ref: React.RefObject<HTMLDivElement | null>,
    isLoading: boolean,
    hasMore: boolean,
    finishedText: string,
  ) => (
    <div
      ref={ref}
      className="h-12 flex items-center justify-center mt-6 text-xs text-[var(--color-text-tertiary)]"
    >
      {isLoading && <span className="animate-pulse">加载中...</span>}
      {!isLoading && !hasMore && <span>{finishedText}</span>}
    </div>
  );

  return (
    <div className="p-4 md:p-8 pt-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-12">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-600">
            <img
              src={USER_PROFILE.avatar}
              className="w-full h-full rounded-full border-4 border-[var(--color-bg)] object-cover"
              alt="Avatar"
            />
          </div>
          <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full border border-[var(--color-bg)]">
            Lv.8
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{USER_PROFILE.name}</h1>
          <div className="text-[var(--color-text-tertiary)] text-sm mb-4">ID: {USER_PROFILE.id}</div>

          <div className="flex justify-center md:justify-start space-x-8 mb-6">
            <Stat label="关注" value={USER_PROFILE.following} />
            <Stat label="粉丝" value={USER_PROFILE.followers} />
            <Stat label="获赞" value={USER_PROFILE.likes} />
          </div>

          <div className="max-w-2xl text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6 mx-auto md:mx-0">
            {USER_PROFILE.bio}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {USER_PROFILE.badges.map((badge) => (
              <span
                key={badge}
                className="px-2 py-1 bg-[var(--color-card)] text-[var(--color-accent)] text-xs rounded-full border border-[var(--color-border-soft)] flex items-center"
              >
                <Award size={12} className="mr-1" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-medium text-sm transition-colors">
            编辑资料
          </button>
          <button className="px-4 py-2 bg-[var(--color-card)] hover:bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-full transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="border-b border-[var(--color-border-soft)] mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`pb-3 text-sm font-medium transition-all relative cursor-pointer ${
                activeTab === tab.key
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              {tab.label}
              <span className="ml-1 text-xs text-[var(--color-text-tertiary)]">{tab.count}</span>
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 内容区域 */}
      {activeTab === 'works' && (
        <>
          <ProfileWorks items={worksState.displayed} />
          {renderLoadIndicator(
            worksState.triggerRef,
            worksState.isLoading,
            worksState.hasMore,
            '— 没有更多作品了 —',
          )}
        </>
      )}

      {activeTab === 'likes' && (
        <>
          <ProfileListSection items={likesState.displayed} emptyText="暂无喜欢记录" />
          {renderLoadIndicator(
            likesState.triggerRef,
            likesState.isLoading,
            likesState.hasMore,
            '— 没有更多喜欢记录了 —',
          )}
        </>
      )}

      {activeTab === 'favorites' && (
        <>
          <ProfileListSection items={favoritesState.displayed} emptyText="暂无收藏内容" />
          {renderLoadIndicator(
            favoritesState.triggerRef,
            favoritesState.isLoading,
            favoritesState.hasMore,
            '— 没有更多收藏内容了 —',
          )}
        </>
      )}
    </div>
  );
};

type StatProps = {
  label: string;
  value: string | number;
};

const Stat = ({ label, value }: StatProps) => (
  <div className="flex items-baseline space-x-1">
    <span className="text-[var(--color-text-primary)] font-bold text-xl">{value}</span>
    <span className="text-[var(--color-text-tertiary)] text-xs">{label}</span>
  </div>
);

export default ProfileView;

