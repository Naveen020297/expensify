import React, { useEffect, useState } from 'react';
import { getExpenses } from '../services/apiClient';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await getExpenses();
            setExpenses(response.data);
        };
        fetchExpenses();
    }, []);

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>{expense.amount} - {expense.category} - {expense.date}</li>
            ))}
        </ul>
    );
};

export default ExpenseList;