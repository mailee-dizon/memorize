import { initializeApp, getApps, getApp } from "firebase/app";
import { browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log("Firebase API Key: ", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);




const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app);
const storage = getStorage(app, "gs://flipcards-448722.firebasestorage.app");
const db = getFirestore(app);

setPersistence(auth, browserSessionPersistence) 
  .then(() => {
    
  })
  .catch((error) => {
    console.log(error)
  })

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
  } else {
    console.log("No User")
  }
})

export {app, auth, db, storage}
