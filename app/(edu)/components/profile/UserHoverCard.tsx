'use client';

import { Bookmark, Heart, History, ThumbsUp, UserPlus } from 'lucide-react';

import type { UserProfile } from '@/types/content';
import ThemeToggle from '@/app/(edu)/components/layout/ThemeToggle';

type UserHoverCardProps = {
  profile: UserProfile;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const listConfig = [
  {
    title: '喜欢列表',
    icon: Heart,
    key: 'likedList' as const,
  },
  {
    title: '收藏列表',
    icon: Bookmark,
    key: 'favoriteList' as const,
  },
  {
    title: '观看历史',
    icon: History,
    key: 'historyList' as const,
  },
];

const UserHoverCard = ({ profile, onMouseEnter, onMouseLeave }: UserHoverCardProps) => (
  <div
    className="absolute right-0 top-12 w-80 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 text-[var(--color-text-primary)] shadow-2xl backdrop-blur"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="flex items-center space-x-3">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="h-14 w-14 rounded-full border border-[var(--color-border-strong)] object-cover"
      />
      <div>
        <div className="text-lg font-semibold">{profile.name}</div>
        <div className="text-xs text-[var(--color-text-secondary)]">ID: {profile.id}</div>
      </div>
    </div>

    <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{profile.bio}</p>

    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
      <div className="rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-card)] p-2">
        <div className="text-lg font-semibold text-[var(--color-text-primary)]">{profile.following}</div>
        <div className="text-xs text-[var(--color-text-secondary)]">关注</div>
      </div>
      <div className="rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-card)] p-2">
        <div className="text-lg font-semibold text-[var(--color-text-primary)]">{profile.followers}</div>
        <div className="text-xs text-[var(--color-text-secondary)]">粉丝</div>
      </div>
      <div className="rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-card)] p-2">
        <div className="flex items-center justify-center space-x-1 text-lg font-semibold text-[var(--color-text-primary)]">
          <ThumbsUp size={16} />
          <span>{profile.likes}</span>
        </div>
        <div className="text-xs text-[var(--color-text-secondary)]">获赞</div>
      </div>
    </div>

    <div className="mt-4 mb-4 space-y-3">
      {listConfig.map(({ title, icon: Icon, key }) => (
        <div key={key}>
          <div className="mb-1 flex items-center space-x-2 text-sm font-medium text-[var(--color-text-secondary)]">
            <Icon size={14} />
            <span>{title}</span>
          </div>
          <div className="rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-card)] p-3 text-xs text-[var(--color-text-secondary)]">
            {profile[key].slice(0, 3).map((item, idx) => (
              <div
                key={`${key}-${item}`}
                className="flex items-center justify-between py-1 text-[var(--color-text-primary)]"
              >
                <span className="truncate pr-2">{item}</span>
                <span className="text-[var(--color-text-tertiary)]">#{idx + 1}</span>
              </div>
            ))}
            {profile[key].length > 3 && (
              <div className="pt-1 text-right text-[var(--color-text-tertiary)]">查看更多...</div>
            )}
          </div>
        </div>
      ))}
    </div>

    <ThemeToggle />

  </div>
);

export default UserHoverCard;

