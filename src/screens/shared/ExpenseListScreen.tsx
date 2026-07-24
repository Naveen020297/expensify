import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { deleteExpense } from '../services/apiClient';

const ExpenseListScreen = () => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        // Fetch expenses from API
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            Alert.alert('Success', 'Expense deleted successfully.');
            fetchExpenses();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete expense.');
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <View>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description} - ${item.amount}</Text>
                        <Button title='Delete' onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default ExpenseListScreen;