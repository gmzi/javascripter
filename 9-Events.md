# Events

Are things that happen when the user or the browser does certain action (user clicking or hovering, browser loading page or printing something). We use JS to execute code when the Events happen.
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

## Event listeners

The basic information we need to provide to capture an event is:  
"When (event type) occurs on (element), execute (code)."

To the name of the Event, add the atribute "on", so it will trigger that attribute. "onclick", "ondblclick", etc.

### addEventListener

This method is better than the others because it's easier to remove. Also, allows to have more than one event listener on the same element.

```javascript
// One element one change:
const btnPink = document.querySelector("#pink");
btnPink.addEventListener("mouseover", function () {
  bodyColor("pink");
});

// one element two changes:
const btnBodyAndTitle = document.querySelector("#body-title");
const title = document.querySelector(".events h2");

btnBodyAndTitle.addEventListener("click", function () {
  bodyColor("yellow");
  title.style.backgroundColor = "blue";
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
const btnTeal = document.querySelector("#teal");
// assign the property and write the function to be executed:
btnTeal.onclick = function () {
  bodyColor("teal");
};
// callback function:
function bodyColor(color) {
  document.querySelector("body").style.backgroundColor = color;
}
```

---

## Load events

If you put your script link `<script src="#"></script>` in the head of the html file, it will run the script BEFORE loading the DOM, and for that reason some things won't work, as they depend on the DOM. That's why we put the script link at the bottom of the body, so the script execute after the DOM is loaded. If you want or need to put the script line on top of the html, or if for some reason need to wait till the DOM is loaded:

### DOMContentLoaded

Page's elements will be readed and accesible in console, but won't be displayed in page until the DOM is loaded.

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // all code of the app goes here, or in a function written elsewhere and called here.
});
```

### load

Page elements won't exist at all until the DOM is fully loaded.

```javascript
window.addEventListener("load", function () {
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

```javascript
const clickMe = document.querySelector(".event-object p");
clickMe.addEventListener("click", function (event) {
  console.log(event);
});
//MouseEvent {isTrusted: true, screenX: 1247, screenY: 155, clientX: 59, clientY: 66, …}

clickMe.addEventListener("click", function (event) {
  console.log(event.target); // <p>Click me!!</p>
  console.log(event.pageX); // 346 (horizontal axe)
  console.log(event.pageY); // 78 (vertical axe)
  console.log(event.type); // click
});

// Change the color of the background when pressing any key:
const body = document.querySelector("body");
body.addEventListener("keypress", function () {
  body.style.backgroundColor = "teal";
});
// Log event details in console:
body.addEventListener("keypress", function (e) {
  console.log(e.type); // keypress
  console.log(e.target); // <body style="background-color: teal;>...</body>"
});

// Execute code and log event details in the same function:
body.addEventListener("keydown", function (e) {
  body.style.backgroundColor = "teal"; // changes color
  console.log(e.target); // keydown
  console.log(e.timeStamp); // 4737.26
});
```
