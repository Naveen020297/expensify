import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default AddExpenseForm;