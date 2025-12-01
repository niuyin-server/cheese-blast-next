'use client';

import { useState } from 'react';
import { Award, MoreHorizontal, Play } from 'lucide-react';

import { USER_PROFILE } from '@/app/data/content';

const tabs = [
  { key: 'works', label: '作品', count: '12' },
  { key: 'likes', label: '喜欢', count: '284' },
  { key: 'favorites', label: '收藏', count: '33' },
];

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState<'works' | 'likes' | 'favorites'>('works');

  return (
    <div className="p-4 md:p-8 pt-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-12">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-600">
            <img
              src={USER_PROFILE.avatar}
              className="w-full h-full rounded-full border-4 border-gray-950 object-cover"
              alt="Avatar"
            />
          </div>
          <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full border border-gray-900">
            Lv.8
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white mb-2">{USER_PROFILE.name}</h1>
          <div className="text-gray-400 text-sm mb-4">ID: {USER_PROFILE.id}</div>

          <div className="flex justify-center md:justify-start space-x-8 mb-6">
            <Stat label="关注" value={USER_PROFILE.following} />
            <Stat label="粉丝" value={USER_PROFILE.followers} />
            <Stat label="获赞" value={USER_PROFILE.likes} />
          </div>

          <div className="max-w-2xl text-gray-300 text-sm leading-relaxed mb-6 mx-auto md:mx-0">
            {USER_PROFILE.bio}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {USER_PROFILE.badges.map((badge) => (
              <span
                key={badge}
                className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded border border-cyan-900/50 flex items-center"
              >
                <Award size={12} className="mr-1" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-medium text-sm transition-colors">
            编辑资料
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="border-b border-white/10 mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === tab.key ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-1 text-xs text-gray-600">{tab.count}</span>
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="group aspect-[3/4] bg-gray-900 rounded-lg overflow-hidden relative cursor-pointer"
          >
            <div
              className={`absolute inset-0 bg-indigo-${(idx % 3 + 7) * 100} opacity-50 group-hover:scale-105 transition-transform duration-500`}
            ></div>
            <div className="absolute bottom-2 left-2 flex items-center text-white text-xs drop-shadow-md">
              <Play size={12} className="mr-1 fill-white" />
              {1200 + idx * 45}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type StatProps = {
  label: string;
  value: string | number;
};

const Stat = ({ label, value }: StatProps) => (
  <div className="flex items-baseline space-x-1">
    <span className="text-white font-bold text-xl">{value}</span>
    <span className="text-gray-500 text-xs">{label}</span>
  </div>
);

export default ProfileView;

