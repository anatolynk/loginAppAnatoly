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
import ListItem from '../../components/ListItem';

function AccountScreen({ navigation }) {
  const userAuth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // const user = auth().currentUser.toJSON();
  const user = userAuth.user;

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
        <AppTitle style={styles.appTitle}>My Account</AppTitle>
        <View style={styles.container}>
          <ListItem
            title={user?.displayName || 'Name'}
            subTitle={user?.email}
            onPress={() => navigation.navigate('AccountDetailsScreen')}
          />

          <ListItem
            title="My Details"
            IconComponent={
              <AppIcon name="list-circle" size={30} color={themeColors.grey} />
            }
            onPress={() => navigation.navigate('AccountDetailsScreen')}
          />
          <View style={styles.inputContainer}>
            <ListItem
              title="My Messages"
              IconComponent={
                <AppIcon name="mail" size={30} color={themeColors.grey} />
              }
            />
            <ListItem
              title="My Settings"
              IconComponent={
                <AppIcon name="settings" size={30} color={themeColors.grey} />
              }
            />
          </View>

          <View style={styles.buttonContainer}>
            <AppButton title="Log Out" color="white" onPress={handleLogOut} />
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
  appTitle: {
    marginTop: 12,
    paddingLeft: 12,
  },
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
