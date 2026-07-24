import React from 'react';
import { View, Text } from 'react-native';
import { useExpenseStore } from '../stores/expenseStore';

const ExpenseList = () => {
    const { expenses } = useExpenseStore();

    return (
        <View>
            {expenses.map(expense => (
                <View key={expense.id}>
                    <Text>{expense.description} - ${expense.amount} on {expense.date}</Text>
                </View>
            ))}
        </View>
    );
};

export default ExpenseList;