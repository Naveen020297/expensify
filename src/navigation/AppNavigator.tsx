import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseTracker from '../components/ExpenseTracker';
import LoginScreen from './auth/LoginScreen';
import SignupScreen from './auth/SignupScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Signup' component={SignupScreen} />
                <Stack.Screen name='ExpenseTracker' component={ExpenseTracker} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;