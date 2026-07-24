import create from 'zustand';

const useExpenseStore = create((set) => ({
    expenses: [],
    addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
    updateExpense: (id, updatedExpense) => set((state) => ({
        expenses: state.expenses.map(expense => (expense.id === id ? updatedExpense : expense))
    })),
    deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter(expense => expense.id !== id)
    })),
    setExpenses: (expenses) => set({ expenses }),
}));

export default useExpenseStore;