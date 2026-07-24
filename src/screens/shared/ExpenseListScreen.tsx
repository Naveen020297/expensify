import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStore } from '../../store/expenseStore';

const ExpenseListScreen = () => {
    const { expenses, fetchExpenses } = useStore();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.description}</Text>
            <Text style={styles.itemText}>${item.amount.toFixed(2)}</Text>
            <Text style={styles.itemText}>{item.category}</Text>
            <Text style={styles.itemText}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expense List</Text>
            <FlatList
                data={expenses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});

export default ExpenseListScreen;