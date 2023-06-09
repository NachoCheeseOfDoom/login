// import { auth } from main.js

//Sign up
const signUPBtn = document.getElementById('signUpBtn');

//DOM manipulation
const userEmail = document.getElementById('typeEmailX-2');
const userPassword = document.getElementById('typePasswordX-2');


signUPBtn.addEventListener('click', (event) => {
  const userEmailValue = userEmail.value;
  const userPasswordValue = userPassword.value;

  auth.createUserWithEmailAndPassword(userEmailValue, userPasswordValue).then(cred => {
    console.log(cred)
  })

})