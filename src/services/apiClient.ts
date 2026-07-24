// Updated API client to include expense-related endpoints

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createExpense = async (expense) => {
    const response = await apiClient.post('/api/expenses', expense);
    return response.data;
};

export const getExpenses = async () => {
    const response = await apiClient.get('/api/expenses');
    return response.data;
};

export const editExpense = async (id, expense) => {
    const response = await apiClient.put(`/api/expenses/${id}`, expense);
    return response.data;
};

export const deleteExpense = async (id) => {
    await apiClient.delete(`/api/expenses/${id}`);
};
