import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseTrackerScreen from '../screens/ExpenseTrackerScreen';
import OtherScreen from '../screens/OtherScreen'; // Placeholder for other screens

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Expense Tracker" component={ExpenseTrackerScreen} />
                <Stack.Screen name="Other" component={OtherScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;