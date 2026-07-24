import create from 'zustand';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../services/apiClient';

const useExpenseStore = create((set) => ({
    expenses: [],
    fetchExpenses: async () => {
        const response = await getExpenses();
        set({ expenses: response.data });
    },
    addExpense: async (expense) => {
        const response = await createExpense(expense);
        set((state) => ({ expenses: [...state.expenses, response.data] }));
    },
    editExpense: async (id, expense) => {
        const response = await updateExpense(id, expense);
        set((state) => ({
            expenses: state.expenses.map((exp) => (exp.id === id ? response.data : exp)),
        }));
    },
    removeExpense: async (id) => {
        await deleteExpense(id);
        set((state) => ({ expenses: state.expenses.filter((exp) => exp.id !== id) }));
    },
}));

export default useExpenseStore;