// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOR8FRy3zlSYcwrfegpasNSE93-JP5pOU",
  authDomain: "bitebuddy-2693a.firebaseapp.com",
  projectId: "bitebuddy-2693a",
  storageBucket: "bitebuddy-2693a.appspot.com",
  messagingSenderId: "240409716299",
  appId: "1:240409716299:web:50b411e4406d7aff894fce",
  measurementId: "G-GTEVSTFNDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);