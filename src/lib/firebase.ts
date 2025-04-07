import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIeVS6j5EmN80XPVnAh2LdZ141qz2crjg",
  authDomain: "dswd-83cc6.firebaseapp.com",
  projectId: "dswd-83cc6",
  storageBucket: "dswd-83cc6.firebasestorage.app",
  messagingSenderId: "302017629484",
  appId: "1:302017629484:web:30e5e9c346e45db6f03089",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);