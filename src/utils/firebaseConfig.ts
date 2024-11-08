import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXAqoUZGNpXbtAUGor5dh8LVq1HCsCiUg",
  authDomain: "aramsol-8008f.firebaseapp.com",
  projectId: "aramsol-8008f",
  storageBucket: "aramsol-8008f.appspot.com",
  messagingSenderId: "569269607745",
  appId: "1:569269607745:web:7c22fe86ca43d8db6015c0"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
