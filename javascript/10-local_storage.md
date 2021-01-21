# localStorage / sessionStorage

[setItem](###setItem)  
[getItem](###getItem)  
[removeItem](###removeItem)  
[clear](###clear)  
[JSON.stringify](###JSON.stringify)  
[JSON.parse](###JSON.parse)

## localStorage

All keys must be strings.
Data has no expiration time.
Each website has it's localStorage, changing pages changes localStorage. Website doesn't comunicate localStorage between them, they're always separated.
To access local sotrage, in browser's console: `localStorage`.
Private browsing blocks access to localStorage.

## sessionStorage

`sessionStorage`

All keys must be strings.
Data gets cleared when the browsing session ends (window is closed or tab is closed).

### setItem

Adds data to local storage.
`localStorage.setItem('keyName', 'Value')` (mind camelCasing in key and capitalize in value.)

```javascript
localStorage; // {length: 0}
localStorage.setItem('time', 1.06);
localStorage.setItem('animal', 'dog');
localStorage.setItem('hasDog', true);
// Storage {animal: "dog", hasDog: "true", time: "1.06", length: 2}
```

### getItem

retrieves the information


```javascript
localStorage.getItem('keyName'); // "Key value"
localStorage.keyName; // "Key value"
localStorage.setItem('shoes', 2); // "shoes": "2" (string)
const shoes = parseInt(localStorage.shoes); // 2 (number)
const newShoes = 4;
localStorage.setItem('shoes', newShoes); // "shoes": "4";
```

### removeItem

Removes specified item:

```javascript
localStorage.removeItem('keyName');
```

### clear

```javascript
localStorage.clear();
```

## Object in local store

When storing arrays or objects in localStorage, the browser translates the information into strings, using JSON (JavaScript Object Notation).

### JSON.stringify

JS to JSON

```javascript
const prefs = {
  theme: 'psychedelic',
  'sized screen': 'full',
  tabs: 2,
};

localStorage.setItem('prefs', JSON.stringify(prefs)); // Storage {prefs: "{"theme":"psychedelic","sized screen":"full","tabs":2}", length: 1}
```

### JSON.parse

JSON to JS

```javascript
// CHECK FULL OBJECT
JSON.parse(localStorage.prefs); // {theme: "psychedelic", sized screen: "full", tabs: 2}

// SAVE ONE PROPERTY:
const { theme } = JSON.parse(localStorage.prefs); // psychedelic
```
