import React from 'react';
import { Button, Alert } from 'react-native';
import { useStore } from '../store/personalDaySummaryStore';

const DeleteExpenseButton = ({ expenseId }) => {
    const { deleteExpense } = useStore();

    const handleDelete = () => {
        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => deleteExpense(expenseId),
                },
            ],
            { cancelable: false }
        );
    };

    return <Button title='Delete Expense' onPress={handleDelete} />;
};

export default DeleteExpenseButton;