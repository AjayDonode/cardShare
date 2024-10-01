import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDosLEJNUsSf-LzAnCOVyhZcnUkBt0K0Vs",
  authDomain: "cardholder-166b6.firebaseapp.com",
  databaseURL: "https://cardholder-166b6-default-rtdb.firebaseio.com",
  projectId: "cardholder-166b6",
  storageBucket: "cardholder-166b6.appspot.com",
  messagingSenderId: "817201102458",
  appId: "1:817201102458:web:b62da64d332846513c85c3",
  measurementId: "G-K25V96YMNT"
};

const firebase = initializeApp(firebaseConfig); 
//const storage = getStorage(firebase);  
const db = getFirestore(firebase);               //database reference
//const colRef = collection(db, "images"); //collection reference
//const timeStamp = serverTimestamp(); 

export {  db };