import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseListScreen from '../screens/shared/ExpenseListScreen';
import AddExpenseScreen from '../screens/shared/AddExpenseScreen'; // Assuming this screen exists for adding expenses

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
                <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;