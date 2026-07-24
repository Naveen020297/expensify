import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createExpense = async (expense) => {
    const response = await apiClient.post('/expenses', expense);
    return response.data;
};

export const getExpenses = async () => {
    const response = await apiClient.get('/expenses');
    return response.data;
};