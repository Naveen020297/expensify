import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DeleteExpenseComponent from '../components/DeleteExpenseComponent';
import { useStore } from '../store/personalDaySummaryStore';

jest.mock('../store/personalDaySummaryStore');

describe('DeleteExpenseComponent', () => {
    it('should delete an expense', () => {
        const mockDeleteExpense = jest.fn();
        useStore.mockReturnValue({ deleteExpense: mockDeleteExpense });
        const { getByText } = render(<DeleteExpenseComponent expenseId="1" />);

        fireEvent.press(getByText('Delete'));
        expect(mockDeleteExpense).toHaveBeenCalledWith('1');
        expect(getByText('Expense deleted successfully!')).toBeTruthy();
    });
});