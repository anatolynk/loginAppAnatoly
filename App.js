import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import CreateNewPassword from './app/screens/CreateNewPassword';
import ForgotPasswordScreen from './app/screens/ForgotPasswordScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

const App = () => {
  return <CreateNewPassword />;
  // return <ForgotPasswordScreen />;
  // return <RegisterScreen />;
  // return <LoginScreen />;
  // return <WelcomeScreen />;
};

export default App;
