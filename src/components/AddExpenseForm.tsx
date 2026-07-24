import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useStore } from '../stores/expenseStore';

const AddExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const { addExpense } = useStore();

    const handleSubmit = () => {
        addExpense({ amount: parseFloat(amount), description, category, date });
        // Reset form
        setAmount('');
        setDescription('');
        setCategory('');
        setDate('');
    };

    return (
        <View>
            <Text>Add Expense</Text>
            <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
            <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
            <TextInput placeholder="Date" value={date} onChangeText={setDate} />
            <Button title="Add Expense" onPress={handleSubmit} />
        </View>
    );
};

export default AddExpenseForm;