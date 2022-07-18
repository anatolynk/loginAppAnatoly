import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/app/AccountScreen';
import AccountDetailsScreen from '../screens/app/AccountDetailsScreen';
import CreateNewPasswordScreen from '../screens/app/CreateNewPasswordScreen';
import PasswordChangedScreen from '../screens/app/PasswordChangedScreen';
import VerifyEmailScreen from '../screens/app/VerifyEmailScreen';
import HomeScreen from '../screens/app/HomeScreen';
import AddNewContactScreen from '../screens/app/AddNewContactScreen';

const Stack = createNativeStackNavigator();

const ContactNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: 'modal',
      gestureEnabled: true,
      headerShown: false,
    }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="AddNewContactScreen" component={AddNewContactScreen} />
  </Stack.Navigator>
);

export default ContactNavigator;
