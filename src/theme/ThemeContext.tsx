import React from 'react';
import type { AppTheme } from './theme';

export const ThemeContext = React.createContext<AppTheme | null>(null);

interface ThemeProviderProps {
  value: AppTheme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ value, children }) => {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): AppTheme => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};

export function useOptionalTheme(): AppTheme | null {
  return React.useContext(ThemeContext);
}

export const THEME_STORAGE_KEY = 'expensify_theme_preference';

