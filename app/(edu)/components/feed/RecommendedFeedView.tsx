'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/virtual';

import { Video } from '@/types/content';
import FeedVideoItem from './FeedVideoItem';

type RecommendedFeedViewProps = {
  videos: Video[];
};

const RecommendedFeedView = ({ videos }: RecommendedFeedViewProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  if (videos.length === 0) {
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
        className="h-full"
        virtual={{
          enabled: true,
        }}
        speed={500}
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
        {videos.map((video, index) => (
          <SwiperSlide key={`${video.id}-${index}`}>
            <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center p-4 xl:p-6">
              <FeedVideoItem video={video} isActive={index === activeIndex} />
            </div>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center text-[var(--color-text-tertiary)]">
            — 已加载全部关注内容 —
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default RecommendedFeedView;

