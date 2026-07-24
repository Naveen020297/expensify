import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseTracker from '../components/ExpenseTracker';
import OtherScreens from './OtherScreens';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Expense Tracker' component={ExpenseTracker} />
                <Stack.Screen name='Other' component={OtherScreens} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;