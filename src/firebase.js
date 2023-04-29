import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBAwEnyIjLGJ0ne73EPT8CSxTTXeCnm73Q",
    authDomain: "facebook-ra.firebaseapp.com",
    projectId: "facebook-ra",
    storageBucket: "facebook-ra.appspot.com",
    messagingSenderId: "169469535591",
    appId: "1:169469535591:web:db228182d0805551eebbc2"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };