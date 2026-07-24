import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AddExpenseForm = ({ onAddExpense }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = () => {
        const newExpense = { amount, description, category, date };
        onAddExpense(newExpense);
        setAmount('');
        setDescription('');
        setCategory('');
        setDate('');
    };

    return (
        <View>
            <TextInput placeholder='Amount' value={amount} onChangeText={setAmount} />
            <TextInput placeholder='Description' value={description} onChangeText={setDescription} />
            <TextInput placeholder='Category' value={category} onChangeText={setCategory} />
            <TextInput placeholder='Date' value={date} onChangeText={setDate} />
            <Button title='Add Expense' onPress={handleSubmit} />
        </View>
    );
};

export default AddExpenseForm;