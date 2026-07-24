import React, { useEffect } from 'react';
import { getExpenses } from '../services/apiClient';
import useExpenseStore from '../store/expenseStore';

const ExpenseList = () => {
    const expenses = useExpenseStore(state => state.expenses);
    const setExpenses = useExpenseStore(state => state.setExpenses);

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await getExpenses();
            setExpenses(response.data);
        };
        fetchExpenses();
    }, [setExpenses]);

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>{expense.description}: ${expense.amount} - {expense.category}</li>
            ))}
        </ul>
    );
};

export default ExpenseList;