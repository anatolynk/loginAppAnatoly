import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function AppLink({ title, color = 'black', align = 'center', ...otherProps }) {
  if (align === 'center') alignItems = 'center';
  if (align === 'left') alignItems = 'flex-start';
  if (align === 'right') alignItems = 'flex-end';
  return (
    <View style={[styles.container, { alignItems }]}>
      <TouchableOpacity {...otherProps}>
        <Text style={[styles.button, { color }]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AppLink;

const styles = StyleSheet.create({
  container: { paddingVertical: 7 },
  button: {
    fontSize: 14,
  },
});
