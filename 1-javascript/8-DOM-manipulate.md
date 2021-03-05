# DOM manipulation

- Read and write:

[innerText](##innerText)
[textContent](##textContent)
[innerHTML](##innerHTML)
[style_single_element](##style_single_element)  
[style_multiple_elements](##style_multiple_elements)
[getAttribute](##getAttribute)  
[setAttribute](##setAttribute)  
[access_attr_directly](##access_attr_directly)  
[classList](##classList)  
[className](##className)  
[value](##value)
[Node_vs_Element](###Node_vs_Element)
[querySelector](###querySelector)

- Create/remove
  [createElement](##createElement)
  [append](##append)
  [prepend](##prepend)
  [remove](##remove)

- Parents, sibilings, childs, neighbours.
  [parentElement](##parentElement)  
  [children](##children)  
  [previous/nextElementSibling](##previous/nextElementSibling)

# DOM selection

[querySelector](###querySelector)  
[querySelectorAll](###querySelectorAll)
[getElementById](###getElementById)
[getElementsByTagName](###getElementsByTagName)  
[getElementsByClassName](###getElementsByClassName)

Once we selected the HTMLElements, we do something with them.

- Modify text inside an HTMLElement
- change inline styling
- modify atributes (src, href, class, id, type, value)
- Traverse, create, append and remove elements from the DOM.

## innerText

Affects text only (no tags, no style). For single content with no nested elements (would mess up changing nested tags and multiple elements with one single string). Whatever is added will be treated as text only.

```html
<h1>Old text<h1></h1></h1>
```

```javascript
const h1 = document.querySelector('h1'); // Old text
h1.innerText = 'new texto'; // new texto
const caps = h1.innerText.toUpperCase();
h1.innerText = caps; // NEW TEXTO
```

## textContent

It's a bit dumber than innerText, Converts tags and CSS into text, and is unaware about what's hidden and what's showed in the CSS styling.

```javascript
h1.textContent; // NEW TEXTO;
h1.textContent = 'changed again'; // changed again;
```

## innerHTML

Affects text and tags.

1. Reading:

```javascript
const list = document.querySelector('.craigs-list.first ol');
list.innerHTML;
/* 
<li>craig 1</li>
<li>craig 2</li>
*/
```

2. Modifying:

```javascript
list.innerHTML += "<li class='new-item'>New item</li>";
list.innerHTML; /*
<li>craig 1</li>
<li>craig 2</li>
<li class="new-item">New item</li> */
```

NOTE: innerHTML will treat added values as HTML, so users could enter scripts that would be runned in our site, so be careful with this. A Cross Site Scripting Attack consists in injecting js scripts in our code with bad intentions. Browsers have protections for this, but still is possible to insert scripts if the code is not sanitized (innerText does sanitize the code added, so it's safer).

## style_single_element

camelCase instead of dash.

1. Reading:
   Only contains inline styles, doesn't see the stylesheet file.

```javascript
h1.style.color; // ""
```

2. Modifying:
   Sets new property inline in the html. Good for just one property.

```javascript
h1.style.color = 'blue'; // <h1 style="color: blue;">changed again</h1>
h1.style.backgroundColor = 'orange';
// <h1 style="color: blue; background-color: orange;">changed again</h1>
```

## style_multiple_elements

```javascript
const listItems = document.querySelectorAll('li');
for (let listItem of listItems) {
  listItem.style.color = 'red';
}

const imgs = document.querySelectorAll('img');
for (let img of imgs) {
  img.style.width = '12rem';
  img.style.border = '1px solid blue';
}
```

# Attributes

## getAttribute

Only access an attribute.

```javascript
const firstInput = document.querySelector('input');
firstInput.getAttribute('type'); // text
document.querySelector('input').getAttribute('id'); // caca
```

## setAttribute

Removes previous classes of the element, if any (because adds inline style, which has higher jerarquy than the CSS file ones).
`element.setAttribute("attName", "NewValue");`.

```javascript
firstInput.setAttribute('placeholder', 'cague allá');
// modify class:
const regularQuote = document.querySelector('.regular');
regularQuote.setAttribute('class', 'slang');
```

## access_attr_directly

some attributes can be accessed and modified directly:

```javascript
firstInput.id; // caca
firstInput.id = 'new-name'; // new-name
```

## classList

Gives an array-like object to add, remove or toggle classes.

```javascript
const todoTitle = document.querySelector('.todo-title');
todoTitle.classList; // []
todoTitle.classList.add('completed'); // [completed]
todoTitle.classList.remove('completed'); // []
todoTitle.classList.toggle('completed'); // true (if it on, it turns it off, if it's off, it turns it on.)
todoTitle.classList.contains('completed'); // true
```

## className

Give a string with the name of the class.

```javascript
const todoTitle = document.querySelector('.todo-title');
todoTitle.className; // todo-title
```

## value

When working with forms, we care about value attribute because it contains the user's input. To read the user input:

```javascript
// grab the form input field:
const nameInput = document.querySelector('.name input');
// read the value:
nameInput.value; // "whatever user wrote". This will appear in browser's console, not in javascript (yet).
// store the value:
const userInput = nameInput.value;
// blank the form after use:
input.value = '';
//[ Modify the value:
nameInput.value = 'caca'; // caca ]
```

## createElement

```javascript
const newButton = document.createElement('button');
newButton.className = 'new-button';
const newUnorderedList = document.createElement('ul');
const newDiv = document.createElement('div');
newDiv.innerText = 'a brand new div!!';
newDiv.style.color = 'tomato';
```

## append

It's older version is `appendChild()`.  
Places the new child element after the last child.

```javascript
const todoList = document.querySelector('.todo-list');
const newTodo = document.createElement('li');
newTodo.innerText = 'buy scotch';
todoList.append(newTodo); /*
task 1
task 2
task 3
buy scotch */
```

Append multiple elements:

```javascript
parentElement.append(child1, child2, etc);
```

Append element containing nested element (e.g. a li with a <bold> text tag):

```javascript
const myList = document.querySelector('.my-list');
const newTodo = document.createElement('li');
newTodo.className = 'todo-item';
const boldClass = document.createElement('b');
boldClass.innerText = 'This is important';
// append the style to the li:
newTodo.append(boldStyle);
// append the li to the list:
myList.append(newTodo);
// <li class="todo-item"><b>this is important</b></li>
```

## prepend

Inserts the new element before the first child.

```javascript
todoList.prepend(firstTodo); /*
• do this first
• task 1
• task 2
*/
const newImg = document.createElement('img');
newImg.src = './images/dog3.jpeg';
newImg.className = 'chiqui';
document.body.prepend(newImg);
// img of a little white dog with the shape of a sausage.
```

## remove

Just select the element:

```javascript
const doneTask = document.querySelector('#done-task');
doneTask.remove();
```

Older version, removeChild(), select the parent and the element:

```javascript
const ul = document.querySelector('ul');
ul.removeChild(doneTask);
```

---

## parentElement

(remember to query select element before making the check)

```javascript
const div1 = document.querySelector('.finder div');
div1.parentElement; // <section class="finder">...</section>
const button = document.querySelector('.finder button');
button.parentElement.remove();
```

## children

Gives a collection of children element, and two highlighted:

```javascript
const list = document.querySelector('.finder ul');
div.children; // HTMLCollection(2) [p, ul]
list.children; // HTMLCollection(3) [li, li, li]
list.firstElementChild; // <li>First list item</li>
list.lastElementChild; // <li>Last list item</li>
```

## previous/nextElementSibling

```javascript
const h1 = document.querySelector('.finder h1');
const div2 = document.querySelector('.second-div');

h1.previousElementSibling; // null (if nothing before)
h1.nextElementSibling; // <div>...</div>
h1.nextElementSibling.nextElementSibling; // two siblings down (<div>Here is the second div</div>)
div2.previousElementSibling.previousElementSibling; // two siblings up (<h1>Here is a main heading</h1>)
```

### Node_vs_Element

Every Element is a Node, but not every Node is an Element. Can console.dir an object and check in "**proto**" if that is a node. Nodes includes line breaks, comments, etc.

```javascript
const ul = document.querySelector('.finder ul');
const li2 = ul.lastElementChild;
li2.childNodes; /*
NodeList(3) [text, button, text]
0: text
1: button
2: text
length: 3
__proto__: NodeList  */
```

---

# DOM Selection

## Select DOM elements

### querySelector

to query: preguntar. Works with CSS selectors. Newer fancy way. Combines all the getElement functionalities. Passes a CSS selector as a string. Returns only the first element that matches.

```javascript
document.querySelector('#content'); // id
document.querySelector('.craigs-list'); // class
document.querySelector('.craigs-list.first'); // class & class
document.querySelector('input'); // tag
document.querySelector('.craigs-list h2'); // class & tag
document.querySelector('h2.section-title'); // tag & class
document.querySelector('input[type="range"]'); // assign CSS value;

// two ways to access the same element:
document.querySelector('form button'); // the button inside the form;
let form = document.querySelector('form');
form.querySelector('button'); // the same button, different strategy.
```

### querySelectorAll

returns all matching elements.

```javascript
document.querySelectorAll('input'); // all input tags
document.querySelectorAll('h2.section-title'); // all h2 tags inside the class
document.querySelectorAll('h3.section-title.country'); // all h3 tags inside the class and the subclass.
document.querySelectorAll('body > hr'); // hr direct children of body, so not nested in other tags. Periphrasis: "hr's not nested".
document.querySelectorAll(':not(p)'); // sudo class. "Everything that's not a paragraph".
document.querySelectorAll('h2:nth-of-type(1)'); // first h2 in the page.
document.querySelectorAll('h2:nth-of-type(3)'); // third h2 in the page.

/*
NodeList(5) [input, input#name, input, input.number-A, input.number-B]
0: input
1: input#name
2: input
3: input.number-A
4: input.number-B
length: 5
__proto__: NodeList
*/
```

The NodeList is a kind of arrayish list, but not an array.

### getElementById

Older rustic way.

```javascript
document.getElementById('par1');
```

```html
<p id="par1">This is Paragraph 1</p> ;
```

Can save the HTMLElement in a variable, then `console.dir(variable)`, and will show all the HTMLElement's properties. This is not only an html tag, is an object with properties.
Depending on what we select, it can be an HTMLDivElement, or a HTMLParagraphElement, etc. (can find the name in object's property `__proto__`)

### getElementsByTagName

```javascript
document.getElementsByTagName('img');
/*
HTMLCollection(5) [li, li, li, li, li]
0: li
1: li
2: li
3: li
4: li
length: 5
__proto__: HTMLCollection
*/
```

### getElementsByClassName

One class selection:

```javascript
document.getElementsByClassName('craigs-list');
```

Two classes selection:

```javascript
document.getElementsByClassName('craigs-list second'); // mind the space between class names.
```

[full_doc](https://developer.mozilla.org/en-US/docs/Web/API/Document)

## The Document Object Model.

When a web page is loaded, the browser creates the DOM for that specific page. The DOM is a model of the content that is accesible and readable by Javascript. The browser runs Javascript and turn the HTML into Javascript Objects.
All this data is structured into a TREE, where the topmost node is the document object:

![graphic_DOM](images/DOM.JPG)

## HTMLCollection

is like an array, but it's not. Can be treated as an array in these situations:

- can access items by index position.
- can use for loops in them.

Cannot use: .push(), .forEach().

## The document object

The DOCUMENT OBJECT is the page representation, and inside it are it's nodes (html, head, body, etc.). For anything we want to do with the content of the page we have to start with the OBJECT element. It's the starting point.  
Things we can do with the DOCUMENT object:

- Finding elements.
- Making new elements.
- Updating elements.
- Changing properties on elements.
- Listening for events (clicks, key strokes, form input, dragging and droping, hovering, scrolling, etc.)

## DOM in the console

Interact with the DOM from the browser's console.
`document` throws the full html of page.  
`console.dir(document)` throws document object properties.
