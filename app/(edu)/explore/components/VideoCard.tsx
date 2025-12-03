'use client';

import { useState } from 'react';
import { BookOpen, Heart, MoreHorizontal, Play } from 'lucide-react';

import { Video } from '@/types/content';
import { getVideoCoverUrl } from '../utils/imageUtils';

type VideoCardProps = {
  video: Video;
  onClick: (video: Video) => void;
};

const VideoCard = ({ video, onClick }: VideoCardProps) => {
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
      className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {isImageUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
                <div className="text-gray-600 text-xs">加载中...</div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={video.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: video.coverUrl }}
          />
        )}

      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] flex items-center border border-white/5">
        <BookOpen size={10} className="mr-1 text-cyan-400" />
        <span className="text-gray-200">知识点</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
          <Play size={24} className="text-white fill-white ml-1" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent">
        <div className="flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center space-x-1">
            <Heart size={12} />
            <span>{video.likes}</span>
          </div>
          <span className="bg-gray-800/80 px-1.5 py-0.5 rounded text-[10px] text-gray-400">
            01:30
          </span>
        </div>
      </div>
    </div>

    <div className="p-3">
      <h3 className="text-gray-200 text-sm font-medium line-clamp-2 leading-relaxed mb-2 h-10 group-hover:text-cyan-400 transition-colors">
        {video.title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <img
            src={video.authorAvatar}
            className="w-5 h-5 rounded-full bg-gray-700"
            alt=""
          />
          <span className="truncate max-w-[80px]">{video.author}</span>
        </div>
        <MoreHorizontal size={14} className="text-gray-600 hover:text-gray-400" />
      </div>
    </div>
  </div>
  );
};

export default VideoCard;

