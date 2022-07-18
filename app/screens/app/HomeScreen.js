import React, { useEffect, useState } from 'react';
import {
  FlatList,
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

import firestore from '@react-native-firebase/firestore';
import ListItem from '../../components/ListItem';
import ListItemSeparator from '../../components/ListItemSeparator';
import AppActivityIndicator from '../../components/AppActivityIndicator';

const getCollection = collectionName => firestore().collection(collectionName);

function HomeScreen({ navigation }) {
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [usersList, setUsersList] = useState([]);

  const getUsersLists = () => {
    const currentUsersList = [];
    setIsLoading(true);
    getCollection('users')
      .get()
      .then(collectionSnapshot => {
        console.log('Total users: ', collectionSnapshot.size);
        collectionSnapshot.forEach(documentSnapshot => {
          //   console.log(
          //     'User ID: ',
          //     documentSnapshot.id,
          //     documentSnapshot.data(),
          //   );
          currentUsersList.push({
            id: documentSnapshot.id.toString(),
            data: documentSnapshot.data(),
          });
        });
        // console.log('currentUsersList: ', currentUsersList);
        setUsersList(currentUsersList);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getUsersLists();
  }, []);

  if (!usersList.length)
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

  //   console.log(usersList);
  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <View style={styles.title}>
            <AppTitle>My Contacts</AppTitle>
          </View>
          <FlatList
            data={usersList}
            keyExtractor={user => user.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                title={item['data'].name}
                subTitle={item['data'].email}
                favorite={item['data']?.favorite}
                imageUrl={item['data'].avatar}
                onPress={() => console.log(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListItemSeparator />}
            refreshing={isLoading}
            onRefresh={() => getUsersLists()}
          />
        </View>
      </Screen>
    </>
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
