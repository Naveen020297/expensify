import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseList from '../screens/shared/ExpenseList';
import EditExpenseScreen from '../screens/shared/EditExpenseScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ExpenseList" component={ExpenseList} />
                <Stack.Screen name="EditExpense" component={EditExpenseScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;