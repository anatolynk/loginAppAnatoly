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

import firestore from '@react-native-firebase/firestore';
import ListItem from '../../components/ListItem';
import ListItemSeparator from '../../components/ListItemSeparator';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import AppErrorMessage from '../../components/AppErrorMessage';
import { useIsFocused } from '@react-navigation/native';

import useCollections from '../../hooks/useCollections';

const FireStore = firestore();

function FavoritesScreen({ navigation, route }) {
  const params = route.params;
  const {
    isLoading,
    isError,
    errorMessage,

    data: usersList,
  } = useCollections(FireStore, 'users', { favorite: true });

  if (isLoading && !usersList.length)
    return (
      <>
        <AppActivityIndicator visible={true} />
        <Screen>
          <View style={styles.container}>
            <View style={styles.layoutContainer}>
              <AppIcon
                style={styles.icon}
                name="star"
                size={100}
                color="gold"
              />
              <View style={styles.title}>
                <AppTitle>My Favorites</AppTitle>
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
            <AppTitle>My Favorites</AppTitle>
          </View>

          <AppErrorMessage visible={isError}>{errorMessage}</AppErrorMessage>
          <FlatList
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
                    params: { ...item, prevScreenName: 'FavoritesScreen' },
                  })
                }
              />
            )}
            ItemSeparatorComponent={() => <ListItemSeparator />}
            refreshing={isLoading}
          />
        </View>
      </Screen>
    </>
  );
}

export default FavoritesScreen;

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
