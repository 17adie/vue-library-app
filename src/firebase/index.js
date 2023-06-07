// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

// import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhaMO3aLTg2FRJcHdRmvJGy4rCkrLbeW8",
  authDomain: "tawi-library-46912.firebaseapp.com",
  projectId: "tawi-library-46912",
  storageBucket: "tawi-library-46912.appspot.com",
  messagingSenderId: "893429477159",
  appId: "1:893429477159:web:98257c2d7a979845ec0302",
  measurementId: "G-GTVFPVH11M",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Authentication
const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
// const analytics = getAnalytics(app)
const storage = getStorage(app)

export { auth, db, storage }
