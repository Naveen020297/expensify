import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Main Page Header</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: theme.header.color,
        padding: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
    },
});

export default Header;