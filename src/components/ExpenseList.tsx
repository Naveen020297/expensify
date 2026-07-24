import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useStore } from '../store/expenseStore';

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
                        <Text>{item.description}</Text>
                        <Text>{item.amount}</Text>
                        <Text>{item.category}</Text>
                        <Text>{item.date}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ExpenseList;