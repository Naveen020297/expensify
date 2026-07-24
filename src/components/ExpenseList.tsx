import React, { useEffect } from 'react';
import useExpenseStore from '../store/expenseStore';

const ExpenseList = () => {
    const expenses = useExpenseStore((state) => state.expenses);
    const fetchExpenses = useExpenseStore((state) => state.fetchExpenses);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return (
        <ul>
            {expenses.map((expense) => (
                <li key={expense.id}>{expense.description}: ${expense.amount}</li>
            ))}
        </ul>
    );
};

export default ExpenseList;