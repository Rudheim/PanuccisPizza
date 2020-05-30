import { getPizzas, setupUI} from './Admin'

//
//--sign up new user
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
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
    //closing modal using materialize and reseting input fields
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }).catch(err => console.log(err.message));
})

//
//--logout
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    setupUI();
    console.log('user signed out')
  });
})

//
//--listen for the auth status changes
auth.onAuthStateChanged(user => {
  if(user){
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        setupUI(user);
        getPizzas();
      })
    }
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
  const modal = document.querySelector('#modal-account');
  M.Modal.getInstance(modal).close();
  adminForm.reset();
});