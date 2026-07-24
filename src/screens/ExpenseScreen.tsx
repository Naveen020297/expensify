import React from 'react';
import { View } from 'react-native';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';

const ExpenseScreen = () => {
    return (
        <View>
            <AddExpenseForm />
            <ExpenseList />
        </View>
    );
};

export default ExpenseScreen;
