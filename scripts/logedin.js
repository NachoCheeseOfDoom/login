import { auth, database } from '../config/firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { onValue, ref } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

//DOM ELEMENTS
const userName = document.getElementById('userName')



onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    const uid = user.uid;

    const userInDB = ref(database, `users/ ${uid}`)
    onValue(userInDB, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        userName.innerHTML = `${data.name}`;
      }
      else {
        userName.innerHTML = 'no user found';
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
