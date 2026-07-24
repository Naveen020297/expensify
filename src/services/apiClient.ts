import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://your-api-url.com/api',
});

export const createExpense = (expense) => apiClient.post('/expenses', expense);
export const updateExpense = (id, expense) => apiClient.put(`/expenses/${id}`, expense);
export const deleteExpense = (id) => apiClient.delete(`/expenses/${id}`);
export const getExpenses = () => apiClient.get('/expenses');