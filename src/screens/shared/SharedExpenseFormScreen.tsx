import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { updateExpense } from '../services/apiClient';

const SharedExpenseFormScreen = ({ route, navigation }) => {
    const { expense } = route.params;
    const [amount, setAmount] = useState(expense.amount);
    const [description, setDescription] = useState(expense.description);
    const [category, setCategory] = useState(expense.category);

    const handleUpdate = async () => {
        const updatedExpense = { amount, description, category };
        await updateExpense(expense.id, updatedExpense);
        navigation.goBack();
    };

    return (
        <View>
            <TextInput
                placeholder="Amount"
                value={amount.toString()}
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

export default SharedExpenseFormScreen;