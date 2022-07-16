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

import auth from '@react-native-firebase/auth';

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AuthContext from '../../auth/context';
import AppErrorMessage from '../../components/AppErrorMessage';
import authStorage from '../../auth/authStorage';
import AppActivityIndicator from '../../components/AppActivityIndicator';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).max(30).label('Password'),
});

function RegisterScreen({ navigation }) {
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
  const [registerFailed, setRegisterFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userAuth = useContext(AuthContext);

  const register = (email, password) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const userData = userCredentials.user.toJSON();
        setRegisterFailed(false);
        setErrorMessage('');
        userAuth.setUser(userData);
        authStorage.setToken(userData.refreshToken);
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage(error.message);
        setRegisterFailed(true);
        setIsLoading(false);
      });
  };

  const onRegister = ({ email, password }) => {
    register(email, password);
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <AppBackIcon onPress={() => navigation.goBack()} />
          <View style={styles.title}>
            <AppTitle>Hello! Register to get started</AppTitle>
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

          <View style={styles.buttonContainer}>
            <AppButton title="Register" onPress={handleSubmit(onRegister)} />
          </View>
          <AppErrorMessage visible={registerFailed}>
            {errorMessage}
          </AppErrorMessage>

          <View style={styles.linkContainer}>
            <AppLink
              title="Already have an account? Login Now"
              color={themeColors.primary}
              onPress={() => navigation.navigate(routes.Login)}
            />
          </View>
        </View>
      </Screen>
    </>
  );
}

export default RegisterScreen;

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
