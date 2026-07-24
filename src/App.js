import React from 'react';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
    return (
        <div>
            <h1>Expense Tracker</h1>
            <AddExpenseForm />
            <ExpenseList />
        </div>
    );
};

export default App;