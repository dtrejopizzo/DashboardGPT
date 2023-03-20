import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword as _createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPNoku-2lJ-XhqqUyHeaW9mxsRlwEYRow",
  authDomain: "carbo-eb6fb.firebaseapp.com",
  projectId: "carbo-eb6fb",
  storageBucket: "carbo-eb6fb.appspot.com",
  messagingSenderId: "694583209869",
  appId: "1:694583209869:web:49ceb839f73173e23cd7c4",
  measurementId: "G-R7VZWYF2QJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const createUserWithEmailAndPassword = async (auth, email, password, additionalData) => {
  const userCredential = await _createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Almacenar datos adicionales en Firestore
  const db = getFirestore(app);
  await setDoc(doc(db, 'users', user.uid), additionalData);

  return userCredential;
};

export { auth, createUserWithEmailAndPassword };