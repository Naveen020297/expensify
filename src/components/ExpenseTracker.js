import React, { useEffect, useState } from 'react';
import { createExpense, getExpenses } from '../services/apiClient';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', description: '', category: '', date: '' });

    const fetchExpenses = async () => {
        const response = await getExpenses();
        setExpenses(response.data);
    };

    const handleAddExpense = async () => {
        await createExpense(newExpense);
        fetchExpenses();
        setNewExpense({ amount: '', description: '', category: '', date: '' });
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Expense Tracker</h2>
            <input type='number' placeholder='Amount' value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} />
            <input type='text' placeholder='Description' value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} />
            <input type='text' placeholder='Category' value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} />
            <input type='date' value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} />
            <button onClick={handleAddExpense}>Add Expense</button>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>{expense.description} - {expense.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;