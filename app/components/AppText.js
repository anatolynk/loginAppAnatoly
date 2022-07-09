import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import themeColors from '../config/themeColors';

function AppText({
  children,
  color = themeColors.grey,
  size = 16,
  ...otherProps
}) {
  return (
    <View style={styles.container} {...otherProps}>
      <Text style={[styles.text, { color, fontSize: size }]}>{children}</Text>
    </View>
  );
}

export default AppText;

const styles = StyleSheet.create({
  container: {},

  text: {
    fontWeight: '400',
    color: themeColors.grey,
    textAlign: 'left',
    lineHeight: 24,
  },
});
