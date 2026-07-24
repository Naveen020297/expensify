import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStore } from '../store/expenseStore';

const ExpenseList = () => {
    const { expenses } = useStore();

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
            <Text>{item.description}</Text>
            <Text>{item.category}</Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
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

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    amount: {
        fontWeight: 'bold'
    }
});

export default ExpenseList;