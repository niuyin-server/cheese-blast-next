'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/virtual';

import { Video } from '@/types/content';
import FeedVideoItem from './FeedVideoItem';
import { fetchVideoFeed } from '@/app/api/video';
import { adaptApiVideoToVideo } from '@/app/utils/videoAdapter';

type RecommendedFeedViewProps = {
  videos: Video[];
};

const RecommendedFeedView = ({ videos }: RecommendedFeedViewProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedVideos, setFeedVideos] = useState<Video[]>(videos);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const isTransitioningRef = useRef(false);

  const loadMoreVideos = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setLoadError(null);
    try {
      const response = await fetchVideoFeed();
      if (response.code === 200 && response.data?.length) {
        setFeedVideos((prev) => {
          const startIndex = prev.length;
          const newVideos = response.data.map((item, idx) =>
            adaptApiVideoToVideo(item, startIndex + idx),
          );
          return [...prev, ...newVideos];
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more videos:', error);
      setLoadError(error instanceof Error ? error.message : '加载更多内容失败');
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore]);

  useEffect(() => {
    if (!hasMore || isLoadingMore) return;
    if (feedVideos.length - activeIndex <= 3) {
      loadMoreVideos();
    }
  }, [activeIndex, feedVideos.length, hasMore, isLoadingMore, loadMoreVideos]);

  const handleSlideChangeTransitionStart = (swiper: SwiperType) => {
    // 切换开始时，标记为正在切换，暂停所有视频
    isTransitioningRef.current = true;
    console.log('Swiper transition started, pausing all videos');
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;
    console.log('Swiper slide changed to index:', newIndex);
    setActiveIndex(newIndex);
  };

  const handleSlideChangeTransitionEnd = (swiper: SwiperType) => {
    // 切换结束后，标记切换完成，允许当前视频播放
    isTransitioningRef.current = false;
    const newIndex = swiper.activeIndex;
    console.log('Swiper transition ended, index:', newIndex);
    setActiveIndex(newIndex);
  };

  if (feedVideos.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center text-[var(--color-text-tertiary)] text-lg">
        该UP主暂无最新动态
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[var(--color-bg)]">
      <Swiper
        direction="vertical"
        modules={[Virtual, Mousewheel]}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        className="h-full"
        virtual={{
          enabled: true,
        }}
        speed={350}
        allowTouchMove={true}
        touchRatio={1}
        threshold={10}
        resistance={true}
        resistanceRatio={0.85}
        mousewheel={{
          enabled: true,
          sensitivity: 1,
          releaseOnEdges: false,
          forceToAxis: true,
        }}
      >
        {feedVideos.map((video, index) => (
          <SwiperSlide key={`${video.id}-${index}`}>
            <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center p-4 xl:p-8">
              <FeedVideoItem video={video} isActive={index === activeIndex} />
            </div>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div className="w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center text-[var(--color-text-tertiary)] space-y-2">
            {isLoadingMore && <span>加载更多内容中…</span>}
            {!isLoadingMore && loadError && (
              <span className="text-red-400">加载失败：{loadError}</span>
            )}
            {!isLoadingMore && !loadError && !hasMore && <span>— 已加载全部关注内容 —</span>}
            {!isLoadingMore && !loadError && hasMore && <span>继续下滑加载更多内容</span>}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default RecommendedFeedView;

