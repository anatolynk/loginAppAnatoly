import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import AppIcon from '../components/AppIcon';
import AppText from '../components/AppText';
import AccountNavigator from './AccountNavigator';
import FavoritesScreen from '../screens/app/FavoritesScreen';
import HomeScreen from '../screens/app/HomeScreen';
import ContactNavigator from './ContactNavigator';
import FavoritesNavigator from './FavoritesNavigator';

const Tab = createBottomTabNavigator();

const Empty = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <AppText>App Sections</AppText>
  </View>
);

const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      name="Home"
      component={ContactNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AppIcon name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AppIcon name="star" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AppIcon name="person-circle" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
