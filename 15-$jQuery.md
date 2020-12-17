# $ jQuery

[select](##select_elements)

Methods:
[addClass_removeClass_toggleClass](###addClass_removeClass_toggleClass)
[css](###css)  
[text](###text)
[html](###html)  
[attr](###attr)  
[val](###val)  
Trasversal methods:
[next]
[prev]
[parent]
[children](##traversal_methods)

[chain_methods](##chain_jQuery_methods)

Create HTML elements
[create_append_remove](##create_append_remove_elements)

Event Listeners:
[on](###on)

Event delegation:
[event_delegation](##event_delegation)

[animations](##animations)

names start with $
It's a JS library that offers shorter syntax for:

- Manipulating the DOM;
- Adding Event Listeners;
- Animating elements
- Making HTTP Requests (AJAX)

Also jQuery garantees cross browser support.
[fullDoc](https://jquery.com)

Everything can be made with vanilla JS, though.

Steps:

1. Include JQuery and select elements
   Use cdn from https://code.jquery.com (uncompressed, or minified, one of them).
2. ```html
   <!-- In body, just above the app.js script link -->
   <script
     src="https://code.jquery.com/jquery-3.5.1.js"
     integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
     crossorigin="anonymous"
   ></script>
   <script src="app.js"></script>
   ```
3. Test in console: type "jQuery", if no error, you're good to go.

## select_elements

"$" is a shortcut to call jQuery(), returns a collection of matched elements founded in the DOM or created by passing an HTML string.
`$("ul")`

```javascript
const myH1 = $('.jquery-section li');

$('div.foo');

$('h1');

$('input').eq(2); // input with index 0 only.

$('h1').eq(0).text(); // Brand new section title
```

When selecting, we get back a JQuery object.

```javascript
let $listItems = $('li');
console.log($listItems); // jQuery.fn.init(20)[li, li] (a Jquery object)

// To turn it into a DOM collection:
$listItems.get();
console.log($listItems.get()); // array of HTMLLIElements

console.log($listItems.get(0)); // <li data-model="crv" data-year="2018">"Toyota"</li>

$('img'); // all images
$('img:odd'); // all sudo images
$('*'); // all elements
```

## methods 1

### addClass_removeClass_toggleClass

addClass / removeClass / toggleClass

doesn't ovewrite class, just adds one, define class in style.css and apply it from javascript

```javascript
$('h1').addClass('highlight');

$('h1').removeClass('highlight');

$('h1').toggleClass('highlight');
```

### css

add css styles

```javascript
$('h1').css('color'); // rgb(97, 3, 3) retrieves the existing color
$('h1').css('font-size'); // "24px" retrieves current font-size

// Set values:
$('h1').css('color', 'blue'); // all h1 goes to blue;
$('h1').css('font-size', '54px'); // all h1 goes 54px

// multiple styles at once:
const bigTealStyles = {
  color: 'teal',
  'font-size': '40px',
  border: '1px solid green',
};
$('h1').css(bigTealStyles); // applies style
```

### text

```javascript
$('h1').text(); // Piton de la Fournaise

$('h1').text('Volcanoooo'); // changes title text

$('li').text('I am Li'); // all li text changes at once (no loop needed)
```

### html

Inner HTML of first matching element only.

```javascript
$('li').html(); // Toyota

$('li').html('<b>Bolded!!!</b>'); // applies to all li's
```

### attr

Get value of first match, or set value for all matches.

```javascript
$('a').attr('href', 'http://www.google.com'); // sets attr for all <a> elements

// assign multiple attrs at a time:
$('#greatphoto').attr({
  alt: 'Beijing Seller',
  title: 'photo by Kelly Clark',
});
```

### val

"value" property for inputs

```javascript
$('input').val(''); // all inputs val empty
$('input').val('new value'); // new value setted.
```

## traversal_methods

Traversal methods, selecting parent, sibiling, previous, next elements.

```javascript
const specialLi = $('li').eq(3);

specialLi.next(); // nex sibling

specialLi.prev(); // prev sibling

$('li').next(); // all siblings of li's

specialLi.parent(); // parent element

$('li').parent(); // parent to all elements, or multiple parents

$('.jquery-section ul').children(); // direct children only

$('.jquery-section ul').find('a'); // returns finded element if any.
```

## chain_jQuery_methods

Since all methods return a JQuery object, car chain methods:

```javascript
const $h1 = $('h1');

$h1
  .css('background-color', 'purple')
  .addClass('highlight')
  .text('chain is fun');
```

## create_append_remove_elements

create / append - prepend / remove elements

```javascript
// create html element and add it to doc
$('<h1>Caca</h1>').appendTo('.jquery-section');
$('<h1>Caca</h1>').prependTo('.jquery-section');
$('li').after('caquita');

// append and prepend
$('ul').append('<li class="new">I am new item</li>');

$('li').prepend('<input type="checkbox"/>');

// remove
$('img').remove(); // removes all images
```

## events

add Event Listeners with jquery.

### on

"on" and "click" do the same, "on" is better.

```javascript
// identify hovered item and add style:
$('li').on('mouseenter', function () {
  $(this).css('border', '10px solid purple');
}); // "$(this)" transform the this DOM object into a jquery object, so
// we can apply jquery methods to it

//remove item when clicked
$('li')
  .eq(0)
  .on('click', function () {
    $(this).remove();
  }); // removes item when clicked

// listener to all list items:
$('li').on('mouseleave', function () {
  console.log('leaving item!!');
});

// click listener on all images:
$('img').click(function () {
  alert('hellos');
});
```

## event_delegation

When creating html elements in javascript, things newly created might not be "visible" for the code, and for that reason some functionalities won't execute. That's why we add event listeners to the parent element, so all its children will have the functionalities.

```javascript
// add text inputs when clicking button:
$('#add-input').on('click', function () {
  $('.jquery-section ul').append('<input type="text"/>');
});

// detect where is focus and add value to that focus:
$('.jquery-section ul').on('focus', 'input', function () {
  $(this).val('Hinchabolas!!!');
});
```

## animations

jquery animations are called effects.

### fadeOut

```javascript
// fade and remove img:
$('#dog-4').on('click', function () {
  $(this).fadeOut(3000, function () {
    $(this).remove();
  });
});
```

### animate

Animate specific properties

```javascript
// shrink and remove img:

$('#dog-4').on('mouseover', function () {
  $(this).animate(
    {
      opacity: 0,
      // more properties here
    },
    2000,
    function () {
      $(this).remove();
    }
  );
});
```
