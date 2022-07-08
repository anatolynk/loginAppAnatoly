import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import themeColors from '../config/themeColors';

function AppButton({ title, color = 'dark', ...otherProps }) {
  const buttonColor = themeColors[color] ? themeColors[color] : 'black';
  const borderColor = color === 'white' ? themeColors.dark : themeColors[color];
  const textColor = color === 'white' ? themeColors.dark : themeColors.white;

  return (
    <TouchableOpacity {...otherProps}>
      <View style={styles.container}>
        <View
          style={[
            styles.button,
            { backgroundColor: buttonColor, borderColor },
          ]}>
          <Text style={[styles.buttonTitle, { color: textColor }]}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  container: {
    //
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    padding: 15,
    marginVertical: 10,
    height: 56,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeColors.dark,
  },
  buttonTitle: {
    fontSize: 15,
    color: themeColors.white,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
