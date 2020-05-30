!function(e){var t={};function n(d){if(t[d])return t[d].exports;var a=t[d]={i:d,l:!1,exports:{}};return e[d].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,d){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:d})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var d=Object.create(null);if(n.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(d,a,function(t){return e[t]}.bind(null,a));return d},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return a}));var d=document.querySelector("#menu"),a=db.collection("pizzas");var r=function(){a.get().then((function(e){e.docs.forEach((function(e){!function(e){var t=document.createElement("div"),n=document.createElement("div"),a=document.createElement("div"),r=document.createElement("img"),i=document.createElement("div"),c=document.createElement("span"),o=document.createElement("card-reveal"),l=document.createElement("span"),s=document.createElement("p"),u=document.createElement("i"),m=document.createElement("p"),p=document.createElement("div");n.setAttribute("pizza-id",e.id),r.src=e.data().img,c.textContent=e.data().title,s.textContent=e.data().description,u.innerText="close",m.innerText=e.data().price+" $",a.appendChild(r).classList.add("activator"),n.appendChild(a).classList.add("card-image","waves-effect","waves-block","waves-light"),t.appendChild(n).classList.add("card"),i.appendChild(c).classList.add("card-title","activator","grey-text","text-darken-4"),p.appendChild(m).classList.add("right-align"),l.appendChild(u).classList.add("material-icons","right"),l.innerHTML+=e.data().title,o.appendChild(l).classList.add("card-title","grey-text","text-darken-4"),o.appendChild(s),n.appendChild(i).classList.add("card-content"),n.appendChild(o).classList.add("card-reveal"),n.appendChild(p).classList.add("card-action"),d.appendChild(t).classList.add("col","s12","m6","l3")}(e)}))}))}},function(e,t){var n=document.querySelector(".hide-on-med-and-down");n.addEventListener("mouseover",(function(e){e.target.parentElement.classList.add("pulse")})),n.addEventListener("mouseout",(function(e){e.target.parentElement.classList.remove("pulse")})),document.addEventListener("DOMContentLoaded",(function(e){var t=document.querySelector("select");M.FormSelect.init(t)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".scrollspy");M.ScrollSpy.init(e)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".sidenav");M.Sidenav.init(e)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".parallax");M.Parallax.init(e)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".modal");M.Modal.init(e)}))},function(e,t,n){"use strict";n.r(t);var d=document.querySelector("#ingredients-list"),a=db.collection("ingredients");var r=function(){a.get().then((function(e){e.docs.forEach((function(e){!function(e){var t=document.createElement("a"),n=document.createElement("span"),a=document.createElement("p"),r=document.createElement("span");t.setAttribute("ingredient-id",e.id),n.textContent=e.data().name,a.textContent=e.data().description,r.textContent=e.data().price+"$",t.appendChild(n).classList.add("title","black-text"),t.appendChild(r).classList.add("secondary-content","black-text"),t.appendChild(a).classList.add("grey-text","text-darken-1"),d.appendChild(t).classList.add("collection-item")}(e)}))}))},i=document.querySelector("#customer-list"),c=document.querySelector("#total"),o=document.querySelector("#order"),l=db.collection("orders");function s(e){l.doc(e).onSnapshot((function(e){!function(e){i.innerHTML="";var t=[],n=0;0===e.ingredients.length&&(c.textContent="",o.classList.add("hidden")),e.ingredients.forEach((function(e){var d=e.split(", "),a=document.createElement("a"),r=document.createElement("span"),l=document.createElement("span"),s=document.createElement("i");a.setAttribute("position-id",n),n++,r.textContent=d[0],l.textContent=parseInt(d[1])+"$",s.innerText="delete",t.push(parseInt(d[1])),a.appendChild(s).classList.add("material-icons","delete","red-text","darken-1-text"),a.appendChild(r).classList.add("title","black-text"),a.appendChild(l).classList.add("secondary-content","black-text"),i.appendChild(a).classList.add("collection-item"),c.textContent=t.reduce((function(e,t){return e+t}),0)+"$",o.classList.remove("hidden"),i.classList.remove("hidden")}))}(e.data())}))}var u=n(0),m=(n(1),""),p=document.querySelector("#create"),f=document.querySelector("#name"),v=document.querySelector("#search"),h=document.querySelector("#create_pizza"),L=document.querySelector("select");Object(u.a)(),p.addEventListener("submit",(function(e){e.preventDefault(),r(),h.classList.remove("hidden"),p.classList.add("hidden");var t=new Date;l.add({created_at:firebase.firestore.Timestamp.fromDate(t),name:f.value,size:L.value,ingredients:""}).then((function(e){m=e.id})).catch((function(e){console.error("Error adding document: ",e)}))})),d.addEventListener("click",(function(e){if("UL"!==e.target.nodeName){var t=e.target.getAttribute("ingredient-id");a.doc(t).get().then((function(e){l.doc(m).update({ingredients:firebase.firestore.FieldValue.arrayUnion(e.data().name+", "+e.data().price)}).then((function(){s(m)}))}))}})),i.addEventListener("click",(function(e){if("I"===e.target.tagName){var t=e.target.parentElement.getAttribute("position-id");l.doc(m).get().then((function(e){var n=e.data().ingredients;n.splice(n.indexOf(n[t]),1),l.doc(m).update({ingredients:n}).then((function(){s(m)}))}))}}));v.addEventListener("keyup",(function(){!function(e){Array.from(d.children).filter((function(t){return!t.textContent.toLowerCase().includes(e)})).forEach((function(e){return e.classList.add("hidden")})),Array.from(d.children).filter((function(t){return t.textContent.toLowerCase().includes(e)})).forEach((function(e){return e.classList.remove("hidden")}))}(v.value.trim().toLowerCase())}))}]);