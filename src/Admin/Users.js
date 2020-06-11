const usersDB = db.collection('users');

const user_list = document.querySelector('#user-list');

const getUsers = () => {
  usersDB.orderBy("name").onSnapshot((doc) => {
          doc.docs.forEach(user => {
            RenderUsers(user);
          });
         });
  };

const RenderUsers = (user) => {

  let html = `
    <tr user-id=${user.id}>
    <td>${user.data().name}</td>
    <td>${user.id}</td>
    </tr>
  `
  user_list.innerHTML += html;
}



export {getUsers}