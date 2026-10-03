import React from 'react';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PersonalStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button, TextField } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { usePersonalDaySummaryStore } from '@src/store/personalDaySummaryStore';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<PersonalStackParamList, 'PersonalExpenseForm'>;

const QUANTITY_UNITS = ['kg', 'g', 'l', 'ml', 'piece', 'pack'];

interface LocalExpense {
  id: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  total: number;
  date: string;
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13
  },
  itemPicker: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    marginTop: 24
  },
  col: {
    flex: 1,
    marginRight: 12
  },
  fieldLabel: {
    fontSize: 13,
    marginBottom: 4
  },
  summary: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: 14
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700'
  },
  todaySection: {
    marginTop: 24
  },
  todayTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  todaySubtitle: {
    marginTop: 4,
    fontSize: 12
  },
  entryRow: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600'
  },
  modalRow: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc'
  },
  addCustomSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  addCustomTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8
  },
  inlineAddRow: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
});

