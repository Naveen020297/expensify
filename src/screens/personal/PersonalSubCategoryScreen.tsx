import React from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PersonalStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { usePersonalDaySummaryStore } from '@src/store/personalDaySummaryStore';
import { IconCategoryTile } from '@src/components/IconCategoryTile';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';

type Props = NativeStackScreenProps<PersonalStackParamList, 'PersonalSubCategory'>;

interface SubCategory {
  id: string;
  name: string;
  iconType: 'IMAGE' | 'LETTER';
  iconImageUrl?: string | null;
  iconLetter?: string | null;
}

export const PersonalSubCategoryScreen: React.FC<Props> = ({ route, navigation }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { parentCategoryId, parentName } = route.params;
  const [subCategories, setSubCategories] = React.useState<SubCategory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { width } = useWindowDimensions();

  const horizontalPadding = width < 480 ? 16 : 24;
  const tileWidth = 112; // 96 width + 8*2 margin
  const availableWidth = width - (horizontalPadding * 2);
  const numColumns = Math.max(1, Math.floor(availableWidth / tileWidth));

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/categories?type=PERSONAL&parentId=${parentCategoryId}`);
      if (response.data?.success) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchSubCategories();
    }
  }, [isFocused, parentCategoryId]);

  const today = new Date().toISOString().slice(0, 10);
  const todayTotal = usePersonalDaySummaryStore(
    (s) => s.totalsByDate[today] ?? 0
  );

  const handlePressSubCategory = (sub: SubCategory) => {
    navigation.navigate('PersonalExpenseForm', {
      categoryId: sub.id,
      categoryName: `${parentName} • ${sub.name}`
    });
  };

  const handleAddCustomSubCategory = () => {
    const title = 'New Item';
    const message = `Enter item name for ${parentName}:`;

    const onCreate = async (name: string) => {
      if (!name) return;
      try {
        await apiClient.post('/categories', {
          name,
          type: 'PERSONAL',
          parentId: parentCategoryId
        });
        fetchSubCategories();
      } catch (err) {
        Alert.alert('Error', 'Failed to create item');
      }
    };

    if (Platform.OS === 'ios') {
      Alert.prompt(title, message, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Create', onPress: (name) => name && onCreate(name) }
      ]);
    } else if (Platform.OS === 'web') {
      const name = window.prompt(message);
      if (name) onCreate(name);
    } else {
      Alert.alert(
        'New Item',
        'Android modal coming soon. For now, please use the web or iOS version to add custom items.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      <FlatList
        data={subCategories}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
              {parentName}
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Choose a specific item or add your own.
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
            onPress={() => handlePressSubCategory(item)}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Button
              title="Add custom item"
              variant="secondary"
              onPress={handleAddCustomSubCategory}
            />
          </View>
        }
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchSubCategories}
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
  }
});

