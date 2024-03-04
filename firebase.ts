// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkDBCQCDdzMJChkyyBOfkblZipA49NZjY",
  authDomain: "todo-list-8543f.firebaseapp.com",
  projectId: "todo-list-8543f",
  storageBucket: "todo-list-8543f.appspot.com",
  messagingSenderId: "865434057768",
  appId: "1:865434057768:web:504bd8c695f80a9346491d",
  measurementId: "G-NNWSL7GM5Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db: Firestore = getFirestore(app);

export default db;
