import { setupUI } from './Admin'
import { closeForms } from '../Main/Materialize'

const usersDB = db.collection('users');


//
//--listen for the auth status changes
auth.onAuthStateChanged(user => {
  if(user){
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        usersDB.doc(user.uid).get()
        .then((userdata) => {
          setupUI(user, userdata);
          //console.log(userdata.data().name, user)
        });    
      })
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
    return usersDB.doc(cred.user.uid).set({
      name: signupForm.nickname.value
    });
  }).then(() => {
    const close = new closeForms('modal-signup', signupForm);
    close.modalClose();
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
    const close = new closeForms('modal-login', loginForm);
    close.modalClose();
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

//
//--add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({email: adminEmail}).then(result => {
    console.log(result);
  })
  const close = new closeForms('modal-account', adminForm);
    close.modalClose();
});