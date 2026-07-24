import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useStore } from '../store/expenseStore';

const DeleteExpenseComponent = ({ expenseId }) => {
    const { deleteExpense } = useStore();

    const handleDelete = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this expense?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteExpense(expenseId)
                }
            ]
        );
    };

    return (
        <View>
            <Text>Delete Expense</Text>
            <Button title='Delete' onPress={handleDelete} />
        </View>
    );
};

export default DeleteExpenseComponent;