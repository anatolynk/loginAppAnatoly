import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButtonIcon from './AppButtonIcon';

function AppBackIcon({ style, ...otherProps }) {
  return (
    <View style={styles.container}>
      <View style={[styles.buttonBack, style]}>
        <AppButtonIcon name="chevron-back" {...otherProps} />
      </View>
    </View>
  );
}

export default AppBackIcon;

const styles = StyleSheet.create({
  container: {},
  buttonBack: {
    marginTop: 12,
    marginBottom: 28,
  },
});
