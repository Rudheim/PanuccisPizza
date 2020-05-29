//
//---Materialise init
const icons = document.querySelector('.hide-on-med-and-down');
icons.addEventListener('mouseover' , (e) =>{
  e.target.parentElement.classList.add('pulse');
});
icons.addEventListener('mouseout' , (e) =>{
  e.target.parentElement.classList.remove('pulse');
});

document.addEventListener('DOMContentLoaded', (e) => {
  var elem = document.querySelector('select');
  var instance = M.FormSelect.init(elem);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.scrollspy');
  var instances = M.ScrollSpy.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elem = document.querySelector('.sidenav');
  var instance = M.Sidenav.init(elem);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});