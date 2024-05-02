// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCd-yMefQff0XQqwpfH0qjf_EOVssaQT0",
  authDomain: "vitrack-e445e.firebaseapp.com",
  projectId: "vitrack-e445e",
  storageBucket: "vitrack-e445e.appspot.com",
  messagingSenderId: "900318642725",
  appId: "1:900318642725:web:130f149637c81d6cc075cc",
  measurementId: "G-74XSPDJ02X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);