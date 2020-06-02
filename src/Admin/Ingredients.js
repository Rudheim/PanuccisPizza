import { ingDB } from '../Main/IngList'
import { closeForms } from '../Main/Materialize'

// 
//--get pizzas from DB and rendering it to the screen in table form
const list = document.querySelector('#ing_list');

const renderIngredients = (ingredient) => {
  let html = `
    <tr ingredient-id=${ingredient.id}>
      <td><i href="#modal_edit_ingredient" class="material-icons delete green-text darken-1-text modal-trigger">edit</i></td>
      <td>${ingredient.data().name}</td>
      <td>${ingredient.data().price}</td>
      <td><i class="material-icons delete red-text darken-1-text">delete</i></td>
    </tr>
  `
  list.innerHTML += html;
};

const getIngList = () => {
  ingDB.get()
       .then((snapshot) => {
          snapshot.docs.forEach(ingredient => {
            renderIngredients(ingredient)
          });
        });
};

//
//--Creating ingredient. Getting data from the input fields and adding them to a DB
const addform = document.querySelector('#addIngredientForm');

//adding text data to the db
addform.addEventListener('submit', (e)=> {
  e.preventDefault();

  ingDB.add({
    name: addform.ing_name.value,
    price: parseInt(addform.ing_price.value),
    description: addform.ing_description.value
  }).then(() => {
    const close = new closeForms('modal_create_ingredient', addform);
    close.modalClose();
  }).catch(err => {
    console.log(err.message);
  });
});

//
//--editing existing pizza
const ingList = document.querySelector('#IngredientList');
const editform = document.querySelector('#editIngredientForm');

//getting data from db an inserting existed data into the form
ingList.addEventListener('click', e => {
  if(e.target.tagName === 'I' && e.target.textContent == 'edit'){
    const posID = e.target.parentElement.parentElement.getAttribute('ingredient-id');
    ingDB.doc(posID)
          .get()
          .then((ingredient) => {
      editform.disabled_ing.value = posID;
      editform.ing_name_edit.value = ingredient.data().name;
      editform.ing_price_edit.value = ingredient.data().price;
      editform.ing_description_edit.value = ingredient.data().description;
      M.updateTextFields();
      M.textareaAutoResize(editform.ing_description_edit);
    }).catch(err => {
      console.log(err.message);
    });
  }
});

//submiting editied data into the db
editform.addEventListener('submit', (e)=> {
  e.preventDefault();

  const posID = editform.disabled_ing.value;
  ingDB.doc(posID).set({
    name: editform.ing_name_edit.value,
    price: parseInt(editform.ing_price_edit.value),
    description: editform.ing_description_edit.value
  }).then(() => {
    const close = new closeForms('modal_edit_ingredient', editform);
    close.modalClose();
  }).catch(err => {
    console.log(err.message);
  });
});

//
//--Deleting pizza from DB
ingList.addEventListener('click', e => {
  if(e.target.tagName === 'I' && e.target.textContent == 'delete'){
    const posID = e.target.parentElement.parentElement.getAttribute('ingredient-id');
    ingDB.doc(posID).delete().then(() => {
      location.reload();
    }).catch(error => {
        console.error("Error removing document: ", error);
    });
  }
})

export { getIngList }