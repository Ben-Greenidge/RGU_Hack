// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyCCX1fo5ssIlOvqvkOPHVwEGXsSH46j3Dw",
 authDomain: "rgu-hack-bug-busters.firebaseapp.com",
 projectId: "rgu-hack-bug-busters",
 storageBucket: "rgu-hack-bug-busters.firebasestorage.app",
 messagingSenderId: "400904828507",
 appId: "1:400904828507:web:6ac21ef5f1566deda0717e",
 measurementId: "G-EYPWSH0EQZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
