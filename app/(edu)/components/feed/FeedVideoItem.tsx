'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
} from 'lucide-react';

import { Video } from '@/types/content';
import ActionButton from './ActionButton';
import KnowledgeInteractionPanel from './KnowledgeInteractionPanel';
import ImageCarousel from './ImageCarousel';

type FeedVideoItemProps = {
  video: Video;
  isActive: boolean;
};

const FeedVideoItem = ({ video, isActive }: FeedVideoItemProps) => {
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const readyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const commentCount =
    parseInt(video.comments.replace('w', '000').replace(',', '')) >= 10000
      ? video.comments
      : '1000';

  // 判断是否为图片类型
  const isImageType = video.publishType === '1';
  const hasVideoUrl = video.videoUrl && video.videoUrl.trim() !== '';
  const hasImageList = video.imageList && video.imageList.length > 0;
  const coverImage = video.coverImage || video.coverUrl;

  // 调试信息
  useEffect(() => {
    if (hasVideoUrl && !isImageType) {
      console.log('Video URL:', video.videoUrl);
      console.log('Is Active:', isActive);
      console.log('Is Ready:', isReady);
      console.log('Is Playing:', isPlaying);
    }
  }, [hasVideoUrl, isImageType, isActive, isReady, isPlaying, video.videoUrl]);

  // 处理激活状态变化 - 非激活时自动暂停
  useEffect(() => {
    if (!hasVideoUrl || isImageType || !videoRef.current) return;

    if (!isActive && isPlaying) {
      // 非激活状态时立即暂停
      console.log('Pausing video, isActive:', isActive, 'video:', video.videoUrl);
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, hasVideoUrl, isImageType, video.videoUrl, isPlaying]);

  // 手动播放/暂停控制
  const handlePlayPause = async () => {
    if (!hasVideoUrl || isImageType || !isActive || !videoRef.current) return;

    if (!isReady) {
      console.log('Video not ready yet');
      return;
    }

    try {
      if (isPlaying) {
        // 暂停
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // 播放
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.error('Error controlling video playback:', error);
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error controlling video playback:', error);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // 当视频URL变化时重置状态
  useEffect(() => {
    setIsReady(false);
    setIsPlaying(false); // 默认暂停状态
    setPlayerError(false);
    setDuration(0);
    setCurrentTime(0);
    setSeekValue(0);
    setIsSeeking(false);

    // 清理 ready 超时
    if (readyTimeoutRef.current) {
      clearTimeout(readyTimeoutRef.current);
      readyTimeoutRef.current = null;
    }

    // 如果视频URL存在，设置一个超时，如果15秒内没有ready，强制设置为ready
    if (hasVideoUrl && !isImageType && video.videoUrl) {
      console.log('Video URL changed, resetting state:', video.videoUrl);
      readyTimeoutRef.current = setTimeout(() => {
        setIsReady((prevReady) => {
          if (!prevReady) {
            console.warn('Video ready timeout after 15s, forcing ready state. Video URL:', video.videoUrl);
            setPlayerError(false);
            return true;
          }
          return prevReady;
        });
      }, 15000);
    }

    return () => {
      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
        readyTimeoutRef.current = null;
      }
    };
  }, [video.videoUrl, hasVideoUrl, isImageType]);

  // 同步播放状态到 video 元素（仅在手动控制时使用）
  // 注意：video 元素的 onPlay/onPause 事件会自动同步状态，这里主要用于外部控制

  return (
    <div className="w-full h-full flex flex-row items-center justify-center relative">
      <div
        className={`relative h-full flex items-center justify-center overflow-hidden transition-[width] duration-300 ease-in-out ${isPanelOpen
          ? 'flex-1 lg:w-[70%] rounded-l-xl md:rounded-l-2xl'
          : 'w-full rounded-xl md:rounded-2xl'
          }`}
      >
        {/* 原有的模糊背景层 - 保留作为装饰 */}
        <div
          className="absolute inset-0 opacity-20 blur-3xl z-0"
          style={{
            backgroundImage: coverImage ? `url(${coverImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="relative z-10 h-full w-full flex items-center justify-center shadow-2xl">
          {/* 封面图片 - 作为背景层，带 blur 效果，在视频/图片下方 */}
          {coverImage && (
            <div className="absolute inset-0 w-full h-full z-[5]">
              <img
                src={coverImage}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              {/* Blur 遮罩层 */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>
            </div>
          )}

          {/* 视频播放器或图片轮播 */}
          {isImageType && hasImageList ? (
            <div className="absolute inset-0 w-full h-full z-10">
              <ImageCarousel images={video.imageList!} />
            </div>
          ) : hasVideoUrl ? (
            <div className="absolute inset-0 w-full h-full z-20 group">
              <div className={`absolute inset-0 flex items-center justify-center bg-black/50 z-30 transition-opacity duration-300 ${isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}>
                <div className="text-white text-sm">加载中...</div>
              </div>
              {/* 播放/暂停按钮 - 居中显示，播放时隐藏，hover时显示 */}
              {isReady && (
                <div className={`absolute inset-0 flex items-center justify-center z-40 pointer-events-none transition-opacity duration-200 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                  }`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                    className="pointer-events-auto cursor-pointer w-20 h-20 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/30 shadow-lg hover:scale-105"
                    aria-label={isPlaying ? '暂停' : '播放'}
                  >
                    {isPlaying ? (
                      <Pause size={32} className="text-white fill-white ml-0.5" />
                    ) : (
                      <Play size={32} className="text-white fill-white ml-1" />
                    )}
                  </button>
                </div>
              )}
              <video
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                ref={videoRef}
                src={video.videoUrl || ''}
                muted={isMuted}
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-contain z-10"
                onLoadedMetadata={() => {
                  console.log('Video loaded metadata:', video.videoUrl);
                  if (!isReady) {
                    setIsReady(true);
                    setPlayerError(false);
                    if (readyTimeoutRef.current) {
                      clearTimeout(readyTimeoutRef.current);
                      readyTimeoutRef.current = null;
                    }
                  }
                  if (videoRef.current) {
                    const metaDuration = videoRef.current.duration || 0;
                    setDuration(metaDuration);
                    setCurrentTime(videoRef.current.currentTime || 0);
                    setSeekValue(videoRef.current.currentTime || 0);
                  }
                }}
                onLoadedData={() => {
                  console.log('Video loaded data:', video.videoUrl);
                  if (!isReady) {
                    setIsReady(true);
                    setPlayerError(false);
                    if (readyTimeoutRef.current) {
                      clearTimeout(readyTimeoutRef.current);
                      readyTimeoutRef.current = null;
                    }
                  }
                  if (videoRef.current && duration === 0) {
                    const dataDuration = videoRef.current.duration || 0;
                    setDuration(dataDuration);
                  }
                }}
                onCanPlay={() => {
                  console.log('Video can play:', video.videoUrl);
                  if (!isReady) {
                    setIsReady(true);
                    setPlayerError(false);
                    if (readyTimeoutRef.current) {
                      clearTimeout(readyTimeoutRef.current);
                      readyTimeoutRef.current = null;
                    }
                  }
                }}
                onPlay={() => {
                  console.log('Video playing:', video.videoUrl);
                  setIsPlaying(true);
                }}
                onPause={() => {
                  console.log('Video paused:', video.videoUrl);
                  setIsPlaying(false);
                }}
                onTimeUpdate={() => {
                  if (!videoRef.current || isSeeking) return;
                  const current = videoRef.current.currentTime;
                  setCurrentTime(current);
                  setSeekValue(current);
                }}
                onEnded={() => {
                  console.log('Video ended:', video.videoUrl);
                  // loop 属性会自动重新播放，无需手动处理
                }}
                onError={(e) => {
                  console.error('Video playback error:', e, video.videoUrl);
                  setIsPlaying(false);
                  setIsReady(false);
                  setPlayerError(true);
                }}
              />
              {duration > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl z-30">
                  <div className="flex items-center text-white/80 hover:text-white transition-colors duration-300 space-x-3 bg-black/35 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 shadow-lg">
                    <span className="text-xs font-mono min-w-[42px] text-right">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      step={0.01}
                      value={seekValue}
                      onMouseDown={() => setIsSeeking(true)}
                      onTouchStart={() => setIsSeeking(true)}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setSeekValue(value);
                        if (videoRef.current) {
                          videoRef.current.currentTime = value;
                        }
                      }}
                      onMouseUp={(e) => {
                        const value = parseFloat(e.currentTarget.value);
                        setIsSeeking(false);
                        setCurrentTime(value);
                        if (videoRef.current) {
                          videoRef.current.currentTime = value;
                        }
                      }}
                      onTouchEnd={(e) => {
                        const value = parseFloat((e.target as HTMLInputElement).value);
                        setIsSeeking(false);
                        setCurrentTime(value);
                        if (videoRef.current) {
                          videoRef.current.currentTime = value;
                        }
                      }}
                      className="flex-1 h-1.5 rounded-full appearance-none bg-white/15 cursor-pointer accent-[var(--color-accent)]"
                    />
                    <span className="text-xs font-mono min-w-[42px]">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-tertiary)] text-2xl font-mono select-none">
              <div className="text-7xl mb-4">📹</div>
              <p>{isActive ? '正在播放...' : '暂停中...'}</p>
            </div>
          )}
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="text-[var(--color-text-primary)] drop-shadow-lg mb-4 z-100">
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

          <div className="absolute right-0 bottom-0 p-4 space-y-6 flex flex-col items-center z-100">
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
            {!isImageType && hasVideoUrl && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="cursor-pointer text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors p-2 bg-[var(--color-card)] rounded-full backdrop-blur-sm"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>

      <KnowledgeInteractionPanel video={video} isExpanded={isPanelOpen} />
    </div>
  );
};

export default FeedVideoItem;

