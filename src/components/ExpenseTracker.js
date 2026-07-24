import React, { useEffect, useState } from 'react';
import { createExpense, getExpenses, editExpense, deleteExpense } from '../services/apiClient';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', description: '', date: '', category: '' });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await getExpenses();
        setExpenses(response.data);
    };

    const handleAddExpense = async () => {
        await createExpense(newExpense);
        fetchExpenses();
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <input type='text' placeholder='Amount' onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} />
            <input type='text' placeholder='Description' onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} />
            <input type='date' onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} />
            <input type='text' placeholder='Category' onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} />
            <button onClick={handleAddExpense}>Add Expense</button>
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>{expense.description} - ${expense.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;