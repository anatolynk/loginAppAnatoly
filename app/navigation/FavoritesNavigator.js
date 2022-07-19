import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/app/AccountScreen';
import AccountDetailsScreen from '../screens/app/AccountDetailsScreen';
import CreateNewPasswordScreen from '../screens/app/CreateNewPasswordScreen';
import PasswordChangedScreen from '../screens/app/PasswordChangedScreen';
import VerifyEmailScreen from '../screens/app/VerifyEmailScreen';
import HomeScreen from '../screens/app/HomeScreen';
import AddNewContactScreen from '../screens/app/AddNewContactScreen';
import EditContactScreen from '../screens/app/EditContactScreen';
import FavoritesScreen from '../screens/app/FavoritesScreen';

const Stack = createNativeStackNavigator();

const FavoritesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: 'modal',
      gestureEnabled: true,
      headerShown: false,
    }}>
    <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
    <Stack.Screen name="AddNewContactScreen" component={AddNewContactScreen} />
    <Stack.Screen name="EditContactScreen" component={EditContactScreen} />
  </Stack.Navigator>
);

export default FavoritesNavigator;
