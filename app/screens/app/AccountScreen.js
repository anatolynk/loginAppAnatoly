import React, { useContext, useEffect } from 'react';
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
import AuthContext from '../../auth/context';

function AccountScreen({ navigation }) {
  const userAuth = useContext(AuthContext);
  console.log('====================================');
  console.log('user data: ', userAuth.user);
  console.log('====================================');

  const handleLogOut = () => {
    //
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.title}>
          <AppTitle>My Account</AppTitle>
          <AppText>Email: </AppText>
        </View>

        <AppLink
          title="My Profile"
          align="left"
          color={themeColors.primary}
          onPress={() => navigation.navigate('AccountDetailsScreen')}
        />

        <View style={styles.inputContainer}>
          <AppText>My Messages</AppText>
          <AppText>My Notifications</AppText>
          <AppText>My Settings</AppText>
        </View>

        <View style={styles.buttonContainer}>
          <AppButton title="Log Out" onPress={handleLogOut} />
        </View>
      </View>
    </Screen>
  );
}

export default AccountScreen;

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
