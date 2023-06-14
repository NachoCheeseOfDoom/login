import { auth, database } from '../config/firebase-config.js';
import { ref, update, push, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

//Sign up
const signUPBtn = document.getElementById('signUpBtn');

//DOM manipulation
const userEmail = document.getElementById('typeEmailX-2');
const userPassword = document.getElementById('typePasswordX-2');
const userName = document.getElementById('typeUser-2');


signUPBtn.addEventListener('click', (event) => {
  const userEmailValue = userEmail.value;
  const userPasswordValue = userPassword.value;
  const userNameValue = userName.value;


  createUserWithEmailAndPassword(auth, userEmailValue, userPasswordValue)
    .then(cred => {

      // const userInDB = ref(database, 'users/')
      const user = cred.user;

      const dateAndTime = new Date();

      set(ref(database, `users/ ${user.uid}`), {
        name: userNameValue,
        date: dateAndTime,
      })
      alert('user loged in')

    })

})

