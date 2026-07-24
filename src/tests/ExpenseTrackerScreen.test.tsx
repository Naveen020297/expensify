import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExpenseTrackerScreen from '../screens/ExpenseTrackerScreen';

test('adds an expense', () => {
    const { getByPlaceholderText, getByText } = render(<ExpenseTrackerScreen />);

    fireEvent.changeText(getByPlaceholderText('Amount'), '50');
    fireEvent.changeText(getByPlaceholderText('Description'), 'Lunch');
    fireEvent.changeText(getByPlaceholderText('Category'), 'Food');
    fireEvent.press(getByText('Add Expense'));

    expect(getByText('Lunch')).toBeTruthy();
    expect(getByText('$50.00')).toBeTruthy();
});