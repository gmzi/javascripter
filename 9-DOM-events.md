## Events

[DOMContentLoaded](###DOMContentLoaded)
[load](###load)
[submit](###submit)
[preventDefault](###preventDefault)
[keyboard](###keyboard)

## Event object props

[event_object_properties](###event_object_properties)

## Listeners

[Event_delegation](##Event_delegation)
[addEventListener](###addEventListener)
[inline](###inline_event_listener)
[onclick](###onclick)

## Data attributes

[Data_attributes](##Data_attributes)

---

## Events

Events are things that happen when the user or the browser does certain action (user clicking or hovering, browser loading page or printing something). We use JS to execute code when the Events happen.
Add event listeners and prevent default actions using JS.
Common events:

- click
- hover
- press keys
- DOM loaded
- form submitted

We build applications that listens to events and react accordingly. This is called Event Driving Programming, and it's basically how we create apps.
[fullDoc](https://developer.mozilla.org/en-US/docs/Web/Events)
[canIuse](https://caniuse.com)

---

## Load events

If you put your script link `<script src="#"></script>` in the head of the html file, it will run the script BEFORE loading the DOM, and for that reason some things won't work, as they depend on the DOM. That's why we put the script link at the bottom of the body, so the script execute after the DOM is loaded. If you want or need to put the script line on top of the html, or if for some reason need to wait till the DOM is loaded:

### DOMContentLoaded

Page's elements will be readed and accesible in console, but won't be displayed in page until the DOM is loaded.

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // all code of the app goes here, or in a function written elsewhere and called here.
});
```

### load

Page elements won't exist at all until the DOM is fully loaded.

```javascript
window.addEventListener('load', function () {
  // all code here or in function called here;
});
```

---

## Event_Object

The (event) parameter will contain a bunch of information about what event just ran and what happened, here's some of the info available in the event:

- target (the element that triggered the event(a button, a paragraph, etc.))
- pageX / pageY (position in page where the event occured (in pixels or coordinates))
- key (that was pressed to trigger the event)
- preventDefault(); (function to prevent default behavior of the event);

### event_object_properties

```javascript
const clickMe = document.querySelector('.event-object p');
clickMe.addEventListener('click', function (event) {
  console.log(event);
});
//MouseEvent {isTrusted: true, screenX: 1247, screenY: 155, clientX: 59, clientY: 66, …}

clickMe.addEventListener('click', function (event) {
  console.log(event.target); // <p>Click me!!</p>
  console.log(event.pageX); // 346 (horizontal axe)
  console.log(event.pageY); // 78 (vertical axe)
  console.log(event.type); // click
});
```

---

# FORMS

## default form submission

By convention forms have "name" attr instead of id or class.
By default, when pressing the submit button, the browser refreshes the page and change the url to the destination specified in the "action" attribute. When you "submit" the form, all the data is sent in a new request to some url, which is specified in the "action" atribute.

```html
<form action="http://google.com">
  <input type="text" />
  <input type="submit" />
</form>
<!-- When "submit", url: google.com -->

<form action="/mouseMapChallenge/index.html">
  <!-- Go to color picker -->
</form>
```

### submit

It's like click or any other attr, but specific for forms, the complete build:

```html
<form id="logo-form">
  <p>
    <label
      >Your brand name:
      <input type="text" name="name" />
    </label>
  </p>
</form>
```

```javascript
const form = document.querySelector('#logo-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  // rest of code ;
});
```

To stop the reload to happen, and make the browser do something else:

### preventDefault

```html
<form>
  Name: <input type="text" name="first-name" />
  <input type="submit" />
</form>
```

```javascript
const form = document.querySelector('.forms form');

form.addEventListener('submit', function (evt) {
  evt.preventDefault(); // This will prevent from reloading and from erasing whatever's already inputed or loaded.
  console.log('name submitted!!!');
});
```

Prevent other default behavoir:

```javascript
// given an anchor tag:
// <a href="https://www.infobae.com/america/">Go to shit</a>
// prevent it from linking:

document.querySelector('a').addEventListener('click', function (e) {
  e.preventDefault();
  console.log("don't read shit!!");
});

// prevent a checkbox from marking:
const noInput = document.querySelector("input[type='checkbox'");
noInput.addEventListener('click', function (e) {
  e.preventDefault();
  alert('NO');
});
```

### keyboard

```javascript
// keypress anywhere:
document.addEventListener('keyup', function (e) {
  console.log(e); // keyboardEvent
  console.log(e.key); // AroowUp
  console.log(e.keyCode); // 38
});
```

---

## Event listeners

The basic information we need to provide to capture an event is:  
"When (event type) occurs on (element), execute (code)."

To the name of the Event, add the atribute "on", so it will trigger that attribute. "onclick", "ondblclick", etc.

### addEventListener

This method is better than the others because it's easier to remove. Also, allows to have more than one event listener on the same element.

```javascript
// One element one change:
const btnPink = document.querySelector('#pink');
btnPink.addEventListener('mouseover', function () {
  bodyColor('pink');
});

// one element two changes:
const btnBodyAndTitle = document.querySelector('#body-title');
const title = document.querySelector('.events h2');

btnBodyAndTitle.addEventListener('click', function () {
  bodyColor('yellow');
  title.style.backgroundColor = 'blue';
});
```

### inline_event_listener

Grose. It's like making inline css styles.
It's with an HTML attribute:

```html
<!-- Trigger alerts: -->
<button onclick="alert('hi')">On click</button>
<button ondblclick="alert('dbl clicked')">Double click</button>

<!-- trigger a function: -->
<button onclick="bodyPurple()">Make body purple</button>
<!-- Function in app.js -->
```

### onclick

Can check an object's properties with "console.dir(element)". All that starts with "on". They are setted to 'null' by default, but can assign them to a function.
"onclick" JS property.

```javascript
// Select the element form document object:
const btnTeal = document.querySelector('#teal');
// assign the property and write the function to be executed:
btnTeal.onclick = function () {
  bodyColor('teal');
};
// callback function:
function bodyColor(color) {
  document.querySelector('body').style.backgroundColor = color;
}
```

### Add event listener to multiple elements

With a loop:

```javascript
// remove friend from friendslist:
const friendsLi = document.querySelectorAll('.multiple li');
const unfriendBtn = document.querySelectorAll('.multiple button');

for (let btn of unfriendBtn) {
  btn.addEventListener('click', function (e) {
    e.target.parentElement.remove();
  });
}
```

## Event_delegation

Event delegation. We make a parent element a "delegate", a representative of the child.  
Attach a single event listener on the parent or delegate element, so if the event happens inside any child element, the parent will listen, and can identify in which child the event is happening using event.target.

```javascript
const listListener = document.querySelector('#listen-list');
const addForm = document.querySelector('#add');
const newFrName = document.querySelector('input[name="friend-name"]');
// EVENT DELEGATION to the parent element:
listListener.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove();
  }
});
```

---

## Data_attributes

Data attributes Store metadata of a given element without showing it to the user.

Data attributes start with "data-".

```html
<ul id="cars">
  <li data-model="crv" data-year="2018" data-color="black">Toyota</li>
  <li data-model="focus" data-year="2015" data-color="red">Ford</li>
  <li data-model="civic" data-year="2020" data-color="blue">Honda</li>
</ul>
```

To access / modify data attributes:

```javascript
const carItems = document.querySelectorAll('#cars li');
// ACCESS:
carItems[1].dataset; // DOMStringMap {model: "focus", year: "2015", color: "red"}
carItems[1].dataset.year; // 2015
carItems[1].getAttribute('data-model'); // focus

// MODIFY ATTR VALUE:
carItems[1].dataset.year = '2020'; // 2020

// ADD NEW ATTR:
carItems[1].dataset.preowned = 'true';
```
