import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { fetchExpenses } from '../services/apiClient';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const loadExpenses = async () => {
            const data = await fetchExpenses();
            setExpenses(data);
        };
        loadExpenses();
    }, []);

    return (
        <View>
            <Text>Expense Tracker</Text>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description} - ${item.amount}</Text>
                    </View>
                )}
            />
            <Button title='Add Expense' onPress={() => { /* Navigate to Add Expense Form */ }} />
        </View>
    );
};

export default ExpenseTracker;