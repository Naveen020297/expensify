import create from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    expenses: [],
    fetchExpenses: async () => {
        const response = await axios.get('/api/expenses');
        set({ expenses: response.data });
    },
    deleteExpense: async (id) => {
        await axios.delete(`/api/expenses/${id}`);
        set((state) => ({ expenses: state.expenses.filter(expense => expense.id !== id) }));
    }
}));

export { useStore };