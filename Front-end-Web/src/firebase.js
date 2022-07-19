// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt5GGg8PVXR6JFzQ4DFLBHTmufDFlwh2s",
  authDomain: "pharma-friend.firebaseapp.com",
  projectId: "pharma-friend",
  storageBucket: "pharma-friend.appspot.com",
  messagingSenderId: "135176968480",
  appId: "1:135176968480:web:9cb3cd89f7aabd7b821f45",
  measurementId: "G-KLP24B26E5",
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth();

// export { auth };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
