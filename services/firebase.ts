// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore'
import { Auth, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUdoVCHzCVHMmPls9XjEffAlXLUU2qIvM",
  authDomain: "redux-typescript-74c41.firebaseapp.com",
  projectId: "redux-typescript-74c41",
  storageBucket: "redux-typescript-74c41.appspot.com",
  messagingSenderId: "209040555416",
  appId: "1:209040555416:web:ba369f7310c08f64b87fed",
  measurementId: "G-XKQR0Z9QKG"
}; 

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
// const analytics: Analytics = getAnalytics(app);

//database 
export const database: Firestore = getFirestore(app)

//auth
export const auth: Auth = getAuth(app)