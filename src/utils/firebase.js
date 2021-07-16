import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGha6TRJJJrZrc3QrMK6dLtyTPh_oekxQ",
  authDomain: "minkana-5ca07.firebaseapp.com",
  projectId: "minkana-5ca07",
  storageBucket: "minkana-5ca07.appspot.com",
  messagingSenderId: "179102550526",
  appId: "1:179102550526:web:3cd1316346b8d1cdb918af",
  measurementId: "G-2ZPMTB01P7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
