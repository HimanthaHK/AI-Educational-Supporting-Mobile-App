import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // ✅ Import Firestore
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBG8EdqyxlK58Ho2y-CN_qTiIaQMumPBls",
  authDomain: "project-2025-55899.firebaseapp.com",
  projectId: "project-2025-55899",
  storageBucket: "project-2025-55899.appspot.com",
  messagingSenderId: "33676606023",
  appId: "1:33676606023:web:3fb0c2a51ef09598c9cf62",
  measurementId: "G-51TKKQYMWF",
};

// ✅ Check if Firebase is already initialized
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
export const db = getFirestore(app);

// ✅ Ensure Auth persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
