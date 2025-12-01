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
    className={`w-full flex items-center p-3 rounded-lg transition-all text-left ${
      isSelected
        ? 'bg-cyan-600/20 border-l-4 border-cyan-500 text-white font-medium shadow-lg shadow-cyan-900/10'
        : 'text-gray-300 hover:bg-gray-800/50'
    }`}
  >
    <img
      src={user.avatar}
      className="w-9 h-9 rounded-full mr-3 border-2 border-white/10"
      alt={user.name}
    />
    <div className="flex-1 min-w-0">
      <div className="truncate text-sm">{user.name}</div>
      <div className="text-xs text-gray-500 truncate">最新动态: 1小时前</div>
    </div>
  </button>
);

export default FollowedUserCard;

