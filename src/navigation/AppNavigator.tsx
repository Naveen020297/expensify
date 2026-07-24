import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SharedExpenseFormScreen from '../screens/shared/SharedExpenseFormScreen';
import OtherScreens from './OtherScreens';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="OtherScreens" component={OtherScreens} />
                <Stack.Screen name="EditExpense" component={SharedExpenseFormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;