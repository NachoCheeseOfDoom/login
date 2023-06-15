
//FIREBASE FUNCTIONS
import { auth } from "../config/firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

//LOGIN
const loginBtnEl = document.getElementById('loginBtn');

//DOM elements
const userEmail = document.getElementById('typeEmailX-2');
const userPassword = document.getElementById('typePasswordX-2');
// const userName = document.getElementById('typeUser-2');

function cleanFeilds() {
  userEmail.value = '',
    userPassword.value = ''
  // userName.value = '',
}

//LOGIN FUNCTION
loginBtnEl.addEventListener('click', (event) => {
  const userEmailValue = userEmail.value;
  const userPasswordValue = userPassword.value;
  // const userNameValue = userName.value;

  signInWithEmailAndPassword(auth, userEmailValue, userPasswordValue)
    .then((userCredential) => {
      const user = userCredential.user;
      // Signed in 
      cleanFeilds()
      window.location.href = '/mainPage.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorCode)
      // ..
    });
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;

    // ...
  } else {
    // User is signed out
    console.log('No user loged in')
    // ...
  }
});