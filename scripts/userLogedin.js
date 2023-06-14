// import { auth, database } from './main.js'
import { auth, database } from '../config/firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { onValue, ref } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// const user = auth.currentUser
const WelcomeTextEl = document.getElementById('welcomeText');
const logout = document.getElementById('logoutBtn')


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // const user = cred.user;
    // WelcomeTextEl.innerHTML = `Welcome ${user.email}`;

    const userInDB = ref(database, `users/ ${uid}`)

    onValue(userInDB, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        WelcomeTextEl.innerHTML = `Welcome ${data.name}`;
      }
      else {
        WelcomeTextEl.innerHTML = 'no user found';
        return
      }
    });
    // ...
  } else {
    // User is signed out
    console.log('No user loged in')
    // ...
  }
});

logout.addEventListener('click', (event) => {
  signOut(auth).then((cred) => {
    // Sign-out successful.
    alert(`Goodbye!`)
  }).catch((error) => {
    // An error happened.
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
  });
})


