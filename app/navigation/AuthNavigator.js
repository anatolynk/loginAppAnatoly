import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import PasswordChangedScreen from '../screens/app/PasswordChangedScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}></Stack.Screen>
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen}></Stack.Screen>
      <Stack.Screen
        name="PasswordChanged"
        component={PasswordChangedScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default AuthNavigator;
