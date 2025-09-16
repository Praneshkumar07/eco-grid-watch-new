// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUkkPcvhQc1CaWg7K5F9kHV-40UfGuBDs",
  authDomain: "eco-grid-ddadf.firebaseapp.com",
  databaseURL: "https://eco-grid-ddadf-default-rtdb.firebaseio.com",
  projectId: "eco-grid-ddadf",
  storageBucket: "eco-grid-ddadf.firebasestorage.app",
  messagingSenderId: "181604645031",
  appId: "1:181604645031:web:fd4a8d1617ddbb67d48382",
  measurementId: "G-VWJVHSKE9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
