import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@src/theme/ThemeContext';

interface MonthPickerProps {
    value: string; // YYYY-MM
    onChange: (value: string) => void;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginVertical: 16
    },
    button: {
        padding: 8,
    },
    arrow: {
        fontSize: 20,
        fontWeight: '700'
    },
    label: {
        fontSize: 16,
        fontWeight: '600'
    }
});
