import React from 'react';
import { StyleSheet, View } from 'react-native';
import themeColors from '../config/themeColors';
import AppTextInput from './AppTextInput';

function AppOTPInput({ active, ...otherProps }) {
  const stylesActive = active ? styles.otpInputContainerActive : '{}';
  const editable = Boolean(active);

  return (
    <View style={styles.container}>
      <View style={styles.otpInputContainer}>
        <AppTextInput
          style={[styles.otpInputText, stylesActive]}
          editable={editable}
          clearTextOnFocus={true}
          spellCheck={false}
          maxLength={1}
          selectTextOnFocus={false}
          contextMenuHidden={true}
          keyboardType="number-pad"
          {...otherProps}
        />
      </View>
    </View>
  );
}

export default AppOTPInput;

const styles = StyleSheet.create({
  container: {},
  otpInputContainer: {
    width: 70,
    height: 60,
    borderRadius: 8,
  },

  otpInputContainerActive: {
    borderColor: themeColors.primary,
    borderWidth: 1.2,
    backgroundColor: themeColors.white,
    color: themeColors.dark,
  },

  otpInputText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
