import {ing_list, getIng} from './IngList'

let orderID = '';

const create = document.querySelector('#create');
const name = document.querySelector('#name');

create.addEventListener('submit', (e) => {
  e.preventDefault();

  getIng();

  const now = new Date();

  db.collection("orders").add({
    created_at: firebase.firestore.Timestamp.fromDate(now),
    name: name.value,
    ingredients: ''
  }).then((order) => {
      orderID = order.id;
  })
    .catch(function(error) {
    console.error("Error adding document: ", error);
  });
})

export { orderID }