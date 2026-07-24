import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getExpenses } from '../services/apiClient';

const ExpenseList = ({ navigation }) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await getExpenses();
            setExpenses(response.data);
        };
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
                        <Button
                            title="Edit"
                            onPress={() => navigation.navigate('EditExpense', { expense: item })}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default ExpenseList;