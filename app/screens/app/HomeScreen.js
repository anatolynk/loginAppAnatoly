import React, { useEffect } from 'react';
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

import firestore from '@react-native-firebase/firestore';

const getCollection = collectionName => firestore().collection(collectionName);

function HomeScreen({ navigation }) {
  const getUsersLists = () => {
    getCollection('users')
      .get()
      .then(collectionSnapshot => {
        console.log('Total users: ', collectionSnapshot.size);
        collectionSnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getUsersLists();
  }, []);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.layoutContainer}>
          <AppIcon
            style={styles.icon}
            name="home"
            size={100}
            color={themeColors.primary}
          />
          <View style={styles.title}>
            <AppTitle>My Contacts</AppTitle>
            <AppText>Add New Contact</AppText>
          </View>
        </View>
      </View>
    </Screen>
  );
}

export default HomeScreen;

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
