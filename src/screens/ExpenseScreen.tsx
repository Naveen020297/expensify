import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { fetchExpenses, addExpense } from '../services/apiClient';

const ExpenseScreen = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const loadExpenses = async () => {
            const data = await fetchExpenses();
            setExpenses(data);
        };
        loadExpenses();
    }, []);

    const handleAddExpense = async (expense) => {
        await addExpense(expense);
        setExpenses([...expenses, expense]);
    };

    return (
        <View style={styles.container}>
            <ExpenseForm onSubmit={handleAddExpense} />
            <ExpenseList expenses={expenses} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default ExpenseScreen;