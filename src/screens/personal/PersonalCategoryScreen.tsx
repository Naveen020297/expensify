import React from 'react';
import { Alert, FlatList, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PersonalStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button, TextField } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { usePersonalDaySummaryStore } from '@src/store/personalDaySummaryStore';
import { IconCategoryTile } from '@src/components/IconCategoryTile';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';

type Props = NativeStackScreenProps<PersonalStackParamList, 'PersonalCategory'>;

interface Category {
  id: string;
  name: string;
  iconType: 'IMAGE' | 'LETTER';
  iconImageUrl?: string | null;
  iconLetter?: string | null;
}

export const PersonalCategoryScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newCatName, setNewCatName] = React.useState('');
  const { width } = useWindowDimensions();

  const horizontalPadding = width < 480 ? 16 : 24;
  const tileWidth = 112; // 96 width + 8*2 margin
  const availableWidth = width - (horizontalPadding * 2);
  const numColumns = Math.max(1, Math.floor(availableWidth / tileWidth));

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/categories?type=PERSONAL');
      if (response.data?.success) {
        // filter for top level (parentId is null or undefined)
        setCategories(response.data.data.filter((c: any) => !c.parentId));
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
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
  const todayTotal = usePersonalDaySummaryStore(
    (s) => s.totalsByDate[today] ?? 0
  );

  const handlePressCategory = (category: Category) => {
    navigation.navigate('PersonalExpenseForm', {
      categoryId: category.id,
      categoryName: category.name
    });
  };

  const handleAddCustomCategory = async () => {
    if (!newCatName) return;
    try {
      await apiClient.post('/categories', { name: newCatName, type: 'PERSONAL' });
      setNewCatName('');
      setShowAddModal(false);
      fetchCategories();
    } catch (err) {
      Alert.alert('Error', 'Failed to create category');
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      <FlatList
        data={categories}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Pick a category</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Choose a spending bucket to drill into details like vegetables, car, utilities and more.
            </Text>
            <Text style={[styles.dayTotal, { color: theme.colors.textSecondary }]}>
              Today&apos;s total: ₹ {todayTotal.toFixed(2)}
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
              title="Add custom category"
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
              <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>New category</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={{ color: theme.colors.primary }}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <TextField
              label="Category name"
              placeholder="e.g. Shopping, Hobbies"
              value={newCatName}
              onChangeText={setNewCatName}
            />
            <View style={{ marginTop: 16 }}>
              <Button title="Create category" onPress={handleAddCustomCategory} />
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
  dayTotal: {
    marginTop: 4,
    fontSize: 12
  },
  grid: {
    paddingTop: 24,
    paddingBottom: 16
  },
  footer: {
    marginTop: 'auto'
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

