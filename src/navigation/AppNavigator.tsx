import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import EditExpenseForm from '../components/EditExpenseForm';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ExpenseList" component={ExpenseList} />
                <Stack.Screen name="AddExpense" component={AddExpenseForm} />
                <Stack.Screen name="EditExpense" component={EditExpenseForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;