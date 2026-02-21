import React from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button, TextField } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { useSharedDaySummaryStore } from '@src/store/sharedDaySummaryStore';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<SharedStackParamList, 'SharedExpenseForm'>;

interface Member {
  id: string;
  name: string;
}

const QUANTITY_UNITS = ['month', 'piece', 'kg', 'l'];

export const SharedExpenseFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { groupId, groupName, categoryId, categoryName } = route.params;

  const [quantity, setQuantity] = React.useState('1');
  const [unitIndex, setUnitIndex] = React.useState(0);
  const [pricePerUnit, setPricePerUnit] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [members, setMembers] = React.useState<Member[]>([]);
  const [selectedMemberIds, setSelectedMemberIds] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const setTotalForGroupAndDate = useSharedDaySummaryStore(
    (s) => s.setTotalForGroupAndDate
  );

  const fetchMembers = async () => {
    try {
      const response = await apiClient.get(`/groups/${groupId}`);
      if (response.data?.success) {
        const m = response.data.data.members.map((mem: any) => ({
          id: mem.userId,
          name: mem.user.name
        }));
        setMembers(m);
        setSelectedMemberIds(m.map((mem: any) => mem.id));
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchMembers();
    }
  }, [isFocused, groupId]);


  const unit = QUANTITY_UNITS[unitIndex];
  const quantityNumber = parseFloat(quantity) || 0;
  const priceNumber = parseFloat(pricePerUnit) || 0;
  const total = quantityNumber * priceNumber;
  const splitCount = selectedMemberIds.length || 1;
  const perHead = total / splitCount;

  const toggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!priceNumber || !quantityNumber) {
        throw new Error('Please enter quantity and price');
      }
      if (selectedMemberIds.length === 0) {
        throw new Error('Select at least one member to split between');
      }

      const payload = {
        groupId,
        categoryId,
        label: categoryName,
        quantity: quantityNumber,
        quantityUnit: unit,
        pricePerUnit: priceNumber, // total bill in this case
        expenseDate: new Date(date).toISOString(),
        notes: notes || undefined,
        currency: 'INR',
        includedMemberIds: selectedMemberIds
      };

      await apiClient.post('/expenses/shared', payload);

      const response = await apiClient.get(`/reports/shared/overview?fromDate=${date}&toDate=${date}`);
      if (response.data?.success) {
        const groupSum = response.data.data.summaries.find((s: any) => s.groupId === groupId);
        if (groupSum) {
          setTotalForGroupAndDate(groupId, date, groupSum.totalAmount);
        }
      }

      navigation.navigate('SharedCategory', { groupId, groupName });
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to save shared expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{groupName}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {categoryName || 'Shared expense'} • Select members and split.
        </Text>

        <View style={styles.row}>
          <View style={styles.col}>
            <TextField
              label="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.col}>
            <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>
              Unit
            </Text>
            <Button
              title={unit}
              variant="secondary"
              onPress={() => setUnitIndex((prev) => (prev + 1) % QUANTITY_UNITS.length)}
            />
          </View>
        </View>

        <TextField
          label="Price (total for bill)"
          value={pricePerUnit}
          onChangeText={setPricePerUnit}
          keyboardType="decimal-pad"
        />
        <TextField label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
        <TextField label="Notes (optional)" value={notes} onChangeText={setNotes} />

        <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
          Split between
        </Text>
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const included = selectedMemberIds.includes(item.id);
            return (
              <TouchableOpacity
                style={[
                  styles.memberRow,
                  {
                    borderColor: theme.colors.border,
                    backgroundColor: included
                      ? theme.colors.surfaceElevated
                      : theme.colors.surface
                  }
                ]}
                onPress={() => toggleMember(item.id)}
              >
                <Text style={{ color: theme.colors.textPrimary }}>{item.name}</Text>
                <Text style={{ color: included ? theme.colors.primary : theme.colors.textSecondary }}>
                  {included ? 'Included' : 'Excluded'}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <View style={styles.summary}>
          <View>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Total
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
              ₹ {total.toFixed(2)}
            </Text>
          </View>
          <View>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Per member ({splitCount})
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.textPrimary }]}>
              ₹ {perHead.toFixed(2)}
            </Text>
          </View>
        </View>

        <Button title="Save shared expense" onPress={handleSubmit} loading={loading} />
      </ScrollView>
    </ScreenContainer>
  );
};

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
  sectionLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 13
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8
  },
  summary: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: 13
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700'
  }
});

