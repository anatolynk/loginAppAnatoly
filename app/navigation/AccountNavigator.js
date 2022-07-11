import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/app/AccountScreen';
import AccountDetailsScreen from '../screens/app/AccountDetailsScreen';

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
  </Stack.Navigator>
);

export default AccountNavigator;
