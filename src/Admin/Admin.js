import './Auth'
import './Ingredients'

import { list } from './Pizzas'

//
//--changing UI acording to type of person logged in
const loggedOutElem = document.querySelectorAll('.logged-out');
const loggedInElem = document.querySelectorAll('.logged-in')
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (loggedUser) => {
  if(loggedUser){
    if(loggedUser.admin){
      adminItems.forEach(item => {
        item.style.display = 'block';
      }) 
    }
    //account info
    const html = `
      <div>Logged in as ${loggedUser.email}</div>
      <div class="pink-text">${loggedUser.admin ? 'Admin' : 'User'}</div>
    `;
    accountDetails.innerHTML = html;
    loggedInElem.forEach(elem => elem.style.display = 'block');
    loggedOutElem.forEach(elem => elem.style.display = 'none');
  } else {
    list.innerHTML = '';
    adminItems.forEach(item => item.style.display = 'none');
    loggedInElem.forEach(elem => elem.style.display = '');
    loggedOutElem.forEach(elem => elem.style.display = 'block');
  }
}


export {setupUI}