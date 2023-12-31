import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAEkAL-ufrcbQShkgjbwErrMvug3eUvscI',
  authDomain: 'nwitter-reloaded-2b497.firebaseapp.com',
  projectId: 'nwitter-reloaded-2b497',
  storageBucket: 'nwitter-reloaded-2b497.appspot.com',
  messagingSenderId: '576821095578',
  appId: '1:576821095578:web:b13498e4f24c94b3ac4323',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
