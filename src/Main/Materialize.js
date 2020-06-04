//
//close modals after submiting the form, clearing the fields and refreshing the page. Need to pass modal id in a string! format and id of the form to close
function modalClose(modalID, formSelector){
  const modal = document.querySelector(`#${modalID}`);
  const form = formSelector;
  M.Modal.getInstance(modal).close();
  form.reset();
}

//
//addind materialze pulse effect to the incons on hover
const pulse = () => {
  const icons = document.querySelectorAll('.icons');
  icons.forEach(icon => {
    icon.addEventListener('mouseover' , (e) =>{
      e.target.parentElement.classList.add('pulse');
    });
    icon.addEventListener('mouseout' , (e) =>{
      e.target.parentElement.classList.remove('pulse');
    });
  })
}

//
//--updating inputfield after dynamicly inserting text
function updateInputFields(formname){
  M.updateTextFields();
  M.textareaAutoResize(formname);
}

//
//---Materialise init
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

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tabs');
  var instance = M.Tabs.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var dropdownOptions = {
    'closeOnClick': true,
    'hover':true,
    coverTrigger: false,
}
  var instances = M.Dropdown.init(elems, dropdownOptions);
});

export { modalClose, pulse, updateInputFields }