import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const deleteExpense = async (id) => {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response;
};

export default apiClient;