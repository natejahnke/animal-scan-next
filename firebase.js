import firebase from "firebase/compat/app";
import "firebase/compat/performance";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { GoogleAuthProvider } from "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export { db, storage, auth, provider };

export function initializePerformanceMonitoring() {
  if (typeof window !== "undefined") {
    // Import performance monitoring only on the client-side
    require("firebase/performance");
    return firebase.performance();
  }
}

// Path: firebase.js
