// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhtVArjFnETIm-LOZFu9Cp5uCqiy-CZHA",
  authDomain: "todo-auth-76af6.firebaseapp.com",
  projectId: "todo-auth-76af6",
  storageBucket: "todo-auth-76af6.appspot.com",
  messagingSenderId: "101058861067",
  appId: "1:101058861067:web:d758723d782c01e39e4f0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);