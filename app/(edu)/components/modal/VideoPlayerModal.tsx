'use client';

import { useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Heart,
  MessageCircle,
  Play,
  Send,
  Share2,
  ThumbsUp,
  X,
} from 'lucide-react';

import { Video } from '@/types/content';

type VideoPlayerModalProps = {
  video: Video;
  onClose: () => void;
};

const VideoPlayerModal = ({ video, onClose }: VideoPlayerModalProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
    { user: '学霸小明', text: '讲得太清楚了！终于明白了。', likes: 123 },
    { user: 'User887', text: '收藏了，考试前复习。', likes: 45 },
  ]);
  const [newComment, setNewComment] = useState('');
  const [quizStatus, setQuizStatus] = useState<'correct' | 'wrong' | null>(null);

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    setComments([{ user: '我', text: newComment, likes: 0 }, ...comments]);
    setNewComment('');
  };

  const handleQuizAnswer = (index: number) => {
    if (!video.quiz) return;
    if (index === video.quiz.answer) {
      setQuizStatus('correct');
    } else {
      setQuizStatus('wrong');
    }
    setTimeout(() => {
      setShowQuiz(false);
      setQuizStatus(null);
    }, 2500);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-50 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full text-white transition-colors"
      >
        <X size={24} />
      </button>

      <div className="w-full h-full md:w-[90%] md:h-[90%] md:max-w-7xl flex flex-col md:flex-row bg-gray-950 md:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className={`relative flex-1 ${video.color} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-30 blur-3xl" style={{ background: video.coverUrl }}></div>

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="aspect-[9/16] h-full bg-black shadow-2xl relative">
              <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-bold animate-pulse select-none">
                VIDEO
              </div>

              {video.quiz && !showQuiz && !quizStatus && (
                <div className="absolute bottom-20 right-4 z-20">
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center hover:scale-105 transition-transform"
                  >
                    <CheckCircle2 size={18} className="mr-2" />
                    <span className="text-sm font-bold">随堂小测</span>
                  </button>
                </div>
              )}

              {showQuiz && video.quiz && (
                <div className="absolute inset-0 bg-black/80 z-30 flex items-center justify-center p-6">
                  <div className="bg-white rounded-xl p-6 w-full max-w-xs relative animate-in zoom-in-50 duration-200">
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                    <h3 className="text-gray-900 font-bold mb-4 text-sm">
                      <span className="text-orange-600 mr-2">●</span>
                      {video.quiz.question}
                    </h3>
                    <div className="space-y-2">
                      {video.quiz.options.map((opt, i) => (
                        <button
                          key={opt}
                          onClick={() => handleQuizAnswer(i)}
                          className="w-full text-left p-2.5 rounded border border-gray-200 hover:bg-orange-50 hover:border-orange-300 text-gray-700 text-xs transition-colors"
                        >
                          {String.fromCharCode(65 + i)}. {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {quizStatus === 'correct' && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 pointer-events-none">
                  <div className="bg-green-500/90 backdrop-blur text-white px-6 py-4 rounded-xl flex flex-col items-center animate-in zoom-in spin-in-3">
                    <CheckCircle2 size={40} className="mb-2" />
                    <span className="font-bold text-lg">回答正确! +10分</span>
                  </div>
                </div>
              )}
              {quizStatus === 'wrong' && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 pointer-events-none">
                  <div className="bg-red-500/90 backdrop-blur text-white px-6 py-4 rounded-xl flex flex-col items-center animate-in shake">
                    <X size={40} className="mb-2" />
                    <span className="font-bold text-lg">答案错误</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[400px] bg-gray-900 flex flex-col border-l border-white/5 relative z-20">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={video.authorAvatar}
                  className="w-10 h-10 rounded-full border border-gray-700"
                  alt=""
                />
                <div>
                  <div className="text-white font-medium text-sm">{video.author}</div>
                  <div className="text-gray-500 text-xs">发布于 2小时前</div>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded-full font-medium transition-colors">
                关注
              </button>
            </div>

            <h1 className="text-white text-lg font-bold leading-snug mb-2">{video.title}</h1>

            <div className="flex flex-wrap gap-2 mb-3">
              {video.description.match(/#\w+/g)?.map((tag) => (
                <span key={tag} className="text-cyan-400 text-xs hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
              <div className="flex items-start">
                <BookOpen size={16} className="text-cyan-400 mt-0.5 mr-2 shrink-0" />
                <div>
                  <h4 className="text-cyan-200 text-xs font-bold mb-1">本课重点知识</h4>
                  <p className="text-gray-300 text-xs leading-relaxed">{video.knowledgePoint}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around py-3 border-b border-white/5">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex flex-col items-center space-y-1 ${
                liked ? 'text-red-500' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className={`p-2 rounded-full ${liked ? 'bg-red-500/10' : 'bg-gray-800'}`}>
                <Heart size={20} className={liked ? 'fill-red-500' : ''} />
              </div>
              <span className="text-xs">{video.likes}</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-200">
              <div className="p-2 rounded-full bg-gray-800">
                <MessageCircle size={20} />
              </div>
              <span className="text-xs">{video.comments}</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-200">
              <div className="p-2 rounded-full bg-gray-800">
                <Award size={20} />
              </div>
              <span className="text-xs">打赏</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-200">
              <div className="p-2 rounded-full bg-gray-800">
                <Share2 size={20} />
              </div>
              <span className="text-xs">分享</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <h3 className="text-white text-sm font-bold mb-2">全部评论 ({comments.length})</h3>
            {comments.map((comment, i) => (
              <div key={`${comment.user}-${i}`} className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-gray-400 text-xs font-bold mb-0.5">{comment.user}</div>
                  <p className="text-gray-200 text-xs leading-relaxed">{comment.text}</p>
                  <div className="flex items-center space-x-3 mt-1.5">
                    <span className="text-gray-600 text-[10px]">09-24</span>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-300">
                      <ThumbsUp size={10} />
                      <span className="text-[10px]">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-900 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="发一条友善的评论..."
                className="w-full bg-gray-800 text-white text-xs rounded-full py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
              />
              <button
                onClick={handleSendComment}
                className={`absolute right-1 top-1 p-2 rounded-full transition-colors ${
                  newComment.trim() ? 'text-cyan-400 hover:bg-gray-700' : 'text-gray-600'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;

