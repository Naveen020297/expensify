// Updated API client to include expense tracking endpoints
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Expense API endpoints
export const createExpense = (expense) => apiClient.post('/api/expenses', expense);
export const getExpenses = () => apiClient.get('/api/expenses');
export const updateExpense = (id, expense) => apiClient.put(`/api/expenses/${id}`, expense);
export const deleteExpense = (id) => apiClient.delete(`/api/expenses/${id}`);

export default apiClient;