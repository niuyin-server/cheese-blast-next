'use client';

import { Bell, MessageCircle, Plus, Search } from 'lucide-react';

type HeaderProps = {
  avatarUrl: string;
};

const Header = ({ avatarUrl }: HeaderProps) => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-gray-950/90 backdrop-blur-md border-b border-white/5 z-30 flex items-center justify-between px-4 md:px-8 pl-20 lg:pl-56 transition-all duration-300">
    <div className="flex-1 max-w-xl">
      <div className="relative group">
        <input
          type="text"
          placeholder="搜索知识点、课程、UP主..."
          className="w-full bg-gray-800 text-gray-200 border border-transparent focus:border-cyan-500/50 rounded-full py-2.5 pl-12 pr-4 outline-none transition-all group-hover:bg-gray-750"
        />
        <Search
          className="absolute left-4 top-2.5 text-gray-500 group-hover:text-gray-300"
          size={18}
        />
        <button className="absolute right-2 top-1.5 bg-gray-700 hover:bg-gray-600 text-xs px-3 py-1.5 rounded-full text-white transition-colors">
          搜索
        </button>
      </div>
    </div>

    <div className="flex items-center space-x-6 ml-6">
      <button className="flex items-center space-x-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white px-4 py-2 rounded-full font-medium transition-all shadow-lg shadow-blue-500/20">
        <Plus size={18} />
        <span className="hidden sm:inline">投稿</span>
      </button>

      <div className="flex items-center space-x-5 text-gray-400">
        <button className="hover:text-white relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="hover:text-white">
          <MessageCircle size={22} />
        </button>
      </div>

      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 cursor-pointer">
        <img
          src={avatarUrl}
          className="w-full h-full rounded-full bg-black object-cover"
          alt="User"
        />
      </div>
    </div>
  </header>
);

export default Header;

