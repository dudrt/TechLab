import { initializeApp,firebase } from 'firebase/app';
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    
  };
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);


  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
export default db
