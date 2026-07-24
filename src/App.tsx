import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Expense List" component={ExpenseList} />
                <Stack.Screen name="Add Expense" component={AddExpenseForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;