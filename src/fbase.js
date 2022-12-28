import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "firebase/compat/firestore";

import { initializeApp } from 'firebase/app';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
//const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);


// version 9
export const authService = getAuth();
// version 8
// export const auth = fbase.auth();

// firebase 전체 export (provider is in firebase)
export const firebaseInstance = firebase;
// export const dbservice = firebase.firestore();
export const dbservice = getFirestore();
