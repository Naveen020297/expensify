import React from 'react';
import { View, Text } from 'react-native';
import { useStore } from '../stores/expenseStore';

const ExpenseList = () => {
    const expenses = useStore(state => state.expenses);

    return (
        <View>
            {expenses.map(expense => (
                <View key={expense.id}>
                    <Text>{expense.description}: ${expense.amount} on {expense.date}</Text>
                </View>
            ))}
        </View>
    );
};

export default ExpenseList;