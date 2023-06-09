
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
// import { firestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5bgs8HoHRYiXVLUXxSbOVdTAxLFm3GzY",
  authDomain: "login-test-c16eb.firebaseapp.com",
  databaseURL: "https://login-test-c16eb-default-rtdb.firebaseio.com",
  projectId: "login-test-c16eb",
  storageBucket: "login-test-c16eb.appspot.com",
  messagingSenderId: "97138484578",
  appId: "1:97138484578:web:840ac3854e55b81eacb83b"
};

//DOM elements
const loginBtnEl = document.getElementById('loginBtn');
const userEmail = document.getElementById('typeEmailX-2');
const userPassword = document.getElementById('typePasswordX-2');
// const userName = document.getElementById('typeUser-2');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
// const db = firebase.firestore();

// db.settings({ timestampsInSnapshots: true })

function cleanFeilds() {
  userEmail.value = '',
    userPassword.value = ''
  // userName.value = '',
}


loginBtnEl.addEventListener('click', (event) => {
  const userEmailValue = userEmail.value;
  const userPasswordValue = userPassword.value;
  // const userNameValue = userName.value;

  signInWithEmailAndPassword(auth, userEmailValue, userPasswordValue)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const date = new Date();
      update(ref(database, `users/ ${user.uid}`), {
        last_login: date,
      })
      // window.location.href = '/mainPage.html';
      cleanFeilds()
      alert('user loged in')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage)
      // ..
    });
})

export {auth}