// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQEAZ_4wLVlFbefFTDX_GpgMrM95a8IHI",
  authDomain: "travelgirl-e46a5.firebaseapp.com",
  projectId: "travelgirl-e46a5",
  storageBucket: "travelgirl-e46a5.appspot.com",
  messagingSenderId: "1070653617481",
  appId: "1:1070653617481:web:5a8c044958f85aa1b41698",
  measurementId: "G-QD4XWBQW33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db ,storage};