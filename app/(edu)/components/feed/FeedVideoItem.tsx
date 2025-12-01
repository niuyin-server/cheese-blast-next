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

type FeedVideoItemProps = {
  video: Video;
  isActive: boolean;
};

const FeedVideoItem = ({ video, isActive }: FeedVideoItemProps) => {
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const commentCount =
    parseInt(video.comments.replace('w', '000').replace(',', '')) >= 10000
      ? video.comments
      : '1000';

  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      <div
        className={`relative flex-1 h-full flex items-center justify-center ${video.color} rounded-l-xl md:rounded-l-2xl overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{ background: video.coverUrl }}
        ></div>

        <div className="relative z-10 h-full w-full max-w-sm bg-black flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 text-2xl font-mono select-none">
            <div className="text-7xl mb-4">📹</div>
            <p>{isActive ? '正在播放...' : '暂停中...'}</p>
          </div>

          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="text-white drop-shadow-lg mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={video.authorAvatar}
                  className="w-10 h-10 rounded-full border-2 border-white/50 mr-2"
                  alt="Author"
                />
                <span className="font-bold text-lg hover:underline cursor-pointer">
                  {video.author}
                </span>
                <button className="ml-3 bg-red-600 hover:bg-red-500 text-xs px-3 py-1 rounded-full">
                  关注
                </button>
              </div>
              <p className="text-lg font-semibold leading-snug mb-2">
                {video.title}
              </p>
              <p className="text-sm line-clamp-1">
                {video.description.split('#')[0]}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {video.description.match(/#\w+/g)?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-cyan-400 text-sm hover:underline cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 p-4 space-y-6 flex flex-col items-center">
            <ActionButton
              icon={Heart}
              label={video.likes}
              isActive={liked}
              onClick={() => setLiked(!liked)}
              activeColor="text-red-500"
            />
            <ActionButton icon={MessageCircle} label={commentCount} />
            <ActionButton icon={BookOpen} label="知识点" />
            <ActionButton icon={Share2} label="分享" />
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-gray-300 transition-colors p-2 bg-black/40 rounded-full backdrop-blur-sm"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {video.quiz && (
            <div className="absolute top-4 right-4 z-20">
              <button className="bg-orange-500 hover:bg-orange-400 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center text-sm font-bold">
                <CheckCircle2 size={16} className="mr-1" />
                随堂小测
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-[30%] max-w-sm h-full hidden lg:flex flex-col bg-gray-900 border-l border-white/5 p-4 rounded-r-xl md:rounded-r-2xl">
        <h3 className="text-white font-bold text-lg mb-4">知识互动区</h3>
        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
            <h4 className="text-cyan-400 text-sm font-bold mb-1 flex items-center">
              <BookOpen size={14} className="mr-2" /> 本课重点
            </h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              {video.knowledgePoint}
            </p>
          </div>

          <h4 className="text-white text-sm font-bold mt-4">
            评论 ({video.comments})
          </h4>
          {[
            { u: '学霸小明', t: '讲得太清楚了！终于明白了。', l: 123 },
            { u: 'User887', t: '收藏了，考试前复习。', l: 45 },
          ].map((comment, i) => (
            <div key={i} className="flex space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-700 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-gray-400 text-xs font-bold mb-0.5">
                  {comment.u}
                </div>
                <p className="text-gray-200 text-xs leading-relaxed">
                  {comment.t}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="发一条友善的评论..."
            className="w-full bg-gray-800 text-white text-xs rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedVideoItem;

