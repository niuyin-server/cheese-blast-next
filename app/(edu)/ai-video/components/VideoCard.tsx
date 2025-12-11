'use client';

import { useState } from 'react';
import { Heart, Download, Share2, Play } from 'lucide-react';

export interface VideoWork {
  id: string;
  coverUrl: string;
  prompt: string;
  author: string;
  authorAvatar: string;
  likes: number;
  downloads: number;
  duration: string;
  style?: string;
  ratio?: string;
}

type VideoCardProps = {
  video: VideoWork;
  onClick?: (video: VideoWork) => void;
  showAuthor?: boolean;
};

const VideoCard = ({ video, onClick, showAuthor = true }: VideoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 下载逻辑
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 分享逻辑
  };

  return (
    <div
      onClick={() => onClick?.(video)}
      className="group relative bg-[var(--color-surface)] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-[var(--color-border-soft)]"
    >
      <div className="relative overflow-hidden">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="w-full aspect-[3/4] bg-[var(--color-card)] animate-pulse flex items-center justify-center">
                <div className="text-[var(--color-text-tertiary)] text-sm">加载中...</div>
              </div>
            )}
            <img
              src={video.coverUrl}
              alt={video.prompt}
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
              }`}
              style={{ aspectRatio: '3/4' }}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          </>
        ) : (
          <div className="w-full aspect-[3/4] bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-sm">封面加载失败</span>
          </div>
        )}

        {/* 悬浮播放/操作 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 dark:bg-black/30">
          <div className="w-14 h-14 bg-white/20 dark:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-primary)] mb-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Heart size={14} className={isLiked ? 'fill-red-500 text-red-500' : 'fill-[var(--color-text-tertiary)]'} />
                <span>{likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download size={14} />
                <span>{video.downloads}</span>
              </div>
            </div>
            <span className="bg-[var(--color-card)] px-1.5 py-0.5 rounded text-[10px] text-[var(--color-text-tertiary)]">
              {video.duration}
            </span>
          </div>
        </div>
      </div>

      {/* 文案区域 */}
      <div className="p-4">
        <p className="text-[var(--color-text-primary)] text-sm line-clamp-2 leading-relaxed mb-3 group-hover:text-[var(--color-accent)] transition-colors min-h-[2.5rem]">
          {video.prompt}
        </p>
        {showAuthor && (
          <div className="flex items-center space-x-2">
            <img
              src={video.authorAvatar}
              className="w-6 h-6 rounded-full bg-[var(--color-card)]"
              alt={video.author}
            />
            <span className="text-xs text-[var(--color-text-tertiary)] truncate flex-1">
              {video.author}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;

