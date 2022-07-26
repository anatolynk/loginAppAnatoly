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
        <View style={styles.title}>
          <AppTitle>My Account</AppTitle>
        </View>
        <View style={styles.container}>
          <ListItem
            title={user?.displayName || 'Name'}
            subTitle={user?.email}
            onPress={() => navigation.navigate('AccountDetailsScreen')}
          />

          <ListItem
            title="My Details"
            IconComponent={
              <AppIcon
                name="document-text"
                size={30}
                color={themeColors.grey}
              />
            }
            onPress={() => navigation.navigate('AccountDetailsScreen')}
          />
          <View style={styles.inputContainer}>
            <ListItem
              title="Change Password"
              IconComponent={
                <AppIcon
                  name="lock-closed"
                  size={30}
                  color={themeColors.grey}
                />
              }
              onPress={() => navigation.navigate(routes.CreateNewPassword)}
            />

            <ListItem
              title="My Messages"
              color={themeColors.lightGrey}
              IconComponent={
                <AppIcon name="mail" size={30} color={themeColors.lightGrey} />
              }
            />
            <ListItem
              title="My Notifications"
              color={themeColors.lightGrey}
              IconComponent={
                <AppIcon
                  name="notifications"
                  size={30}
                  color={themeColors.lightGrey}
                />
              }
            />
            <ListItem
              title="My Settings"
              color={themeColors.lightGrey}
              IconComponent={
                <AppIcon
                  name="settings"
                  size={30}
                  color={themeColors.lightGrey}
                />
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
  title: {
    marginTop: 35,
    marginBottom: 28,
    alignItems: 'center',
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
