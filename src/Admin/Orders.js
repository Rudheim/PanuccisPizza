import { format, formatDistanceToNow } from 'date-fns'

const ordersDB = db.collection('orders');

// 
//--get orders from DB and rendering it to the screen in table form
const order_list = document.querySelector('#order_list');

const getOrders = () => {
  ordersDB.orderBy("date", "desc").onSnapshot((doc) => {
          order_list.innerHTML = '';
          doc.docs.forEach(order => {
            RenderOrders(order);
          });
         });
  };

  const RenderOrders = (order) => {

    let pizzas = [];
    let custom_pizzas = [];

    let order_details = order.data().order;
    order_details.forEach(detail => {
    (detail.includes("Custom") ? custom_pizzas : pizzas).push(detail)
    })

    const when = formatDistanceToNow(order.data().date.toDate(), {addSuffix: true});
    const exact_time = format(order.data().date.toDate(), "dd/mm/yyyy hh:mm:ss");
    let text_style = 'light-blue-text text-accent-3';
    let btn_style = 'blue';
    if(order.data().status == "order-completed"){
      text_style = 'green-text text-darken-3';
      btn_style = 'green';
    }
    let html = `
    <li order-id=${order.id}>
    <div class="collapsible-header">
      <span>${when}</span>
      <a class="right btn-floating btn-small waves-effect waves-light ${btn_style}"><i class="material-icons">check</i></a>
      <span class="right ${text_style}">${order.data().status}</span>
    </div>
      <div class="collapsible-body">
      <p class="grey-text">UserID: ${order.data().user_id}</p>
      <p>Exact time: ${exact_time}</p>
      <p class="bold_font">Name: ${order.data().name}</p>
      <p class="green-text bold_font underline">Total cost: ${order.data().total_cost} $</p>
      <p class="orange-text">Pizzas:</p>
      <ul>
      ${pizzas.map(pizza => { return "<li> -" + pizza + "</li>"}).join("")}
      </ul>
      <p class="orange-text text-darken-4">Custom pizzas:</p>
      <ul>
      ${custom_pizzas.map(custom_pizza => { return "<li> -" + custom_pizza + "</li>"}).join("")}
      </ul>
      </div>
    </li>
    `
    order_list.innerHTML += html;
}

order_list.addEventListener('click', e => {
  if(e.target.tagName === 'I' && e.target.parentElement.classList.contains('blue')){
    const posID = e.target.parentElement.parentElement.parentElement.getAttribute('order-id');
    ordersDB.doc(posID).update({
      status: 'order-completed'
    }).then(()=>{
      getOrders();
      console.log('order ' + posID + ' completed')
    }).catch(err => console.log(err.message))
  }
})

export { getOrders }