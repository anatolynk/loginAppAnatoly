import React, { useContext, useState } from 'react';
import {
  ScrollView,
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
  name: Yup.string().required().min(2).max(20).label('Name'),
  email: Yup.string().required().email().label('Email'),
  phone: Yup.string().min(6).max(20).label('Phone'),
  company: Yup.string().min(2).max(20).label('Company'),
});

function AddNewContactScreen({ navigation }) {
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
      name: '',
      email: '',
      phone: '',
      company: '',
      avatar: '',
    },
  });

  const handleAddNewContact = ({ name, email, phone, company }) => {
    console.log('Add New Contact: ', name, email, phone, company);
  };

  return (
    <>
      {/* <AppActivityIndicator visible={isLoading} /> */}
      <Screen>
        <ScrollView>
          <View style={styles.container}>
            <AppBackIcon onPress={() => navigation.goBack()} />
            <View style={styles.title}>
              <AppTitle>New Contact:</AppTitle>
            </View>
            <View style={styles.avatarContact}>
              <AppIcon
                name="person-circle"
                size={100}
                color={themeColors.primary}
              />
              <AppLink
                title="Add Photo"
                color={themeColors.primary}
                style={{ opacity: 0.3 }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppTextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your name"
                    autoCorrect={false}
                  />
                )}
                name="name"
              />
              {errors.name && <AppText>{errors.name.message}</AppText>}

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

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your phone number"
                  autoCorrect={false}
                />
              )}
              name="phone"
            />
            {errors.name && <AppText>{errors.name.message}</AppText>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your workplace"
                  autoCorrect={false}
                />
              )}
              name="company"
            />
            {errors.name && <AppText>{errors.name.message}</AppText>}

            <View style={styles.buttonContainer}>
              <AppButton
                title="Done"
                onPress={handleSubmit(handleAddNewContact)}
              />
              <AppButton
                title="Cancel"
                color="white"
                onPress={() => navigation.goBack()}
              />
            </View>
            <AppErrorMessage visible={requestFailed}>
              {errorMessage}
            </AppErrorMessage>
            <AppErrorMessage
              visible={successMessage}
              color={themeColors.primary}>
              {successMessage}
            </AppErrorMessage>
          </View>
        </ScrollView>
      </Screen>
    </>
  );
}

export default AddNewContactScreen;

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
    alignSelf: 'center',
  },
  avatarContact: {
    alignSelf: 'center',
  },
});
