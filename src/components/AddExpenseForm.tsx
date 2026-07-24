import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddExpenseForm = ({ onAddExpense }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        const expense = { amount: parseFloat(amount), description, category, date: new Date() };
        onAddExpense(expense);
        setAmount('');
        setDescription('');
        setCategory('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />
            <Button title="Add Expense" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 10,
    },
});

export default AddExpenseForm;