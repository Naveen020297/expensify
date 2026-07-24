import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const deleteExpense = async (id) => {
    return await apiClient.delete(`/api/expenses/${id}`);
};

export default apiClient;