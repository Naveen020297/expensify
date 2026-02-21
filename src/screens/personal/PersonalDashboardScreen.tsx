import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PersonalStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button } from '@src/components/ui';
import { useAuthStore } from '@src/store/authStore';
import { useTheme } from '@src/theme/ThemeContext';
import { ModeToggleBar } from '@src/components/ModeToggleBar';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<PersonalStackParamList, 'PersonalDashboard'>;

interface SummaryItem {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
}

const getCurrentMonthRangeLabel = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const format = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`;

  return `From ${format(start)} to ${format(end)}`;
};

export const PersonalDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [summary, setSummary] = React.useState<SummaryItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/reports/personal/summary');
      if (response.data?.success) {
        setSummary(response.data.data.byCategory);
        setTotal(response.data.data.totalAmount);
      }
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchSummary();
    }
  }, [isFocused]);

  const rangeLabel = getCurrentMonthRangeLabel();

  const handleLogout = async () => {
    try {
      await useAuthStore.getState().logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      <FlatList
        data={summary}
        keyExtractor={(item) => item.categoryId}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <ModeToggleBar active="Personal" />
              </View>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                <Text style={{ color: theme.colors.danger, fontWeight: '600' }}>Logout</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
              Personal expenses
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              This month&apos;s spending overview. Adjust dates from the report screen.
            </Text>

            <View style={styles.summaryCard}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                Current period
              </Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{rangeLabel}</Text>
              <Text style={[styles.summaryTotal, { color: theme.colors.primary }]}>
                ₹ {total.toFixed(2)}
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.summaryRow,
              { borderBottomColor: theme.colors.border }
            ]}
          >
            <Text style={{ color: theme.colors.textPrimary, flex: 1, marginRight: 8 }}>{item.categoryName}</Text>
            <Text style={{ color: theme.colors.textSecondary }}>
              ₹ {item.totalAmount.toFixed(2)}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.actions}>
            <Button
              title="Add new expense"
              onPress={() => navigation.navigate('PersonalCategory')}
            />
            <Button
              title="View / filter report"
              variant="secondary"
              onPress={() => navigation.navigate('PersonalReport')}
            />
          </View>
        }
        contentContainerStyle={styles.summaryList}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchSummary}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  logoutBtn: {
    padding: 8
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14
  },
  summaryCard: {
    marginTop: 24,
    marginBottom: 8
  },
  summaryLabel: {
    fontSize: 13
  },
  summaryTotal: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: '700'
  },
  summaryList: {
    paddingVertical: 8,
    paddingBottom: 16
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  actions: {
    marginTop: 32
  }
});

