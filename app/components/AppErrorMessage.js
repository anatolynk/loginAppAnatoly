import React from 'react';
import { StyleSheet, View } from 'react-native';
import themeColors from '../config/themeColors';
import AppText from './AppText';

function AppErrorMessage({ visible, children }) {
  if (children === undefined || !visible) return;
  return (
    <AppText style={styles.container} color={themeColors.lightRed}>
      {children}
    </AppText>
  );
}

export default AppErrorMessage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
