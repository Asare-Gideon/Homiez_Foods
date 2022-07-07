import { getApp, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKnD-Z31YFqJSHEZ7eCNkZUEPowNjGtWc",
  authDomain: "homiezfoods.com",
  projectId: "homiezfoods",
  storageBucket: "homiezfoods.appspot.com",
  messagingSenderId: "115752947956",
  appId: "1:115752947956:web:9cab1e2a032e45aacb8ea1",
  measurementId: "G-X9DVGTYCGW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//connectAuthEmulator(auth, "http://10.0.2.2:9099");
//connectAuthEmulator(auth, "http://localhost:9099");
export const db = getFirestore(app);
// connectFirestoreEmulator(db, "10.0.2.2", 8080);
//connectFirestoreEmulator(db, "localhost", 8080);
export const storage = getStorage(app);
//connectStorageEmulator(storage, "10.0.2.2", 9199);
//connectStorageEmulator(storage, "localhost", 9199);
export const firebaseApp = getApp();
