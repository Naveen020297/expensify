import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useStore } from '../store/expenseStore';
import AddExpenseForm from '../components/AddExpenseForm';

const ExpenseListScreen = () => {
    const expenses = useStore(state => state.expenses);
    const fetchExpenses = useStore(state => state.fetchExpenses);

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <View style={styles.container}>
            <AddExpenseForm />
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.description} - ${item.amount}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ExpenseListScreen;