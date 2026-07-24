import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useStore } from '../stores/expenseStore';

const ExpenseList = () => {
    const { expenses } = useStore();

    return (
        <View>
            <Text>Expense List</Text>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description} - ${item.amount} - {item.category} - {item.date}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ExpenseList;