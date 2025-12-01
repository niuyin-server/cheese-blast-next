'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { USER_PROFILE } from '@/app/data/content';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';

type EduLayoutProps = {
  children: ReactNode;
};

const EduLayout = ({ children }: EduLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30">
      <Header avatarUrl={USER_PROFILE.avatar} />
      <Sidebar activePath={pathname} />

      <main className="pl-0 md:pl-20 lg:pl-48 pt-16 min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default EduLayout;

