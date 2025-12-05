'use client';

import Link from 'next/link';
import { BookOpen, Compass, Flame, History, Home, Sparkles, User } from 'lucide-react';

type SidebarProps = {
  activePath: string;
};

const navItems = [
  { icon: Home, label: '推荐', href: '/' },
  { icon: User, label: '关注', href: '/follow' },
  { icon: Compass, label: '探索', href: '/explore' },
  { icon: Flame, label: '热门', href: '/hot' },
  { icon: Sparkles, label: '活动', href: '/activity' },
  { icon: History, label: '观看历史', href: '/history' },
  { icon: User, label: '我的', href: '/profile' },
];

const Sidebar = ({ activePath }: SidebarProps) => (
  <div className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col border-r border-[var(--color-border-soft)] bg-[var(--color-bg)] pt-4 md:flex lg:w-48">
    <div className="px-4 mb-6 flex items-center justify-center lg:justify-start">
      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mr-0 lg:mr-2">
        <BookOpen size={18} className="text-white" />
      </div>
      <span className="hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)]">
        芝士学爆
      </span>
    </div>

    <nav className="flex-1 space-y-1 px-2">
      {navItems.map(({ icon: Icon, label, href }) => {
        const isActive =
          activePath === href ||
          (href !== '/' && activePath.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 p-3 rounded-full transition-all ${
              isActive
                ? 'bg-[var(--color-card)] text-[var(--color-text-primary)] font-medium'
                : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-card)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="hidden lg:block text-base">{label}</span>
          </Link>
        );
      })}
    </nav>

    <div className="p-4 mt-auto">
      <button className="hidden w-full rounded-full border border-[var(--color-border-soft)] cursor-pointer bg-[var(--color-card)] py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] lg:block">
        创作者中心
      </button>
    </div>
  </div>
);

export default Sidebar;

