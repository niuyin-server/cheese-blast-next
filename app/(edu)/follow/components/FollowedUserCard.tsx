'use client';

import { FollowedUser } from '@/types/content';

type FollowedUserCardProps = {
  user: FollowedUser | { id: string | null; name: string; avatar: string };
  isSelected: boolean;
  onClick: (userId: string | null) => void;
};

const FollowedUserCard = ({ user, isSelected, onClick }: FollowedUserCardProps) => (
  <button
    onClick={() => onClick(user.id)}
    className={`w-full flex items-center p-3 rounded-full transition-all cursor-pointer text-left ${
      isSelected
        ? 'bg-[var(--color-card)] text-[var(--color-text-primary)] font-medium shadow-xm'
        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-card)] hover:text-[var(--color-text-primary)]'
    }`}
  >
    <img
      src={user.avatar}
      className="w-9 h-9 rounded-full mr-3 border-2 border-[var(--color-border-soft)]"
      alt={user.name}
    />
    <div className="flex-1 min-w-0">
      <div className="truncate text-sm">{user.name}</div>
      <div className="text-xs text-[var(--color-text-tertiary)] truncate">最新动态: 1小时前</div>
    </div>
  </button>
);

export default FollowedUserCard;

