import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBX-p1iwFa39zFRX6l7pOSWzv7kmP6LmaM",
  authDomain: "hemanenterprises-b7d11.firebaseapp.com",
  projectId: "hemanenterprises-b7d11",
  storageBucket: "hemanenterprises-b7d11.firebasestorage.app",
  messagingSenderId: "571693238689",
  appId: "1:571693238689:web:49cf85361e83b2da3be3e0",
  measurementId: "G-9Z0YPXCJG4"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const storage = getStorage(app);
