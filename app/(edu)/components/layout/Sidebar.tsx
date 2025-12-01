'use client';

import Link from 'next/link';
import { BookOpen, Compass, History, Home, User } from 'lucide-react';

type SidebarProps = {
  activePath: string;
};

const navItems = [
  { icon: Home, label: '推荐', href: '/' },
  { icon: User, label: '关注', href: '/follow' },
  { icon: Compass, label: '探索', href: '/explore' },
  { icon: History, label: '观看历史', href: '/history' },
  { icon: User, label: '我的', href: '/profile' },
];

const Sidebar = ({ activePath }: SidebarProps) => (
  <div className="hidden md:flex flex-col w-20 lg:w-48 h-screen bg-gray-950 border-r border-white/5 pt-4 fixed left-0 top-0 z-40">
    <div className="px-4 mb-6 flex items-center justify-center lg:justify-start">
      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mr-0 lg:mr-2">
        <BookOpen size={18} className="text-white" />
      </div>
      <span className="hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        智光
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
            className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 p-3 rounded-xl transition-all ${
              isActive
                ? 'bg-white/10 text-white font-medium'
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="hidden lg:block text-base">{label}</span>
          </Link>
        );
      })}
    </nav>

    <div className="p-4 mt-auto">
      <button className="w-full bg-gray-800 hover:bg-gray-700 text-white/70 hover:text-white py-2 rounded-lg text-sm transition-colors hidden lg:block">
        创作者中心
      </button>
    </div>
  </div>
);

export default Sidebar;

