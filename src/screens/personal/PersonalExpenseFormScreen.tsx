import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { createExpense } from '../../services/apiClient';

const PersonalExpenseFormScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async () => {
        await createExpense({ amount, description, category });
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
            <Button title="Add Expense" onPress={handleSubmit} />
        </View>
    );
};

export default PersonalExpenseFormScreen;