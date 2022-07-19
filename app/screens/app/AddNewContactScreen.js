import React, { useContext, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

import firestore from '@react-native-firebase/firestore';

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
import AppLoading from '../../components/AppLoading';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).max(20).label('Name'),
  email: Yup.string().required().email().label('Email'),
  phone: Yup.string().min(2).max(20).label('Phone'),
  company: Yup.string().min(2).max(20).label('Company'),
});

const getRandomKey = (max = 1000) => {
  const randomKey = Math.floor(Math.random() * max);

  return `${randomKey}`;

  // return `https://api.lorem.space/image/face?w=640&h=480&r=${randomKey}`;
};

function AddNewContactScreen({ navigation }) {
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const randomAvatarUrl = `https://api.lorem.space/image/face?w=300&h=300&hash=`;

  const [avatarUrl, setAvatarUrl] = useState(
    `${randomAvatarUrl}` + getRandomKey(1000),
  );

  const [isLoading, setIsLoading] = useState(false);
  const userAuth = useContext(AuthContext);

  const [isAdded, setIsAdded] = useState(false);

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

  const addNewContact = (name, email, phone, company, avatar) => {
    setIsLoading(true);
    setIsAdded(false);
    firestore()
      .collection('users')
      .add({
        name,
        email,
        phone,
        company,
        avatar,
      })
      .then(result => {
        setIsAdded(true);
        setIsLoading(false);
        navigation.navigate({
          name: 'HomeScreen',
          params: { newId: result.id },
        });
      })
      .catch(error => {
        setIsAdded(false);
        setIsLoading(false);
      });
  };

  const handleAddNewContact = ({ name, email, phone, company }) => {
    addNewContact(name, email, phone, company, avatarUrl);
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <AppBackIcon onPress={() => navigation.goBack()} />
          <View style={styles.title}>
            <AppTitle>New Contact:</AppTitle>
          </View>
          <View style={styles.avatarContact}>
            {/* <AppIcon
                name="person-circle"
                size={100}
                color={themeColors.primary}
              /> */}
            <TouchableOpacity
              onPress={() =>
                setAvatarUrl(randomAvatarUrl + getRandomKey(1000))
              }>
              <Image style={styles.image} source={{ uri: avatarUrl }} />
            </TouchableOpacity>
            <AppLink
              title="Generate Photo"
              color={themeColors.primary}
              onPress={() => setAvatarUrl(randomAvatarUrl + getRandomKey(1000))}
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
          <AppErrorMessage visible={successMessage} color={themeColors.primary}>
            {successMessage}
          </AppErrorMessage>
        </View>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
