import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Replace these with your Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyCkgxug0fdKvcS8ZJwD3TfYabfUxasWHaY",
    authDomain: "my-login-95c33.firebaseapp.com",
    projectId: "my-login-95c33",
    storageBucket: "my-login-95c33.firebasestorage.app",
    messagingSenderId: "425531427167",
    appId: "1:425531427167:web:6ea79ba9e46c4958ae0eea"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 