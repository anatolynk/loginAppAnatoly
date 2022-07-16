import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function AppLoading({ onStart, onFinish, loop = false, ...otherProps }) {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        onLayout={onStart}
        autoPlay
        loop={loop}
        style={styles.animation}
        onAnimationFinish={onFinish}
        source={require('../assets/animations/loader-circle-color.json')}
        {...otherProps}
      />
    </View>
  );
}

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 150,
  },
});
