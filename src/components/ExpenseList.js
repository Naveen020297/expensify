import React, { useEffect, useState } from 'react';
import { getExpenses } from '../services/apiClient';

const ExpenseList = ({ token }) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const data = await getExpenses(token);
            setExpenses(data);
        };
        fetchExpenses();
    }, [token]);

    return (
        <div>
            <h2>Expense List</h2>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>{expense.description} - ${expense.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;