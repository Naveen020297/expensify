import React, { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/apiClient';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data);
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
                    {expense.description} - {expense.amount} - {expense.category} - {expense.date}
                    <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;
