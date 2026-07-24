import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createExpense = (expense) => apiClient.post('/expenses', expense);
export const getExpenses = () => apiClient.get('/expenses');
export const editExpense = (id, expense) => apiClient.put(`/expenses/${id}`, expense);
export const deleteExpense = (id) => apiClient.delete(`/expenses/${id}`);