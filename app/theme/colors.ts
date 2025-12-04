export type ThemeMode = 'light' | 'dark';

type ThemeVariables = Record<string, string>;

export const THEME_COLORS: Record<ThemeMode, ThemeVariables> = {
  light: {
    '--color-bg': '#ffffff',
    '--color-surface': 'rgba(255, 255, 255, 0.9)',
    '--color-card': 'rgba(15, 23, 42, 0.05)',
    '--color-icon-bg': 'rgba(243, 243, 243, 0.7)',
    '--color-icon-bg-hover': 'rgba(237, 237, 238, 0.9)',
    '--color-header-bg': 'rgba(255, 255, 255, 0.9)',
    '--color-border-soft': 'rgba(15, 23, 42, 0.1)',
    '--color-border-strong': 'rgba(15, 23, 42, 0.2)',
    '--color-text-primary': '#0f172a',
    '--color-text-secondary': '#334155',
    '--color-text-tertiary': '#64748b',
    '--color-accent': '#0f172a',
    '--color-accent-contrast': '#f8fafc',
    '--color-action-icon-bg': 'rgba(239, 239, 239, 0.2)',
  },
  dark: {
    '--color-bg': 'rgba(22, 24, 35, 0.9)',
    '--color-surface': '#0f172a',
    '--color-card': 'rgba(30, 41, 57, 0.8)',
    '--color-icon-bg': 'rgba(15, 31, 70, 0.85)',
    '--color-icon-bg-hover': 'rgba(15, 23, 42, 0.95)',
    '--color-header-bg': 'rgba(22, 24, 35, 0.8)',
    '--color-border-soft': 'rgba(255, 255, 255, 0.1)',
    '--color-border-strong': 'rgba(255, 255, 255, 0.2)',
    '--color-text-primary': '#f9fafb',
    '--color-text-secondary': '#cbd5f5',
    '--color-text-tertiary': '#94a3b8',
    '--color-accent': '#38bdf8',
    '--color-accent-contrast': '#020617',
    '--color-action-icon-bg': 'rgba(18, 20, 65, 0.2)',
  },
};

