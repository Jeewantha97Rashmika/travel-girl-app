// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvOJ2zI3himq0CRFl_QuybHsoUg1JDxfk",
  authDomain: "travel-girl-79fb5.firebaseapp.com",
  databaseURL: "https://travel-girl-79fb5-default-rtdb.firebaseio.com/",
  projectId: "travel-girl-79fb5",
  storageBucket: "travel-girl-79fb5.appspot.com",
  messagingSenderId: "909512814759",
  appId: "1:909512814759:web:1fb91dbe4047c218796b82",
  measurementId: "G-JVTFYVD52K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export { auth, db };