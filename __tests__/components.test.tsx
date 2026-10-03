import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../src/theme/ThemeContext';
import { theme } from '../src/theme/theme';
import { IconCategoryTile } from '../src/components/IconCategoryTile';
import { Button } from '../src/components/ui';

const wrap = (node: React.ReactElement) => render(<ThemeProvider value={theme}>{node}</ThemeProvider>);

describe('IconCategoryTile', () => {
  it('shows the first letter of the name by default', () => {
    wrap(<IconCategoryTile name="food" iconType="LETTER" />);
    expect(screen.getByText('F')).toBeTruthy();
    expect(screen.getByText('food')).toBeTruthy();
  });

  it('prefers an explicit icon letter', () => {
    wrap(<IconCategoryTile name="food" iconType="LETTER" iconLetter="z" />);
    expect(screen.getByText('Z')).toBeTruthy();
  });

  it('falls back to ? when there is no name or letter', () => {
    wrap(<IconCategoryTile name="" iconType="LETTER" />);
    expect(screen.getByText('?')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    wrap(<IconCategoryTile name="Rent" iconType="LETTER" onPress={onPress} />);
    fireEvent.press(screen.getByText('Rent'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('Button', () => {
  it('fires onPress', () => {
    const onPress = jest.fn();
    wrap(<Button title="Save" onPress={onPress} />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire while disabled', () => {
    const onPress = jest.fn();
    wrap(<Button title="Save" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('hides the title while loading', () => {
    wrap(<Button title="Save" loading />);
    expect(screen.queryByText('Save')).toBeNull();
  });
});
