// Kræver installation "npm install firebase"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU_yOhMVmnc2hh1Df52Q80HuBx6bglKmM",
  authDomain: "pizzaproject-74794.firebaseapp.com",
  databaseURL: "https://pizzaproject-74794-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pizzaproject-74794",
  storageBucket: "pizzaproject-74794.appspot.com",
  messagingSenderId: "463693282265",
  appId: "1:463693282265:web:10bb41b9fbeb2aeb4b77c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
