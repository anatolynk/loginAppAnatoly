import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import CreateNewPassword from './app/screens/authorization/CreateNewPassword';
import ForgotPasswordScreen from './app/screens/authorization/ForgotPasswordScreen';
import LoginScreen from './app/screens/authorization/LoginScreen';
import OTPVerificationScreen from './app/screens/authorization/OTPVerificationScreen';
import PasswordChangedScreen from './app/screens/authorization/PasswordChangedScreen';
import RegisterScreen from './app/screens/authorization/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

const App = () => {
  return <OTPVerificationScreen />;
  // return <PasswordChangedScreen />;
  // return <CreateNewPassword />;
  // return <ForgotPasswordScreen />;
  // return <RegisterScreen />;
  // return <LoginScreen />;
  // return <WelcomeScreen />;
};

export default App;
