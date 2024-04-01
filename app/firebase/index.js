import { initializeApp,firebase } from 'firebase/app';
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-elxDRDF9L77YMt0qf55eID-x9FC7u2k",
    authDomain: "teste-f42e9.firebaseapp.com",
    projectId: "teste-f42e9",
    storageBucket: "teste-f42e9.appspot.com",
    messagingSenderId: "485401936252",
    appId: "1:485401936252:web:d508ab3306ce84d916a4f9",
    measurementId: "G-7MEXVYND1G"
  };
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);


  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
export default db