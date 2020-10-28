# DOM

## Select DOM elements

### querySelector

to query: preguntar.

Works with CSS selectors.

Newer fancy way. Combines all the getElement functionalities.
Passes a CSS selector as a string.
Returns only the first element that matches.

```javascript
document.querySelector("#content"); // id
document.querySelector(".craigs-list"); // class
document.querySelector(".craigs-list.first"); // class & class
document.querySelector("input"); // tag
document.querySelector(".craigs-list h2"); // class & tag
document.querySelector("h2.section-title"); // tag & class
document.querySelector('input[type="range"]'); // assign CSS value;

// two ways to access the same element:
document.querySelector("form button"); // the button inside the form;
let form = document.querySelector("form");
form.querySelector("button"); // the same button, different strategy.
```

### querySelectorAll

returns all matching elements.

```javascript
document.querySelectorAll("input"); // all input tags
document.querySelectorAll("h2.section-title"); // all h2 tags inside the class
document.querySelectorAll("h3.section-title.country"); // all h3 tags inside the class and the subclass.
document.querySelectorAll("body > hr"); // hr direct children of body, so not nested in other tags. Periphrasis: "hr's not nested".
document.querySelectorAll(":not(p)"); // sudo class. "Everything that's not a paragraph".
document.querySelectorAll("h2:nth-of-type(1)"); // first h2 in the page.
document.querySelectorAll("h2:nth-of-type(3)"); // third h2 in the page.

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

### getElements

Older rustic way.

1. Select one single element:

```javascript
document.getElementById("par1");
```

get a special object called HTMLElement:
Type that method in console and you'll

```html
<p id="par1">This is Paragraph 1</p> ;
```

Can save the HTMLElement in a variable, then `console.dir(variable)`, and will show all the HTMLElement's properties.

This is not only an html tag, is an object with properties.
Depending on what we select, it can be an HTMLDivElement, or a HTMLParagraphElement, etc. (can find the name in object's property `__proto__`)

2. Select multiple elements by HTML tag:
   img, a, h2, etc.

```javascript
document.getElementsByTagName("img");
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

HTMLCollection is like an array, but it's not. Can be treated as an array in these situations:

- can access items by index position.
- can use for loops in them.

Cannot use: .push(), .forEach().

3. Select multiple elements by classname:

a. One class selection:

```javascript
document.getElementsByClassName("craigs-list");
/*
HTMLCollection(2) [div.craigs-list.first, div.craigs-list.second]
0: div.craigs-list.first
1: div.craigs-list.second
length: 2
__proto__: HTMLCollection
*/
```

b. Two classes selection:

```javascript
document.getElementsByClassName("craigs-list second"); // mind the space between class names.
/*
HTMLCollection [div.craigs-list.second]
0: div.craigs-list.second
length: 1
__proto__: HTMLCollection
*/
```

[full_doc](https://developer.mozilla.org/en-US/docs/Web/API/Document)

Document Object Model.
When a web page is loaded, the browser creates the DOM for that specific page. The DOM is a model of the content that is accesible and readable by Javascript. The browser runs Javascript and turn the HTML into Javascript Objects.
All this data is structured into a TREE, where the topmost node is the document object:

![graphic_DOM](images/DOM.JPG)

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
