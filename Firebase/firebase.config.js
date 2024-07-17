// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4albHtM7CYtlib4kjhhKV7JCaMzY4LMw",
  authDomain: "mfs-app-dc189.firebaseapp.com",
  projectId: "mfs-app-dc189",
  storageBucket: "mfs-app-dc189.appspot.com",
  messagingSenderId: "921160776582",
  appId: "1:921160776582:web:dcf54fb04691afb9514a07"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth }; 