import create from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    expenses: [],
    addExpense: async (expense) => {
        const response = await axios.post('/api/expenses', expense);
        set((state) => ({ expenses: [...state.expenses, response.data] }));
    },
    fetchExpenses: async () => {
        const response = await axios.get('/api/expenses');
        set({ expenses: response.data });
    }
}));

export { useStore };