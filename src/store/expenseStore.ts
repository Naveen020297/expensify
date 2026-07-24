import create from 'zustand';
import { createExpense, getExpenses } from '../services/apiClient';

const useExpenseStore = create((set) => ({
    expenses: [],
    fetchExpenses: async () => {
        const expenses = await getExpenses();
        set({ expenses });
    },
    addExpense: async (expense) => {
        const newExpense = await createExpense(expense);
        set((state) => ({ expenses: [...state.expenses, newExpense] }));
    },
}));

export default useExpenseStore;