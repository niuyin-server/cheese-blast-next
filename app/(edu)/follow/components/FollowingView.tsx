'use client';

import { useMemo, useState } from 'react';

import { ALL_VIDEOS, FOLLOWED_USERS } from '@/app/data/content';
import RecommendedFeedView from '@/app/(edu)/components/feed/RecommendedFeedView';
import FollowedUserCard from './FollowedUserCard';

const FollowingView = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const videosForFeed = useMemo(() => {
    const filtered = selectedUserId
      ? ALL_VIDEOS.filter((video) => video.userId === selectedUserId)
      : ALL_VIDEOS;
    return [...filtered, ...filtered];
  }, [selectedUserId]);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <div className="w-1/4 max-w-sm border-r border-white/5 bg-gray-950/70 backdrop-blur-sm overflow-y-auto p-4 space-y-2 flex-shrink-0 custom-scrollbar">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">
          我的关注 ({FOLLOWED_USERS.length})
        </h2>

        <FollowedUserCard
          user={{
            id: null,
            name: '全部关注',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ALL',
          }}
          isSelected={selectedUserId === null}
          onClick={setSelectedUserId}
        />

        {FOLLOWED_USERS.map((user) => (
          <FollowedUserCard
            key={user.id}
            user={user}
            isSelected={selectedUserId === user.id}
            onClick={setSelectedUserId}
          />
        ))}
      </div>

      <div className="flex-1 bg-black">
        <RecommendedFeedView videos={videosForFeed} />
      </div>
    </div>
  );
};

export default FollowingView;

