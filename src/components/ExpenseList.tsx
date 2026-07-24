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
                        <Text>{new Date(item.date).toLocaleDateString()}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ExpenseList;