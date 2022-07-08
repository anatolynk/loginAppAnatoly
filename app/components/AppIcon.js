import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function AppIcon({ ...otherProps }) {
  return (
    <View style={styles.container}>
      <Icon {...otherProps} />
    </View>
  );
}

export default AppIcon;

const styles = StyleSheet.create({
  container: {},
});
