import { pulse } from "./Materialize";

const menu = document.querySelector('#menu');
const pizzas = db.collection('pizzas');

function renderMenu(pizza){

  let html = ` 
  <div class="col s12 m6 l3">
    <div pizza-id="#${pizza.id}" class="card" style="overflow: hidden;">
      <div class="card-image">
        <img src="${pizza.data().img}" class="activator">
        <a class="halfway-fab btn-floating btn green"><i class="icons material-icons basket">shopping_basket</i></a>
      </div>
    <div class="card-content">
      <p class=" center card-title activator grey-text text-darken-4">${pizza.data().title}</p>
    </div>
    <card-reveal class="card-reveal">
      <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>${pizza.data().title}</span>
      <p>${pizza.data().description}</p>
    </card-reveal>
    <div class="card-action">
      <p class="center-align">${pizza.data().price} $</p>
    </div>
    </div>
  </div>
  `
  menu.innerHTML += html;
  
}

const getPizzas = () => {
  pizzas.get()
       .then((snapshot) => {
          snapshot.docs.forEach(pizza => {
            renderMenu(pizza);
            pulse();
          });
        });
};

export {getPizzas, pizzas}