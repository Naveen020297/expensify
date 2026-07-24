import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseScreen from '../screens/ExpenseScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Signup' component={SignupScreen} />
                <Stack.Screen name='Expenses' component={ExpenseScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
