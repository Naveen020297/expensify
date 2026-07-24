// Updated API client to include expense endpoints
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
});

export const createExpense = async (expense) => {
    return await apiClient.post('/api/expenses', expense);
};

export const getExpenses = async () => {
    return await apiClient.get('/api/expenses');
};

export const updateExpense = async (id, expense) => {
    return await apiClient.put(`/api/expenses/${id}`, expense);
};

export const deleteExpense = async (id) => {
    return await apiClient.delete(`/api/expenses/${id}`);
};

export default apiClient;