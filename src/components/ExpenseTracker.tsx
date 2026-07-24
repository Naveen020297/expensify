import React, { useEffect, useState } from 'react';
import { createExpense, getExpenses, editExpense, deleteExpense } from '../services/apiClient';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', category: '', description: '', date: '' });

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
        setNewExpense({ amount: '', category: '', description: '', date: '' });
    };

    const handleEditExpense = async (id) => {
        await editExpense(id, newExpense);
        fetchExpenses();
    };

    const handleDeleteExpense = async (id) => {
        await deleteExpense(id);
        fetchExpenses();
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <input type='text' placeholder='Amount' value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} />
            <input type='text' placeholder='Category' value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} />
            <input type='text' placeholder='Description' value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} />
            <input type='date' value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} />
            <button onClick={handleAddExpense}>Add Expense</button>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.amount} - {expense.category} - {expense.description} - {expense.date}
                        <button onClick={() => handleEditExpense(expense.id)}>Edit</button>
                        <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;