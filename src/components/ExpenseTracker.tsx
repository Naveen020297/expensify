import React from 'react';
import { View, Text } from 'react-native';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';

const ExpenseTracker = () => {
    return (
        <View>
            <Text>Expense Tracker</Text>
            <AddExpenseForm />
            <ExpenseList />
        </View>
    );
};

export default ExpenseTracker;