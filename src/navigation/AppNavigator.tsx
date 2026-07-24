import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Expense List' component={ExpenseList} />
                <Stack.Screen name='Add Expense' component={AddExpenseForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;