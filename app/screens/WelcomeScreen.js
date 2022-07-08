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
import AppButton from '../components/AppButton';
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
          <AppButton title="Login" onPress={() => console.log('Login')} />
          <AppButton
            title="Register"
            color="white"
            onPress={() => console.log('Register')}
          />
        </View>
        <View style={styles.buttonNative}>
          <Button
            title="Continue as a guest"
            color={themeColors.primary}
            onPress={() => console.log('Guest')}
          />
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
    marginBottom: 30,
    paddingHorizontal: 22,
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
    //
  },

  buttonNative: {
    marginTop: 46,
  },
});
