'use client';

import { useState } from 'react';

import ExploreView from '@/components/edu/explore/ExploreView';
import VideoPlayerModal from '@/components/edu/modal/VideoPlayerModal';
import { Video } from '@/types/content';

const ExplorePageContent = () => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  return (
    <>
      <ExploreView onVideoClick={setCurrentVideo} />
      {currentVideo && (
        <VideoPlayerModal
          video={currentVideo}
          onClose={() => setCurrentVideo(null)}
        />
      )}
    </>
  );
};

export default ExplorePageContent;

