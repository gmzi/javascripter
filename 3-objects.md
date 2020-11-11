# Objects

[Object_literal](###Object_literal)
[object_properties](###Access_object_properties:)  
[Update/add_properties:](###Update/add_properties)
[object_assigned_to_variable](###object_assigned_to_variable)
[Arrays_inside_Objects](###Arrays_inside_Objects)
[Objects_inside_Arrays](###Objects_inside_Arrays)
[Equality](###Equality)

Collection of related variables and functions. Inside objects, variables are called `property` and functions are called `methods`, both act as keys within objects, and each `key` is assigned a `value` in form of `key:value` pairs. Objects can content Reference Data Types and Primitive Data Types.

### Object_literal

Is this syntax: `{}`. The order is not important in object literals, when we nedd order-specific data we use arrays. Objects collect key value pairs in wathever order:

```javascript
const fitBitData = {
  totalSteps: 30233,
  totalMiles: 233.5,
  100: true,
  '23 roperos': false,
};
```

### Access_object_properties:

Access object properties:

```javascript
let averga = {
  name: 'averga',
  followers: 143,
  122: 'hey fucker',
};
averga.name; // "averga"
averga['name']; // "averga"
averga[122]; // "hey fucker"
```

In array of objects:

```javascript
let achota = [
  { name: 'cara de chota', 122: 'chota' },
  { name: 'cara de culo', 122: 'culo' },
  { '23 roperos': true },
];
achota[0].name; // "cara de chota"
achota[0]['name']; // "cara de chota"
achota[1].name; // "cara de culo"
achota[1][122]; // "culo"
achota['23 roperos']; // true
// -Through a variable:
let carlitos = achota['name']; // "cara de chota"
```

Try to use dot notation, if not possible go for bracket.

Dot versus bracket notation:

```javascript
// dot modifies the key:
let arg1 = 'tete';
let obj1 = {};
obj1.arg1 = 'caca';
console.log(obj1); // {arg1: "caca"}

//bracket modifies the value:
let arg2 = 'pipi';
let obj2 = {};
obj2[arg2] = 'pedo';
console.log(obj2); // {pipi: "pedo"}
```

### Update/add_properties

Updating or adding properties:

In simple context:

```javascript
`objName.newPropKey = newPropValue;`;
```

In included shit:

```javascript
`objName[prevObj[prevKey]] = newValue;`;
```

```javascript
fitBitData.totalSteps = 52441;
//
const userReviews = {};
//bracket
userReviews['queenBee49'] = 4.0;
// dot
userReviews.mrSmith76 = 3.2;
// add or sustract from previous values:
userReviews['queenBee49'] += 4;
userReviews.mrSmith76--;
```

### object_assigned_to_variable

Assign object to variable.

Since objects are Reference Data Types, and are stored as a reference pointing to a group of values, we can assign them to new variables and modify, just like with arrays:

```javascript
const palette = {
  red: '#eb4d3d',
  yellow: '#f9ca24',
};

const palette2 = palette; // assign object to new variable.

//add key and value to object through new variable:
palette2.green = '#ebf879';

palette; // {red: "#eb4d3d", yellow: "#f9ca24", green: "#ebf879"}
```

### Arrays_inside_Objects

Arrays in Objects

Arrays nested in object, object nested in object:

```javascript
const student = {
  firstName: 'Pepino',
  lastName: 'Salas',
  strengths: ['hockey', 'history'],
  califications: {
    midterm: 92,
    final: 88,
  },
};

let studentAverage =
  (student.califications.midterm + student.califications.final) / 2;

//access nested array:
student.strengths[0]; // "hockey"
```

### Objects_inside_Arrays

Objects inside Arrays

```javascript
const shoppingCart = [
  {
    product: 'Jenga',
    price: 4.3,
    quantity: 1,
  },
  {
    product: 'Echo dot',
    price: 54.56,
    quantity: 3,
  },
  {
    product: 'Fire stick',
    price: 121322.34,
    quantity: 3,
  },
];
//------------------
// A tic-tac-toe game

const game = {
  player1: {
    username: 'John',
    playinAs: 'x',
  },
  player2: {
    username: 'stella',
    playingAs: 'o',
  },
  board: [
    ['o', null, 'x'],
    ['x', 'o', 'x'],
    [null, 'o', 'x'],
  ],
};
// Access values:
game.player1.username; // "John"
game.board[0]; // ["o", null, "x"]
```

### Equality

Equality in arrays and objects

`1 === 1 // true`  
`1 == 1 // true`  
Not the same with reference data types:

```javascript
let nums = [1, 2, 3];
let mystery = [1, 2, 3];
nums === mystery; // false.
nums == mystery; // false.
//It's false because the reference that each variable is pointing to is different:
// nums --> place in memory 123232132
// mystery --> place in memory 999998989;
```

Same thing with arrays:
`[] === []` is false, because each array have different location in memory.

```javascript
if(user.notifications === []) // this won't work.
```

Define same reference in memory so they're the same:

```javascript
let nums = [1, 2, 3];
let mystery = nums;
nums === mystery; // true
```

We can't compare values inside arrays nor in objects without a loop. We have to perform a loop to mannually check each value and compare it with the other object or array.

Check if an array is empty:

```javascript
const user = {
  username: 'pepe',
  notifications: [],
};

if (!user.notifications.length) {
  console.log('no new notif');
}
```

### Add function to an object:

Function as a mathod for an object, like a value for a given key.

```javascript
//define funtion:
function greet() {
  console.log('hiiii');
}

const persona = {
  name: 'juanca',
  age: 23,
  // add function as a property:
  talk: greet,
};
// execute object's method:
persona.talk(); // hiiii
```
