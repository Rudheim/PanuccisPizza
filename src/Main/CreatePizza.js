import { usersDB } from './AuthMain'
import { profileID, ordersDB } from './ShoppingCart'


const ingDB = db.collection('ingredients');

//
//--Rendering ingredients list to the screen
const ing_list = document.querySelector('#ingredients-list');

const getIng = () => {
  ingDB.get()
       .then((snapshot) => {
          snapshot.docs.forEach(ingredient => {
            renderIngredients(ingredient)
          });
        });
};

const create = document.querySelector('#create');
const name = document.querySelector('#name');
const create_pizza_modal = document.querySelector('#modal_create_pizza')
const create_pizza = document.querySelector('#create_pizza');
const size = document.querySelector('select');

function renderIngredients(ingredient){

let html = `<a ingredient-id="${ingredient.id}" class="collection-item">
<span class="title black-text">${ingredient.data().name}</span>
<span class="secondary-content black-text">${ingredient.data().price}$</span>
<p class="grey-text text-darken-1">${ingredient.data().description}</p>
</a>`

  ing_list.innerHTML += html
}

//
//---owerwriting document DB to store order details
create.addEventListener('submit', (e) => {
  e.preventDefault();

  getIng();

  const now = new Date();

  usersDB.doc(profileID.value).collection('user_orders').doc('self_made_pizza').set({
      created_at: firebase.firestore.Timestamp.fromDate(now),
      title: name.value,
      size: size.value,
      ingredients: []
  }).then((docRef) => {
    console.log('Order created with ID');
  }).catch(function(error){
    console.error('Error adding document', error);
});
  create.classList.add('hidden');
  create_pizza.classList.remove('hidden');
  create_pizza_modal.style.maxHeight = "80%";
})

let list = document.querySelector('#customer-list');
let total = document.querySelector('#total');

//
//--rendering user chosen ingredients
function getList(){
  usersDB.doc(profileID.value).collection('user_orders').doc('self_made_pizza').onSnapshot((doc) => {
      render(doc.data());
    });
  }

//--choosing disered ingredients and adding them to the ordersDB
ing_list.addEventListener('click', (e) => {
  if(e.target.nodeName !== 'UL'){
    let id = e.target.getAttribute('ingredient-id');

    db.runTransaction((transaction) => {
      return transaction.get(usersDB.doc(profileID.value).collection('user_orders').doc('self_made_pizza'))
      .then((self_made_pizza) => {
        return transaction.get(ingDB.doc(id))
        .then((ingredient) => {
          let user_ing = self_made_pizza.data().ingredients;
          let newitem = ingredient.data().name + ', ' + ingredient.data().price;
          user_ing.push(newitem);
          transaction.update(usersDB.doc(profileID.value).collection('user_orders').doc('self_made_pizza'), {ingredients: user_ing});
        }).then(() => {
          getList();
        }).catch(err => {
          console.log(err.message);
        });
      })
    })
  }
});

function render(data){
  list.innerHTML = ""; 

  let prices = [];
  let pos = 0;

  //after deleting last ingredient array is empty and rest of the code doesn't fire, so we clearing the field where total cost displayed
  if(data.ingredients.length === 0){   
    total.textContent = '';
    order_pizza_button.classList.add('hidden');
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
    order_pizza_button.classList.remove('hidden');
    list.classList.remove('hidden');
  })
  //creating a field ih the document with total sum, to add it later to shopping cart(reduces perfomance greatly!)
  usersDB.doc(profileID.value).collection('user_orders').doc('self_made_pizza')
    .update({
      total: prices.reduce((a, b) => a + b, 0)
    })
}

//
//--ordering selfmadepizza
const order_pizza_button = document.querySelector('#order');

order_pizza_button.addEventListener('click', e => {
  e.preventDefault();

  db.runTransaction(transaction => {
    return transaction.get(usersDB.doc(profileID.value))
    .then(user => {
      return transaction.get(usersDB.doc(profileID.value).collection('user_orders').doc('self_made_pizza'))
      .then((pizza) => {
        let new_pizza = 'Custom ' + pizza.data().size + ' ' + pizza.data().title + ', ' + pizza.data().total + ', ' + pizza.data().ingredients;
      transaction.update(usersDB.doc(profileID.value), {shopping_cart: firebase.firestore.FieldValue.arrayUnion(new_pizza)})
      }).then(() =>{
        create.classList.remove('hidden');
        create_pizza.classList.add('hidden');
        create_pizza_modal.style.maxHeight = "";
      }).catch(err => {
        console.log(err.message);
      });
    })
  })
})

//
//---deleting ingredient and deleting it from ordersDB
list.addEventListener('click', e => {
  if(e.target.tagName === 'I'){
      const posID = e.target.parentElement.getAttribute('position-id');

      usersDB.doc(profileID.value).collection('user_orders').doc('self_made_pizza')
        .get()
        .then((doc) => {
          let ingArr = doc.data().ingredients; //to delete ingredient from DB we are getting array of existing in ingredients..
          ingArr = ingArr.filter((item, index) => item[index] !== item[posID])
          usersDB.doc(profileID.value).collection('user_orders').doc('self_made_pizza').update({
            ingredients: ingArr //...and updating DB with new array of ingredients
          }).then(() => {
            getList();
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

const search = document.querySelector('#search');

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterIngredients(term);
});
