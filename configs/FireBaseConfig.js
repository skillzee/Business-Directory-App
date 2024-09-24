// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "businessdirectoryrn.firebaseapp.com",
  projectId: "businessdirectoryrn",
  storageBucket: "businessdirectoryrn.appspot.com",
  messagingSenderId: "313083867464",
  appId: "1:313083867464:web:76c2dcb1b72c52bbfc037d",
  measurementId: "G-ZQ0E8PMFG4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);