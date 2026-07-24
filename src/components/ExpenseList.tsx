import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ExpenseList = ({ expenses }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.description}</Text>
                        <Text>${item.amount.toFixed(2)}</Text>
                        <Text>{item.category}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
});

export default ExpenseList;