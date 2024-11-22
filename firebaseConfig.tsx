import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from 'firebase/firestore';

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const initializeAuth = (firebaseAuth as any).initializeAuth;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChJZOO_RkHGs8WZKukx2MU_5Ew4VCUUuM",
  authDomain: "fir-chat-app-5b597.firebaseapp.com",
  projectId: "fir-chat-app-5b597",
  storageBucket: "fir-chat-app-5b597.firebasestorage.app",
  messagingSenderId: "228757808312",
  appId: "1:228757808312:web:5a90699743a9d6b078404d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence: reactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const userRef = collection(db, 'users')
export const roomsRef = collection(db, 'rooms')