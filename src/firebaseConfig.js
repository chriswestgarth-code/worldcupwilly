// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add this to import the database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqsIzHjiFyD2iodIw4jOizb8VaSpbxuFQ",
  authDomain: "world-cup-willy.firebaseapp.com",
  projectId: "world-cup-willy",
  storageBucket: "world-cup-willy.firebasestorage.app",
  messagingSenderId: "139773773047",
  appId: "1:139773773047:web:b4aa43a5e73d6e81a07ff2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore so your app can use it
export const db = getFirestore(app);