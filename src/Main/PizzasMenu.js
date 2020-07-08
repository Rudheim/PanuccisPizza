import { pulse } from "./Materialize";

const pizzas = db.collection('pizzas');

const menu = document.querySelector('#menu');


function renderMenu(pizza){

  const vegan = pizza.data().vegan ? ('green lighten-1') : ('orange lighten-1');

  let html = ` 
  <div class="col s12 m6 l3">
    <div pizza-id="${pizza.id}" class="card" style="overflow: hidden;">
      <div class="card-image">
        <img src="${pizza.data().img}" class="activator">
        <a class="halfway-fab btn-floating btn green"><i class="icons material-icons">shopping_basket</i></a>
      </div>
    <div class="card-content">
      <p class=" center card-title activator grey-text text-darken-4">${pizza.data().title}</p>
    </div>
    <card-reveal class="card-reveal">
      <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>${pizza.data().title}</span>
      <p>${pizza.data().description}</p>
    </card-reveal>
    <div class="card-action ${vegan}">
      <p class="center-align">${pizza.data().price} NOK</p>
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

export {getPizzas, pizzas, menu}