import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "firebase/compat/firestore";
import { initializeApp } from 'firebase/app';
import { getStorage, ref } from "firebase/storage";


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
const firebaseApp = initializeApp(firebaseConfig);

// version 9
export const authService = getAuth();

export const dbservice = getFirestore(firebaseApp);

// firebase storage -> 사진, 동영상 ..
// export const storageService = getStorage(firebaseApp, "gs://nwitter2-5ee01.appspot.com");
export const storageService = getStorage(firebaseApp);
