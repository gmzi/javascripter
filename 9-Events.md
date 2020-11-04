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
