import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb2O4AMkjqY5bfAF2829ZPorQDiukdsoY",
  authDomain: "chatgpt-messenger-532fc.firebaseapp.com",
  projectId: "chatgpt-messenger-532fc",
  storageBucket: "chatgpt-messenger-532fc.appspot.com",
  messagingSenderId: "883513628528",
  appId: "1:883513628528:web:081b411717ed4b589be1b5",
  measurementId: "G-BRJ3SQXXNM"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
