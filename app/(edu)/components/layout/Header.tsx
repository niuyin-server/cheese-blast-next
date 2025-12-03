'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Bell, MessageCircle, Plus, Search } from 'lucide-react';

import ThemeToggle from '@/app/(edu)/components/layout/ThemeToggle';
import UserHoverCard from '@/app/(edu)/components/profile/UserHoverCard';
import type { UserProfile } from '@/types/content';

type HeaderProps = {
  profile: UserProfile;
};

const HOVER_DELAY = 100;

const Header = ({ profile }: HeaderProps) => {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleHoverChange = useCallback((active: boolean) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    if (active) {
      hoverTimerRef.current = setTimeout(() => {
        setIsHoveringAvatar(true);
      }, HOVER_DELAY);
    } else {
      hoverTimerRef.current = setTimeout(() => {
        setIsHoveringAvatar(false);
      }, 120);
    }
  }, []);

  const searchPlaceholder = useMemo(
    () => `搜索知识点、课程、${profile.name}...`,
    [profile.name],
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--color-border-soft)] bg-[var(--color-header-bg)] px-4 pl-20 transition-all duration-300 backdrop-blur md:px-8 lg:pl-56">
      <div className="flex-1 max-w-xl">
        <div className="group relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-transparent bg-[var(--color-card)] py-2.5 pl-12 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition-all placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] group-hover:bg-[var(--color-surface)]"
          />
          <Search
            className="absolute left-4 top-2.5 text-[var(--color-text-tertiary)] transition-colors group-hover:text-[var(--color-text-secondary)]"
            size={18}
          />
          <button className="absolute right-2 top-1.5 rounded-full cursor-pointer bg-[var(--color-accent)] px-3 py-1.5 text-xs text-[var(--color-accent-contrast)] transition-opacity hover:opacity-90">
            搜索
          </button>
        </div>
      </div>

      <div className="ml-6 flex items-center space-x-4">
        <button className="flex items-center space-x-1 rounded-full cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 font-medium text-sm text-white shadow-md shadow-blue-500/20 transition-all hover:brightness-110">
          <Plus size={18} />
          <span className="hidden sm:inline">投稿</span>
        </button>

        <div className="hidden items-center space-x-5 text-[var(--color-text-secondary)] sm:flex">
          <button className="relative transition-colors hover:text-[var(--color-text-primary)] cursor-pointer">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button className="transition-colors hover:text-[var(--color-text-primary)] cursor-pointer">
            <MessageCircle size={22} />
          </button>
        </div>

        <div
          className="relative rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5"
          onMouseEnter={() => handleHoverChange(true)}
          onMouseLeave={() => handleHoverChange(false)}
        >
          <img
            src={profile.avatar}
            className="h-9 w-9 rounded-full bg-black object-cover cursor-pointer"
            alt={profile.name}
          />
          {isHoveringAvatar && (
            <UserHoverCard
              profile={profile}
              onMouseEnter={() => handleHoverChange(true)}
              onMouseLeave={() => handleHoverChange(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

