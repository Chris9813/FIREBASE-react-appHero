import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"


firebase.initializeApp({
  apiKey: "AIzaSyDzcHY_AXxR2SZoCd_m4VIwpU_vFSwo8Kk",
  authDomain: "heroes-app-e6f10.firebaseapp.com",
  projectId: "heroes-app-e6f10",
  storageBucket: "heroes-app-e6f10.appspot.com",
  messagingSenderId: "1009564139767",
  appId: "1:1009564139767:web:7a090adca28a36038153f2"
});

// Initialize Firebase
const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase,
}


