import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { deleteExpense } from '../services/apiClient';

const SharedExpenseFormScreen = ({ route }) => {
    const navigation = useNavigation();
    const { expense } = route.params;

    const handleDelete = async () => {
        await deleteExpense(expense.id);
        navigation.navigate('ExpenseList');
    };

    return (
        <div>
            <h1>{expense.description}</h1>
            <button onClick={handleDelete}>Delete Expense</button>
        </div>
    );
};

export default SharedExpenseFormScreen;