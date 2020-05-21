const ing_list = document.querySelector('#ingredients-list');

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
  price.textContent = ingredient.data().price;

  //adding elements to the DOM
  li.appendChild(name).classList.add('title');
  li.appendChild(price).classList.add('secondary-content');
  li.appendChild(description);

  ing_list.appendChild(li).classList.add('collection-item')
}

//getting data from db
const getIng = () => {
  db.collection('ingredients').orderBy('name').get().then((snapshot) => {
    snapshot.docs.forEach(ingredient => {
      renderIngredients(ingredient)
    });
  });
};

export {ing_list, getIng}