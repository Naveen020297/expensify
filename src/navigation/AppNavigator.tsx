import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import OtherScreen from '../screens/OtherScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Expenses" component={ExpenseListScreen} />
                <Stack.Screen name="Other" component={OtherScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;