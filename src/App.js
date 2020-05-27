import './IngList'
import './OrderList'
import './Menu'

import { ing_list, getIng, ingDB } from './IngList'
import { getList, ordersDB, list, total } from './OrderList'
import { getPizzas } from './Menu'

let orderID = '';

const create = document.querySelector('#create');
const name = document.querySelector('#name');
const search = document.querySelector('#search');
const create_pizza = document.querySelector('#create_pizza');
var size = document.querySelector('select');


getPizzas();

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
//---choosing disered ingredients and adding them to the ordersDB
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



//
//---Materialise init
const icons = document.querySelector('.hide-on-med-and-down');
icons.addEventListener('mouseover' , (e) =>{
  e.target.parentElement.classList.add('pulse');
});
icons.addEventListener('mouseout' , (e) =>{
  e.target.parentElement.classList.remove('pulse');
});

document.addEventListener('DOMContentLoaded', (e) => {
  var elem = document.querySelector('select');
  var instance = M.FormSelect.init(elem);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.scrollspy');
  var instances = M.ScrollSpy.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elem = document.querySelector('.sidenav');
  var instance = M.Sidenav.init(elem);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);
});








