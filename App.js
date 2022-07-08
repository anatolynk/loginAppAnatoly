import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

const App = () => {
  return <RegisterScreen />;
  // return <LoginScreen />;
  // return <WelcomeScreen />;
};

export default App;
