import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button, TextField } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { apiClient } from '@src/services/apiClient';
import { useAuthStore } from '@src/store/authStore';

type Props = NativeStackScreenProps<SharedStackParamList, 'GroupForm'>;

interface User {
  id: string;
  name: string;
  email: string;
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
  sectionLabel: {
    marginTop: 16,
    fontSize: 13
  },
  list: {
    paddingVertical: 8,
    paddingBottom: 16
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8
  }
});

