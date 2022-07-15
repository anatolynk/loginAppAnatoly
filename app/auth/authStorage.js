import * as Keychain from 'react-native-keychain';
const server = 'local';
const username = 'myapp';

const setToken = async authToken => {
  const password = authToken;
  try {
    const result = await Keychain.setInternetCredentials(
      server,
      username,
      password,
    );
  } catch (error) {
    console.log('Error storing the auth token: ', error);
  }
};

const getToken = async () => {
  try {
    const result = await Keychain.getInternetCredentials(server);
    return result.password;
  } catch (error) {
    console.log('Error getting the auth token: ', error);
  }
};

const removeToken = async () => {
  try {
    return await Keychain.resetInternetCredentials(server);
  } catch (error) {
    console.log('Error removing the auth token: ', error);
  }
};

export default {
  setToken,
  getToken,
  removeToken,
};
