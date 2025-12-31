'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Clock, RotateCcw, X } from 'lucide-react';

type SearchPopoverProps = {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSearchClick?: (keyword: string) => void;
};

// 模拟数据
const suggestedSearches = [
  '欣得堂',
  '儿童0-3岁儿童启蒙早教',
  '东莞注册公司',
  '幼岚品牌介绍',
  '增肌粉瘦人增肌',
  '古茗团购',
  '深港轻奢',
  '跃动小子小游戏'
];

const hotTopics = [
  { icon: 'X', rank: null, text: '重温习近平主席12年新年贺词', color: 'bg-blue-500', shape: 'square' },
  { icon: '1', rank: 1, text: '跨年烟花照我先拍了', color: 'bg-orange-500', shape: 'circle' },
  { icon: '2', rank: 2, text: '回望2025', color: 'bg-gray-400', shape: 'hexagon' },
  { icon: '3', rank: 3, text: '2025年度关键词大盘点', color: 'bg-orange-500', shape: 'hexagon' },
  { icon: '4', rank: 4, text: '南方小土豆勇闯哈尔滨', color: 'bg-transparent', shape: 'text' },
  { icon: '5', rank: 5, text: '当00后接过非遗传承大旗', color: 'bg-transparent', shape: 'text' },
];

const SearchPopover = ({ onMouseEnter, onMouseLeave, onSearchClick }: SearchPopoverProps) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 从localStorage加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (e) {
        setSearchHistory([]);
      }
    }
  }, []);

  const handleSearchClick = (keyword: string) => {
    onSearchClick?.(keyword);
    // 保存到搜索历史
    const newHistory = [keyword, ...searchHistory.filter((h) => h !== keyword)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleRemoveHistoryItem = (index: number) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  return (
    <div
      className="absolute left-0 top-full mt-2 w-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 text-[var(--color-text-primary)] shadow-2xl backdrop-blur z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 猜你想搜 */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">猜你想搜</h3>
          <button className="flex items-center space-x-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">
            <RotateCcw size={12} />
            <span>换一换</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {suggestedSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleSearchClick(search)}
              className={`rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-card)] px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)] cursor-pointer ${
                index === 1 ? 'text-red-500' : 'text-[var(--color-text-primary)]'
              }`}
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* 抖音热点 */}
      <div className="mb-6">
        <div className="mb-3 flex items-center space-x-2">
          <TrendingUp size={16} className="text-[var(--color-accent)]" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">热点</h3>
        </div>
        <div className="space-y-2">
          {hotTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleSearchClick(topic.text)}
              className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[var(--color-card)] cursor-pointer"
            >
              {topic.shape === 'square' && (
                <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center text-xs font-semibold text-white ${topic.color}`}>
                  {topic.icon}
                </div>
              )}
              {topic.shape === 'circle' && (
                <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${topic.color}`}>
                  {topic.icon}
                </div>
              )}
              {topic.shape === 'hexagon' && (
                <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center text-xs font-semibold text-white ${topic.color}`} style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
                  {topic.icon}
                </div>
              )}
              {topic.shape === 'text' && (
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-xs font-semibold text-[var(--color-text-primary)]">
                  {topic.icon}
                </span>
              )}
              <span className="flex-1 text-sm text-[var(--color-text-primary)]">{topic.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 搜索历史 */}
      {searchHistory.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-[var(--color-text-tertiary)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">搜索历史</h3>
            </div>
            <button
              onClick={handleClearHistory}
              className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
            >
              清空
            </button>
          </div>
          <div className="space-y-1">
            {searchHistory.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-[var(--color-card)] group"
              >
                <button
                  onClick={() => handleSearchClick(item)}
                  className="flex-1 text-left text-sm text-[var(--color-text-primary)] cursor-pointer"
                >
                  {item}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveHistoryItem(index);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <X size={14} className="text-[var(--color-text-tertiary)]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPopover;

