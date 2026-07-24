import React from 'react';
import { View, Text, FlatList } from 'react-native';

const ExpenseList = ({ expenses }) => {
    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.description}</Text>
                    <Text>{item.amount}</Text>
                    <Text>{item.category}</Text>
                    <Text>{item.date}</Text>
                </View>
            )}
        />
    );
};

export default ExpenseList;