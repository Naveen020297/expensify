import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ExpenseDetailScreen = ({ route, navigation }) => {
    const { expense } = route.params;

    const handleDelete = () => {
        // Logic to delete the expense
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Description: {expense.description}</Text>
            <Text>Amount: ${expense.amount}</Text>
            <Text>Category: {expense.category}</Text>
            <Text>Date: {new Date(expense.date).toLocaleDateString()}</Text>
            <Button title="Delete Expense" onPress={handleDelete} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default ExpenseDetailScreen;