import React from 'react';
import { View, Text } from 'react-native';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';

const ExpenseScreen = () => {
    return (
        <View>
            <Text style={{ fontSize: 24 }}>Expense Tracker</Text>
            <AddExpenseForm />
            <ExpenseList />
        </View>
    );
};

export default ExpenseScreen;