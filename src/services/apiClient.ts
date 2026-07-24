// Updated API client to include expense endpoints
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createExpense = async (expense) => {
    return await apiClient.post('/expenses', expense);
};

export const getExpenses = async () => {
    return await apiClient.get('/expenses');
};

export const updateExpense = async (id, expense) => {
    return await apiClient.put(`/expenses/${id}`, expense);
};

export const deleteExpense = async (id) => {
    return await apiClient.delete(`/expenses/${id}`);
};

export default apiClient;