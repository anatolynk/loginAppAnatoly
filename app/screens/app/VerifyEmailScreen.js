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

import auth from '@react-native-firebase/auth';
import AppErrorMessage from '../../components/AppErrorMessage';
import AuthContext from '../../auth/context';
import AppActivityIndicator from '../../components/AppActivityIndicator';

function VerifyEmailScreen({ navigation }) {
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [userEmailVerified, setUserEmailVerified] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const userAuth = useContext(AuthContext);

  //   let currentUser = auth().currentUser.toJSON();

  useEffect(() => {
    setCurrentUser(auth().currentUser.toJSON());
  }, []);

  const userReload = () => {
    auth()
      .currentUser.reload()
      .then(result => {
        setCurrentUser(auth().currentUser.toJSON());
      })
      .catch(error => {
        //
      });
  };

  console.log(currentUser.emailVerified);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.layoutContainer}>
          {currentUser.emailVerified ? (
            <AppIcon
              style={styles.icon}
              name="checkmark-circle"
              size={100}
              color={themeColors.green}
            />
          ) : (
            <AppIcon
              style={styles.icon}
              name="mail"
              size={100}
              color={themeColors.primary}
            />
          )}

          <View style={styles.title}>
            <AppTitle>
              {currentUser.emailVerified ? 'Completed' : 'Verify your Email!'}
            </AppTitle>
            {!currentUser.emailVerified && (
              <View>
                <AppText>We sent an email to {currentUser.email}</AppText>
                <AppText>
                  Just click on the link in that email to complete your
                  verification.
                </AppText>
                <AppButton
                  title="Check Verification Status"
                  color="white"
                  onPress={userReload}
                />
              </View>
            )}
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

export default VerifyEmailScreen;

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
