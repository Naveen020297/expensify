import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AddExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        // Logic to submit expense data
    };

    return (
        <View>
            <TextInput placeholder='Amount' value={amount} onChangeText={setAmount} />
            <TextInput placeholder='Category' value={category} onChangeText={setCategory} />
            <TextInput placeholder='Description' value={description} onChangeText={setDescription} />
            <Button title='Add Expense' onPress={handleSubmit} />
        </View>
    );
};

export default AddExpenseForm;