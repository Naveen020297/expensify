import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useStore } from '../store/expenseStore';

const AddExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const addExpense = useStore(state => state.addExpense);

    const handleSubmit = () => {
        addExpense({ amount: parseFloat(amount), description, category });
        setAmount('');
        setDescription('');
        setCategory('');
    };

    return (
        <View>
            <Text>Add Expense</Text>
            <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
            <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default AddExpenseForm;