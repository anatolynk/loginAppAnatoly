import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppLink from '../components/AppLink';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppTitle from '../components/AppTitle';
import Screen from '../components/Screen';
import themeColors from '../config/themeColors';

function LoginScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
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
        <AppButton title="Login" onPress={() => console.log('Login')} />
      </View>
    </Screen>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {},
  inputContainer: {},
});
