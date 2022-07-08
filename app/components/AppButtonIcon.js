import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import themeColors from '../config/themeColors';
import AppIcon from './AppIcon';

function AppButtonIcon({ name = 'help', size = 20, ...otherProps }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity {...otherProps}>
        <View
          style={[
            styles.button,
            { width: size * 2, height: size * 2, borderRadius: size * 0.2 },
          ]}>
          <AppIcon name={name} size={size} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default AppButtonIcon;

const styles = StyleSheet.create({
  container: {},
  button: {
    borderColor: themeColors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
