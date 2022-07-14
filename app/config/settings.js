// Special Message
// of course these settings should be taken
// from ENV variables
// DEV, Staging and Production
// I'll setup it later ;)
// - Anatoly

const settings = {
  dev: {
    firebaseConfig: {
      apiKey: 'AIzaSyDezcgt2WQ0tnkNYKBrIrCtGk4N1Ewh9q8',
      authDomain: 'login-app-anatoly.firebaseapp.com',
      projectId: 'login-app-anatoly',
      storageBucket: 'login-app-anatoly.appspot.com',
      messagingSenderId: '481151605326',
      appId: '1:481151605326:web:3e9f576eecaa9ad515411f',
    },
  },
};

const getCurrentSettings = () => {
  // Check __DEV__ for dev env

  return settings.dev;
};

export default getCurrentSettings();
