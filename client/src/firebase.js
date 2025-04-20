// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "truenest-realty.firebaseapp.com",
  projectId: "truenest-realty",
  storageBucket: "truenest-realty.firebasestorage.app",
  messagingSenderId: "263822093173",
  appId: "1:263822093173:web:65e0d8f4614e040121c13c",
  measurementId: "G-H7KBRF24L2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);