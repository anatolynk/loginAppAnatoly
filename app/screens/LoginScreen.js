import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTitle from '../components/AppTitle';
import Screen from '../components/Screen';

function LoginScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppTitle>Forgot Password?</AppTitle>
        <AppText>
          Don't worry! It occurs. Please enter the email address linked with
          your account.
        </AppText>

        <AppButton title="Login" onPress={() => console.log('Login')} />
      </View>
    </Screen>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {},
});
