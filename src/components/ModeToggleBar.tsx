import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '@src/navigation/AppNavigator';
import { useTheme } from '@src/theme/ThemeContext';

type Mode = 'Personal' | 'Shared';

interface ModeToggleBarProps {
  active: Mode;
}

export const ModeToggleBar: React.FC<ModeToggleBarProps> = ({ active }) => {
  const theme = useTheme();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const renderButton = (mode: Mode, label: string) => {
    const isActive = active === mode;
    return (
      <TouchableOpacity
        key={mode}
        style={[
          styles.button,
          {
            backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
            borderColor: theme.colors.border
          }
        ]}
        onPress={() => navigation.getParent()?.navigate(mode)}
        activeOpacity={0.9}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: isActive ? '#000' : theme.colors.textSecondary,
            fontWeight: '600'
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderButton('Personal', 'Personal')}
      {renderButton('Shared', 'Shared')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

