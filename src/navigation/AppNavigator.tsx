import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '@src/screens/auth/LoginScreen';
import { SignupScreen } from '@src/screens/auth/SignupScreen';
import { PersonalDashboardScreen } from '@src/screens/personal/PersonalDashboardScreen';
import { PersonalCategoryScreen } from '@src/screens/personal/PersonalCategoryScreen';
import { PersonalSubCategoryScreen } from '@src/screens/personal/PersonalSubCategoryScreen';
import { PersonalExpenseFormScreen } from '@src/screens/personal/PersonalExpenseFormScreen';
import { PersonalReportScreen } from '@src/screens/personal/PersonalReportScreen';
import { SharedDashboardScreen } from '@src/screens/shared/SharedDashboardScreen';
import { GroupListScreen } from '@src/screens/shared/GroupListScreen';
import { GroupFormScreen } from '@src/screens/shared/GroupFormScreen';
import { SharedCategoryScreen } from '@src/screens/shared/SharedCategoryScreen';
import { SharedExpenseFormScreen } from '@src/screens/shared/SharedExpenseFormScreen';
import { SharedReportScreen } from '@src/screens/shared/SharedReportScreen';
import { ModeSelectScreen } from '@src/screens/home/ModeSelectScreen';
import { useAuthStore } from '@src/store/authStore';
import { useTheme } from '@src/theme/ThemeContext';
import { View } from 'react-native';

export type RootStackParamList = {
  Auth: undefined;
  ModeSelect: undefined;
  Main: { initialTab?: 'Personal' | 'Shared' } | undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type PersonalStackParamList = {
  PersonalDashboard: undefined;
  PersonalCategory: undefined;
  PersonalSubCategory: { parentCategoryId: string; parentName: string };
  PersonalExpenseForm: {
    categoryId: string;
    categoryName: string;
    subCategoryId?: string;
    subCategoryName?: string;
  };
  PersonalReport: undefined;
};

export type SharedStackParamList = {
  SharedDashboard: undefined;
  GroupList: undefined;
  GroupForm: { groupId?: string } | undefined;
  SharedCategory: { groupId: string; groupName: string };
  SharedExpenseForm: {
    groupId: string;
    groupName: string;
    categoryId?: string;
    categoryName?: string;
  };
  SharedReport: { groupId: string; groupName: string };
};

export type MainTabParamList = {
  Personal: undefined;
  Shared: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const PersonalStack = createNativeStackNavigator<PersonalStackParamList>();
const SharedStack = createNativeStackNavigator<SharedStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const PersonalNavigator = () => {
  const theme = useTheme();
  return (
    <PersonalStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: { fontWeight: '600' }
      }}
    >
      <PersonalStack.Screen
        name="PersonalDashboard"
        component={PersonalDashboardScreen}
        options={{ headerShown: false }}
      />
      <PersonalStack.Screen
        name="PersonalCategory"
        component={PersonalCategoryScreen}
        options={{ title: 'Choose category' }}
      />
      <PersonalStack.Screen
        name="PersonalSubCategory"
        component={PersonalSubCategoryScreen}
        options={{ title: 'Choose item' }}
      />
      <PersonalStack.Screen
        name="PersonalExpenseForm"
        component={PersonalExpenseFormScreen}
        options={{ title: 'Add expense' }}
      />
      <PersonalStack.Screen
        name="PersonalReport"
        component={PersonalReportScreen}
        options={{ title: 'Personal report' }}
      />
    </PersonalStack.Navigator>
  );
};

const SharedNavigator = () => {
  const theme = useTheme();
  return (
    <SharedStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: { fontWeight: '600' }
      }}
    >
      <SharedStack.Screen
        name="SharedDashboard"
        component={SharedDashboardScreen}
        options={{ headerShown: false }}
      />
      <SharedStack.Screen
        name="GroupList"
        component={GroupListScreen}
        options={{ title: 'Groups' }}
      />
      <SharedStack.Screen
        name="GroupForm"
        component={GroupFormScreen}
        options={{ title: 'Group members' }}
      />
      <SharedStack.Screen
        name="SharedCategory"
        component={SharedCategoryScreen}
        options={{ title: 'Shared categories' }}
      />
      <SharedStack.Screen
        name="SharedExpenseForm"
        component={SharedExpenseFormScreen}
        options={{ title: 'Add shared expense' }}
      />
      <SharedStack.Screen
        name="SharedReport"
        component={SharedReportScreen}
        options={{ title: 'Shared report' }}
      />
    </SharedStack.Navigator>
  );
};

const MainTabs = () => {
  const theme = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'Main'>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const initialTab = route.params?.initialTab || 'Personal';

  return (
    <Tab.Navigator
      initialRouteName={initialTab}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none'
        }
      }}
    >
      <Tab.Screen
        name="Personal"
        component={PersonalNavigator}
        options={{ tabBarLabel: 'Personal' }}
      />
      <Tab.Screen
        name="Shared"
        component={SharedNavigator}
        options={{ tabBarLabel: 'Shared' }}
      />
    </Tab.Navigator>
  );
};

export const linking = {
  prefixes: ['http://localhost:8081', 'expensify://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Signup: 'signup',
        },
      },
      ModeSelect: 'mode-select',
      Main: {
        path: 'main',
        screens: {
          Personal: {
            path: 'personal',
            screens: {
              PersonalDashboard: 'dashboard',
              PersonalCategory: 'category',
              PersonalSubCategory: 'sub-category/:parentCategoryId/:parentName',
              PersonalExpenseForm: 'expense-form/:categoryId/:categoryName',
              PersonalReport: 'report',
            },
          },
          Shared: {
            path: 'shared',
            screens: {
              SharedDashboard: 'dashboard',
              GroupList: 'groups',
              GroupForm: 'group-form',
              SharedCategory: 'category/:groupId/:groupName',
              SharedExpenseForm: 'expense-form/:groupId/:groupName',
              SharedReport: 'report/:groupId/:groupName',
            },
          },
        },
      },
    },
  },
};

export const AppNavigator = () => {
  const theme = useTheme();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return <View style={{ flex: 1, backgroundColor: theme.colors.background }} />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <RootStack.Screen name="ModeSelect" component={ModeSelectScreen} />
          <RootStack.Screen name="Main" component={MainTabs} />
        </>
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

