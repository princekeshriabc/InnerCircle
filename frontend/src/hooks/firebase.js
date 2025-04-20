// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "inner-circle-8e8e6.firebaseapp.com",
  projectId: "inner-circle-8e8e6",
  storageBucket: "inner-circle-8e8e6.firebasestorage.app",
  messagingSenderId: "296549026875",
  appId: "1:296549026875:web:01fadb5f3cd943ad34201e",
  measurementId: "G-FQKPYWW5Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };