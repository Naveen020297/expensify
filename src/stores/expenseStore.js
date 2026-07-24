import create from 'zustand';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../services/apiClient';

const useExpenseStore = create((set) => ({
    expenses: [],
    fetchExpenses: async () => {
        const response = await getExpenses();
        set({ expenses: response.data });
    },
    addExpense: async (expense) => {
        await createExpense(expense);
        await fetchExpenses();
    },
    editExpense: async (id, expense) => {
        await updateExpense(id, expense);
        await fetchExpenses();
    },
    removeExpense: async (id) => {
        await deleteExpense(id);
        await fetchExpenses();
    }
}));

export default useExpenseStore;