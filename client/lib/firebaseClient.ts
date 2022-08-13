import "firebase/compat/auth";

import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const CLIENT_CONFIG = {
  apiKey: "AIzaSyDRNU3NXLydcy2UO1T816jA0GM5pKB9BcI",
  authDomain: "dhwani-dummy.firebaseapp.com",
  projectId: "dhwani-dummy",
  storageBucket: "dhwani-dummy.appspot.com",
  messagingSenderId: "1044101855215",
  appId: "1:1044101855215:web:18bd1cbebb5ea493e9681a",
};

const app = firebase.initializeApp(CLIENT_CONFIG);

const fireStore = getFirestore(app);



if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebase;
}

export { firebase, app, fireStore };