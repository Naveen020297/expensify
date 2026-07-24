import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getExpenses, deleteExpense } from '../../services/apiClient';

const PersonalExpenseListScreen = ({ navigation }) => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data);
    };

    const handleDelete = async (id) => {
        await deleteExpense(id);
        fetchExpenses();
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <View>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description} - ${item.amount}</Text>
                        <Button title="Delete" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
            <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
        </View>
    );
};

export default PersonalExpenseListScreen;