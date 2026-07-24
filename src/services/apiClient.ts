import axios from 'axios';

const API_URL = 'http://your-api-url/api/expenses';

export const fetchExpenses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addExpense = async (expense) => {
    await axios.post(API_URL, expense);
};