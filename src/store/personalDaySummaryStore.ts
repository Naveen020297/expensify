import create from 'zustand';
import { deleteExpense } from '../services/apiClient';

const usePersonalDaySummaryStore = create((set) => ({
    expenses: [],
    removeExpense: async (id) => {
        await deleteExpense(id);
        set((state) => ({ expenses: state.expenses.filter(expense => expense.id !== id) }));
    },
}));

export default usePersonalDaySummaryStore;