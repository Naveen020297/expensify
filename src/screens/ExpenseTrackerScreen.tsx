import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import useExpenseStore from '../store/expenseStore';

const ExpenseTrackerScreen = () => {
    const { expenses, addExpense } = useExpenseStore();

    return (
        <View style={styles.container}>
            <AddExpenseForm onAddExpense={addExpense} />
            <ExpenseList expenses={expenses} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default ExpenseTrackerScreen;