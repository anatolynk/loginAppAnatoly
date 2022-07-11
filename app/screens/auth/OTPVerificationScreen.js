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
import AppOTPInput from '../../components/AppOTPInput';

function OTPVerificationScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppBackIcon onPress={() => navigation.goBack()} />
        <View style={styles.title}>
          <AppTitle>OTP Verification</AppTitle>
          <AppText>
            Enter the verification code we just sent on your email address.
          </AppText>
        </View>
        <View style={styles.inputContainer}>
          <AppOTPInput active={true} placeholder="" />
          <AppOTPInput active={true} placeholder="" />
          <AppOTPInput active={true} placeholder="" />
          <AppOTPInput placeholder="" />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Verify"
            onPress={() => navigation.navigate('PasswordChanged')}
          />
        </View>
        <View style={styles.linkContainer}>
          <AppLink
            title="Didn’t received code? Resend"
            color={themeColors.primary}
            onPress={() => console.log('Resend')}
          />
        </View>
      </View>
    </Screen>
  );
}

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginTop: 38,
  },
  linkContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 26,
  },
  title: {
    marginBottom: 32,
  },
  otpInputContainer: {
    width: 70,
    height: 60,
    borderRadius: 8,
  },

  otpInputContainerActive: {
    borderColor: themeColors.primary,
    borderWidth: 1.2,
    backgroundColor: themeColors.white,
    color: themeColors.dark,
  },

  otpInputText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
