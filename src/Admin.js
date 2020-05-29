import './Materialize'
import './Auth'

import { pizzas } from './Menu'


// 
//--get pizzas from DB and rendering it to the screen in table form
const list = document.querySelector('tbody')

const getPizzas = () => {
pizzas.get()
      .then((snapshot) => {
        list.innerHTML = '';
        snapshot.docs.forEach(pizza => {
          RenderPizzas(pizza);
        });
       });
};

const RenderPizzas = (pizza) => {
    let html = `
      <tr pizza-id=${pizza.id}>
        <td>${pizza.data().title}</td>
        <td>${pizza.data().price}</td>
        <td>${pizza.data().vegan}</td>
        <td>${pizza.data().img}</td>
        <td>${pizza.data().description}</td>
        <td><i class="material-icons delete red-text darken-1-text">delete</i></td>
      </tr>
    `
    list.innerHTML += html;
}

//
//--getting data from input fields and adding them to a DB
const form = document.querySelector('#addPizza');

form.addEventListener('submit', (e)=> {
  e.preventDefault();

  db.collection('pizzas').add({
    title: form.title.value,
    price: parseInt(form.price.value),
    vegan: Boolean(form.vegan.value),
    img: form.img.value,
    description: form.description.value
  }).then(() => {
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    form.reset();
  }).catch(err => {
    console.log(err.message);
  })
})

//
//--Deleting pizza from DB
const pizzaList = document.querySelector('#pizzaList')
pizzaList.addEventListener('click', e => {
  if(e.target.tagName === 'I'){
    const posID = e.target.parentElement.parentElement.getAttribute('pizza-id');
    pizzas.doc(posID).delete().then(function() {
      console.log("Pizza successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
})

//
//--changing UI acording to type of person logged in
const loggedOutElem = document.querySelectorAll('.logged-out');
const loggedInElem = document.querySelectorAll('.logged-in')
const setupUI = (loggedUser) => {
  if(loggedUser){
    loggedInElem.forEach(elem => elem.style.display = 'block');
    loggedOutElem.forEach(elem => elem.style.display = 'none');
  } else {
    list.innerHTML = '';
    loggedInElem.forEach(elem => elem.style.display = '');
    loggedOutElem.forEach(elem => elem.style.display = 'block');
  }
}


export { getPizzas, setupUI}