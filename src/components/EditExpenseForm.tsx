import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const EditExpenseForm = ({ expense, onSubmit }) => {
    const [amount, setAmount] = useState(expense.amount);
    const [description, setDescription] = useState(expense.description);
    const [category, setCategory] = useState(expense.category);

    const handleSubmit = () => {
        onSubmit({ ...expense, amount, description, category });
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
            <Button title="Save" onPress={handleSubmit} />
        </View>
    );
};

export default EditExpenseForm;