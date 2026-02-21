import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import { useTheme } from '@src/theme/ThemeContext';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading
}) => {
  const theme = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isPrimary ? theme.colors.primary : 'transparent',
          borderColor: theme.colors.primary,
          opacity: disabled || loading ? 0.6 : 1
        }
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#000' : theme.colors.primary} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {
              color: isPrimary ? '#000' : theme.colors.primary
            }
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?:
  | 'default'
  | 'email-address'
  | 'numeric'
  | 'phone-pad'
  | 'decimal-pad';
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  placeholder,
  autoCapitalize,
  editable = true
}) => {
  const theme = useTheme();
  return (
    <View style={styles.fieldContainer}>
      <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: editable ? theme.colors.surface : theme.colors.background,
            color: theme.colors.textPrimary,
            borderColor: theme.colors.border,
            opacity: editable ? 1 : 0.7
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        placeholderTextColor={theme.colors.textSecondary}
        editable={editable}
      />
    </View>
  );
};

export const ScreenContainer: React.FC<{ children: React.ReactNode; scrollable?: boolean }> = ({
  children,
  scrollable = true
}) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const horizontalPadding = width < 480 ? 16 : 24;
  const maxWidth = 900;

  const content = (
    <View
      style={[
        styles.screenInner,
        {
          paddingHorizontal: horizontalPadding,
          maxWidth,
          width: '100%'
        }
      ]}
    >
      {children}
    </View>
  );

  return (
    <View style={[styles.screenOuter, { backgroundColor: theme.colors.background }]}>
      {scrollable ? (
        <ScrollView
          style={{ width: '100%', flex: 1 }}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={{ width: '100%', alignItems: 'center', flex: 1 }}>{content}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginVertical: 8
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  fieldContainer: {
    marginBottom: 12
  },
  fieldLabel: {
    fontSize: 13,
    marginBottom: 4
  },
  input: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    fontSize: 15
  },
  screenOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 56,
    paddingBottom: 24
  },
  screenInner: {
    flex: 1
  }
});

