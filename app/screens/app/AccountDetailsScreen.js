import React, { useContext, useState } from 'react';
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

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import auth from '@react-native-firebase/auth';
import AppErrorMessage from '../../components/AppErrorMessage';
import AuthContext from '../../auth/context';
import AppActivityIndicator from '../../components/AppActivityIndicator';

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required().min(2).max(20).label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).max(30).label('Password'),
});

function AccountDetails({ navigation }) {
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const userAuth = useContext(AuthContext);

  const currentUser = auth().currentUser.toJSON();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      displayName: currentUser?.displayName,
      email: currentUser?.email,
    },
  });

  const updateEmail = userEmail => {
    setIsLoading(true);
    auth()
      .currentUser.updateEmail(userEmail)
      .then(result => {
        setIsLoading(false);
        setSuccessMessage('Your Email successfully updated');
        userAuth.setUser(auth().currentUser.toJSON());
      })
      .catch(error => {
        setRequestFailed(true);
        setErrorMessage(error.message);
        setIsLoading(false);
        setSuccessMessage(null);
      });
  };

  const updateProfile = (displayName = '') => {
    const update = {
      displayName,
    };
    setIsLoading(true);
    auth()
      .currentUser.updateProfile(update)
      .then(() => {
        setIsLoading(false);
        setSuccessMessage('Your profile name successfully updated');
        userAuth.setUser(auth().currentUser.toJSON());
      })
      .catch(error => {
        setRequestFailed(true);
        setErrorMessage(error.message);
        setIsLoading(false);
        setSuccessMessage(null);
      });
  };

  const handleUpdateAccount = ({ displayName, email }) => {
    if (displayName) {
      // Remove All Tags from diplsplayName
      const profileName = displayName.replace(/(<([^>]+)>)/gi, '').trim();
      if (profileName !== userAuth.user.displayName) {
        updateProfile(profileName);
      }
    }

    if (email !== userAuth.user.email) {
      updateEmail(email);
    }
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <AppBackIcon onPress={() => navigation.goBack()} />
          <View style={styles.title}>
            <AppTitle>My Details:</AppTitle>
          </View>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your profile Name"
                  autoCorrect={false}
                />
              )}
              name="displayName"
            />
            {errors.displayName && (
              <AppText>{errors.displayName.message}</AppText>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
              name="email"
            />
            {errors.email && <AppText>{errors.email.message}</AppText>}
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              title="Save"
              onPress={handleSubmit(handleUpdateAccount)}
            />
          </View>
          <AppErrorMessage visible={requestFailed}>
            {errorMessage}
          </AppErrorMessage>
          <AppErrorMessage visible={successMessage} color={themeColors.primary}>
            {successMessage}
          </AppErrorMessage>
        </View>
      </Screen>
    </>
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
