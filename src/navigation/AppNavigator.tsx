import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseTracker from '../components/ExpenseTracker';
import OtherScreen from '../screens/OtherScreen'; // Import other screens as needed

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ExpenseTracker' component={ExpenseTracker} />
            <Stack.Screen name='OtherScreen' component={OtherScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;