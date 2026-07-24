import React from 'react';
import { View } from 'react-native';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';

const ExpenseTracker = () => {
    return (
        <View>
            <AddExpenseForm />
            <ExpenseList />
        </View>
    );
};

export default ExpenseTracker;