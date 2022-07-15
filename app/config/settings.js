// Special Message
// of course these settings should be taken
// from ENV variables
// DEV, Staging and Production
// I'll setup it later ;)
// - Anatoly

const settings = {
  dev: {
    firebaseConfig: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    },
  },
};

const getCurrentSettings = () => {
  // Check __DEV__ for dev env

  return settings.dev;
};

export default getCurrentSettings();
