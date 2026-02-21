import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer } from '@src/components/ui';
import { useAuthStore } from '@src/store/authStore';
import { useTheme } from '@src/theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ModeSelect'>;

export const ModeSelectScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  const handleSelect = (mode: 'Personal' | 'Shared') => {
    navigation.navigate('Main', { initialTab: mode });
  };

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          What do you want to track?
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: theme.colors.danger, fontWeight: '600' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Choose between your own monthly spending or shared apartment bills.
      </Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: theme.colors.surfaceElevated, borderColor: theme.colors.border }
          ]}
          onPress={() => handleSelect('Personal')}
          activeOpacity={0.9}
        >
          <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>
            Personal
          </Text>
          <Text style={[styles.cardText, { color: theme.colors.textSecondary }]}>
            Groceries, fuel, utilities and everything just for you.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: theme.colors.surfaceElevated, borderColor: theme.colors.border }
          ]}
          onPress={() => handleSelect('Shared')}
          activeOpacity={0.9}
        >
          <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>
            Shared
          </Text>
          <Text style={[styles.cardText, { color: theme.colors.textSecondary }]}>
            Lift, shared electricity, cleaning and other split bills.
          </Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14
  },
  grid: {
    marginTop: 32
  },
  card: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6
  },
  cardText: {
    fontSize: 13
  }
});

