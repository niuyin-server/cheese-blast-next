'use client';

import { useState } from 'react';

import { CATEGORIES, HOME_VIDEOS } from '@/app/data/content';
import { Video } from '@/types/content';
import VideoCard from './VideoCard';

type ExploreViewProps = {
  onVideoClick: (video: Video) => void;
};

const ExploreView = ({ onVideoClick }: ExploreViewProps) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(idx)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === idx
                ? 'bg-white text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {HOME_VIDEOS.map((video, idx) => (
          <VideoCard key={`${video.id}-${idx}`} video={video} onClick={onVideoClick} />
        ))}
      </div>

      <div className="mt-12 text-center text-gray-600 text-sm pb-8">没有更多内容了</div>
    </div>
  );
};

export default ExploreView;

