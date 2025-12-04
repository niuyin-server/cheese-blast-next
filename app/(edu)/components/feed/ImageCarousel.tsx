'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';

type ImageCarouselProps = {
  images: string[];
  className?: string;
};

const ImageCarousel = ({ images, className = '' }: ImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full h-full ${className} group`}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-y-0 left-0 flex items-center z-40 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className={`p-3 rounded-full cursor-pointer backdrop-blur-lg text-white transition-all shadow-lg border border-white/15 ${
            activeIndex === 0
              ? 'bg-black/20 cursor-not-allowed opacity-40'
              : 'bg-black/40 hover:bg-black/60'
          }`}
          disabled={activeIndex === 0 || images.length <= 1}
        >
          <ChevronLeft size={20} />
          <span className="sr-only">上一张</span>
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-40 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className={`p-3 rounded-full cursor-pointer backdrop-blur-lg text-white transition-all shadow-lg border border-white/15 ${
            activeIndex === images.length - 1
              ? 'bg-black/20 cursor-not-allowed opacity-40'
              : 'bg-black/40 hover:bg-black/60'
          }`}
          disabled={activeIndex === images.length - 1 || images.length <= 1}
        >
          <ChevronRight size={20} />
          <span className="sr-only">下一张</span>
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] max-w-sm z-40 pointer-events-none group-hover:pointer-events-auto">
        <div className="flex items-center space-x-2 bg-black/35 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 shadow-lg">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                swiperRef.current?.slideTo(index);
                setActiveIndex(index);
              }}
              className={`flex-1 h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 ${
                activeIndex === index
                  ? 'bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            >
              <span className="sr-only">切换到第 {index + 1} 张图片</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;

