// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxIuSQv1mVaBsUP2z-w9IoWkvwykjiWvE",
  authDomain: "fctdplaner.firebaseapp.com",
  projectId: "fctdplaner",
  storageBucket: "fctdplaner.firebasestorage.app",
  messagingSenderId: "144161641835",
  appId: "1:144161641835:web:b43ee19a344e7d9a8e682e",
  measurementId: "G-KB5LBRSXFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);