import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useStore } from '../store/expenseStore';
import DeleteExpenseComponent from '../components/DeleteExpenseComponent';

const ExpenseListScreen = () => {
    const { expenses, fetchExpenses } = useStore();

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <View>
            <Text>Expense List</Text>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description} - ${item.amount}</Text>
                        <DeleteExpenseComponent expenseId={item.id} />
                    </View>
                )}
            />
        </View>
    );
};

export default ExpenseListScreen;