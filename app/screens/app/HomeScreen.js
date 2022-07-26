import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

import firestore from '@react-native-firebase/firestore';

import ListItem from '../../components/ListItem';
import ListItemSeparator from '../../components/ListItemSeparator';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import AppErrorMessage from '../../components/AppErrorMessage';

import useCollections from '../../hooks/useCollections';
import AppButtonIcon from '../../components/AppButtonIcon';

const FireStore = firestore();

function HomeScreen({ navigation, route }) {
  const params = route.params;
  const {
    isLoading,
    isError,
    errorMessage,

    data: usersList,
  } = useCollections(FireStore, 'users');

  if (isLoading && !usersList.length)
    return (
      <>
        <AppActivityIndicator visible={true} />
        <Screen>
          <View style={styles.container}>
            <View style={styles.layoutContainer}>
              <AppIcon
                style={styles.icon}
                name="people"
                size={100}
                color={themeColors.primary}
              />
              <View style={styles.title}>
                <AppText>Loading...</AppText>
              </View>
            </View>
          </View>
        </Screen>
      </>
    );

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen>
        <View style={styles.container}>
          <View style={styles.title}>
            <AppTitle>My Contacts</AppTitle>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddNewContactScreen')}>
            <View style={styles.detailsContainer}>
              <AppIcon
                name="add"
                size={40}
                color={themeColors.primary}
                style={styles.addContact}
              />
            </View>
          </TouchableOpacity>
          <AppErrorMessage visible={isError}>{errorMessage}</AppErrorMessage>
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={usersList}
            keyExtractor={user => user.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                title={item['data'].name}
                subTitle={item['data'].email}
                favorite={item['data']?.favorite}
                imageUrl={item['data'].avatar}
                isChevron={false}
                onPress={() =>
                  navigation.navigate({
                    name: 'EditContactScreen',
                    params: { ...item, prevScreenName: 'HomeScreen' },
                  })
                }
              />
            )}
            ItemSeparatorComponent={() => <ListItemSeparator />}
            refreshing={isLoading}
            // onRefresh={() => getUsersLists()}
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
  flatList: {
    // width: '100%',
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
  addContact: {},
  detailsContainer: {
    alignSelf: 'flex-end',
  },
});
