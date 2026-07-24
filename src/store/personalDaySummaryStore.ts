import create from 'zustand';

const useStore = create(set => ({
    expenses: [],
    deleteExpense: (id) => set(state => ({
        expenses: state.expenses.filter(expense => expense.id !== id)
    }))
}));

export { useStore };