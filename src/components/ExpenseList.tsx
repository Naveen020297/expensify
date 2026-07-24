import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useStore } from '../stores/expenseStore';

const ExpenseList = () => {
    const { expenses, deleteExpense } = useStore();

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.description} - ${item.amount}</Text>
            <Button title='Edit' onPress={() => {/* Navigate to edit form */}} />
            <Button title='Delete' onPress={() => deleteExpense(item.id)} />
        </View>
    );

    return (
        <FlatList
            data={expenses}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
};

export default ExpenseList;