import React from 'react';
import { useStore } from '../store/expenseStore';
import { deleteExpense } from '../services/apiClient';

const ExpenseList = () => {
    const { expenses, setExpenses } = useStore();

    const handleDelete = async (id) => {
        await deleteExpense(id);
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    return (
        <div>
            <h2>Expense List</h2>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.description} - ${expense.amount} 
                        <button onClick={() => handleDelete(expense.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;