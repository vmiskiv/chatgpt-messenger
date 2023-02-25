import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLDi9SiNR_kMq92dR9L6vABoqYhDV8qPI",
  authDomain: "chatgpt-messenger-b1402.firebaseapp.com",
  projectId: "chatgpt-messenger-b1402",
  storageBucket: "chatgpt-messenger-b1402.appspot.com",
  messagingSenderId: "1006670906478",
  appId: "1:1006670906478:web:e2ee954f798ab79020927f",
  measurementId: "G-V0RE2L7LGW",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
