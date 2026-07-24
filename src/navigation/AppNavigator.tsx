import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditExpenseScreen from '../screens/personal/EditExpenseScreen';
import OtherScreens from './OtherScreens'; // Import other screens

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="OtherScreens" component={OtherScreens} />
                <Stack.Screen name="EditExpense" component={EditExpenseScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;