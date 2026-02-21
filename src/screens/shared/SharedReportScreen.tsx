import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';
import { MonthPicker } from '@src/components/MonthPicker';
import { useAuthStore } from '@src/store/authStore';

type Props = NativeStackScreenProps<SharedStackParamList, 'SharedReport'>;

interface MemberTotal {
  userId: string;
  name: string;
  totalShare: number;
  net: number;
}

export const SharedReportScreen: React.FC<Props> = ({ route }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const currentUser = useAuthStore(s => s.user);
  const { groupId, groupName } = route.params;

  const [members, setMembers] = React.useState<MemberTotal[]>([]);
  const [expenses, setExpenses] = React.useState<any[]>([]);
  const [groupTotal, setGroupTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const [month, setMonth] = React.useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/reports/shared/summary?groupId=${groupId}&month=${month}`);
      if (response.data?.success) {
        const { perMemberTotals, netBalances, groupTotal, expenses } = response.data.data;
        const merged: MemberTotal[] = perMemberTotals.map((pm: any) => ({
          ...pm,
          net: netBalances.find((nb: any) => nb.userId === pm.userId)?.net || 0
        }));
        setMembers(merged);
        setGroupTotal(groupTotal);
        setExpenses(expenses || []);
      }
    } catch (error) {
      console.error('Failed to fetch shared report:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchReport();
    }
  }, [isFocused, groupId, month]);


  const handleDownloadPdf = () => {
    // TODO: call GET /reports/shared/pdf and handle PDF download
  };

  const renderNetLabel = (net: number) => {
    if (net > 0) return 'Should receive';
    if (net < 0) return 'Should pay';
    return 'Settled';
  };

  return (
    <ScreenContainer scrollable={false}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{groupName}</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Shared summary and detailed splits.
            </Text>

            <MonthPicker value={month} onChange={setMonth} />

            <View style={styles.totalCard}>
              <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>
                Group total
              </Text>
              <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
                ₹ {groupTotal.toFixed(2)}
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Summary</Text>
            {members.map(item => (
              <View
                key={item.userId}
                style={[
                  styles.summaryRow,
                  { borderBottomColor: theme.colors.border }
                ]}
              >
                <View>
                  <Text style={{ color: theme.colors.textPrimary }}>{item.name}</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                    {renderNetLabel(item.net)}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                    Share: ₹ {item.totalShare.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      color: item.net < 0 ? theme.colors.danger : theme.colors.success,
                      fontSize: 14,
                      fontWeight: '600'
                    }}
                  >
                    Net: ₹ {Math.abs(item.net).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}

            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, marginTop: 24 }]}>Detailed Expenses</Text>
          </>
        }
        renderItem={({ item }) => {
          const mySplit = item.splits.find((s: any) => s.userId === currentUser?.id);
          return (
            <View
              style={[
                styles.expenseItem,
                { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }
              ]}
            >
              <View style={styles.expenseHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.expenseLabel, { color: theme.colors.textPrimary }]}>{item.label}</Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 11 }}>
                    {item.categoryName} • {new Date(item.expenseDate).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={[styles.expenseTotal, { color: theme.colors.textPrimary }]}>
                  ₹ {item.totalAmount.toFixed(2)}
                </Text>
              </View>

              <View style={styles.expenseFooter}>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                  Paid by <Text style={{ color: theme.colors.textPrimary, fontWeight: '500' }}>{item.paidBy}</Text>
                </Text>
                {mySplit && (
                  <Text style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 12 }}>
                    Your share: ₹ {mySplit.amount.toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          !loading ? (
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No expenses found for this month.
            </Text>
          ) : null
        }
        ListFooterComponent={
          <Button title="Download PDF" variant="secondary" onPress={handleDownloadPdf} />
        }
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={fetchReport}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13
  },
  totalCard: {
    marginTop: 24,
    marginBottom: 16
  },
  totalLabel: {
    fontSize: 13
  },
  totalValue: {
    fontSize: 26,
    fontWeight: '700'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  list: {
    paddingVertical: 8,
    paddingBottom: 24
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  expenseItem: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8
  },
  expenseLabel: {
    fontSize: 15,
    fontWeight: '600'
  },
  expenseTotal: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8
  },
  expenseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 8
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14
  }
});

