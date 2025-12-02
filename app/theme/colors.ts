export type ThemeMode = 'light' | 'dark';

type ThemeVariables = Record<string, string>;

export const THEME_COLORS: Record<ThemeMode, ThemeVariables> = {
  light: {
    '--color-bg': '#ffffff',
    '--color-surface': 'rgba(255, 255, 255, 0.8)',
    '--color-card': 'rgba(15, 23, 42, 0.05)',
    '--color-header-bg': 'rgba(255, 255, 255, 0.8)',
    '--color-border-soft': 'rgba(15, 23, 42, 0.1)',
    '--color-border-strong': 'rgba(15, 23, 42, 0.2)',
    '--color-text-primary': '#0f172a',
    '--color-text-secondary': '#334155',
    '--color-text-tertiary': '#64748b',
    '--color-accent': '#0f172a',
    '--color-accent-contrast': '#f8fafc',
  },
  dark: {
    '--color-bg': '#030712',
    '--color-surface': '#0f172a',
    '--color-card': 'rgba(255, 255, 255, 0.02)',
    '--color-header-bg': 'rgba(3, 7, 18, 0.8)',
    '--color-border-soft': 'rgba(255, 255, 255, 0.08)',
    '--color-border-strong': 'rgba(255, 255, 255, 0.2)',
    '--color-text-primary': '#f9fafb',
    '--color-text-secondary': '#cbd5f5',
    '--color-text-tertiary': '#94a3b8',
    '--color-accent': '#38bdf8',
    '--color-accent-contrast': '#020617',
  },
};

