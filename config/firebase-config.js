// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
// import { firestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD5bgs8HoHRYiXVLUXxSbOVdTAxLFm3GzY",
  authDomain: "login-test-c16eb.firebaseapp.com",
  databaseURL: "https://login-test-c16eb-default-rtdb.firebaseio.com",
  projectId: "login-test-c16eb",
  storageBucket: "login-test-c16eb.appspot.com",
  messagingSenderId: "97138484578",
  appId: "1:97138484578:web:840ac3854e55b81eacb83b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
