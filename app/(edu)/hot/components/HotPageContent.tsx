'use client';

import { useState } from 'react';

import VideoPlayerModal from '@/app/(edu)/components/modal/VideoPlayerModal';
import { Video } from '@/types/content';
import HotView from './HotView';

const HotPageContent = () => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  return (
    <>
      <HotView onVideoClick={setCurrentVideo} />
      {currentVideo && (
        <VideoPlayerModal video={currentVideo} onClose={() => setCurrentVideo(null)} />
      )}
    </>
  );
};

export default HotPageContent;


