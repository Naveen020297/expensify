import { createExpense, getExpenses, updateExpense, deleteExpense } from '../services/apiClient';
import axios from 'axios';

jest.mock('axios');

describe('Expense API', () => {
    it('should create an expense', async () => {
        const expense = { amount: 100, description: 'Test', category: 'Food' };
        axios.post.mockResolvedValue({ data: expense });
        const response = await createExpense(expense);
        expect(response.data).toEqual(expense);
    });

    it('should get expenses', async () => {
        const expenses = [{ id: 1, amount: 100, description: 'Test', category: 'Food' }];
        axios.get.mockResolvedValue({ data: expenses });
        const response = await getExpenses();
        expect(response.data).toEqual(expenses);
    });

    it('should update an expense', async () => {
        const updatedExpense = { amount: 150, description: 'Updated Test', category: 'Food' };
        axios.put.mockResolvedValue({ data: updatedExpense });
        const response = await updateExpense(1, updatedExpense);
        expect(response.data).toEqual(updatedExpense);
    });

    it('should delete an expense', async () => {
        axios.delete.mockResolvedValue({});
        await deleteExpense(1);
        expect(axios.delete).toHaveBeenCalledWith('/api/expenses/1');
    });
});