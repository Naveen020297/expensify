import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button } from '@src/components/ui';
import { useAuthStore } from '@src/store/authStore';
import { useTheme } from '@src/theme/ThemeContext';
import { ModeToggleBar } from '@src/components/ModeToggleBar';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<SharedStackParamList, 'SharedDashboard'>;

interface SharedSummaryItem {
  groupId: string;
  groupName: string;
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

export const SharedDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [summaries, setSummaries] = React.useState<SharedSummaryItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/reports/shared/overview');
      if (response.data?.success) {
        setSummaries(response.data.data.summaries);
        setTotal(response.data.data.totalSharedAmount);
      }
    } catch (error) {
      console.error('Failed to fetch shared overview:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchOverview();
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
        data={summaries}
        keyExtractor={(item) => item.groupId}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <ModeToggleBar active="Shared" />
              </View>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                <Text style={{ color: theme.colors.danger, fontWeight: '600' }}>Logout</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
              Shared home expenses
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              This month&apos;s shared bills across all your groups.
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
          <TouchableOpacity
            style={[
              styles.summaryRow,
              { borderBottomColor: theme.colors.border }
            ]}
            onPress={() => navigation.navigate('SharedReport', {
              groupId: item.groupId,
              groupName: item.groupName
            })}
          >
            <Text style={{ color: theme.colors.textPrimary, flex: 1, marginRight: 8 }}>{item.groupName}</Text>
            <Text style={{ color: theme.colors.textSecondary }}>
              ₹ {item.totalAmount.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.actions}>
            <Button
              title="Add shared expense"
              onPress={() => navigation.navigate('GroupList')}
            />
            <Button
              title="Manage groups"
              variant="secondary"
              onPress={() => navigation.navigate('GroupList')}
            />
          </View>
        }
        contentContainerStyle={styles.summaryList}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchOverview}
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

