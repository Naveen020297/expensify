import create from 'zustand';
import axios from 'axios';

const useExpenseStore = create(set => ({
    expenses: [],
    fetchExpenses: async () => {
        const response = await axios.get('/api/expenses');
        set({ expenses: response.data });
    },
    addExpense: async (expense) => {
        await axios.post('/api/expenses', expense);
        // Fetch expenses again to update the list
        await fetchExpenses();
    }
}));

export { useExpenseStore };