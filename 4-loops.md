# Loops

[for](##for)  
[Nested](##Nested_loops)
[while](##while_loops)  
[`break;`\_keyword](###`break;`_keyword)
[for...of](##forof)  
[Nested_for...of](###Nested_for...of)
[for...0f_Object.keys](###for...0f_Object.keys)  
[for...in](##forin)

1. ## for loops:

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

### for loops in arrays

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

### Loop over array of objects:

```javascript
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
for (let i = 0; i < myGods.length; i++) {
  let god = myGods[i];
  console.log(`Name: ${god.name}, grade: ${god.grade}`);
} // Name: Zeus, grade: 86
  // Name: Artemis, grade: 97
} // Name: Apollo, grade: 11

// Loop backwards:
for (let i = myGods.length - 1; i >= 0; i--) {
  let god = myGods[i];
  console.log(god.grade, god.name);
}
/*
11 "Apollo"
97 "Artemis"
86 "Zeus"
*/
```

Loop and calculate average:

```javascript
let totalGrades = 0;
for (let i = 0; i < myGods.length; i++) {
  let god = myGods[i];
  totalGrades += god.grade;
}

let avg = totalGrades / myGods.length;
console.log(avg); // 64.666666
```

### Loop over string

```javascript
const word = "stressed";
// forward:
for (let i = 0; i < word.length; i++) {
  console.log(word[i]);
} // stressed

// backwards
for (let i = word.length - 1; i >= 0; i--) {
  console.log(word[i]);
} // desserts

// Reverse phrase:
const word = "stressed out";
let reversedWord = "";
for (let i = word.length - 1; i >= 0; i--) {
  reversedWord += word[i];
}
console.log(reversedWord); // tuo desserts
```

---

## Nested_loops

### Nested Loop over nested array:

Access items in nested arrays:

```javascript
let matrix = [
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
];

for (let i = 0; i < matrix.length; i++) {
  let subArr = matrix[i];
  console.log(subArr);
  for (let j = 0; j < subArr.length; j++) {
    console.log(subArr[j]);
  }
}
/*
["a", "b", "c"]
a
b
c
["d", "e", "f"]
d
e
f
["g", "h", "i"]
g
h
i
*/
```

Access each row and each item in row, and sum them:

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
  // Store row items:
  let row = gameBoard[i];
  // Access each item in rows and sum them:
  for (let j = 0; j < row.length; j++) {
    totalScore += row[j];
  }
}
console.log(totalScore); // 230
```

## while_loops

> "While condition is true, run code."

It's like an `if` statement but with a loop.  
Use it when you need a loop and don't know how many times it will run.

```javascript
let bullets = 3;

while (bullets > 0) {
  console.log("pum!");
  bullets -= 1;
} // pum! pum! pum!
```

### `break;`\_keyword

To stop loops.

```javascript
const target = Math.floor(Math.random() * 10);
let guess = Math.floor(Math.random() * 10);
while (true) {
  if (target === guess) break;
  guess = Math.floor(Math.random() * 10);
}
console.log(`Target: ${target} Guess: ${guess}`);
console.log("Machine wins");
/* 
Target: 7 Guess: 2
Target: 7 Guess: 7
Machine wins
*/
```

---

## `for...of`

Works only on iterable things (arrays, strings). NOT WITH OBJECTS (because these are not iterable).
Don't use it if index position is needed (use traditional for loop in that case)
Internet explorer not suported.

```javascript
for (let some of something) {
  console.log(some);
}
```

```javascript
let subreddits = ["soccer", "popheads", "cringe", "books"];

for (let sub of subreddits) {
  console.log(sub);
}
// soccer, popheads, cringe, books
```

This won't give the index position of items.

```javascript
//over string:
for (let char of "chala") {
  console.log(char.toUpperCase());
} // CHALA

// over variable:
const neta = "neta";
for (let char of neta) {
  console.log(char);
} // neta
```

### Nested_for...of

In nested arrays:

```javascript
const magicSquare = [
  [2, 7, 5],
  [9, 23, 3],
  [4, 3, 8],
];
// Jump over arrays
for (let row of magicSquare) {
  let sum = 0;
  // jump over items of array:
  for (let num of row) {
    sum += num;
  }
  console.log(`${row} summed to ${sum}`);
}
/*
2,7,5 summed to 14
9,23,3 summed to 35
4,3,8 summed to 1
*/
```

### for...0f_Object.keys

Objects are not iterable, so we can't loop over them. We can however loop over an object with `Object.keys()` and
`Object.values()`, and will get an array of keys or values.

```javascript
const movieReviews = {
  Arrival: 4.3,
  Alien: 9,
  "Kill Bill": 8,
  "In Bruges": 4,
};
Object.keys(movieReviews); // ["Arrival", "Alien", "Kill Bill", "In Bruges"]
Object.values(movieReviews); // [4.3, 9, 8, 4]
```

Loop over Object.keys:

```javascript
for (let movie of Object.keys(movieReviews)) {
  console.log(movie, movieReviews[movie]);
}
// Arrival 4.3
// Alien 9
// Kill Bill 8
// In Bruges 4
```

---

## `for...in`

Objects are not iterable, but for..in will iterate over the keys of the object.
(Remember that all object's keynames are treated as strings)

```javascript
const object = { a: 1, b: 2, c: 3 };

for (const prop in object) {
  console.log(prop); /// a, b, c
  console.log(object[prop]); // 1, 2, 3
}
```

Sum multiple values:

```javascript
total = 0;
for (val in object) {
  total += object[val];
}
console.log(total); // 6.
```

If used over array or string, for...in will throw index positions only.
