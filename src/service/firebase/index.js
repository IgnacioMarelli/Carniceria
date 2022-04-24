import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDa1U3NBViEAEjTtvOlys4nkLurgK4uRnE",
  authDomain: "carniceria-2d52e.firebaseapp.com",
  projectId: "carniceria-2d52e",
  storageBucket: "carniceria-2d52e.appspot.com",
  messagingSenderId: "920224787723",
  appId: "1:920224787723:web:ecadf5ee7f20ecfcdb860e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoreDb= getFirestore(app)
