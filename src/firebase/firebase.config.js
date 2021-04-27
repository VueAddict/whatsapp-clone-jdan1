import firebase from 'firebase'
  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEx8Yfi0HE6sLtdSZ_TeqOvRJhcmHuhjk",
    authDomain: "whatsapp-clone-a2bc9.firebaseapp.com",
    projectId: "whatsapp-clone-a2bc9",
    storageBucket: "whatsapp-clone-a2bc9.appspot.com",
    messagingSenderId: "711674374028",
    appId: "1:711674374028:web:99a785380a63242a66d8a9"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore()

export const auth = firebase.auth()

export const provider = new firebase.auth.GoogleAuthProvider()

