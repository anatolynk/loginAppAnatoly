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
  password: Yup.string().min(6).max(30).label('Password'),
  passwordConfirmation: Yup.string()
    .min(6)
    .max(30)
    .label('Confirmation Password')
    .oneOf(
      [Yup.ref('password')],
      'Your new password and confirmation password do not match.',
    )
    .required('Confirm password is required'),
});

function CreateNewPasswordScreen({ navigation }) {
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
      // password: '',
      // passwordConfirmation: '',
    },
  });

  const setNewPassword = password => {
    setIsLoading(true);
    auth()
      .currentUser.updatePassword(password)
      .then(result => {
        setIsLoading(false);
        setSuccessMessage('Your Password successfully updated');
        userAuth.setUser(auth().currentUser.toJSON());
        navigation.replace(routes.PasswordChanged);
      })
      .catch(error => {
        setRequestFailed(true);
        setErrorMessage(error.message);
        setIsLoading(false);
        setSuccessMessage(null);
      });
  };

  const handleSetNewPassword = ({ password, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      setSuccessMessage(
        'Your new password and confirmation password do not match.',
      );
      return;
    }

    setNewPassword(password);
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <AppBackIcon onPress={() => navigation.goBack()} />
          <View style={styles.title}>
            <AppTitle>Create new password</AppTitle>
            <AppText>
              Your new password must be unique from those previously used.
            </AppText>
          </View>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="New Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  secureTextEntry={true}
                />
              )}
              name="password"
            />
            {errors.password && <AppText>{errors.password.message}</AppText>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  secureTextEntry={true}
                />
              )}
              name="passwordConfirmation"
            />
            {errors.passwordConfirmation && (
              <AppText>{errors.passwordConfirmation.message}</AppText>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              title="Set New Password"
              onPress={handleSubmit(handleSetNewPassword)}
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

export default CreateNewPasswordScreen;

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
