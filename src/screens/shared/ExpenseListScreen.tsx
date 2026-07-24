import React, { useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useStore } from '../store/personalDaySummaryStore';
import DeleteExpenseButton from '../components/DeleteExpenseButton';

const ExpenseListScreen = () => {
    const { expenses, fetchExpenses } = useStore();

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
                        <DeleteExpenseButton expenseId={item.id} />
                    </View>
                )}
            />
        </View>
    );
};

export default ExpenseListScreen;