import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import themeColors from '../config/themeColors';

function AppText({ children, ...otherProps }) {
  return (
    <View style={styles.container} {...otherProps}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default AppText;

const styles = StyleSheet.create({
  container: {},

  text: {
    fontSize: 16,
    fontWeight: '400',
    color: themeColors.grey,
    textAlign: 'left',
    lineHeight: 24,
  },
});
