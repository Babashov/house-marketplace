// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0rILzcNDtnkxfy86d0RoFyRWUiRy3EqU",
  authDomain: "house-marketplace-app-9ceaa.firebaseapp.com",
  projectId: "house-marketplace-app-9ceaa",
  storageBucket: "house-marketplace-app-9ceaa.appspot.com",
  messagingSenderId: "395154911722",
  appId: "1:395154911722:web:3c67ce8a72cd4713e20293"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();