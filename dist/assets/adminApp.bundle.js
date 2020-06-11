!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";function a(e,t){var n=document.querySelector("#".concat(e)),a=t;M.Modal.getInstance(n).close(),a.reset()}n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i}));var r=function(){document.querySelectorAll(".icons").forEach((function(e){e.addEventListener("mouseover",(function(e){e.target.parentElement.classList.add("pulse")})),e.addEventListener("mouseout",(function(e){e.target.parentElement.classList.remove("pulse")}))}))};function i(e){M.updateTextFields(),M.textareaAutoResize(e)}document.addEventListener("DOMContentLoaded",(function(e){var t=document.querySelector("select");M.FormSelect.init(t)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".scrollspy");M.ScrollSpy.init(e)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".sidenav");M.Sidenav.init(e)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".parallax");M.Parallax.init(e)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".modal");M.Modal.init(e)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".tabs");M.Tabs.init(e)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".dropdown-trigger");M.Dropdown.init(e,{closeOnClick:!0,hover:!0,coverTrigger:!1})})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".collapsible");M.Collapsible.init(e)}))},function(e,t,n){"use strict";n.r(t),n.d(t,"setupUI",(function(){return Ue}));var a=n(0),r=db.collection("users");auth.onAuthStateChanged((function(e){e&&e.getIdTokenResult().then((function(t){e.admin=t.claims.admin,r.doc(e.uid).get().then((function(t){Ue(e,t)}))}))}));var i=document.querySelector("#signup-form");i.addEventListener("submit",(function(e){e.preventDefault();var t=i["signup-email"].value,n=i["signup-password"].value;auth.createUserWithEmailAndPassword(t,n).then((function(e){return r.doc(e.user.uid).set({name:i.nickname.value})})).then((function(){Object(a.a)("modal-signup",i)})).catch((function(e){return console.log(e.message)}))}));var o=document.querySelector("#login-form");o.addEventListener("submit",(function(e){e.preventDefault();var t=o["login-email"].value,n=o["login-password"].value;auth.signInWithEmailAndPassword(t,n).then((function(e){Object(a.a)("modal-login",o)})).catch((function(e){return console.log(e.message)}))})),document.querySelector("#logout").addEventListener("click",(function(e){e.preventDefault(),auth.signOut().then((function(){location.reload()}))}));var u=document.querySelector(".admin-actions");u.addEventListener("submit",(function(e){e.preventDefault();var t=document.querySelector("#admin-email").value;functions.httpsCallable("addAdminRole")({email:t}).then((function(e){console.log(e)})),Object(a.a)("modal-account",u)}));var c=db.collection("pizzas"),s=document.querySelector("#pizza-list"),d=function(e){var t="\n      <tr pizza-id=".concat(e.id,'>\n        <td><i href="#modal_edit" class="material-icons delete green-text darken-1-text modal-trigger">edit</i></td>\n        <td>').concat(e.data().title,"</td>\n        <td>").concat(e.data().price,'</td>\n        <td><i class="material-icons delete red-text darken-1-text">delete</i></td>\n      </tr>\n    ');s.innerHTML+=t},l=function(e,t){var n=document.querySelector("#".concat(e)).files[0];if(n){var a=Math.floor(999*Math.random())+n.name,r={contentType:n.type};storage.ref().child(a).put(n,r).then((function(e){e.ref.getDownloadURL().then((function(e){t.src=e}))})).catch((function(e){return console.log(e.message)}))}else console.log("You need to choose a file first")},f=document.querySelector("#addPizza"),m=document.querySelector("#upload-btn"),h=document.querySelector("#img-create");m.addEventListener("click",(function(e){e.preventDefault(),l("file-create",h)})),f.addEventListener("submit",(function(e){e.preventDefault(),c.add({title:f.title.value,price:parseInt(f.price.value),vegan:w(f.vegan.value),img:h.src,description:f.description.value}).then((function(){Object(a.a)("modal_create",f)})).catch((function(e){console.log(e.message)}))}));var g=document.querySelector("#pizzaList"),v=document.querySelector("#editPizza"),p=document.querySelector("#img-edit");g.addEventListener("click",(function(e){if("I"===e.target.tagName&&"edit"==e.target.textContent){var t=e.target.parentElement.parentElement.getAttribute("pizza-id");c.doc(t).get().then((function(e){v.disabled.value=t,v["edit-title"].value=e.data().title,v["edit-price"].value=e.data().price,v["vegan-edit"].value=e.data().vegan,v["edit-description"].value=e.data().description,p.src=e.data().img,Object(a.c)(v["edit-description"])})).catch((function(e){console.log(e.message)}))}})),document.querySelector("#upload-btn-edit").addEventListener("click",(function(e){e.preventDefault(),l("file-edit",p)})),v.addEventListener("submit",(function(e){e.preventDefault();var t=v.disabled.value;c.doc(t).set({title:v["edit-title"].value,price:parseInt(v["edit-price"].value),vegan:w(v["vegan-edit"].value),img:p.src,description:v["edit-description"].value}).then((function(){Object(a.a)("modal_edit",v)})).catch((function(e){console.log(e.message)}))})),g.addEventListener("click",(function(e){if("I"===e.target.tagName&&"delete"==e.target.textContent){var t=e.target.parentElement.parentElement.getAttribute("pizza-id");c.doc(t).delete().then((function(){console.log("item deleted")})).catch((function(e){console.error("Error removing document: ",e)}))}}));var w=function(e){return"true"==e},b=db.collection("ingredients"),y=document.querySelector("#ing_list"),T=function(e){var t="\n    <tr ingredient-id=".concat(e.id,'>\n      <td><i href="#modal_edit_ingredient" class="material-icons delete green-text darken-1-text modal-trigger">edit</i></td>\n      <td>').concat(e.data().name,"</td>\n      <td>").concat(e.data().price,'</td>\n      <td><i class="material-icons delete red-text darken-1-text">delete</i></td>\n    </tr>\n  ');y.innerHTML+=t},D=document.querySelector("#addIngredientForm");D.addEventListener("submit",(function(e){e.preventDefault(),b.add({name:D.ing_name.value,price:parseInt(D.ing_price.value),description:D.ing_description.value}).then((function(){Object(a.a)("modal_create_ingredient",D)})).catch((function(e){console.log(e.message)}))}));var x=document.querySelector("#IngredientList"),S=document.querySelector("#editIngredientForm");function C(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function E(e){C(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function k(e,t){C(2,arguments);var n=E(e),a=E(t),r=n.getTime()-a.getTime();return r<0?-1:r>0?1:r}function P(e,t){C(2,arguments);var n=E(e),a=E(t),r=n.getFullYear()-a.getFullYear(),i=n.getMonth()-a.getMonth();return 12*r+i}function q(e,t){C(2,arguments);var n=E(e),a=E(t),r=k(n,a),i=Math.abs(P(n,a));n.setMonth(n.getMonth()-r*i);var o=k(n,a)===-r,u=r*(i-o);return 0===u?0:u}function O(e,t){C(2,arguments);var n=E(e),a=E(t);return n.getTime()-a.getTime()}function L(e,t){C(2,arguments);var n=O(e,t)/1e3;return n>0?Math.floor(n):Math.ceil(n)}x.addEventListener("click",(function(e){if("I"===e.target.tagName&&"edit"==e.target.textContent){var t=e.target.parentElement.parentElement.getAttribute("ingredient-id");b.doc(t).get().then((function(e){S.disabled_ing.value=t,S.ing_name_edit.value=e.data().name,S.ing_price_edit.value=e.data().price,S.ing_description_edit.value=e.data().description,Object(a.c)(S.ing_description_edit)})).catch((function(e){console.log(e.message)}))}})),S.addEventListener("submit",(function(e){e.preventDefault();var t=S.disabled_ing.value;b.doc(t).set({name:S.ing_name_edit.value,price:parseInt(S.ing_price_edit.value),description:S.ing_description_edit.value}).then((function(){Object(a.a)("modal_edit_ingredient",S)})).catch((function(e){console.log(e.message)}))})),x.addEventListener("click",(function(e){if("I"===e.target.tagName&&"delete"==e.target.textContent){var t=e.target.parentElement.parentElement.getAttribute("ingredient-id");b.doc(t).delete().then((function(){console.log("item deleted")})).catch((function(e){console.error("Error removing document: ",e)}))}}));var U={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function _(e){return function(t){var n=t||{},a=n.width?String(n.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}var W={date:_({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:_({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:_({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},Y={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function z(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=r.width?String(r.width):i;a=e.formattingValues[o]||e.formattingValues[i]}else{var u=e.defaultWidth,c=r.width?String(r.width):e.defaultWidth;a=e.values[c]||e.values[u]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function N(e){return function(t,n){var a=String(t),r=n||{},i=r.width,o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],u=a.match(o);if(!u)return null;var c,s=u[0],d=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return c="[object Array]"===Object.prototype.toString.call(d)?function(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}(d,(function(e){return e.test(s)})):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}(d,(function(e){return e.test(s)})),c=e.valueCallback?e.valueCallback(c):c,{value:c=r.valueCallback?r.valueCallback(c):c,rest:a.slice(s.length)}}}var j,A={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof U[e]?U[e]:1===t?U[e].one:U[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:W,formatRelative:function(e,t,n,a){return Y[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:z({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:z({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:z({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:z({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:z({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(j={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),a=t||{},r=n.match(j.matchPattern);if(!r)return null;var i=r[0],o=n.match(j.parsePattern);if(!o)return null;var u=j.valueCallback?j.valueCallback(o[0]):o[0];return{value:u=a.valueCallback?a.valueCallback(u):u,rest:n.slice(i.length)}}),era:N({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:N({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:N({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:N({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:N({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function H(e){return function(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t=t||{})t.hasOwnProperty(n)&&(e[n]=t[n]);return e}({},e)}function I(e){return e.getTime()%6e4}function X(e){var t=new Date(e.getTime()),n=Math.ceil(t.getTimezoneOffset());return t.setSeconds(0,0),6e4*n+(n>0?(6e4+I(t))%6e4:I(t))}function F(e,t,n){C(2,arguments);var a=n||{},r=a.locale||A;if(!r.formatDistance)throw new RangeError("locale must contain formatDistance property");var i=k(e,t);if(isNaN(i))throw new RangeError("Invalid time value");var o,u,c=H(a);c.addSuffix=Boolean(a.addSuffix),c.comparison=i,i>0?(o=E(t),u=E(e)):(o=E(e),u=E(t));var s,d=L(u,o),l=(X(u)-X(o))/1e3,f=Math.round((d-l)/60);if(f<2)return a.includeSeconds?d<5?r.formatDistance("lessThanXSeconds",5,c):d<10?r.formatDistance("lessThanXSeconds",10,c):d<20?r.formatDistance("lessThanXSeconds",20,c):d<40?r.formatDistance("halfAMinute",null,c):d<60?r.formatDistance("lessThanXMinutes",1,c):r.formatDistance("xMinutes",1,c):0===f?r.formatDistance("lessThanXMinutes",1,c):r.formatDistance("xMinutes",f,c);if(f<45)return r.formatDistance("xMinutes",f,c);if(f<90)return r.formatDistance("aboutXHours",1,c);if(f<1440){var m=Math.round(f/60);return r.formatDistance("aboutXHours",m,c)}if(f<2520)return r.formatDistance("xDays",1,c);if(f<43200){var h=Math.round(f/1440);return r.formatDistance("xDays",h,c)}if(f<86400)return s=Math.round(f/43200),r.formatDistance("aboutXMonths",s,c);if((s=q(u,o))<12){var g=Math.round(f/43200);return r.formatDistance("xMonths",g,c)}var v=s%12,p=Math.floor(s/12);return v<3?r.formatDistance("aboutXYears",p,c):v<9?r.formatDistance("overXYears",p,c):r.formatDistance("almostXYears",p+1,c)}function Q(e){C(1,arguments);var t=E(e);return!isNaN(t)}function B(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function G(e,t){C(2,arguments);var n=E(e).getTime(),a=B(t);return new Date(n+a)}function R(e,t){C(2,arguments);var n=B(t);return G(e,-n)}function J(e,t){for(var n=e<0?"-":"",a=Math.abs(e).toString();a.length<t;)a="0"+a;return n+a}var V={y:function(e,t){var n=e.getUTCFullYear(),a=n>0?n:1-n;return J("yy"===t?a%100:a,t.length)},M:function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):J(n+1,2)},d:function(e,t){return J(e.getUTCDate(),t.length)},a:function(e,t){var n=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return n.toUpperCase();case"aaaaa":return n[0];case"aaaa":default:return"am"===n?"a.m.":"p.m."}},h:function(e,t){return J(e.getUTCHours()%12||12,t.length)},H:function(e,t){return J(e.getUTCHours(),t.length)},m:function(e,t){return J(e.getUTCMinutes(),t.length)},s:function(e,t){return J(e.getUTCSeconds(),t.length)},S:function(e,t){var n=t.length,a=e.getUTCMilliseconds();return J(Math.floor(a*Math.pow(10,n-3)),t.length)}};function $(e){C(1,arguments);var t=1,n=E(e),a=n.getUTCDay(),r=(a<t?7:0)+a-t;return n.setUTCDate(n.getUTCDate()-r),n.setUTCHours(0,0,0,0),n}function K(e){C(1,arguments);var t=E(e),n=t.getUTCFullYear(),a=new Date(0);a.setUTCFullYear(n+1,0,4),a.setUTCHours(0,0,0,0);var r=$(a),i=new Date(0);i.setUTCFullYear(n,0,4),i.setUTCHours(0,0,0,0);var o=$(i);return t.getTime()>=r.getTime()?n+1:t.getTime()>=o.getTime()?n:n-1}function Z(e){C(1,arguments);var t=K(e),n=new Date(0);n.setUTCFullYear(t,0,4),n.setUTCHours(0,0,0,0);var a=$(n);return a}function ee(e,t){C(1,arguments);var n=t||{},a=n.locale,r=a&&a.options&&a.options.weekStartsOn,i=null==r?0:B(r),o=null==n.weekStartsOn?i:B(n.weekStartsOn);if(!(o>=0&&o<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=E(e),c=u.getUTCDay(),s=(c<o?7:0)+c-o;return u.setUTCDate(u.getUTCDate()-s),u.setUTCHours(0,0,0,0),u}function te(e,t){C(1,arguments);var n=E(e,t),a=n.getUTCFullYear(),r=t||{},i=r.locale,o=i&&i.options&&i.options.firstWeekContainsDate,u=null==o?1:B(o),c=null==r.firstWeekContainsDate?u:B(r.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var s=new Date(0);s.setUTCFullYear(a+1,0,c),s.setUTCHours(0,0,0,0);var d=ee(s,t),l=new Date(0);l.setUTCFullYear(a,0,c),l.setUTCHours(0,0,0,0);var f=ee(l,t);return n.getTime()>=d.getTime()?a+1:n.getTime()>=f.getTime()?a:a-1}function ne(e,t){C(1,arguments);var n=t||{},a=n.locale,r=a&&a.options&&a.options.firstWeekContainsDate,i=null==r?1:B(r),o=null==n.firstWeekContainsDate?i:B(n.firstWeekContainsDate),u=te(e,t),c=new Date(0);c.setUTCFullYear(u,0,o),c.setUTCHours(0,0,0,0);var s=ee(c,t);return s}var ae="midnight",re="noon",ie="morning",oe="afternoon",ue="evening",ce="night";function se(e,t){var n=e>0?"-":"+",a=Math.abs(e),r=Math.floor(a/60),i=a%60;if(0===i)return n+String(r);var o=t||"";return n+String(r)+o+J(i,2)}function de(e,t){return e%60==0?(e>0?"-":"+")+J(Math.abs(e)/60,2):le(e,t)}function le(e,t){var n=t||"",a=e>0?"-":"+",r=Math.abs(e);return a+J(Math.floor(r/60),2)+n+J(r%60,2)}var fe={G:function(e,t,n){var a=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var a=e.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return V.y(e,t)},Y:function(e,t,n,a){var r=te(e,a),i=r>0?r:1-r;return"YY"===t?J(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):J(i,t.length)},R:function(e,t){return J(K(e),t.length)},u:function(e,t){return J(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return J(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return J(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){var a=e.getUTCMonth();switch(t){case"M":case"MM":return V.M(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){var a=e.getUTCMonth();switch(t){case"L":return String(a+1);case"LL":return J(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,t,n,a){var r=function(e,t){C(1,arguments);var n=E(e),a=ee(n,t).getTime()-ne(n,t).getTime();return Math.round(a/6048e5)+1}(e,a);return"wo"===t?n.ordinalNumber(r,{unit:"week"}):J(r,t.length)},I:function(e,t,n){var a=function(e){C(1,arguments);var t=E(e),n=$(t).getTime()-Z(t).getTime();return Math.round(n/6048e5)+1}(e);return"Io"===t?n.ordinalNumber(a,{unit:"week"}):J(a,t.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):V.d(e,t)},D:function(e,t,n){var a=function(e){C(1,arguments);var t=E(e),n=t.getTime();t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0);var a=t.getTime(),r=n-a;return Math.floor(r/864e5)+1}(e);return"Do"===t?n.ordinalNumber(a,{unit:"dayOfYear"}):J(a,t.length)},E:function(e,t,n){var a=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){var r=e.getUTCDay(),i=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return J(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){var r=e.getUTCDay(),i=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return J(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){var a=e.getUTCDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return J(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){var a=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){var a,r=e.getUTCHours();switch(a=12===r?re:0===r?ae:r/12>=1?"pm":"am",t){case"b":case"bb":case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,n){var a,r=e.getUTCHours();switch(a=r>=17?ue:r>=12?oe:r>=4?ie:ce,t){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var a=e.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return V.h(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):V.H(e,t)},K:function(e,t,n){var a=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):J(a,t.length)},k:function(e,t,n){var a=e.getUTCHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):J(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):V.m(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):V.s(e,t)},S:function(e,t){return V.S(e,t)},X:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();if(0===r)return"Z";switch(t){case"X":return de(r);case"XXXX":case"XX":return le(r);case"XXXXX":case"XXX":default:return le(r,":")}},x:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"x":return de(r);case"xxxx":case"xx":return le(r);case"xxxxx":case"xxx":default:return le(r,":")}},O:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+se(r,":");case"OOOO":default:return"GMT"+le(r,":")}},z:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+se(r,":");case"zzzz":default:return"GMT"+le(r,":")}},t:function(e,t,n,a){var r=a._originalDate||e;return J(Math.floor(r.getTime()/1e3),t.length)},T:function(e,t,n,a){return J((a._originalDate||e).getTime(),t.length)}};function me(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function he(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}var ge={p:he,P:function(e,t){var n,a=e.match(/(P+)(p+)?/),r=a[1],i=a[2];if(!i)return me(e,t);switch(r){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",me(r,t)).replace("{{time}}",he(i,t))}},ve=["D","DD"],pe=["YY","YYYY"];function we(e){return-1!==ve.indexOf(e)}function be(e){return-1!==pe.indexOf(e)}function ye(e){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` for formatting years; see: https://git.io/fxCyr");if("YY"===e)throw new RangeError("Use `yy` instead of `YY` for formatting years; see: https://git.io/fxCyr");if("D"===e)throw new RangeError("Use `d` instead of `D` for formatting days of the month; see: https://git.io/fxCyr");if("DD"===e)throw new RangeError("Use `dd` instead of `DD` for formatting days of the month; see: https://git.io/fxCyr")}var Me=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Te=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,De=/^'([^]*?)'?$/,xe=/''/g,Se=/[a-zA-Z]/;function Ce(e){return e.match(De)[1].replace(xe,"'")}var Ee=db.collection("orders"),ke=document.querySelector("#order_list"),Pe=function(){Ee.orderBy("date","desc").onSnapshot((function(e){ke.innerHTML="",e.docs.forEach((function(e){qe(e)}))}))},qe=function(e){var t=[],n=[];e.data().order.forEach((function(e){(e.includes("Custom")?n:t).push(e)}));var a=function(e,t){return C(1,arguments),F(e,Date.now(),t)}(e.data().date.toDate(),{addSuffix:!0}),r=function(e,t,n){C(2,arguments);var a=String(t),r=n||{},i=r.locale||A,o=i.options&&i.options.firstWeekContainsDate,u=null==o?1:B(o),c=null==r.firstWeekContainsDate?u:B(r.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var s=i.options&&i.options.weekStartsOn,d=null==s?0:B(s),l=null==r.weekStartsOn?d:B(r.weekStartsOn);if(!(l>=0&&l<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!i.localize)throw new RangeError("locale must contain localize property");if(!i.formatLong)throw new RangeError("locale must contain formatLong property");var f=E(e);if(!Q(f))throw new RangeError("Invalid time value");var m=X(f),h=R(f,m),g={firstWeekContainsDate:c,weekStartsOn:l,locale:i,_originalDate:f},v=a.match(Te).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,ge[t])(e,i.formatLong,g):e})).join("").match(Me).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return Ce(e);var n=fe[t];if(n)return!r.useAdditionalWeekYearTokens&&be(e)&&ye(e),!r.useAdditionalDayOfYearTokens&&we(e)&&ye(e),n(h,e,i.localize,g);if(t.match(Se))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("");return v}(e.data().date.toDate(),"dd/mm/yyyy hh:mm:ss"),i="light-blue-text text-accent-3",o="blue";"order-completed"==e.data().status&&(i="green-text text-darken-3",o="green");var u="\n    <li order-id=".concat(e.id,'>\n    <div class="collapsible-header">\n      <span>').concat(a,'</span>\n      <a class="right btn-floating btn-small waves-effect waves-light ').concat(o,'"><i class="material-icons">check</i></a>\n      <span class="right ').concat(i,'">').concat(e.data().status,'</span>\n    </div>\n      <div class="collapsible-body">\n      <p class="grey-text">UserID: ').concat(e.data().user_id,"</p>\n      <p>Exact time: ").concat(r,'</p>\n      <p class="bold_font">Name: ').concat(e.data().name,'</p>\n      <p class="green-text bold_font underline">Total cost: ').concat(e.data().total_cost,' $</p>\n      <p class="orange-text">Pizzas:</p>\n      <ul>\n      ').concat(t.map((function(e){return"<li> -"+e+"</li>"})).join(""),'\n      </ul>\n      <p class="orange-text text-darken-4">Custom pizzas:</p>\n      <ul>\n      ').concat(n.map((function(e){return"<li> -"+e+"</li>"})).join(""),"\n      </ul>\n      </div>\n    </li>\n    ");ke.innerHTML+=u};function Oe(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}ke.addEventListener("click",(function(e){if("I"===e.target.tagName){var t=e.target.parentElement.parentElement.parentElement.getAttribute("order-id");Ee.doc(t).update({status:"order-completed"}).then((function(){Pe(),console.log("order "+t+" completed")})).catch((function(e){return console.log(e.message)}))}}));var Le=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.loggedOutElem=document.querySelectorAll(".logged-out"),this.loggedInElem=document.querySelectorAll(".logged-in"),this.adminItems=document.querySelectorAll(".admin"),this.accountIcon=document.querySelector("#account_icon"),this.accountDetails=document.querySelector(".account-details"),this.user_profile=document.querySelector("#user_profile"),this.greeting_msg=document.querySelector("#greeting")}var t,n,a;return t=e,(n=[{key:"logedIn",value:function(e,t){this.loggedInElem.forEach((function(e){"LI"==e.tagName?e.style.display="list-item":e.style.display="block"})),this.loggedOutElem.forEach((function(e){return e.style.display="none"})),this.accountIcon.style.color="#ff6f00",this.user_profile.profile_id.value=e.uid,this.user_profile.profile_name.value=t.data().name,this.user_profile.profile_email.value=e.email,this.accountDetails.value=e.admin?"Admin":"User",M.updateTextFields(),this.greeting_msg.textContent="Hi, ".concat(t.data().name)}},{key:"AdminUI",value:function(){this.adminItems.forEach((function(e){return e.style.display="block"})),c.onSnapshot((function(e){s.innerHTML="",e.docs.forEach((function(e){d(e)}))})),b.onSnapshot((function(e){y.innerHTML="",e.docs.forEach((function(e){T(e)}))})),Pe()}},{key:"logedOut",value:function(){location.reload()}}])&&Oe(t.prototype,n),a&&Oe(t,a),e}(),Ue=function(e,t){var n=new Le;e?(e.admin&&n.AdminUI(),n.logedIn(e,t)):n.logedOut()}}]);