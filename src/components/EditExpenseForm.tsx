import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EditExpenseForm = ({ expense, onSubmit }) => {
    const [amount, setAmount] = useState(expense.amount);
    const [description, setDescription] = useState(expense.description);
    const [category, setCategory] = useState(expense.category);

    const handleSubmit = () => {
        onSubmit({ ...expense, amount, description, category });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Amount"
                value={amount.toString()}
                onChangeText={text => setAmount(parseFloat(text))}
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
            <Button title="Save" onPress={handleSubmit} />
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

export default EditExpenseForm;