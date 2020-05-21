import { ing_list } from './IngList'
import { orderID } from './Create'
import { UI } from './OrderList'

ing_list.addEventListener('click', (e) => {
  if(e.target.nodeName !== 'UL'){
    let id = e.target.getAttribute('ingredient-id');

    db.collection('ingredients')
        .doc(id)
        .get()
        .then((ingredient) => {
          db.collection("orders").doc(orderID).update({
            ingredients: firebase.firestore.FieldValue.arrayUnion(ingredient.data().name + ', ' + ingredient.data().price)
          }).then(() => {
            let ingUI = new UI(orderID);
            ingUI.getList();
          })
      });

   
  }
});





