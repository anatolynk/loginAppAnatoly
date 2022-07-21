import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

function Screen({ children, style, barStyle }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {barStyle && <StatusBar barStyle={barStyle} />}
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

export default Screen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  view: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: 'gold',
  },
});
