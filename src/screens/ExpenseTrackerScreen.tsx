import React, { useState } from 'react';
import { View } from 'react-native';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';

const ExpenseTrackerScreen = () => {
    const [expenses, setExpenses] = useState([]);

    const handleAddExpense = (expense) => {
        setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
    };

    return (
        <View>
            <AddExpenseForm onAddExpense={handleAddExpense} />
            <ExpenseList expenses={expenses} />
        </View>
    );
};

export default ExpenseTrackerScreen;