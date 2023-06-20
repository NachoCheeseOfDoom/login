import { auth, database } from '../config/firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { onValue, ref, update, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";


//DOM ELEMENTS
const userName = document.getElementById('userName')
const addIteamBtn = document.getElementById('addIteam')
const itemInput = document.getElementById('cartIteam')
const itemsInList = document.getElementById('listIteamsInDB')

//ADMIN STUFF
const isAdminCheckbox = document.getElementById('isAdminCheckbox');
const updateAdminBtn = document.getElementById('updateAdminBtn');

const clearList = () => {
  itemsInList.innerHTML = ''
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;

    //REALTIME FIREBASE
    const userInDB = ref(database, `users/ ${uid}`)
    const itemsInDB = ref(database, `usersItems/ ${uid}`)


    updateAdminBtn.addEventListener('click', () => {
      const isAdmin = isAdminCheckbox.checked;

      // Update the "admin" property in the database
      update(userInDB, {
        admin: isAdmin
      }).then(() => {
        console.log('Admin status updated successfully');
      }).catch((error) => {
        console.log('Error updating admin status:', error);
      });
    });


    //READ USERS NAME
    onValue(userInDB, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const isAdmin = userData.admin;

        userName.innerHTML = `${data.name} Admin: ${isAdmin}`;

        if (isAdmin) {
          // User is an admin
          // Grant read and write access
          // Perform the necessary actions for an admin user
          //ADD SOMETHING TO REALTIME FIREBASE
          document.body.style.backgroundColor = '#508bfc';


          addIteamBtn.addEventListener('click', (event) => {
            if (isAdmin) {
              let itemInputValue = itemInput.value;
              push(itemsInDB, itemInputValue)
            } else {
              console.log('not admin')
            }
          })
        } else {
          // User is not an admin
          // Grant read access only
          // Perform the necessary actions for a non-admin user
          document.body.style.backgroundColor = 'lightgreen';
          console.log('not admin')
        }
      }
      else {
        userName.innerHTML = 'no user found';
        return
      }
    });



    //ITEAMS IN REALTIME FIREBASE
    onValue(itemsInDB, (snapshot) => {
      clearList()
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
