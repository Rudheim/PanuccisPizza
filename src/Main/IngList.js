const ing_list = document.querySelector('#ingredients-list');
const ingDB = db.collection('ingredients');

function renderIngredients(ingredient){
  
  //create element for each ingredient
  let li = document.createElement('a');
  let name = document.createElement('span');
  let description = document.createElement('p');
  let price = document.createElement('span');

  // giving for each created element attributed, values etc.
  li.setAttribute('ingredient-id', ingredient.id);
  name.textContent = ingredient.data().name;
  description.textContent = ingredient.data().description;
  price.textContent = ingredient.data().price + '$';

  //adding elements to the DOM
  li.appendChild(name).classList.add('title', 'black-text');
  li.appendChild(price).classList.add('secondary-content', 'black-text');
  li.appendChild(description).classList.add('grey-text', 'text-darken-1');

  ing_list.appendChild(li).classList.add('collection-item')
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

export {ing_list, getIng, ingDB}