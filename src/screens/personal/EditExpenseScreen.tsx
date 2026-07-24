import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { updateExpense, getExpenses } from '../../services/apiClient';

const EditExpenseScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchExpense = async () => {
            const expenses = await getExpenses();
            const expense = expenses.find(exp => exp.id === id);
            if (expense) {
                setAmount(expense.amount);
                setDescription(expense.description);
                setCategory(expense.category);
            }
        };
        fetchExpense();
    }, [id]);

    const handleUpdate = async () => {
        await updateExpense(id, { amount, description, category });
        navigation.goBack();
    };

    return (
        <View>
            <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
            />
            <Button title="Update Expense" onPress={handleUpdate} />
        </View>
    );
};

export default EditExpenseScreen;