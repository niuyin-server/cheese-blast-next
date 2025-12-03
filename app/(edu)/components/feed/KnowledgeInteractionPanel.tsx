'use client';

import { BookOpen } from 'lucide-react';

import { Video } from '@/types/content';

type KnowledgeInteractionPanelProps = {
  video: Video;
  isExpanded: boolean;
};

const KnowledgeInteractionPanel = ({ video, isExpanded }: KnowledgeInteractionPanelProps) => {
  return (
    <div
      className={`h-full hidden lg:flex flex-col bg-[var(--color-surface)] border-l border-[var(--color-border-soft)] rounded-r-xl md:rounded-r-2xl overflow-hidden transition-[width] duration-300 ease-in-out ${
        isExpanded 
          ? 'w-[30%] max-w-sm' 
          : 'w-0 pointer-events-none'
      }`}
    >
      <div className={`h-full flex flex-col p-4 transition-opacity duration-150 ${
        isExpanded ? 'opacity-100' : 'opacity-0'
      }`}>
        <h3 className="text-[var(--color-text-primary)] font-bold text-lg mb-4">
          知识互动区
        </h3>
        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar min-w-0">
          <div className="bg-[var(--color-card)] rounded-lg p-3 border border-[var(--color-border-soft)]">
            <h4 className="text-[var(--color-accent)] text-sm font-bold mb-1 flex items-center">
              <BookOpen size={14} className="mr-2" /> 本课重点
            </h4>
            <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
              {video.knowledgePoint}
            </p>
          </div>

          <h4 className="text-[var(--color-text-primary)] text-sm font-bold mt-4">
            评论 ({video.comments})
          </h4>
          {[
            { u: '学霸小明', t: '讲得太清楚了！终于明白了。', l: 123 },
            { u: 'User887', t: '收藏了，考试前复习。', l: 45 },
          ].map((comment, i) => (
            <div key={i} className="flex space-x-2">
              <div className="w-6 h-6 rounded-full bg-[var(--color-card)] flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[var(--color-text-secondary)] text-xs font-bold mb-0.5">
                  {comment.u}
                </div>
                <p className="text-[var(--color-text-primary)] text-xs leading-relaxed">
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
            className="w-full bg-[var(--color-card)] text-[var(--color-text-primary)] text-xs rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] placeholder:text-[var(--color-text-tertiary)]"
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeInteractionPanel;

