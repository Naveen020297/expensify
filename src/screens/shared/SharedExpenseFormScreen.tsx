import React from 'react';
import ExpenseForm from '../../components/ExpenseForm';

const SharedExpenseFormScreen = ({ route }) => {
    const { expense } = route.params;
    return <ExpenseForm expense={expense} onSubmit={() => { /* Navigate back or refresh */ }} />;
};

export default SharedExpenseFormScreen;