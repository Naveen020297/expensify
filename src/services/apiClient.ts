import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://your-api-url.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getExpenses = async () => {
    return await apiClient.get('/expenses');
};

export const deleteExpense = async (id) => {
    return await apiClient.delete(`/expenses/${id}`);
};
