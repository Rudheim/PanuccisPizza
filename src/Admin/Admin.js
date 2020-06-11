import './Auth'

import { getPizzas } from './Pizzas'
import { getIngList } from './Ingredients'
import { getOrders } from  './Orders'
import { getUsers } from  './Users'

//
//--changing UI acording to type of person logged in
class LoginUI{
  constructor(){
    this.loggedOutElem = document.querySelectorAll('.logged-out');
    this.loggedInElem = document.querySelectorAll('.logged-in')
    this.adminItems = document.querySelectorAll('.admin');
    this.accountIcon = document.querySelector('#account_icon')
    this.accountDetails = document.querySelector('.account-details');
    this.user_profile = document.querySelector('#user_profile');
    this.greeting_msg = document.querySelector('#greeting');
  }
  logedIn(loggedUser, userdata){
    this.loggedInElem.forEach(elem => {
      if(elem.tagName == 'LI'){
        elem.style.display = 'list-item';
      } else {
        elem.style.display = 'block';
      }
    });
    this.loggedOutElem.forEach(elem => elem.style.display = 'none');

    this.accountIcon.style.color ='#ff6f00';

    this.user_profile.profile_id.value = loggedUser.uid;
    this.user_profile.profile_name.value = userdata.data().name;
    this.user_profile.profile_email.value = loggedUser.email;
    this.accountDetails.value = loggedUser.admin ? 'Admin' : 'User';
    M.updateTextFields();
    this.greeting_msg.textContent = `Hi, ${userdata.data().name}`;
  }
  AdminUI(){
    this.adminItems.forEach(item => item.style.display = 'block');
    getPizzas();
    getIngList();
    getOrders();
    getUsers();
  }
  logedOut(){
    location.reload();
  }
}

//
//getting info wich type of user is logging in and changing style according to user status.
const setupUI = (loggedUser, userdata) => {
  const login = new LoginUI;
  if(loggedUser){
    if(loggedUser.admin){
      login.AdminUI();
    }
      login.logedIn(loggedUser, userdata)
    } else {
      login.logedOut();
  }
}



export { setupUI }