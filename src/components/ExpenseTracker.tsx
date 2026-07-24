import React, { useEffect } from 'react';
import { View } from 'react-native';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';
import { useExpenseStore } from '../stores/expenseStore';

const ExpenseTracker = () => {
    const { fetchExpenses } = useExpenseStore();

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <View>
            <AddExpenseForm />
            <ExpenseList />
        </View>
    );
};

export default ExpenseTracker;