// Add the following function to retrieve all expenses
import axios from 'axios';

export const getExpenses = async (token) => {
    const response = await axios.get('/api/expenses', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
};