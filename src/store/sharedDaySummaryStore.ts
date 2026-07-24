import create from 'zustand';

const useSharedDaySummaryStore = create((set) => ({
    expenses: [],
    setExpenses: (expenses) => set({ expenses }),
    updateExpense: (id, updatedExpense) => set((state) => ({
        expenses: state.expenses.map(expense => expense.id === id ? updatedExpense : expense)
    })),
}));

export default useSharedDaySummaryStore;