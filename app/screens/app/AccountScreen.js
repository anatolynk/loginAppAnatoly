import React, { useContext, useEffect, useState } from 'react';
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

import auth from '@react-native-firebase/auth';
import AuthContext from '../../auth/context';
import authStorage from '../../auth/authStorage';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import AppErrorMessage from '../../components/AppErrorMessage';

function AccountScreen({ navigation }) {
  const userAuth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const logOut = () => {
    setIsLoading(true);
    auth()
      .signOut()
      .then(result => {
        userAuth.setUser(null);
        authStorage.removeToken();
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />

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
          <AppErrorMessage visible={errorMessage}>
            {errorMessage}
          </AppErrorMessage>
        </View>
      </Screen>
    </>
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
