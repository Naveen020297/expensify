import create from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    expenses: [],
    fetchExpenses: async () => {
        const response = await axios.get('/api/expenses');
        set({ expenses: response.data });
    },
    addExpense: async (expense) => {
        await axios.post('/api/expenses', expense);
        // Optionally re-fetch expenses after adding
        await fetchExpenses();
    },
    editExpense: async (id, updatedExpense) => {
        await axios.put(`/api/expenses/${id}`, updatedExpense);
        await fetchExpenses();
    },
    deleteExpense: async (id) => {
        await axios.delete(`/api/expenses/${id}`);
        await fetchExpenses();
    },
}));

export { useStore };