    let list = document.querySelector('#customer-list');
    let total = document.querySelector('#total');
    let orderBTN = document.querySelector('#order');

    let ordersDB = db.collection('orders')


function render(data){
  list.innerHTML = ""; //deleting all inside the list to put newly generated, otherwise it will stuck on each other

  let prices = [];
  let i = 0;

  data.ingredients.forEach((ingredient) => {
  
    let details = ingredient.split(', ')

    let li = document.createElement('a');
    let title = document.createElement('span');
    let price = document.createElement('span');

    li.setAttribute('position-id', i);
    i++;
    title.textContent = details[0];
    price.textContent = parseInt(details[1]);

    prices.push(parseInt(details[1]))

    li.appendChild(title).classList.add('title');
    li.appendChild(price).classList.add('secondary-content');
    //adding elements to the DOM
    list.appendChild(li).classList.add('collection-item');
    total.textContent = prices.reduce((a, b) => a + b, 0);
    orderBTN.classList.remove('hidden');
  })
}

function getList(id){
    ordersDB.doc(id).onSnapshot((doc) => {
      render(doc.data());
    });
  }

export { getList, ordersDB, list }