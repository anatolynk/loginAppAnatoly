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

function PasswordChangedScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.layoutContainer}>
          <AppIcon
            style={styles.icon}
            name="shield-checkmark"
            size={100}
            color={themeColors.green}
          />
          <View style={styles.title}>
            <AppTitle>Password Changed!</AppTitle>
            <AppText>Your password has been changed successfully.</AppText>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Back to Account"
              onPress={() => navigation.navigate('AccountScreen')}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

export default PasswordChangedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {},
  buttonContainer: {},
  linkContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 26,
  },
  title: {
    marginTop: 35,
    marginBottom: 28,
    alignItems: 'center',
  },
  layoutContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -100,
  },
  icon: {
    alignSelf: 'center',
  },
});
