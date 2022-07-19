import React, { useContext, useState } from 'react';
import {
  Image,
  Modal,
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
import ListItem from '../../components/ListItem';

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

function EditContactScreen({ navigation, route }) {
  const params = route.params;
  const prevScreenName = params['prevScreenName'];
  console.log(prevScreenName);
  const [currentContact, setCurrentContact] = useState(params['data']);

  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const randomAvatarUrl = `https://api.lorem.space/image/face?w=300&h=300&hash=`;

  const [avatarUrl, setAvatarUrl] = useState(currentContact.avatar);

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
      name: currentContact.name,
      email: currentContact.email,
      phone: currentContact.phone,
      company: currentContact.company,
    },
  });

  const updateContact = item => {
    setIsLoading(true);
    setIsAdded(false);
    console.log('id: ', params.id, 'data: ', item);
    firestore()
      .collection('users')
      .doc(params.id)
      .update(item)
      .then(result => {
        setIsAdded(true);
        setIsLoading(false);
        navigation.navigate({
          name: prevScreenName,
          params: item,
        });
      })
      .catch(error => {
        setIsAdded(false);
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  };

  const handleUpdateContact = ({ name, email, phone, company }) => {
    console.log('name: ', name);
    console.log('Boolean: ', Boolean(undefined));
    setCurrentContact({
      name,
      email,
      phone,
      company,
      avatar: avatarUrl,
      favorite: Boolean(currentContact.favorite),
    });
    // updateContact(
    //   name,
    //   email,
    //   phone,
    //   company,
    //   avatarUrl,
    //   currentContact.favorite,
    // );
    updateContact({
      name,
      email,
      phone,
      company,
      avatar: String(avatarUrl),
      favorite: Boolean(currentContact.favorite),
    });
  };

  const deleteAccount = id => {
    setIsLoading(true);
    setIsAdded(false);
    firestore()
      .collection('users')
      .doc(id)
      .delete()
      .then(result => {
        setIsAdded(true);
        setIsLoading(false);
        navigation.navigate({
          name: prevScreenName,
          params: {},
        });
      })
      .catch(error => {
        setIsAdded(false);
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  };

  const handleDeleteContact = id => {
    console.log('Delete ID: ', id);
    setModalVisible(false);
    deleteAccount(id);
  };

  const AppDeleteModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.avatarContact}>
            <AppIcon name="trash" color={themeColors.lightRed} size={40} />
          </View>
          <View style={styles.title}>
            <AppText>Are you sure you want to delete contact?</AppText>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Delete"
              color="lightRed"
              onPress={() => handleDeleteContact(params.id)}
            />
            <AppButton
              title="Cancel"
              color="white"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <AppBackIcon
            style={{ marginBottom: 0 }}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.title}>
            <AppTitle>Update Contact:</AppTitle>
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

          <ListItem
            title={
              currentContact.favorite
                ? 'Remove from Favorites'
                : 'Add to Favorites'
            }
            IconComponent={
              <AppIcon
                name={currentContact.favorite ? 'star' : 'star-outline'}
                size={20}
                color={themeColors.primary}
              />
            }
            isChevron={false}
            onPress={() =>
              setCurrentContact({
                ...currentContact,
                favorite: !currentContact.favorite,
              })
            }
          />

          <View style={styles.buttonContainer}>
            <AppButton
              title="Save"
              onPress={handleSubmit(handleUpdateContact)}
            />
            <AppButton
              title="Cancel"
              color="white"
              onPress={() => navigation.goBack()}
            />
            <AppLink
              title="Delete Contact"
              color={themeColors.lightRed}
              onPress={() => setModalVisible(true)}
            />
          </View>

          <AppDeleteModal />

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

export default EditContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: '40%',
    backgroundColor: themeColors.white,
    zIndex: 2,
    padding: 20,

    shadowColor: 'grey',

    shadowOpacity: 0.2,
    shadowRadius: 15,
    borderRadius: 20,
  },
  inputContainer: {},
  buttonContainer: {
    marginTop: 10,
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
