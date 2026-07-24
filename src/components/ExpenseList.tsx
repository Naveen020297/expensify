import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        // Logic to fetch expenses
    }, []);

    return (
        <View>
            {expenses.map(expense => (
                <Text key={expense.id}>{expense.description}: ${expense.amount}</Text>
            ))}
        </View>
    );
};

export default ExpenseList;