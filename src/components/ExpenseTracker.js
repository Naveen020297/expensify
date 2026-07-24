import React, { useEffect, useState } from 'react';
import { createExpense, getExpenses } from '../services/apiClient';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', description: '', category: '', date: '' });

    const fetchExpenses = async () => {
        const response = await getExpenses();
        setExpenses(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createExpense(newExpense);
        fetchExpenses();
        setNewExpense({ amount: '', description: '', category: '', date: '' });
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div>
            <h1>Expense Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input type='number' placeholder='Amount' value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} required />
                <input type='text' placeholder='Description' value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} required />
                <input type='text' placeholder='Category' value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} required />
                <input type='date' value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} required />
                <button type='submit'>Add Expense</button>
            </form>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>{expense.description} - ${expense.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;