import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import themeColors from '../config/themeColors';

function AppTitle({ title, children, ...otherProps }) {
  return (
    <View style={styles.container} {...otherProps}>
      <Text style={styles.title}>{title || children}</Text>
    </View>
  );
}

export default AppTitle;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: themeColors.dark,
    textAlign: 'left',
    lineHeight: 39,
  },
});
