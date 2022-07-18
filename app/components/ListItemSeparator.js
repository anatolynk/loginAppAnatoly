import React from 'react';
import { StyleSheet, View } from 'react-native';
import themeColors from '../config/themeColors';

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

export default ListItemSeparator;

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: themeColors.lightGrey,
  },
});
