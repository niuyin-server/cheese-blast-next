'use client';

import { useState } from 'react';
import { Heart, Download, Share2, MoreVertical } from 'lucide-react';

export interface Artwork {
  id: string;
  imageUrl: string;
  prompt: string;
  author: string;
  authorAvatar: string;
  likes: number;
  downloads: number;
  createdAt: Date;
  style?: string;
  ratio?: string;
}

type ArtworkCardProps = {
  artwork: Artwork;
  onClick?: (artwork: Artwork) => void;
  showAuthor?: boolean;
};

const ArtworkCard = ({ artwork, onClick, showAuthor = true }: ArtworkCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(artwork.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
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
      onClick={() => onClick?.(artwork)}
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
              src={artwork.imageUrl}
              alt={artwork.prompt}
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
          <div className="w-full aspect-[3/4] bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
            <span className="text-white text-sm">图片加载失败</span>
          </div>
        )}

        {/* 悬浮操作按钮 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 dark:bg-black/50">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleLike}
              className="w-12 h-12 rounded-full backdrop-blur-sm bg-white/20 dark:bg-white/20 flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/30 transition-colors cursor-pointer"
            >
              <Heart size={20} className={`text-white ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={handleDownload}
              className="w-12 h-12 rounded-full backdrop-blur-sm bg-white/20 dark:bg-white/20 flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/30 transition-colors cursor-pointer"
            >
              <Download size={20} className="text-white" />
            </button>
            <button
              onClick={handleShare}
              className="w-12 h-12 rounded-full backdrop-blur-sm bg-white/20 dark:bg-white/20 flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/30 transition-colors cursor-pointer"
            >
              <Share2 size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-primary)] mb-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Heart size={14} className={isLiked ? 'fill-red-500 text-red-500' : 'fill-[var(--color-text-tertiary)]'} />
                <span>{likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download size={14} />
                <span>{artwork.downloads}</span>
              </div>
            </div>
            {artwork.style && (
              <span className="bg-[var(--color-card)] backdrop-blur-md px-2 py-1 rounded text-[10px] text-[var(--color-text-tertiary)] border border-[var(--color-border-soft)]">
                {artwork.style}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 提示词区域 - 所有卡片都显示 */}
      <div className="p-4">
        <p className="text-[var(--color-text-primary)] text-sm line-clamp-2 leading-relaxed mb-3 group-hover:text-[var(--color-accent)] transition-colors min-h-[2.5rem]">
          {artwork.prompt}
        </p>
        {showAuthor && (
          <div className="flex items-center space-x-2">
            <img
              src={artwork.authorAvatar}
              className="w-6 h-6 rounded-full bg-[var(--color-card)]"
              alt={artwork.author}
            />
            <span className="text-xs text-[var(--color-text-tertiary)] truncate flex-1">
              {artwork.author}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkCard;

