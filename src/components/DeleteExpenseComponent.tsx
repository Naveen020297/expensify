import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useStore } from '../store/personalDaySummaryStore';

const DeleteExpenseComponent = ({ expenseId }) => {
    const [confirmation, setConfirmation] = useState(false);
    const deleteExpense = useStore(state => state.deleteExpense);

    const handleDelete = () => {
        deleteExpense(expenseId);
        setConfirmation(true);
    };

    return (
        <View>
            <Text>Are you sure you want to delete this expense?</Text>
            <Button title="Delete" onPress={handleDelete} />
            {confirmation && <Text>Expense deleted successfully!</Text>}
        </View>
    );
};

export default DeleteExpenseComponent;