import React, { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/apiClient';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        const response = await getExpenses();
        setExpenses(response.data);
    };

    const handleDelete = async (id) => {
        await deleteExpense(id);
        fetchExpenses();
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>
                    {expense.description} - ${expense.amount} - {expense.category} - {new Date(expense.date).toLocaleDateString()}
                    <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;