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

