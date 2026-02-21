import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer, Button } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';
import { MonthPicker } from '@src/components/MonthPicker';

interface PersonalReportItem {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
}

export const PersonalReportScreen: React.FC = () => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [reportData, setReportData] = React.useState<PersonalReportItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const [month, setMonth] = React.useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/reports/personal/summary?month=${month}`);
      if (response.data?.success) {
        setReportData(response.data.data.byCategory);
        setTotal(response.data.data.totalAmount);
      }
    } catch (error) {
      console.error('Failed to fetch personal report:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchReport();
    }
  }, [isFocused, month]);


  const handleDownloadPdf = () => {
    // TODO: call GET /reports/personal/pdf and handle PDF download
  };

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Monthly summary</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Overview of your personal spending.
      </Text>

      <MonthPicker value={month} onChange={setMonth} />

      <View style={styles.totalCard}>
        <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>Total</Text>
        <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
          ₹ {total.toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={reportData}
        keyExtractor={(item) => item.categoryId}
        renderItem={({ item }) => (
          <View
            style={[
              styles.row,
              { borderBottomColor: theme.colors.border }
            ]}
          >
            <Text style={[styles.rowCategory, { color: theme.colors.textPrimary }]}>
              {item.categoryName}
            </Text>
            <Text style={[styles.rowAmount, { color: theme.colors.textSecondary }]}>
              ₹ {item.totalAmount.toFixed(2)}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={fetchReport}
      />

      <Button title="Download PDF" variant="secondary" onPress={handleDownloadPdf} />
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
  list: {
    paddingVertical: 8,
    paddingBottom: 24
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  rowCategory: {
    fontSize: 15
  },
  rowAmount: {
    fontSize: 15
  }
});

