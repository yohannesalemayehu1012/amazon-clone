/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCixxw0delrXEL-UQstcLpdWnxaOuU_ljQ",
  authDomain: "clone-92ca3.firebaseapp.com",
  projectId: "clone-92ca3",
  storageBucket: "clone-92ca3.firebasestorage.app",
  messagingSenderId: "1059207443701",
  appId: "1:1059207443701:web:a0759cea78910a9e6f01bc"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Authentication

export const auth = getAuth(app);


// Firestore Database

export const db = getFirestore(app);


export default app;