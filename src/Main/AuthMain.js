import { modalClose } from './Materialize'
import { setupUI } from './App'

const usersDB = db.collection('users');

//
//--listen for the auth status changes
auth.onAuthStateChanged(user => {
  if(user){
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        usersDB.doc(user.uid).get()
        .then((userdata) => {
          setupUI(user, userdata.data());
          return user.uid;
        });  
      }).catch(err => {
        console.log(err.message);
      })
    } else {
      setupUI()
    }
})

//
//--sign up new user
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
     usersDB.doc(cred.user.uid).set({
      name: signupForm.nickname.value,
      shopping_cart: []
    })
  }).then(() => {
      modalClose('modal-signup', signupForm);
    }).catch(err => console.log(err.message));
})

//
//--login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    modalClose('modal-login', loginForm);
  }).catch(err => console.log(err.message));
})

//
// --logout
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    location.reload();
  });
})

export { usersDB } 