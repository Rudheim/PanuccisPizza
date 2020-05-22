import './IngList'
import './OrderList'

import { ing_list, getIng, ingDB } from './IngList'
import { getList, ordersDB, list } from './OrderList'

let orderID = '';

const create = document.querySelector('#create');
const name = document.querySelector('#name');
const content = document.querySelector('.row');
const search = document.querySelector('#search');

// -----------------------------------------------------------------------------
//creating new documentin DB to store order details and retrieving uniqe id for each order
create.addEventListener('submit', (e) => {
  e.preventDefault();

  getIng();

  content.classList.remove('hidden');
  create.classList.add('hidden');

  const now = new Date();

  ordersDB.add({
    created_at: firebase.firestore.Timestamp.fromDate(now),
    name: name.value,
    ingredients: ''
  }).then((order) => {
      orderID = order.id;
  }).catch(function(error) {
    console.error("Error adding document: ", error);
  });
})


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

// -----------------------------------------------------------------------------
// searching ingredients, when typing it filters ingredients by letters we are typing
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
