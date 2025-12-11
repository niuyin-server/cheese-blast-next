'use client';

import { useState } from 'react';
import CreateVideoView from './CreateVideoView';
import PlazaVideoView from './PlazaVideoView';

type TabType = 'create' | 'plaza';

export default function AIVideoPageContent() {
  const [activeTab, setActiveTab] = useState<TabType>('create');

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Tab切换 */}
      <div className="sticky top-16 z-30 bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--color-border-soft)]">
        <div className="mx-auto px-4 md:px-8">
          <div className="flex items-center space-x-2 py-4">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                activeTab === 'create'
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-md shadow-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/30 border-transparent'
                  : 'bg-[var(--color-card)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] border-[var(--color-border-soft)]'
              }`}
            >
              制作视频
            </button>
            <button
              onClick={() => setActiveTab('plaza')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                activeTab === 'plaza'
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-md shadow-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/30 border-transparent'
                  : 'bg-[var(--color-card)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] border-[var(--color-border-soft)]'
              }`}
            >
              创作者广场
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="mx-auto">
        {activeTab === 'create' ? <CreateVideoView /> : <PlazaVideoView />}
      </div>
    </div>
  );
}

