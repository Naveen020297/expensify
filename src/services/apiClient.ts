import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://your-api-url/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createExpense = (expense) => {
    return apiClient.post('/expenses', expense);
};

export const getExpenses = () => {
    return apiClient.get('/expenses');
};

export const editExpense = (id, expense) => {
    return apiClient.put(`/expenses/${id}`, expense);
};

export const deleteExpense = (id) => {
    return apiClient.delete(`/expenses/${id}`);
};

export default apiClient;