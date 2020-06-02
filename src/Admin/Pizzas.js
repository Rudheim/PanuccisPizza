import { pizzas } from '../Main/PizzasMenu'
import { closeForms } from '../Main/Materialize'

// 
//--get pizzas from DB and rendering it to the screen in table form
const list = document.querySelector('#pizza-list');

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
        <td><i href="#modal_edit" class="material-icons delete green-text darken-1-text modal-trigger">edit</i></td>
        <td>${pizza.data().title}</td>
        <td>${pizza.data().price}</td>
        <td><i class="material-icons delete red-text darken-1-text">delete</i></td>
      </tr>
    `
    list.innerHTML += html;
}

//
//function to upload image to the storage. Need to pass id of the input field with file location in string! format and id of the img tag to render uploaded image
const uploading = (input, output) => {
  const file = document.querySelector(`#${input}`).files[0];
  if(file){
    const name = Math.floor(Math.random() * 999) + file.name;
    const metadata = {
      contentType:file.type
    }
    storage.ref().child(name).put(file, metadata)
    .then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        output.src = url;
      })
    }).catch(err => console.log(err.message))
  } else {
    console.log('You need to choose a file first')
  }
}

//
//--Creating pizza. Getting data from the input fields and adding them to a DB
const addform = document.querySelector('#addPizza');
const uploadbtn = document.querySelector('#upload-btn');
const img = document.querySelector('#img-create');

//uploading img to the storage
uploadbtn.addEventListener('click', e => {
  e.preventDefault();
  uploading('file-create', img);
});

//adding text data to the db
addform.addEventListener('submit', (e)=> {
  e.preventDefault();

  pizzas.add({
    title: addform.title.value,
    price: parseInt(addform.price.value),
    vegan: boolcheck(addform.vegan.value),
    img: img.src,
    description: addform.description.value
  }).then(() => {
    const close = new closeForms('modal_create', addform);
    close.modalClose();
  }).catch(err => {
    console.log(err.message);
  })
})

//
//--editing existing pizza
const pizzaList = document.querySelector('#pizzaList')
const editform = document.querySelector('#editPizza');
const imgEdit = document.querySelector('#img-edit');

//getting data from db an inserting existed data into the form
pizzaList.addEventListener('click', e => {
  if(e.target.tagName === 'I' && e.target.textContent == 'edit'){
    const posID = e.target.parentElement.parentElement.getAttribute('pizza-id');
    pizzas.doc(posID)
          .get()
          .then((pizza) => {
      editform['disabled'].value = posID;
      editform['edit-title'].value = pizza.data().title;
      editform['edit-price'].value = pizza.data().price;
      editform['vegan-edit'].value = pizza.data().vegan;
      editform['edit-description'].value = pizza.data().description;
      imgEdit.src = pizza.data().img;
      M.updateTextFields();
      M.textareaAutoResize(editform['edit-description']);
    }).catch(err => {
      console.log(err.message);
    });
  }
})

const uploadbtnEdit = document.querySelector('#upload-btn-edit');

//uploading img to the storage
uploadbtnEdit.addEventListener('click', e => {
  e.preventDefault();
  uploading('file-edit', imgEdit);
});

//submiting editied data into the db
editform.addEventListener('submit', (e)=> {
  e.preventDefault();

  const posID = editform['disabled'].value;
  pizzas.doc(posID).set({
    title: editform['edit-title'].value,
    price: parseInt(editform['edit-price'].value),
    vegan: boolcheck(editform['vegan-edit'].value),
    img: imgEdit.src,
    description: editform['edit-description'].value
  }).then(() => {
    const close = new closeForms('modal_edit', editform);
    close.modalClose();
  }).catch(err => {
    console.log(err.message);
  })
})

//
//--Deleting pizza from DB
pizzaList.addEventListener('click', e => {
  if(e.target.tagName === 'I' && e.target.textContent == 'delete'){
    const posID = e.target.parentElement.parentElement.getAttribute('pizza-id');
    pizzas.doc(posID).delete().then(() => {
      location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
})

//
//firebase getting true and false as a string, this func transforms string into the boolean.
const boolcheck = (checkVal) => {
  if(checkVal == 'true'){
    return true
  } else {
    return false
  }
}

export { getPizzas, list}