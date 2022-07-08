import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Screen from '../components/Screen';
import themeColors from '../config/themeColors';

function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        style={styles.background}
        source={require('../assets/welcome-bg.jpg')}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/app-logo.png')}
          />
        </View>
        <View styles={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button title="Login" />
          </View>
          <View style={styles.button}>
            <Button title="Register" />
          </View>
          <View style={styles.button}>
            <Button title="Continue as a guest" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  logoContainer: {
    position: 'absolute',
    top: 448,
    alignSelf: 'center',
  },
  logo: {
    width: 141,
    height: 99,
  },

  buttonsContainer: {
    width: '100%',
    padding: 20,
  },

  button: {
    width: '100%',
    height: 56,
    backgroundColor: themeColors.dark,
    borderRadius: 8,
  },
});
