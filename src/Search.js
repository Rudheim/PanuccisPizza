import { ing_list } from './IngList'

const search = document.querySelector('#search');

//filtering list of ingredients
const filterIngredients = (term) => {
  Array.from(ing_list.children)
      .filter((ingredient) => !ingredient.textContent.toLowerCase().includes(term))
      .forEach((ingredient) => ingredient.classList.add('filtered'));

  Array.from(ing_list.children)
      .filter((ingredient) => ingredient.textContent.toLowerCase().includes(term))
      .forEach((ingredient) => ingredient.classList.remove('filtered'));
};

//key up event....when we typing some thing in search field
search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterIngredients(term);
});