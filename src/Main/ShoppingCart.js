import { menu, pizzas } from './PizzasMenu'
import { usersDB } from './AuthMain'


const ordersDB = db.collection('orders');

const shopping_cart_table = document.querySelector('#shopping_cart_table');
const shopping_cart_list = document.querySelector('#shopping_cart_list');
const shopping_cart_count = document.querySelector('.badge');
const profileID = document.querySelector('#profile_id'); //this element value is logged user id, to match with document id from userDB
//userDBRef = db.collection('users').doc(profileID.value);

//
//--renderning shopping cart content in the modal
function get_shopping_cart(user_id){
  usersDB.doc(user_id).onSnapshot((doc) => {
      render_shopping_cart(doc);
  });
}

const total_cost = document.querySelector('#total_cost');
const checkout = document.querySelector('#checkout');

function render_shopping_cart(doc){

  let prices = [];
  let pos = 0; //giving each list item an ID that correspondes with position of this item in array and itereting it in for each loop
  shopping_cart_list.innerHTML = ''; //clearing fields for live update. Without it newly generated list will be added to the existing one

  if(doc.get('shopping_cart') == null){   
    shopping_cart_table.style.display = 'none';
  }else{
      checkout.classList.remove('hidden');
      shopping_cart_count.textContent = doc.data().shopping_cart.length; //display how much items we have in the shopping cart
      shopping_cart_table.style.display = 'table';
      doc.data().shopping_cart.forEach(item => {

        let title_price = item.split(', ') //splitting array item to have seperate variables for the title and price
    
        let html =  `
        <tr position-id="${pos}">
          <td>${title_price[0]}</td>
          <td>${title_price[1]}</td>
          <td><i class="material-icons delete red-text darken-1-text">delete</i></td>
        </tr>
        `;
        pos++; 
        prices.push(parseInt(title_price[1])) //pushing cost of each ingredient into array
        //total_cost.textContent = 'Total: ' + prices.reduce((a, b) => a + b, 0) + ' $'; //calculating sum of all ordered ingredients
        shopping_cart_list.innerHTML += html;
      });
      total_cost.textContent = 'Total: ' + prices.reduce((a, b) => a + b, 0) + ' $'; 
      //changing intarface if shopping car is empty
      if(doc.data().shopping_cart.length == 0){
        checkout.classList.add('hidden');
        total_cost.textContent = 'Your shopping cart is empty';
        shopping_cart_table.style.display = 'none';
      }
    }
}

//
//--add new item to the shopping cart DB
menu.addEventListener('click', e => {
  if(e.target.tagName ==="I"){
    const posID = e.target.parentElement.parentElement.parentElement.getAttribute('pizza-id'); //clicked item id
    db.runTransaction((transaction) => {
      return transaction.get(usersDB.doc(profileID.value))
      .then((user) => {
        return transaction.get(pizzas.doc(posID))
        .then((pizza) => {
          let shopping_cart = user.data().shopping_cart; //extracted array with a list of items already in shopping cart
          let new_item = pizza.data().title + ', ' + pizza.data().price; //new string with a title and price
          shopping_cart.push(new_item); //adding new string to the array
          transaction.update(usersDB.doc(profileID.value), {shopping_cart: shopping_cart}); //inserting a new array back to the DB
        }).then(() => {
            console.log('item have been added')
          }).catch(err => {
            console.log(err.message);
          });
        })
    })
  }
})

//
//--deleting item from the shopping cart
shopping_cart_list.addEventListener('click', e => {
  if(e.target.tagName === 'I'){
    const posID = e.target.parentElement.parentElement.getAttribute('position-id');
    db.runTransaction(transaction => {
      return transaction.get(usersDB.doc(profileID.value))
      .then(user => {
        let shopping_cart_list = user.data().shopping_cart;
        shopping_cart_list = shopping_cart_list.filter((item, index)=> item[index] !== item[posID]);
        //shopping_cart_list.splice(shopping_cart_list.indexOf(shopping_cart_list[posID]), 1);
        transaction.update(usersDB.doc(profileID.value), {shopping_cart: shopping_cart_list});
      }).then(() => {
        get_shopping_cart(profileID.value);
      }).catch(err => {
        console.log(err.message);
      })
      })
  }
})

//
//--submiting the users order and addint it to his order history
checkout.addEventListener('click', e => {
  e.preventDefault();

  db.runTransaction(transaction => {
    return transaction.get(usersDB.doc(profileID.value))
    .then(user => {
      const date = new Date();
      let prices = [];
      user.data().shopping_cart.forEach(item => {
        let title_price = item.split(', ');
        prices.push(parseInt(title_price[1]));
      });
      transaction.set(usersDB.doc(profileID.value).collection('user_orders').doc(), {date: date, order: user.data().shopping_cart, total_cost: prices.reduce((a, b) => a + b, 0)});
      transaction.update(usersDB.doc(profileID.value), {shopping_cart: []});
      transaction.set(ordersDB.doc(), {user_id: profileID.value, order: user.data().shopping_cart, name: user.data().name, status: 'order-recived', date: date, total_cost: prices.reduce((a, b) => a + b, 0)});
    }).then(() => {
      get_shopping_cart(profileID.value);
      console.log('Thank you for your order');
    })
  })
})


export { shopping_cart_count, get_shopping_cart, profileID, ordersDB }
