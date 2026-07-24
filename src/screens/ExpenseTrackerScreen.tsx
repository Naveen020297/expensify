import React, { useEffect, useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import { getExpenses } from '../services/apiClient';

const ExpenseTrackerScreen = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await getExpenses();
            setExpenses(response.data);
        };
        fetchExpenses();
    }, []);

    return (
        <div>
            <h1>Expense Tracker</h1>
            <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        </div>
    );
};

export default ExpenseTrackerScreen;
