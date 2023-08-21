// Import the functions you need from the SDKs you need
import {getFirestore} from '@firebase/firestore';
import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCdmXfzVpGEf4kHpXsLjI435CIhCaY-NMs',
  authDomain: 'vokneerik-bank.firebaseapp.com',
  projectId: 'vokneerik-bank',
  storageBucket: 'vokneerik-bank.appspot.com',
  messagingSenderId: '417168148974',
  appId: '1:417168148974:web:f47bd8ced7478ae532e6ff',
  measurementId: 'G-MJT2CM4LY0',
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const db = getFirestore();
