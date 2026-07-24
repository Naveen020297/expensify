// This file contains API client functions to interact with the backend

import axios from 'axios';

const API_URL = 'http://your-api-url.com/api';

export const createExpense = async (expense) => {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
};

export const getExpenses = async () => {
    const response = await axios.get(`${API_URL}/expenses`);
    return response.data;
};

export const updateExpense = async (id, expense) => {
    const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
    return response.data;
};

export const deleteExpense = async (id) => {
    await axios.delete(`${API_URL}/expenses/${id}`);
};