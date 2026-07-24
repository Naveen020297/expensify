import React, { useEffect, useState } from 'react';
import { getExpenses } from '../services/apiClient';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const data = await getExpenses();
            setExpenses(data);
        };
        fetchExpenses();
    }, []);

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>{expense.description} - ${expense.amount}</li>
            ))}
        </ul>
    );
};

export default ExpenseList;