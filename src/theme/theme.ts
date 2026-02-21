export const colors = {
  background: '#050816',
  surface: '#0b1020',
  surfaceElevated: '#151b2f',
  primary: '#d4af37', // gold
  primarySoft: '#f5e6b8',
  textPrimary: '#ffffff',
  textSecondary: '#b3b8d0',
  border: '#2a3148',
  danger: '#ff4d4f',
  success: '#52c41a'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999
};

export const typography = {
  heading1: {
    fontSize: 28,
    fontWeight: '700' as const
  },
  heading2: {
    fontSize: 22,
    fontWeight: '600' as const
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const
  },
  label: {
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.3
  }
};

export const theme = {
  colors,
  spacing,
  radius,
  typography
};

export type AppTheme = typeof theme;

