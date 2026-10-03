import React from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PersonalStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { usePersonalDaySummaryStore } from '@src/store/personalDaySummaryStore';
import { IconCategoryTile } from '@src/components/IconCategoryTile';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';

type Props = NativeStackScreenProps<PersonalStackParamList, 'PersonalSubCategory'>;

interface SubCategory {
  id: string;
  name: string;
  iconType: 'IMAGE' | 'LETTER';
  iconImageUrl?: string | null;
  iconLetter?: string | null;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13
  },
  dayTotal: {
    marginTop: 4,
    fontSize: 12
  },
  grid: {
    paddingTop: 24,
    paddingBottom: 16
  },
  footer: {
    marginTop: 'auto'
  }
});

