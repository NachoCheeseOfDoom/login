import { auth } from '../config/firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

//DOM ELEMENT
const logout = document.getElementById('logoutBtn')

//LOGOUT FUNCTION
logout.addEventListener('click', (event => {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert(`Goodbye!`)
    window.location.href = 'index.html'
  }).catch((error) => {
    // An error happened.
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorCode)
  });
}))