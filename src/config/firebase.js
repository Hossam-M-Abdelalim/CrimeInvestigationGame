import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9U1Bp9Pj7k4RpWWa2axbhsar47QhllJU",
  authDomain: "crimeinvestigationgame.firebaseapp.com",
  projectId: "crimeinvestigationgame",
  storageBucket: "crimeinvestigationgame.firebasestorage.app",
  messagingSenderId: "154151553691",
  appId: "1:154151553691:web:e6824212994ee90945943e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);