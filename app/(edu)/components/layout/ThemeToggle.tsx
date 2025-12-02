'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/app/(edu)/providers/ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      onClick={toggleTheme}
      aria-label={`切换至${isDark ? '白天' : '夜晚'}模式`}
      className="flex items-center space-x-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
    >
      <Icon size={16} />
      <span className="hidden sm:inline">{isDark ? '白天模式' : '夜晚模式'}</span>
    </button>
  );
};

export default ThemeToggle;

