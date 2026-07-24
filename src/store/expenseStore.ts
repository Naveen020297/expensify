import create from 'zustand';

const useStore = create((set) => ({
    expenses: [],
    addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, { ...expense, id: Date.now() }] }))
}));

export { useStore };