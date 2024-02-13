import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbAgCjWWSCDSuDHkaGxOxPYPEtuG5MHQ0",
  authDomain: "fir-de9cd.firebaseapp.com",
  projectId: "fir-de9cd",
  storageBucket: "fir-de9cd.appspot.com",
  messagingSenderId: "92364046742",
  appId: "1:92364046742:web:58fb978fdcde9fcfe2ddb7",
  measurementId: "G-CFCLFDF67F"
};




export default firebase.initializeApp(firebaseConfig);
 
