import React from 'react';
import { View, Text, Button } from 'react-native';
import DeleteExpenseComponent from '../components/DeleteExpenseComponent';

const SharedExpenseFormScreen = ({ route }) => {
    const { expenseId } = route.params;

    return (
        <View>
            <Text>Shared Expense Form</Text>
            <DeleteExpenseComponent expenseId={expenseId} />
        </View>
    );
};

export default SharedExpenseFormScreen;