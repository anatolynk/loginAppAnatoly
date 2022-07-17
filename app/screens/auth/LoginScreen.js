import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import routes from '../../navigation/routes';
import authStorage from '../../auth/authStorage';

import auth from '@react-native-firebase/auth';
import AppErrorMessage from '../../components/AppErrorMessage';
import AuthContext from '../../auth/context';
import AppActivityIndicator from '../../components/AppActivityIndicator';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).max(30).label('Password'),
});

function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const userAuth = useContext(AuthContext);

  const login = (email, password) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const userData = userCredentials.user.toJSON();
        userAuth.setUser(userData);
        authStorage.setToken(userData.refreshToken);
        setLoginFailed(false);
        setErrorMessage('');
        setIsLoading(false);
      })
      .catch(error => {
        setLoginFailed(true);
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  };

  const onLoginSubmit = ({ email, password }) => {
    login(email, password);
  };

  let refreshCount = 1;
  console.log('refreshCount: ', refreshCount++);

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <AppBackIcon onPress={() => navigation.goBack()} />
          <View style={styles.title}>
            <AppTitle>Welcome back! Glad to see you, Again!</AppTitle>
          </View>
          <View style={styles.inputContainer}>
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

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  secureTextEntry={true}
                />
              )}
              name="password"
            />
            {errors.password && <AppText>{errors.password.message}</AppText>}
          </View>
          <AppLink
            title="Forgot Password?"
            align="right"
            color={themeColors.darkGrey}
            onPress={() => navigation.navigate(routes.ForgotPassword)}
          />

          <View style={styles.buttonContainer}>
            <AppButton title="Login" onPress={handleSubmit(onLoginSubmit)} />
          </View>
          <AppErrorMessage visible={loginFailed}>
            {errorMessage}
          </AppErrorMessage>
          <View style={styles.linkContainer}>
            <AppLink
              title="Don’t have an account? Register Now"
              color={themeColors.primary}
              onPress={() => navigation.navigate(routes.Register)}
            />
          </View>
        </View>
      </Screen>
    </>
  );
}

export default LoginScreen;

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
