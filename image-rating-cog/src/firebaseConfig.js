// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiplLYEAb-BifhyqGkPkt39hir7jysVjA",
  authDomain: "image-rating-app-b4be0.firebaseapp.com",
  projectId: "image-rating-app-b4be0",
  storageBucket: "image-rating-app-b4be0.appspot.com",
  messagingSenderId: "422127095335",
  appId: "1:422127095335:web:af6ac047ff8a021dff0802",
  measurementId: "G-XNXQFQ9VTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}
