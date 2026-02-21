import React from 'react';
import { Alert, FlatList, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button, TextField } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { useSharedDaySummaryStore } from '@src/store/sharedDaySummaryStore';
import { IconCategoryTile } from '@src/components/IconCategoryTile';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<SharedStackParamList, 'SharedCategory'>;

interface Category {
  id: string;
  name: string;
  iconType: 'IMAGE' | 'LETTER';
  iconImageUrl?: string | null;
  iconLetter?: string | null;
}

export const SharedCategoryScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newCatName, setNewCatName] = React.useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/categories?type=SHARED');
      if (response.data?.success) {
        setCategories(response.data.data.filter((c: any) => !c.parentId));
      }
    } catch (error) {
      console.error('Failed to fetch shared categories:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchCategories();
    }
  }, [isFocused]);

  const today = new Date().toISOString().slice(0, 10);
  const totalsByGroupAndDate = useSharedDaySummaryStore(
    (s) => s.totalsByGroupAndDate
  );
  const todayTotal =
    totalsByGroupAndDate[`${route.params.groupId}:${today}`] ?? 0;

  const handlePressCategory = (category: Category) => {
    navigation.navigate('SharedExpenseForm', {
      groupId: route.params.groupId,
      groupName: route.params.groupName,
      categoryId: category.id,
      categoryName: category.name
    });
  };

  const handleAddCustomCategory = async () => {
    if (!newCatName) return;
    try {
      await apiClient.post('/categories', { name: newCatName, type: 'SHARED' });
      setNewCatName('');
      setShowAddModal(false);
      fetchCategories();
    } catch (err) {
      Alert.alert('Error', 'Failed to create shared category');
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
              Shared expense type
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Choose the kind of shared bill you&apos;re adding.
            </Text>
            <Text style={[styles.dayTotal, { color: theme.colors.textSecondary }]}>
              Today&apos;s total for {route.params.groupName}: ₹ {todayTotal.toFixed(2)}
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <IconCategoryTile
            name={item.name}
            iconType={item.iconType}
            iconImageUrl={item.iconImageUrl}
            iconLetter={item.iconLetter || item.name.charAt(0)}
            onPress={() => handlePressCategory(item)}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Button
              title="Add custom type"
              variant="secondary"
              onPress={() => setShowAddModal(true)}
            />
          </View>
        }
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchCategories}
      />

      <Modal visible={showAddModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>New shared type</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={{ color: theme.colors.primary }}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <TextField
              label="Billing type name"
              placeholder="e.g. WiFi, Water, Maid"
              value={newCatName}
              onChangeText={setNewCatName}
            />
            <View style={{ marginTop: 16 }}>
              <Button title="Create type" onPress={handleAddCustomCategory} />
            </View>
          </View>
        </View>
      </Modal>
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
  grid: {
    paddingTop: 24,
    paddingBottom: 16
  },
  dayTotal: {
    marginTop: 4,
    fontSize: 12
  },
  footer: {
    marginTop: 16
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
  }
});

