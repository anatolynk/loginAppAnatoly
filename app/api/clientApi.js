import settings from '../config/settings';

import * as firebase from 'firebase';

const clientApi = firebase.initializeApp(settings.firebaseConfig);
export const clientAuth = firebase.auth();
// export const clientStore = firebase.firestore();
export default {
  clientApi,
};
