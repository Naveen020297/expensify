import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api/expenses',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createExpense = (expense) => apiClient.post('/', expense);
export const getExpenses = () => apiClient.get('/');
export const updateExpense = (id, expense) => apiClient.put(`/${id}`, expense);
export const deleteExpense = (id) => apiClient.delete(`/${id}`);