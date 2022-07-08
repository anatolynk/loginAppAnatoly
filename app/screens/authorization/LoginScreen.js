import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import AppButton from '../../components/AppButton';
import AppLink from '../../components/AppLink';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppTitle from '../../components/AppTitle';
import Screen from '../../components/Screen';
import themeColors from '../../config/themeColors';

import AppIcon from '../../components/AppIcon';
import AppButtonIcon from '../../components/AppButtonIcon';
import AppBackIcon from '../../components/AppBackIcon';

function LoginScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppBackIcon onPress={() => console.log('super back')} />
        <View style={styles.title}>
          <AppTitle>Welcome back! Glad to see you, Again!</AppTitle>
        </View>
        <View style={styles.inputContainer}>
          <AppTextInput placeholder="Enter your email" />
          <AppTextInput
            placeholder="Enter your password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            name="password"
            secureTextEntry={true}
          />
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
  title: {
    marginBottom: 32,
  },
});
