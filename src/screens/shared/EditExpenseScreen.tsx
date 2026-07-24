import React from 'react';
import { View, Text } from 'react-native';
import EditExpenseForm from '../components/EditExpenseForm';

const EditExpenseScreen = ({ route, navigation }) => {
    const { expense } = route.params;

    const handleEditExpense = (updatedExpense) => {
        // Call API to update expense
        // Navigate back or show success message
    };

    return (
        <View>
            <Text>Edit Expense</Text>
            <EditExpenseForm expense={expense} onSubmit={handleEditExpense} />
        </View>
    );
};

export default EditExpenseScreen;