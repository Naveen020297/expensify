import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';

export const fetchExpenses = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

export const createExpense = async (expense) => {
    try {
        const response = await axios.post(API_URL, expense);
        return response.data;
    } catch (error) {
        console.error('Error creating expense:', error);
        throw error;
    }
};