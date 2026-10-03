import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, TextField, Button } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { useAuthStore } from '@src/store/authStore';
import { apiClient } from '@src/services/apiClient';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const styles = StyleSheet.create({
  header: {
    marginBottom: 32
  },
  title: {
    fontSize: 28,
    fontWeight: '700'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14
  },
  form: {
    marginTop: 8
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    fontWeight: '600'
  }
});

