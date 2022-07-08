import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppLink from '../components/AppLink';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppTitle from '../components/AppTitle';
import Screen from '../components/Screen';
import themeColors from '../config/themeColors';

import AppIcon from '../components/AppIcon';

function LoginScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppIcon name="chevron-back" size={60} />
        <AppTitle>Welcome back! Glad to see you, Again!</AppTitle>
        <View style={styles.inputContainer}>
          <AppTextInput placeholder="Enter your email" />
          <AppTextInput placeholder="Enter your password" />
        </View>
        <AppLink
          title="Forgot Password?"
          align="right"
          color={themeColors.darkGrey}
          onPress={() => console.log('Forgot')}
        />

        <View style={styles.buttonContainer}>
          <AppButton title="Login" onPress={() => console.log('Login')} />
        </View>
        <View style={styles.linkContainer}>
          <AppLink
            title="Don’t have an account? Register Now"
            color={themeColors.primary}
            onPress={() => console.log('Register Now')}
          />
        </View>
      </View>
    </Screen>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {},
  buttonContainer: {
    marginTop: 30,
  },
  linkContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 26,
  },
});
