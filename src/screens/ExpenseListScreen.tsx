import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useStore } from '../store/expenseStore';

const ExpenseListScreen = () => {
    const expenses = useStore(state => state.expenses);
    const fetchExpenses = useStore(state => state.fetchExpenses);

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <View>
            <Text>Expense List</Text>
            <FlatList
                data={expenses}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description} - ${item.amount}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ExpenseListScreen;