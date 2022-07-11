import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import AppIcon from '../components/AppIcon';
import AppText from '../components/AppText';

const Tab = createBottomTabNavigator();

const Empty = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <AppText>App Sections</AppText>
  </View>
);

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      name="Home"
      component={Empty}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AppIcon name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Empty}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AppIcon name="star" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Empty}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AppIcon name="person-circle" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
