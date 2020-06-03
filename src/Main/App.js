import './AuthMain'
import './ShoppingCart'

import { ing_list, getIng, ingDB } from './IngList'
import { getList, ordersDB, list } from './OrderList'
import { getPizzas } from './PizzasMenu'

getPizzas();

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
    //console.log(`${userdata.data().name} logged-in! UserId: ${loggedUser.uid}`);
  }
  AdminUI(){
    this.adminItems.forEach(item => item.style.display = 'block');
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












let orderID = '';

const create = document.querySelector('#create');
const name = document.querySelector('#name');
const search = document.querySelector('#search');
const create_pizza = document.querySelector('#create_pizza');
var size = document.querySelector('select');

//
//---creating new documentin DB to store order details and retrieving uniqe id for each order
create.addEventListener('submit', (e) => {
  e.preventDefault();
  
  getIng();

  create_pizza.classList.remove('hidden');
  create.classList.add('hidden');

  const now = new Date();

  ordersDB.add({
    created_at: firebase.firestore.Timestamp.fromDate(now),
    name: name.value,
    size: size.value,
    ingredients: ''
  }).then((order) => {
      orderID = order.id;
  }).catch(function(error) {
    console.error("Error adding document: ", error);
  });
})

//
//--choosing disered ingredients and adding them to the ordersDB
ing_list.addEventListener('click', (e) => {
  if(e.target.nodeName !== 'UL'){
    let id = e.target.getAttribute('ingredient-id');

    ingDB.doc(id)
         .get()
         .then((ingredient) => {
          ordersDB.doc(orderID).update({
            ingredients: firebase.firestore.FieldValue.arrayUnion(ingredient.data().name + ', ' + ingredient.data().price)
          }).then(() => {
            getList(orderID);
          })
      });
  }
});

//
//---deleting ingredient and deleting it from ordersDB
list.addEventListener('click', e => {
  if(e.target.tagName === 'I'){
     const posID = e.target.parentElement.getAttribute('position-id');

      ordersDB.doc(orderID)
        .get()
        .then((doc) => {
          let ingArr = doc.data().ingredients; //to delete ingredient from DB we are getting array of existing in ingredients..
          ingArr.splice(ingArr.indexOf(ingArr[posID]), 1); //...and deleting it from array using custom index that we created for each element...
          ordersDB.doc(orderID).update({
            ingredients: ingArr //...and updating DB with new array of ingredients
          }).then(() => {
            getList(orderID);
          })
      })
    }
})
 

//
//---searching ingredients, when typing it filters ingredients by letters we are typing
const filterIngredients = (term) => {
  Array.from(ing_list.children)
      .filter((ingredient) => !ingredient.textContent.toLowerCase().includes(term))
      .forEach((ingredient) => ingredient.classList.add('hidden'));

  Array.from(ing_list.children)
      .filter((ingredient) => ingredient.textContent.toLowerCase().includes(term))
      .forEach((ingredient) => ingredient.classList.remove('hidden'));
};

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterIngredients(term);
});


export { setupUI }





