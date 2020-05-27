let list = document.querySelector('#customer-list');
let total = document.querySelector('#total');
let orderBTN = document.querySelector('#order');

let ordersDB = db.collection('orders')


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

    let li = document.createElement('a');
    let title = document.createElement('span');
    let price = document.createElement('span');
    let i = document.createElement('i');

    li.setAttribute('position-id', pos); //giving each ingredient custom id that corresponds to the positon of the ingredient in the array in DB
    pos++;
  
    title.textContent = details[0];
    price.textContent = parseInt(details[1]) + '$'; //converting string into a number to count total cost of the order
    i.innerText = 'delete';

    prices.push(parseInt(details[1])) //pushing cost of each ingredient into array

    li.appendChild(i).classList.add('material-icons', 'delete', 'red-text', 'darken-1-text');
    li.appendChild(title).classList.add('title', 'black-text');
    li.appendChild(price).classList.add('secondary-content', 'black-text');
   
    list.appendChild(li).classList.add('collection-item');
    
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

export { getList, ordersDB, list, total }