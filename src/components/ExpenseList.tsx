import React, { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/apiClient';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    const fetchExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleDelete = async (id) => {
        await deleteExpense(id);
        fetchExpenses();
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

    const handleFormSubmit = () => {
        setEditingExpense(null);
        fetchExpenses();
    };

    return (
        <div>
            <h2>Expense List</h2>
            <ExpenseForm expense={editingExpense} onSubmit={handleFormSubmit} />
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.amount} - {expense.description} - {expense.category}
                        <button onClick={() => handleEdit(expense)}>Edit</button>
                        <button onClick={() => handleDelete(expense.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;