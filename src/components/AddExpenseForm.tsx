import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useStore } from '../store/expenseStore';

const AddExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const { addExpense } = useStore();

    const handleSubmit = () => {
        addExpense({ amount: parseFloat(amount), description, category });
        setAmount('');
        setDescription('');
        setCategory('');
    };

    return (
        <View>
            <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
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
            <Button title="Add Expense" onPress={handleSubmit} />
        </View>
    );
};

export default AddExpenseForm;