import create from 'zustand';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../services/apiClient';

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
    editExpense: async (id, expense) => {
        const updatedExpense = await updateExpense(id, expense);
        set((state) => ({
            expenses: state.expenses.map((exp) => (exp.id === id ? updatedExpense : exp))
        }));
    },
    removeExpense: async (id) => {
        await deleteExpense(id);
        set((state) => ({ expenses: state.expenses.filter((exp) => exp.id !== id) }));
    }
}));

export default useExpenseStore;