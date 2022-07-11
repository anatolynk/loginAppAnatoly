import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import CreateNewPassword from './app/screens/auth/CreateNewPassword';
import ForgotPasswordScreen from './app/screens/auth/ForgotPasswordScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import OTPVerificationScreen from './app/screens/auth/OTPVerificationScreen';
import PasswordChangedScreen from './app/screens/auth/PasswordChangedScreen';
import RegisterScreen from './app/screens/auth/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

const App = () => {
  // return <OTPVerificationScreen />;
  // return <PasswordChangedScreen />;
  // return <CreateNewPassword />;
  // return <ForgotPasswordScreen />;
  // return <RegisterScreen />;
  // return <LoginScreen />;
  return <WelcomeScreen />;
};

export default App;
