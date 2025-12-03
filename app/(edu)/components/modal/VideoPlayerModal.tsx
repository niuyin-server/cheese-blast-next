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
    // 打开弹窗时禁止页面滚动
    document.body.style.overflow = 'hidden';

    // 监听 ESC 关闭
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 z-50 p-2 rounded-full transition-colors bg-[var(--color-icon-bg)] hover:bg-[var(--color-icon-bg-hover)] text-[var(--color-text-primary)] border border-[var(--color-border-soft)]"
      >
        <X size={24} />
      </button>

      <div className="w-full h-full md:w-[90%] md:h-[90%] md:max-w-7xl flex flex-col md:flex-row bg-[var(--color-bg)] md:rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border-soft)]">
        <div className={`relative flex-1 ${video.color} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-30 blur-3xl" style={{ background: video.coverUrl }}></div>

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="aspect-[9/16] h-full bg-black shadow-2xl relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-bold animate-pulse select-none">
                VIDEO
              </div> 

              {showQuiz && video.quiz && (
                <div className="absolute inset-0 bg-black/70 z-30 flex items-center justify-center p-6">
                  <div className="rounded-xl p-6 w-full max-w-xs relative animate-in zoom-in-50 duration-200 bg-[var(--color-surface)] border border-[var(--color-border-soft)] shadow-xl">
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="absolute top-2 right-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                    >
                      <X size={18} />
                    </button>
                    <h3 className="text-[var(--color-text-primary)] font-bold mb-4 text-sm">
                      <span className="text-orange-500 mr-2">●</span>
                      {video.quiz.question}
                    </h3>
                    <div className="space-y-2">
                      {video.quiz.options.map((opt, i) => (
                        <button
                          key={opt}
                          onClick={() => handleQuizAnswer(i)}
                          className="w-full text-left p-2.5 rounded border text-xs transition-colors border-[var(--color-border-soft)] text-[var(--color-text-secondary)] hover:border-orange-400 hover:bg-orange-500/10"
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
                  <div className="bg-emerald-500/90 backdrop-blur text-white px-6 py-4 rounded-xl flex flex-col items-center animate-in zoom-in spin-in-3 shadow-xl">
                    <CheckCircle2 size={40} className="mb-2" />
                    <span className="font-bold text-lg">回答正确! +10分</span>
                  </div>
                </div>
              )}
              {quizStatus === 'wrong' && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 pointer-events-none">
                  <div className="bg-red-500/90 backdrop-blur text-white px-6 py-4 rounded-xl flex flex-col items-center animate-in shake shadow-xl">
                    <X size={40} className="mb-2" />
                    <span className="font-bold text-lg">答案错误</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[400px] bg-[var(--color-surface)] flex flex-col border-l border-[var(--color-border-soft)] relative z-20">
          <div className="p-5 border-b border-[var(--color-border-soft)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3  cursor-pointer ">
                <img
                  src={video.authorAvatar}
                  className="w-10 h-10 rounded-full border border-[var(--color-border-soft)]"
                  alt=""
                />
                <div>
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">
                    {video.author}
                  </div>
                  <div className="text-[var(--color-text-tertiary)] text-xs">发布于 2小时前</div>
                </div>
              </div>
              <button className="bg-red-600 cursor-pointer hover:bg-red-500 text-white text-xs px-4 py-1.5 rounded-full font-medium transition-colors shadow-sm">
                关注
              </button>
            </div>

            <h1 className="text-[var(--color-text-primary)] text-lg font-bold leading-snug mb-2">
              {video.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-3">
              {video.description.match(/#\w+/g)?.map((tag) => (
                <span
                  key={tag}
                  className="text-[var(--color-accent)] text-xs hover:underline cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-[var(--color-card)] rounded-lg p-3 border border-[var(--color-border-soft)]">
              <div className="flex items-start">
                <BookOpen
                  size={16}
                  className="text-[var(--color-accent)] mt-0.5 mr-2 shrink-0"
                />
                <div>
                  <h4 className="text-[var(--color-accent)] text-xs font-bold mb-1">
                    本课重点知识
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                    {video.knowledgePoint}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around py-3 border-b border-[var(--color-border-soft)]">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex flex-col items-center space-y-1 ${
                liked
                  ? 'text-red-500'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  liked ? 'bg-red-500/10' : 'bg-[var(--color-card)]'
                }`}
              >
                <Heart size={20} className={liked ? 'fill-red-500' : ''} />
              </div>
              <span className="text-xs">{video.likes}</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
              <div className="p-2 rounded-full bg-[var(--color-card)]">
                <MessageCircle size={20} />
              </div>
              <span className="text-xs">{video.comments}</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
              <div className="p-2 rounded-full bg-[var(--color-card)]">
                <Award size={20} />
              </div>
              <span className="text-xs">打赏</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
              <div className="p-2 rounded-full bg-[var(--color-card)]">
                <Share2 size={20} />
              </div>
              <span className="text-xs">分享</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <h3 className="text-[var(--color-text-primary)] text-sm font-bold mb-2">
              全部评论 ({comments.length})
            </h3>
            {comments.map((comment, i) => (
              <div key={`${comment.user}-${i}`} className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-card)] flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[var(--color-text-tertiary)] text-xs font-bold mb-0.5">
                    {comment.user}
                  </div>
                  <p className="text-[var(--color-text-primary)] text-xs leading-relaxed">
                    {comment.text}
                  </p>
                  <div className="flex items-center space-x-3 mt-1.5">
                    <span className="text-[var(--color-text-tertiary)] text-[10px]">
                      09-24
                    </span>
                    <button className="flex items-center space-x-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]">
                      <ThumbsUp size={10} />
                      <span className="text-[10px]">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-border-soft)]">
            <div className="relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="发一条友善的评论..."
                className="w-full bg-[var(--color-card)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] text-xs rounded-full py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
              />
              <button
                onClick={handleSendComment}
                className={`absolute right-1 top-1 p-2 rounded-full transition-colors ${
                  newComment.trim()
                    ? 'text-[var(--color-accent)] hover:bg-[var(--color-icon-bg-hover)]'
                    : 'text-[var(--color-text-tertiary)]'
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

