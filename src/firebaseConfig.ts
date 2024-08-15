// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVej9zoWMKVTrSOuPRHeUa2MsLUenqTeo",
  authDomain: "emery-ab427.firebaseapp.com",
  projectId: "emery-ab427",
  storageBucket: "emery-ab427.appspot.com",
  messagingSenderId: "953563535514",
  appId: "1:953563535514:web:ca1a0e2a10f304c6cea723",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export { app };
