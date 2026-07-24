import React from 'react';
import { View, Button, TextInput } from 'react-native';
import usePersonalDaySummaryStore from '../../store/personalDaySummaryStore';

const PersonalExpenseFormScreen = () => {
    const removeExpense = usePersonalDaySummaryStore(state => state.removeExpense);

    const handleDelete = async (id) => {
        await removeExpense(id);
    };

    return (
        <View>
            <TextInput placeholder='Expense ID to delete' />
            <Button title='Delete Expense' onPress={() => handleDelete(expenseId)} />
        </View>
    );
};

export default PersonalExpenseFormScreen;