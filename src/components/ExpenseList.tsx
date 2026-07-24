import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import useExpenseStore from '../store/expenseStore';

const ExpenseList = () => {
    const expenses = useExpenseStore((state) => state.expenses);
    const fetchExpenses = useExpenseStore((state) => state.fetchExpenses);
    const removeExpense = useExpenseStore((state) => state.removeExpense);

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.description} - ${item.amount}</Text>
                    <Button title='Delete' onPress={() => removeExpense(item.id)} />
                </View>
            )}
        />
    );
};

export default ExpenseList;