'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type ImageCarouselProps = {
  images: string[];
  className?: string;
};

const ImageCarousel = ({ images, className = '' }: ImageCarouselProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-full"
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
    </div>
  );
};

export default ImageCarousel;

