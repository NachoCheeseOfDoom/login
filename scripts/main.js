
//FIREBASE FUNCTIONS
import { auth } from "../config/firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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


loginBtnEl.addEventListener('click', (event) => {
  const userEmailValue = userEmail.value;
  const userPasswordValue = userPassword.value;
  // const userNameValue = userName.value;

  signInWithEmailAndPassword(auth, userEmailValue, userPasswordValue)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(`${user.email} loged in`)
      window.location.href = '/mainPage.html';

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorCode)
      // ..
    });
})

