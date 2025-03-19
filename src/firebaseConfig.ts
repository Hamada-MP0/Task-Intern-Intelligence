import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMCp5R51ax3t70qnm3BDOsf2j1i-855js",
    authDomain: "taskintern-9475b.firebaseapp.com",
    projectId: "taskintern-9475b",
    storageBucket: "taskintern-9475b.firebasestorage.app",
    messagingSenderId: "236429723623",
    appId: "1:236429723623:web:21d7f5c508364ac1eb9f42",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };