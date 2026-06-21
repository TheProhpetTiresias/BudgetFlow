import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔑 YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBO9tjNIlWI2szSBXVmxCrK6dBYsESN7dc",
  authDomain: "budgetflow-335b4.firebaseapp.com",
  projectId: "budgetflow-335b4",
  storageBucket: "budgetflow-335b4.firebasestorage.app",
  messagingSenderId: "376866967716",
  appId: "1:376866967716:web:8eaae6b5385d9e5c849631",
  measurementId: "G-HGZHD1FF9P"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// AUTH FUNCTIONS
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };

// FIRESTORE
export { collection, addDoc, query, onSnapshot, orderBy };
