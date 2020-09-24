# Functions

Are reusable procedures, that we can call again at any point. Are made of modular code. They're like little machines to do something.

Two step prcess:

1. Define function ---> 2. Run the code

Methods are functions built in javascript. `"hello".toUpperCase()`.

## Function declaration

`function funcName(){run code}`

```javascript
// Declare function
function rollDice() {
  let roll = Math.floor(Math.random() * 6) + 1;
  console.log(roll);
}
// Run function:
rollDice();

// Generate dice roll:
function rollDice() {
  let roll = Math.floor(Math.random() * 6) + 1;
  console.log(roll);
}

// Throw 3 dices at once with function inside loop:
for (let i = 0; i <= 2; i++) {
  rollDice();
}
// 3 dices at once with function inside function:
function throwDice() {
  rollDice();
  rollDice();
  rollDice();
}
throwDice();
```

### Function arguments

Single arguments:

Are inputs for our functions.

```javascript
function greet(nickname) {
  console.log(`Hi, ${nickname}`);
}
greet("Tim");

// Throw dices with function and loop:
function throwDice(numRolls) {
  for (let i = 0; i < numRolls; i++) {
    rollDice();
  }
}
throwDice(3); // 4, 3, 7
throwDice(5); // 3, 4, 5, 4, 2
```

Multiple arguments:
Order matters, JS fills the parameters from left to right with the given arguments:

```javascript
function divide(a, b) {
  console.log(a / b);
}
divide(4, 2); // 2
```

## Return

Return values are usefull because we can capture them in a variable or can pass them to other functinos.

In functinos we return values to store them or to do something with them.

```javascript
function add(x, y) {
  return x + y; // returns a single value
}
total = add(3, 45); // 48.

function detailedAdd(a, b) {
  return `${a} + ${b} totals ${a + b}`; // collected values
}
detailedTotal = detailedAdd(3, 9); //"3 + 9 totals 12"
```

Rules of return statements:

1. Can return one value from a function. (Can have multiple return statements, however).
2. Ends function execution. (What's after return won't run, inside it's scope).

### `return` with boolean values:

```javascript
// Check if purpe function.
// Best formula:
function isPurple(color) {
  return color === "purple";
}
// Ugly formula:
function isPurple(color) {
  if (color === "purple") {
    return true;
  } else {
    return false;
  }
}
// Refactor:
function isPurple(color) {
  if (color === "purple") {
    return true;
  }
  return false;
}
//--------------------

function containsPurple(arr) {
  for (let color of arr) {
    if (color === "purple") {
      return true;
    }
  }
  return false; // returns after the loop ended it's check.
}
const house1 = containsPurple(["blue", "white", "magenta"]); // false
const house2 = containsPurple(["red", "purple", "fdsfdsa"]); // true
```

## Scope

Variabel "visibility", depending on it we can access data or not.

### Scopes:

1. `FUNCTION scope`.
   `let` and `const` declared inside functions are available only inside that functions (same with loops, I guess).
2. `BLOCK scope`.
   Blocks are all the code inside the `{}` in if statements, while, loops, etc. (Not in objects).

```javascript
function scoper() {
  //FUNCTION SCOPE HERE
  for (let som of something) {
    //BLOCK SCOPE HERE
  }
  //FUNCTION SCOPE HERE
}
```

3. `LEXICAL scope`
   In nested functions, inner functions have access to outer function's variables, they can access to their parent functions, but not the other way around. Outer function doesn't have access to inner function's variables.

```javascript
function outer() {
  let movie = "Amadeus";
  //Doesn't have scope to inner
  function inner() {
    console.log(movie);
    //has scope to outer
  }
}
```

## Function expression

We use them to store function inside variables. Syntax:

```javascript
const square = function (num) {
  return num * num;
};
// To call it, pass the name of the variable:
square(2); // 4
```

### Function statement vs function expression

Their difference is syntax:

```javascript
// Function statement:
function add(x, y) {
  return x + y;
}
add(3, 2);

// Function expression (anonymous):
const addExp = function (x, y) {
  return x + y;
};
addExp(4, 6);

// Function expression (named):
const result = function named(x, y) {
  return x + y;
};
result(2, 2); //4
```

## Functions as objects

Functions are objects. We can store them in variables, or also in arrays. We can treat functions as any other value.

```javascript
// --------CALCULATOR (ARRAY OF FUNCTIONS)
// Declare all the functions:
function add(x, y) {
  return x + y;
}

const substract = function (x, y) {
  return x - y;
};

function multiply(x, y) {
  return x * y;
}

const divide = function (x, y) {
  return x / y;
};

//Store them in an array:
const operations = [add, substract, multiply, divide];

// Call a function by index position:
operations[3](54, 3);
```

Store function in an object, this is to say "Create a mother fucking method yeahhh!!!!!"

```javascript
// Declare the object:
const mathRobot = {
  // pass functions as values:
  multiplicator: multiply,
  divider: divide,
};
//Call custom method:
mathRobot.multiplicator(3, 2);
```

## Higher order functions

### Type 1: Functions with other functions as arguments:

Functions that operate on or with other functions. They can:

- Accept other functions as arguments
- Return a function.

```javascript
//Declare function with function as a parameter:
function callThreeTimes(func) {
  func();
  func();
  func();
}
// declare lower order function
function insult() {
  console.log("fuck");
}
// Call the higher order function with lower order function as argument:
callThreeTimes(insult);

// Higher order with loop:

// Declare higher order func:
function repeatNTimes(action, num) {
  for (let i = 0; i < num; i++) {
    action();
  }
}

function caca() {
  console.log("caca");
}
repeatNTimes(caca, 10); // "caca" printed 10 times.

// Random picker between functions:
function happy() {
  console.log("ha ha ha ha ho ho ho ho ho");
}

function sad() {
  console.log("snif owwwww snif snif owwww");
}

function pickOne(f1, f2) {
  let num = Math.random();
  if (num <= 0.5) {
    return f1;
  }
  return f2;
}
console.log(pickOne(happy, sad));
```

### Type 2: Returning functions

```javascript
// Factory of functions:
function multiplyBy(num) {
  return function (x) {
    return x * num;
  };
}

// Create new instances:
const triple = multiplyBy(3);
const double = multiplyBy(2);
const halve = multiplyBy(0.5);

// call them:
triple(4); // 12
double(10); // 20
halve(6); // 3

//----------------------------
//CHECK RANGE
// Build the function factory:
function checkRange(x, y) {
  return function (num) {
    return num >= x && num <= y;
  };
}

// Make a function:
let teenager = checkRange(12, 20);
// call it:
teenager(12); // true
teenager(22); // false

//Make a new returned value:
let adult = checkRange(21, 50);
//call it:
adult(51); //false
adult(40); //true
```
