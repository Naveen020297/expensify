import React from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';

const ExpenseTrackingScreen = () => {
    return (
        <div>
            <h1>Expense Tracking</h1>
            <AddExpenseForm />
            <ExpenseList />
        </div>
    );
};

export default ExpenseTrackingScreen;