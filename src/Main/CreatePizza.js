import { usersDB } from './AuthMain'
import { profileID } from './ShoppingCart'


const create = document.querySelector('#create');
const name = document.querySelector('#name');
const create_pizza_modal = document.querySelector('#modal_create_pizza')
const create_pizza = document.querySelector('#create_pizza');
const size = document.querySelector('select');

//
//---creating new documentin DB to store order details and retrieving uniqe id for each order
create.addEventListener('submit', (e) => {
  e.preventDefault();

  getIng();

  const now = new Date();
  usersDB.doc(profileID.value).collection('users_orders').add({
      created_at: firebase.firestore.Timestamp.fromDate(now),
      title: name.value,
      size: size.value,
      ingredients: ''
  }).then((docRef) => {
    console.log(" Order created with ID: ", docRef.id);
  }).catch(function(error) {
    console.error("Error adding document: ", error);
});

  create.classList.add('hidden');
  create_pizza.classList.remove('hidden');
  create_pizza_modal.style.maxHeight = "80%";

  
})

const ing_list = document.querySelector('#ingredients-list');
const ingDB = db.collection('ingredients');

function renderIngredients(ingredient){

let html = `<a ingredient-id="${ingredient.id}" class="collection-item">
<span class="title black-text">${ingredient.data().name}</span>
<span class="secondary-content black-text">${ingredient.data().price}$</span>
<p class="grey-text text-darken-1">${ingredient.data().description}</p>
</a>`

  ing_list.innerHTML += html
}

//getting data from db
const getIng = () => {
  ingDB.get()
       .then((snapshot) => {
          snapshot.docs.forEach(ingredient => {
            renderIngredients(ingredient)
          });
        });
};


let ordersDB = db.collection('orders')

let list = document.querySelector('#customer-list');
let total = document.querySelector('#total');
let orderBTN = document.querySelector('#order');

function render(data){
  list.innerHTML = ""; //deleting all inside the list to put newly generated list, otherwise it will stuck on each other

  let prices = [];
  let pos = 0;

  //after deleting last ingredient array is empty and rest of the code doesn't fire, so we clearing the field where total cost displayed
  if(data.ingredients.length === 0){   
    total.textContent = '';
    orderBTN.classList.add('hidden');
  }

  data.ingredients.forEach((ingredient) => {

    let details = ingredient.split(', ')

    let html = `
    <a position-id="${pos}" class="collection-item">
    <i class="material-icons delete red-text darken-1-text">delete</i>
    <span class="title black-text">${details[0]}</span>
    <span class="secondary-content black-text">${parseInt(details[1])}$</span>
    </a>
    `;

    prices.push(parseInt(details[1])) //pushing cost of each ingredient into array

    list.innerHTML += html;
    pos++;
    
    total.textContent = prices.reduce((a, b) => a + b, 0) + '$'; //calculating sum of all ordered ingredients
    orderBTN.classList.remove('hidden');
    list.classList.remove('hidden');

  })
}

function getList(id){
    ordersDB.doc(id).onSnapshot((doc) => {
      render(doc.data());
    });
  }

  let orderID = '';

  
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
//---searching ingredients, when typing it filters ingredients by letters we are typing
const filterIngredients = (term) => {
  Array.from(ing_list.children)
      .filter((ingredient) => !ingredient.textContent.toLowerCase().includes(term))
      .forEach((ingredient) => ingredient.classList.add('hidden'));

  Array.from(ing_list.children)
      .filter((ingredient) => ingredient.textContent.toLowerCase().includes(term))
      .forEach((ingredient) => ingredient.classList.remove('hidden'));
};

const search = document.querySelector('#search');

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterIngredients(term);
});
