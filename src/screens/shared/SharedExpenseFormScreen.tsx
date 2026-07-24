import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useStore } from '../../store/personalDaySummaryStore';

const SharedExpenseFormScreen = () => {
    const { expenses, deleteExpense } = useStore();

    const handleDelete = (id) => {
        deleteExpense(id);
    };

    return (
        <View>
            <Text>Shared Expense Form</Text>
            {expenses.map(expense => (
                <View key={expense.id}>
                    <Text>{expense.description}</Text>
                    <Button title='Delete' onPress={() => handleDelete(expense.id)} />
                </View>
            ))}
        </View>
    );
};

export default SharedExpenseFormScreen;