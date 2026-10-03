import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';
import { theme } from '../src/theme/theme';

const Probe = () => <Text>{useTheme().colors.primary}</Text>;

describe('ThemeContext', () => {
  it('provides the theme to children', () => {
    render(<ThemeProvider value={theme}><Probe /></ThemeProvider>);
    expect(screen.getByText(theme.colors.primary)).toBeTruthy();
  });

  it('throws outside a provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow('useTheme must be used within ThemeProvider');
    spy.mockRestore();
  });
});
