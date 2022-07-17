import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/app/AccountScreen';
import AccountDetailsScreen from '../screens/app/AccountDetailsScreen';
import CreateNewPasswordScreen from '../screens/app/CreateNewPasswordScreen';
import PasswordChangedScreen from '../screens/app/PasswordChangedScreen';
import VerifyEmailScreen from '../screens/app/VerifyEmailScreen';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: 'modal',
      gestureEnabled: true,
      headerShown: false,
    }}>
    <Stack.Screen name="AccountScreen" component={AccountScreen} />
    <Stack.Screen
      name="AccountDetailsScreen"
      component={AccountDetailsScreen}
    />
    <Stack.Screen
      name="CreateNewPassword"
      component={CreateNewPasswordScreen}
    />
    <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
    <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
