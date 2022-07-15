import auth from '@react-native-firebase/auth';

const login = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

const register = (email, password) =>
  auth().createUserWithEmailandPassowrd(email, password);

const signOut = () => auth().signOut();

const loginAsGuest = () => auth().signInAnonymously();

export default {
  login,
  register,
  signOut,
  loginAsGuest,
};
