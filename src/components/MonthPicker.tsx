import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@src/theme/ThemeContext';

interface MonthPickerProps {
    value: string; // YYYY-MM
    onChange: (value: string) => void;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({ value, onChange }) => {
    const theme = useTheme();

    const [year, month] = value.split('-').map(Number);
    const date = new Date(year, month - 1);

    const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const handlePrev = () => {
        const prev = new Date(year, month - 2);
        onChange(`${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`);
    };

    const handleNext = () => {
        const next = new Date(year, month);
        onChange(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <TouchableOpacity onPress={handlePrev} style={styles.button}>
                <Text style={[styles.arrow, { color: theme.colors.primary }]}>&lt;</Text>
            </TouchableOpacity>

            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>{monthName}</Text>

            <TouchableOpacity onPress={handleNext} style={styles.button}>
                <Text style={[styles.arrow, { color: theme.colors.primary }]}>&gt;</Text>
            </TouchableOpacity>
        </View>
    );
};

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
