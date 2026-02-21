import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator, linking } from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';
import { ThemeProvider } from './src/theme/ThemeContext';
import { useAuthStore } from './src/store/authStore';

const Root: React.FC = () => {
  const { hydrate } = useAuthStore();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <NavigationContainer linking={linking}>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider value={theme}>
      <Root />
    </ThemeProvider>
  );
}

