import { menu, pizzas } from './PizzasMenu'
import { usersDB } from './AuthMain'


menu.addEventListener('click', e => {
  if(e.target.tagName ==="I"){
    const profileID = document.querySelector('#profile_id')
    const posID = e.target.parentElement.parentElement.parentElement.getAttribute('pizza-id');
    console.log(posID)
    pizzas.doc(posID)
          .get()
          .then((pizza) => {
           usersDB.doc(profileID.value).get().then(user => {
            let oldarr = user.data().shopping_cart
            let newarr = pizza.data().title + ', ' + pizza.data().price
            oldarr.push(newarr);
            console.log(oldarr);
            usersDB.doc(profileID.value).update({
                shopping_cart: oldarr
              }).then(() => {
                console.log('stuff added')
              })
           })
          
          }).catch(err => {
            console.log(err.message);
          });

  }
})