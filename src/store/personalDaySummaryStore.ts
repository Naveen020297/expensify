import create from 'zustand';
import { deleteExpense as apiDeleteExpense } from '../services/apiClient';

const useStore = create(set => ({
    expenses: [],
    deleteExpense: async (id) => {
        await apiDeleteExpense(id);
        set(state => ({ expenses: state.expenses.filter(expense => expense.id !== id) }));
    },
}));

export default useStore;