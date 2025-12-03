'use client';

import { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
} from 'lucide-react';

import { Video } from '@/types/content';
import ActionButton from './ActionButton';
import KnowledgeInteractionPanel from './KnowledgeInteractionPanel';

type FeedVideoItemProps = {
  video: Video;
  isActive: boolean;
};

const FeedVideoItem = ({ video, isActive }: FeedVideoItemProps) => {
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const commentCount =
    parseInt(video.comments.replace('w', '000').replace(',', '')) >= 10000
      ? video.comments
      : '1000';

  return (
    <div className="w-full h-full flex flex-row items-center justify-center relative">
      <div
        className={`relative h-full flex items-center justify-center ${video.color} overflow-hidden transition-[width] duration-300 ease-in-out ${isPanelOpen
            ? 'flex-1 lg:w-[70%] rounded-l-xl md:rounded-l-2xl'
            : 'w-full rounded-xl md:rounded-2xl'
          }`}
      >
        <div
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{ background: video.coverUrl }}
        ></div>

        <div className="relative z-10 h-full w-full flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-tertiary)] text-2xl font-mono select-none">
            <div className="text-7xl mb-4">📹</div>
            <p>{isActive ? '正在播放...' : '暂停中...'}</p>
          </div>

          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="text-[var(--color-text-primary)] drop-shadow-lg mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={video.authorAvatar}
                  className="w-10 h-10 rounded-full border-2 border-[var(--color-border-soft)] mr-2"
                  alt="Author"
                />
                <span className="font-bold text-lg hover:underline cursor-pointer">
                  {video.author}
                </span>
                <button className="ml-3 bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                  关注
                </button>
              </div>
              <p className="text-lg font-semibold leading-snug mb-2">
                {video.title}
              </p>
              <p className="text-sm line-clamp-1 text-[var(--color-text-secondary)]">
                {video.description.split('#')[0]}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {video.description.match(/#\w+/g)?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[var(--color-accent)] text-sm hover:underline cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 p-4 space-y-6 flex flex-col items-center">
            {/* 点赞图标 */}
            <ActionButton
              icon={Heart}
              label={video.likes}
              isActive={liked}
              onClick={() => setLiked(!liked)}
              activeColor="text-red-500"
            />
            {/* 评论图标 */}
            <ActionButton 
              icon={MessageCircle}
              label={commentCount}
              isActive={isPanelOpen}
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              activeColor="text-[var(--color-accent)]"
            />
            <ActionButton icon={BookOpen} label="知识点" />
            <ActionButton icon={Share2} label="分享" />
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="cursor-pointer text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors p-2 bg-[var(--color-card)] rounded-full backdrop-blur-sm"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      <KnowledgeInteractionPanel video={video} isExpanded={isPanelOpen} />
    </div>
  );
};

export default FeedVideoItem;

