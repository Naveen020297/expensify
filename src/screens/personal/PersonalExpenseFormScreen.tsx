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

export const PersonalExpenseFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { categoryId, categoryName, subCategoryId: initialSubId, subCategoryName: initialSubName } = route.params;

  const [subCategoryId, setSubCategoryId] = React.useState(initialSubId || '');
  const [subCategoryName, setSubCategoryName] = React.useState(initialSubName || '');
  const [availableSubCategories, setAvailableSubCategories] = React.useState<any[]>([]);
  const [showItemModal, setShowItemModal] = React.useState(false);
  const [newSubCategoryName, setNewSubCategoryName] = React.useState('');

  const [quantity, setQuantity] = React.useState('1');
  const [unitIndex, setUnitIndex] = React.useState(0);
  const [pricePerUnit, setPricePerUnit] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = React.useState(false);
  const [entries, setEntries] = React.useState<LocalExpense[]>([]);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const setTotalForDate = usePersonalDaySummaryStore((s) => s.setTotalForDate);

  const fetchSubCategories = async () => {
    try {
      const response = await apiClient.get(`/categories?type=PERSONAL&parentId=${categoryId}`);
      if (response.data?.success) {
        setAvailableSubCategories(response.data.data);
      }
    } catch (e) {
      console.error('Failed to fetch sub-cats', e);
    }
  };

  const fetchTodaysEntries = async () => {
    try {
      const activeCatId = subCategoryId || categoryId;
      const response = await apiClient.get(`/expenses/personal?fromDate=${date}&toDate=${date}&categoryId=${activeCatId}`);
      if (response.data) {
        setEntries(response.data.map((e: any) => ({
          id: e.id,
          quantity: e.quantity,
          unit: e.quantityUnit,
          pricePerUnit: e.pricePerUnit,
          total: e.totalAmount,
          date: e.expenseDate.split('T')[0]
        })));
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchTodaysEntries();
      fetchSubCategories();
    }
  }, [isFocused, date, subCategoryId]);


  const unit = QUANTITY_UNITS[unitIndex];
  const quantityNumber = parseFloat(quantity) || 0;
  const priceNumber = parseFloat(pricePerUnit) || 0;
  const total = quantityNumber * priceNumber;

  const todaysEntries = entries.filter((e) => e.date === date);
  const todaysTotal = todaysEntries.reduce((sum, e) => sum + e.total, 0);

  const resetForm = () => {
    setQuantity('1');
    setUnitIndex(0);
    setPricePerUnit('');
    setNotes('');
    setEditingId(null);
  };

  const handleCreateSubCategory = async () => {
    if (!newSubCategoryName) return;
    try {
      const response = await apiClient.post('/categories', {
        name: newSubCategoryName,
        type: 'PERSONAL',
        parentId: categoryId
      });
      if (response.data?.success) {
        const newCat = response.data.data;
        setSubCategoryId(newCat.id);
        setSubCategoryName(newCat.name);
        setNewSubCategoryName('');
        setShowItemModal(false);
        fetchSubCategories();
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to create item');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!priceNumber || !quantityNumber) {
        throw new Error('Please enter quantity and price');
      }

      const activeCatId = subCategoryId || categoryId;
      const activeCatName = subCategoryName ? `${categoryName} • ${subCategoryName}` : categoryName;

      const payload = {
        categoryId: activeCatId,
        label: activeCatName,
        quantity: quantityNumber,
        quantityUnit: unit,
        pricePerUnit: priceNumber,
        expenseDate: new Date(date).toISOString(),
        notes: notes || undefined,
        currency: 'INR'
      };

      if (editingId) {
        // TODO: implement PATCH /expenses/:id
        Alert.alert('Info', 'Edit not implemented yet in backend');
        return;
      }

      await apiClient.post('/expenses/personal', payload);

      // Refresh data
      fetchTodaysEntries();

      // update store total
      const response = await apiClient.get(`/reports/personal/summary?fromDate=${date}&toDate=${date}`);
      if (response.data?.success) {
        setTotalForDate(date, response.data.data.totalAmount);
      }

      resetForm();
      if (!editingId) navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || err.message || 'Failed to save expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{categoryName}{subCategoryName ? ` • ${subCategoryName}` : ''}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Enter details for your {categoryName} expense. You can optionally pick a specific item below.
        </Text>

        <TouchableOpacity
          style={[styles.itemPicker, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
          onPress={() => setShowItemModal(true)}
        >
          <Text style={{ color: subCategoryName ? theme.colors.textPrimary : theme.colors.textSecondary }}>
            {subCategoryName ? `Item: ${subCategoryName}` : 'Pick a specific item (optional)'}
          </Text>
          <Text style={{ color: theme.colors.primary, fontSize: 12 }}>Change</Text>
        </TouchableOpacity>

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
          label="Price per unit (INR)"
          value={pricePerUnit}
          onChangeText={setPricePerUnit}
          keyboardType="decimal-pad"
        />
        <TextField label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
        <TextField label="Notes (optional)" value={notes} onChangeText={setNotes} />

        <View style={styles.summary}>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Estimated total
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
            ₹ {total.toFixed(2)}
          </Text>
        </View>

        <Button
          title={editingId ? 'Update expense' : 'Save expense'}
          onPress={handleSubmit}
          loading={loading}
        />
        <Button
          title="Back to main categories"
          variant="secondary"
          onPress={() => navigation.navigate('PersonalCategory')}
        />

        <Modal visible={showItemModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>Choose {categoryName} Item</Text>
                <TouchableOpacity onPress={() => setShowItemModal(false)}>
                  <Text style={{ color: theme.colors.primary }}>Close</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 300 }}>
                <TouchableOpacity
                  style={styles.modalRow}
                  onPress={() => {
                    setSubCategoryId('');
                    setSubCategoryName('');
                    setShowItemModal(false);
                  }}
                >
                  <Text style={{ color: theme.colors.textPrimary }}>None (Use main category)</Text>
                </TouchableOpacity>
                {availableSubCategories.map((sub) => (
                  <TouchableOpacity
                    key={sub.id}
                    style={styles.modalRow}
                    onPress={() => {
                      setSubCategoryId(sub.id);
                      setSubCategoryName(sub.name);
                      setShowItemModal(false);
                    }}
                  >
                    <Text style={{ color: theme.colors.textPrimary }}>{sub.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.addCustomSection}>
                <Text style={[styles.addCustomTitle, { color: theme.colors.textSecondary }]}>Add new item</Text>
                <View style={styles.inlineAddRow}>
                  <TextField
                    label=""
                    placeholder="New item name..."
                    value={newSubCategoryName}
                    onChangeText={setNewSubCategoryName}
                  />
                  <View style={{ marginLeft: 8 }}>
                    <Button title="Add" onPress={handleCreateSubCategory} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {todaysEntries.length > 0 && (
          <View style={styles.todaySection}>
            <Text style={[styles.todayTitle, { color: theme.colors.textPrimary }]}>
              Today&apos;s {categoryName} entries
            </Text>
            <Text style={[styles.todaySubtitle, { color: theme.colors.textSecondary }]}>
              Total for {date}: ₹ {todaysTotal.toFixed(2)}
            </Text>
            <FlatList
              data={todaysEntries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.entryRow,
                    { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }
                  ]}
                  onPress={() => {
                    setEditingId(item.id);
                    setQuantity(item.quantity.toString());
                    const idx = QUANTITY_UNITS.indexOf(item.unit);
                    setUnitIndex(idx >= 0 ? idx : 0);
                    setPricePerUnit(item.pricePerUnit.toString());
                    setDate(item.date);
                  }}
                >
                  <Text style={{ color: theme.colors.textPrimary }}>
                    {item.quantity} {item.unit}
                  </Text>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                      Tap to edit
                    </Text>
                    <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
                      ₹ {item.total.toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
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

