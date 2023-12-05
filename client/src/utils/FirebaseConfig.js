// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB99AA3dtqQAxKpgA1IqMaB3WwT2ikk_1Y",
    authDomain: "whatsapp-clone-76eb9.firebaseapp.com",
    projectId: "whatsapp-clone-76eb9",
    storageBucket: "whatsapp-clone-76eb9.appspot.com",
    messagingSenderId: "858576734993",
    appId: "1:858576734993:web:e6556facacf9648f125ab0",
    measurementId: "G-HG08LFD77X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)