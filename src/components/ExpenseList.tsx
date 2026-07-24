import React, { useEffect, useState } from 'react';
import { getExpenses } from '../services/apiClient';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        const response = await getExpenses();
        setExpenses(response.data);
    };

    useEffect(() => {
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