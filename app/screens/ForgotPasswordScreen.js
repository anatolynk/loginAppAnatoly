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
import AppButtonIcon from '../components/AppButtonIcon';
import AppBackIcon from '../components/AppBackIcon';

function ForgotPasswordScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppBackIcon onPress={() => console.log('super back')} />
        <View style={styles.title}>
          <AppTitle>Forgot Password?</AppTitle>
          <AppText>
            Don't worry! It occurs. Please enter the email address linked with
            your account.
          </AppText>
        </View>
        <View style={styles.inputContainer}>
          <AppTextInput placeholder="Enter your email" />
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Send Code"
            onPress={() => console.log('Send Code')}
          />
        </View>
        <View style={styles.linkContainer}>
          <AppLink
            title="Remember Password? Login"
            color={themeColors.primary}
            onPress={() => console.log('Login')}
          />
        </View>
      </View>
    </Screen>
  );
}

export default ForgotPasswordScreen;

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
  title: {
    marginBottom: 32,
  },
});
