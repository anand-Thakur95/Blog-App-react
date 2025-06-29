// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "react-js-blogg.firebaseapp.com",
  projectId: "react-js-blogg",
  storageBucket: "react-js-blogg.firebasestorage.app",
  messagingSenderId: "703269775321",
  appId: "1:703269775321:web:1db31561931a894f891bc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider}