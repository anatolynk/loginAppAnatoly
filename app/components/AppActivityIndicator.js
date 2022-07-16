import React from 'react';
import { StyleSheet, View } from 'react-native';
import themeColors from '../config/themeColors';
import AppLoading from './AppLoading';

function AppActivityIndicator({ visible }) {
  if (!visible) return;
  return (
    <View style={styles.container}>
      <AppLoading loop={true} />
    </View>
  );
}

export default AppActivityIndicator;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: themeColors.white,
    opacity: 0.8,
  },
});
