// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2Hq2s-c36th3TECllsVURKfLiS8go0oM",
  authDomain: "admin-medtrack.firebaseapp.com",
  projectId: "admin-medtrack",
  storageBucket: "admin-medtrack.appspot.com",
  messagingSenderId: "229277880458",
  appId: "1:229277880458:web:c5fa1870c73746bffd5d73",
  measurementId: "G-E9FQ9S6XP7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
