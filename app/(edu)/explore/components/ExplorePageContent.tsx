'use client';

import { useState } from 'react';

import VideoPlayerModal from '@/app/(edu)/components/modal/VideoPlayerModal';
import { Video } from '@/types/content';
import ExploreView from './ExploreView';

const ExplorePageContent = () => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  return (
    <>
      <ExploreView onVideoClick={setCurrentVideo} />
      {currentVideo && (
        <VideoPlayerModal video={currentVideo} onClose={() => setCurrentVideo(null)} />
      )}
    </>
  );
};

export default ExplorePageContent;

