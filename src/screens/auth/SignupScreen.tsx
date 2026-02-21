import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, TextField, Button } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { useAuthStore } from '@src/store/authStore';
import { apiClient } from '@src/services/apiClient';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { setAuth } = useAuthStore();
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post('/auth/signup', { name, username, email, password });
      const { user, token } = response.data;

      await setAuth({ user, token });
    } catch (err: any) {
      const message = err.response?.data?.error?.message || err.message || 'Signup failed';
      Alert.alert('Sign up failed', message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Create account</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Start organising your monthly and shared home expenses.
        </Text>
      </View>

      <View style={styles.form}>
        <TextField label="Name" value={name} onChangeText={setName} />
        <TextField label="Username" value={username} onChangeText={setUsername} />
        <TextField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign up" onPress={handleSignup} loading={loading} />
      </View>

      <View style={styles.footer}>
        <Text style={{ color: theme.colors.textSecondary }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.link, { color: theme.colors.primary }]}> Log in</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 32
  },
  title: {
    fontSize: 28,
    fontWeight: '700'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14
  },
  form: {
    marginTop: 8
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    fontWeight: '600'
  }
});

