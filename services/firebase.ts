// Import the functions you need from the SDKs you need
import fireabse, { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore'
import { Auth, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2mFfqiBlo4LhJ6zjNX4rodlrJixdPOHQ",
  authDomain: "movies-manager-df7da.firebaseapp.com",
  projectId: "movies-manager-df7da",
  storageBucket: "movies-manager-df7da.appspot.com",
  messagingSenderId: "496826308934",
  appId: "1:496826308934:web:cf29d52aeb34ccc0bbed47",
  measurementId: "G-Q8X6D3NH88"
}; 
// Initialize Firebase
var app: FirebaseApp = initializeApp(firebaseConfig, 'name');

// const analytics: Analytics = getAnalytics(app);

//database 
export const database: Firestore = getFirestore(app)

//auth
export const auth: Auth = getAuth(app)