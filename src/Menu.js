const menu = document.querySelector('#menu');
const pizzas = db.collection('pizzas');

function renderMenu(pizza){

  let col = document.createElement('div');
  let card = document.createElement('div');
  let card_img = document.createElement('div');
  let img = document.createElement('img');
  let card_content = document.createElement('div');
  let card_title = document.createElement('span');
  let card_reveal = document.createElement('card-reveal');
  let card_title_reveal = document.createElement('span');
  let p = document.createElement('p');
  let i = document.createElement('i');
  let price = document.createElement('p');
  let action_card = document.createElement('div');

  card.setAttribute('pizza-id', pizza.id);
  img.src = pizza.data().img;
  card_title.textContent = pizza.data().title;
  p.textContent = pizza.data().description;
  i.innerText = 'close';
  price.innerText = pizza.data().price + " $";

  card_img.appendChild(img).classList.add('activator');
  card.appendChild(card_img).classList.add('card-image', 'waves-effect', 'waves-block', 'waves-light');
  col.appendChild(card).classList.add('card');
  card_content.appendChild(card_title).classList.add('card-title', 'activator', 'grey-text', 'text-darken-4');
  action_card.appendChild(price).classList.add('right-align');
  card_title_reveal.appendChild(i).classList.add('material-icons', 'right');
  card_title_reveal.innerHTML += pizza.data().title;
  card_reveal.appendChild(card_title_reveal).classList.add('card-title', 'grey-text', 'text-darken-4');
  card_reveal.appendChild(p);
  card.appendChild(card_content).classList.add('card-content');
  card.appendChild(card_reveal).classList.add('card-reveal');
  card.appendChild(action_card).classList.add('card-action');

  menu.appendChild(col).classList.add('col', 's12', 'm6', 'l3');
}

const getPizzas = () => {
  pizzas.get()
       .then((snapshot) => {
          snapshot.docs.forEach(pizza => {
            renderMenu(pizza)
          });
        });
};

export {getPizzas}