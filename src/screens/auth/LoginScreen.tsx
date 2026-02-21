import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, TextField, Button } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { useAuthStore } from '@src/store/authStore';
import { apiClient } from '@src/services/apiClient';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const theme = useTheme();
    const { setAuth } = useAuthStore();
    const [identifier, setIdentifier] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await apiClient.post('/auth/login', { identifier, password });
            const { user, token } = response.data;

            await setAuth({ user, token });
        } catch (err: any) {
            const message = err.response?.data?.error?.message || err.message || 'Login failed';
            Alert.alert('Login failed', message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <ScreenContainer>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Welcome back</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    Track your personal and shared home expenses in one beautiful app.
                </Text>
            </View>

            <View style={styles.form}>
                <TextField label="Email or Username" value={identifier} onChangeText={setIdentifier} />
                <TextField
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Log in" onPress={handleLogin} loading={loading} />
            </View>

            <View style={styles.footer}>
                <Text style={{ color: theme.colors.textSecondary }}>Don&apos;t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={[styles.link, { color: theme.colors.primary }]}> Sign up</Text>
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

