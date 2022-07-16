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
import routes from '../../navigation/routes';

function AccountDetails({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppBackIcon onPress={() => navigation.goBack()} />
        <View style={styles.title}>
          <AppTitle>My Details:</AppTitle>
        </View>
        <View style={styles.inputContainer}>
          <AppTextInput placeholder="Name" />
          <AppTextInput placeholder="Email" />
          <AppTextInput
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            name="password"
            secureTextEntry={true}
          />
          <AppTextInput
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            name="password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.buttonContainer}>
          <AppButton title="Save" onPress={() => console.log('Save Changes')} />
        </View>
      </View>
    </Screen>
  );
}

export default AccountDetails;

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
