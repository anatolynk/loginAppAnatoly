import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import CreateNewPassword from './app/screens/auth/CreateNewPassword';
import ForgotPasswordScreen from './app/screens/auth/ForgotPasswordScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import OTPVerificationScreen from './app/screens/auth/OTPVerificationScreen';
import PasswordChangedScreen from './app/screens/auth/PasswordChangedScreen';
import RegisterScreen from './app/screens/auth/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AccountScreen from './app/screens/app/AccountScreen';
import AccountDetailsScreen from './app/screens/app/AccountDetailsScreen';

import auth from '@react-native-firebase/auth';
import AuthContext from './app/auth/context';

import RNBootSplash from 'react-native-bootsplash';
import AppLoading from './app/components/AppLoading';

const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isReady, setIsReady] = useState(false);

  function onAuthStateChanged(userCredentials) {
    setUser(userCredentials);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  const hideBootSplash = async () => {
    await RNBootSplash.hide({ fade: true });
  };

  if (!isReady)
    return (
      <AppLoading
        onStart={() => hideBootSplash()}
        onFinish={() => setIsReady(true)}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
