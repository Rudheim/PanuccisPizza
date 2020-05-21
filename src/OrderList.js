
const id = 'wJ2UpqlTdMlI09yE68RO'

class UI {
  constructor(id){
    this.list = document.querySelector('#customer-list');
    this.orders = db.collection('orders').doc(id);
  }
  render(data){
      this.list.innerHTML = ""; //deleting all inside the list to put newly generated, otherwise it will stuck on each other

      data.ingredients.forEach((ingredient) => {
      
      let details = ingredient.split(', ')

      let li = document.createElement('a');
      let title = document.createElement('span');
      let price = document.createElement('span');

      title.textContent = details[0];
      price.textContent = parseInt(details[1]);

      li.appendChild(title).classList.add('title');
      li.appendChild(price).classList.add('secondary-content');
      //adding elements to the DOM
      this.list.appendChild(li).classList.add('collection-item');
    })
  }

  getList(){
    this.orders.onSnapshot((doc) => {
      this.render(doc.data());
    });
  }

  // getList(callback){
  //   this.orders.get().then((data) => {
  //     this.render(data.data());
  //   });
  //}
}

let ingUI = new UI(id);
ingUI.getList();