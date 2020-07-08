import './Auth'

import { getPizzas } from './Pizzas'
import { getOrders } from  './Orders'
import { getUsers } from  './Users'

const setupUI = (loggedUser, userdata) => {
  if(loggedUser){
    if(loggedUser.admin){
      AdminUI();
    }
      logedIn(loggedUser, userdata)
    }
}

const loggedOutElem = document.querySelectorAll('.logged-out');
const loggedInElem = document.querySelectorAll('.logged-in')
const adminItems = document.querySelectorAll('.admin');
const accountIcon = document.querySelector('#account_icon')
const accountDetails = document.querySelector('.account-details');
const user_profile = document.querySelector('#user_profile');
const greeting_msg = document.querySelector('#greeting');

function logedIn(loggedUser, userdata){
  loggedInElem.forEach(elem => {
    if(elem.tagName == 'LI'){
      elem.style.display = 'list-item';
    } else {
      elem.style.display = 'block';
    }
  });
  loggedOutElem.forEach(elem => elem.style.display = 'none');

  accountIcon.style.color ='#ff6f00';

  user_profile.profile_id.value = loggedUser.uid;
  user_profile.profile_name.value = userdata.name;
  user_profile.profile_email.value = loggedUser.email;
  accountDetails.textContent = loggedUser.admin ? 'Admin' : 'User';
  M.updateTextFields();
  greeting_msg.textContent = `Hi, ${userdata.name}`;
}

function AdminUI(){
  adminItems.forEach(item => item.style.display = 'block');
  getPizzas();
  getOrders();
  getUsers();
}


export { setupUI }