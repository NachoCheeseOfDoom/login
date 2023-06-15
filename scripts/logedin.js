import { auth, database } from '../config/firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { onValue, ref, update, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";


//DOM ELEMENTS
const userName = document.getElementById('userName')
const addIteamBtn = document.getElementById('addIteam')
const itemInput = document.getElementById('cartIteam')
const itemsInList = document.getElementById('listIteamsInDB')


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;

    //REALTIME FIREBASE
    const userInDB = ref(database, `users/ ${uid}`)
    const itemsInDB = ref(database, `usersItems/ ${uid}`)


    //READ USERS NAME
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

    //ADD SOMETHING TO REALTIME FIREBASE
    addIteamBtn.addEventListener('click', (event) => {
      let itemInputValue = itemInput.value;
      push(itemsInDB, itemInputValue)
    })

    //ITEAMS IN REALTIME FIREBASE
    onValue(itemsInDB, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // ...
        itemsInList.innerHTML += `${childData}, `;
      });
    });


    // ...
  } else {
    // User is signed out
    console.log('No user loged in')
    window.location.href = '/index.html';
    // ...
  }
});
