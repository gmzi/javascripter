# Loops

[for](##for)  
[while](##while)  
[for...of](#forof)  
[for...in](##forin)

## for

## `for loops`:

```javascript
for ([initialExpression]; [condition]; [incrementExpression])
```

```javascript
for (initialExpression; condition; incrementExpression) {
  codeRuns;
}
```

Three parts:

1. initial value (50)
2. when to run the loop (60)
3. How to change each time. (+1)

```javascript
for (let i = 50; i <= 60; i++) {
  console.log("hello:", i);
}
// Print the perfect square number:
for (let i = 1; i < 10; i++) {
  console.log(`${i}x${i}=${i * i}`);
}
// Conuntdown:
for (let i = 10; i > -1; i--) {
  console.log(`T minus ${i},`);
}
// Countdown + liftoff:
for (let i = 10; i > -1; i--) {
  console.log(`T minus ${i}`);
}
console.log("Liftoff");
```

> "Avoid infinite loops"

## for loops and arrays

We use the `i` as index position, to loop through index positions and that way get the values:

```javascript
const animals = ["lion", "tiger", "monkey", "elephant"];

for (let i = 0; i < animals.length; i++) {
  console.log(i, animals[i]);
}
// 0 "lion"
// 1 "tiger"
// 2 "monkey"
// 3 "elephant"

// Combine two arrays:
const words1 = ["mail", "milk", "bath", "black"];
const words2 = ["box", "shake", "tub", "berry"];

for (let i = 0; i < words1.length; i++) {
  console.log(words1[i], words2[i]);
}
//mail box
//milk shake
//bath tub
//black berry
```

## Loop over array of objects:

```javascript
// Example 1:
const myGods = [
  {
    name: "Zeus",
    grade: 86,
  },
  {
    name: "Artemis",
    grade: 97,
  },
  {
    name: "Apollo",
    grade: 11,
  },
];
// Print name and  grade:
for (let i = 0; i < myGods.length; i++) {
  // Store `i` values in a variable:
  let god = myGods[i];
  // Access values:
  console.log(`Name: ${god.name}, grade: ${god.grade}`);
}
// Loop backwards:
for (let i = myGods.length - 1; i >= 0; i--) {
  let god = myGods[i];
  console.log(god.grade, god.name);
}

// Get the sum and average over array and object:

// Create variable outside the loop:
let totalGrades = 0;
// Now loop:
for (let i = 0; i < myGods.length; i++) {
  let god = myGods[i];
  totalGrades += god.grade;
}
let avg = totalGrades / myGods.length;
console.log(avg);

// Example 2:
// Declare array of objects:
const shoppingCart = [
  {
    product: "Jenga",
    price: 4.3,
    quantity: 1,
  },
  {
    product: "Echo dot",
    price: 54.56,
    quantity: 3,
  },
  {
    product: "Fire stick",
    price: 121322.34,
    quantity: 3,
  },
];

// Loop and Get total price and descrpn:
let productDetail = "";
let totalItems = 0;
let totalPrice = 0;
for (let i = 0; i < shoppingCart.length; i++) {
  let items = shoppingCart[i];
  productDetail += `${items.product}(${items.quantity}) `;
  totalItems += items.quantity;
  totalPrice += items.price;
}
console.log(
  `Products: ${productDetail}. \nTotal items: ${totalItems}.\nTotal price:$${totalPrice}\nHave a good one fucker!!`
);
```

## Loop over string

```javascript
const word = "stressed";
// Loop over word forward:
for (let i = 0; i < word.length; i++) {
  console.log(word[i]);
}

// Loop over word backwards
for (let i = word.length - 1; i >= 0; i--) {
  console.log(word[i]);
}

// Reverse word storing result in variable:
const word = "stressed out";
let reversedWord = "";
for (let i = word.length - 1; i >= 0; i--) {
  reversedWord += word[i];
}
console.log(reversedWord);
```

## Nested loops

```javascript
let puteadas = ["sorete", "conchuda", "pajero"];

for (let i = 0; i <= 10; i++) {
  console.log(i);
  for (let j = 0; j < puteadas.length; j += 2) {
    console.log(puteadas[j]);
  }
}
```

### Loop over nested arrays:

```javascript
const gameBoard = [
  [4, 32, 8, 4],
  [64, 8, 32, 2],
  [8, 32, 16, 4],
  [2, 8, 4, 2],
];

let totalScore = 0;
//Access each row:
for (let i = 0; i < gameBoard.length; i++) {
  let row = gameBoard[i];
  // Access each item in rows and sum them:
  for (let j = 0; j < row.length; j++) {
    totalScore += row[j];
  }
}
// print result:
console.log(totalScore);

// Sum each row:
const magicSquare = [
  [2, 7, 5],
  [9, 23, 3],
  [4, 3, 8],
];

for (let i = 0; i < magicSquare.length; i++) {
  let row = magicSquare[i];
  let sum = 0;
  for (let j = 0; j < row.length; j++) {
    sum += row[j];
  }
  console.log(`${row} summed to ${sum}`);
}
```

## while

```javascript
while (true) {
  run code }; //While (condition is true){run the code}.
```

Use it when you need a loop and don't know how many times it will run.
It's like an `if` statement but with a loop.  
Syntax:

```javascript
//Declare variable outside:
let pepino = 5;
//Declare loop:
while (pepino <= 20) {
  console.log(pepino);
  pepino += 3;
}
console.log("after");
```

In a game, you don't know when the loop will end, so you code a while:
`while(livesLeft > 0){}`

```javascript
// Guessing game for machines:

const target = Math.floor(Math.random() * 10);
let guess = Math.floor(Math.random() * 10);

while (guess !== target) {
  console.log(`Target: ${target} Guess: ${guess}`);
  guess = Math.floor(Math.random() * 10);
}
console.log(`Target: ${target} Guess: ${guess}`);
console.log("Machine wins");
```

### `break;` keyword

To stop loops.

```javascript
const target = Math.floor(Math.random() * 10);
let guess = Math.floor(Math.random() * 10);
while (true) {
  if (target === guess) break;
  console.log(`Target: ${target} Guess: ${guess}`);
  guess = Math.floor(Math.random() * 10);
}
console.log(`Target: ${target} Guess: ${guess}`);
console.log("Machine wins");
```

## `for...of`

<a name="forof"></a>

```javascript
for (let some of something) {
  console.log(some);
}
```

Works only on iterable things (arrays, strings). NOT WITH OBJECTS (because these are not iterable).
Don't use it if index position is needed (use traditional for loop in that case)
Internet explorer not suported.

`for (variable of iterable) { statement }`

```javascript
let subreddits = ["soccer", "popheads", "cringe", "books"];

for (let sub of subreddits) {
  console.log(sub);
}
```

This won't give the index position of items (as for loops do) .

```javascript
//for...of over string:
for (let char of "fsdfdsfsdffƒ") {
  console.log(char.toUpperCase());
}

// over variable:
const chala = "chalalalalmememalala";
for (let char of chala) {
  console.log(char);
}
```

`for...of` in nested arrays:

```javascript
const magicSquare = [
  [2, 7, 5],
  [9, 23, 3],
  [4, 3, 8],
];
for (let row of magicSquare) {
  let sum = 0;
  for (let num of row) {
    sum += num;
  }
  console.log(`${row} summed to ${sum}`);
}
```

`for...of` in objects:
Objects are not iterable, so we can't loop over them. We can however loop over an object with a method `Object.keys(objectName)`.

```javascript
const movieReviews = {
  Arrival: 4.3,
  Alien: 9,
  "Kill Bill": 8,
  "In Bruges": 4,
};

// This is the Object method:
Object.keys(movieReviews); // ["Arrival", "Alien", "Kill Bill", "In Bruges"]
Object.values(movieReviews); // [4.3, 9, 8, 4]

// Use Object method in loop:
for (let movie of Object.keys(movieReviews)) {
  // print the key and the value:
  console.log(movie, movieReviews[movie]);
}
// Arrival 4.3
// Alien 9
// Kill Bill 8
// In Bruges 4
// -----------
// Calculate the average of all ratings:
const ratings = Object.values(movieReviews);
let sum = 0;
for (let r of ratings) {
  sum += r;
}
avg = sum / ratings.length;
console.log(`Avg is: ${avg}`);
```

## `for...in`

<a name="forin"></a>

Iterates over all enumerable properties of an object <ins>that are keyed by strings</ins>.

```javascript
const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}
// expected output:
// "a: 1"
// "b: 2"
// "c: 3"
//--------------
// Sum multiple values:
total = 0;
for (val in object) {
  total += object[val];
}
console.log(`Total: ${total}`); // Total: 6.
```

## ex

fdsafa
