import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import themeColors from '../config/themeColors';

function AppTextInput({ style, ...otherProps }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, style]}
        placeholderTextColor={themeColors.grey}
        {...otherProps}
      />
    </View>
  );
}

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
  },
  textInput: {
    width: '100%',
    height: 56,
    backgroundColor: themeColors.backgroundInput,
    color: themeColors.grey,
    fontSize: 15,
    fontWeight: '400',
    padding: 18,
    borderRadius: 8,
    borderColor: themeColors.border,
    borderWidth: 1,
  },
});
