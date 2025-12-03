'use client';

import { useState } from 'react';
import { BookOpen, Heart, MessageCircle, Play } from 'lucide-react';

import { Video } from '@/types/content';
import { getVideoCoverUrl } from '../utils/imageUtils';

type WaterfallVideoCardProps = {
  video: Video;
  onClick: (video: Video) => void;
};

const WaterfallVideoCard = ({ video, onClick }: WaterfallVideoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 获取图片 URL（如果是渐变背景，则转换为网络图片）
  const imageUrl = getVideoCoverUrl(video.id, video.coverUrl);
  
  // 判断是否是网络图片链接
  const isImageUrl = imageUrl.startsWith('http://') || 
                     imageUrl.startsWith('https://') ||
                     imageUrl.startsWith('//');

  return (
    <div
      onClick={() => onClick(video)}
      className="group relative bg-[var(--color-surface)] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-[var(--color-border-soft)]"
    >
      <div className="relative overflow-hidden">
        {isImageUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="w-full aspect-[3/4] bg-[var(--color-card)] animate-pulse flex items-center justify-center">
                <div className="text-[var(--color-text-tertiary)] text-sm">加载中...</div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={video.title}
              className={`w-full object-cover transition-opacity duration-300 ${
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
          <div
            className="w-full aspect-[3/4] transition-transform duration-700 group-hover:scale-105"
            style={{ background: video.coverUrl }}
          />
        )}

        <div className="absolute top-2 right-2 bg-[var(--color-card)] backdrop-blur-md px-2 py-1 rounded-md text-[10px] flex items-center border border-[var(--color-border-soft)]">
          <BookOpen size={10} className="mr-1 text-[var(--color-accent)]" />
          <span className="text-[var(--color-text-primary)]">知识点</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 dark:bg-black/30">
          <div className="w-14 h-14 bg-white/20 dark:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-primary)] mb-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Heart size={14} className="fill-[var(--color-text-tertiary)]" />
                <span>{video.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle size={14} />
                <span>{video.comments}</span>
              </div>
            </div>
            <span className="bg-[var(--color-card)] px-1.5 py-0.5 rounded text-[10px] text-[var(--color-text-tertiary)]">
              01:30
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[var(--color-text-primary)] text-sm font-semibold line-clamp-2 leading-relaxed mb-3 group-hover:text-[var(--color-accent)] transition-colors min-h-[2.5rem]">
          {video.title}
        </h3>
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
        {video.description && (
          <p className="text-xs text-[var(--color-text-tertiary)] mt-2 line-clamp-1">
            {video.description.split('#')[0]}
          </p>
        )}
      </div>
    </div>
  );
};

export default WaterfallVideoCard;

