import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@src/theme/ThemeContext';

export type IconType = 'IMAGE' | 'LETTER';

export interface IconCategoryTileProps {
  name: string;
  iconType: IconType;
  iconImageUrl?: string | null;
  iconLetter?: string | null;
  onPress?: () => void;
}

export const IconCategoryTile: React.FC<IconCategoryTileProps> = ({
  name,
  iconType,
  iconImageUrl,
  iconLetter,
  onPress
}) => {
  const theme = useTheme();

  const displayLetter =
    (iconLetter && iconLetter.trim().charAt(0).toUpperCase()) ||
    (name && name.trim().charAt(0).toUpperCase()) ||
    '?';

  const showImage = iconType === 'IMAGE' && !!iconImageUrl;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surfaceElevated }]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: theme.colors.background, borderColor: theme.colors.border }
        ]}
      >
        {showImage ? (
          <Image source={{ uri: iconImageUrl as string }} style={styles.iconImage} />
        ) : (
          <Text style={[styles.iconLetter, { color: theme.colors.primary }]}>{displayLetter}</Text>
        )}
      </View>
      <Text
        style={[
          styles.label,
          { color: theme.colors.textPrimary }
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 96,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover'
  },
  iconLetter: {
    fontSize: 24,
    fontWeight: '700'
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500'
  }
});

