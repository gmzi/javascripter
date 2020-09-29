# toolkit

[pwd](##password_function)
[avg](##average)
[pangram](##pangram_check)
[random_itm](##PICK_RANDOM_ITEM_FROM_ARRAY:)
[random_card](## GENERATE*CARD_WITH_RANDOM_VALUE_AND_SUIT:)
[dupl_arr](## ARR_with_duplicate_values:)
[calculator](## CALCULATOR*(ARRAY OF FUNCTIONS))
[random_pick](## PICK_ONE_OF_TWO:)
[check_range](## CHECK_RANGE)

---

[periphrasis](##periphrasis)

[indexOf](###indexOf)
[lastIndexOf](###lastIndexOf)
[push](###push)
[pop](###pop)
[unshift](###unshift)
[shift](###shift)
[reverse](###reverse)

## password_function

Write a isValidPassword function
It accepts 2 arguments: password and username
Password must: - be at least 8 characters

- cannot contain spaces
- cannot contain the username
  If all requirements are met, return true.
  therwise: false

isValidPassword('89Fjj1nms', 'dogLuvr'); //true
isValidPassword('dogLuvr123!', 'dogLuvr') //false
isValidPassword('hello1', 'dogLuvr') //false

MY SOLUTION:

```javascript
function isValidPassword(password, username) {
  return (
    password.length >= 8 &&
    !password.includes(" ") &&
    !password.includes(username)
  );
}

console.log(isValidPassword("he", "dogLuvr"));
```

## average

Avg value of array of numbers

// Write a function to find the average value in an array of numbers
//avg([0,50]) //25
//avg([75,76,80,95,100]) //85.2

```javascript
function avg(arr) {
  let total = 0;
  let average = 0;
  for (let num of arr) {
    total += num;
  }
  return total / arr.length;
}

console.log(avg([0, 50]));

//---CONVERT STRING INTO ARRAY
function convertStringToArray(string) {
  resultArray = [];
  for (let char of string) {
    resultArray.push(char);
  }
  return resultArray;
}
console.log(convertStringToArray("2,3,4,5,6,7,8,9,10,J,Q,K,A"));
```

## pangram_check

// A pangram is a sentence that contains every letter of the alphabet, like:
//"The quick brown fox jumps over the lazy dog"

// Write a function called isPangram, which checks to see if a given sentence
//contains every letter of the alphabet. Make sure you ignore string casing!

// isPangram('The five boxing wizards jump quickly') //true
// isPangram('The five boxing wizards jump quick') //false

```javascript
function isPangram(sentence) {
  let cleanSentence = sentence.toLowerCase();
  for (let char of "abcdefghijklmnopqrstuvwxyz") {
    if (!cleanSentence.includes(char)) {
      return false;
    }
  }
  return true;
}
console.log(isPangram("The five boxing wizards jump quicklY"));
```

## PICK_RANDOM_ITEM_FROM_ARRAY:

```javascript
function randomPicker(arr) {
let num = Math.floor(Math.random() \* arr.length);
return arr[num];
}
```

## GENERATE_CARD_WITH_RANDOM_VALUE_AND_SUIT:

```javascript
function getCard() {
  let card = {
    value: "",
    suit: "",
  };
  let allValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  let allSuits = ["clubs", "spades", "hearts", "diamonds"];
  card.value = randomPicker(allValues);
  card.suit = randomPicker(allSuits);
  return card;
}
console.log(getCard());
```

## ARR_with_duplicate_values:

GENERATE ARRAY THAT DUPLICATES VALUES OF GIVEN ARRAY:

```javascript
function doubleArr(arr) {
const doubled = [];
for (let num of arr) {
doubled.push(num \* 2);
}
return doubled;
}
console.log(doubleArr([6, 10]));
```

## CALCULATOR\_(ARRAY OF FUNCTIONS)

```javascript
// Declare all the functions:
function add(x, y) {
return x + y;
}

const substract = function (x, y) {
return x - y;
};

function multiply(x, y) {
return x \* y;
}

const divide = function (x, y) {
return x / y;
};

//Store them in an array:
const operations = [add, substract, multiply, divide];

// Call a function by index position:
operations[3](54, 3);
```

## PICK_ONE_OF_TWO:

```javascript
function pickOne(f1, f2) {
  let num = Math.random();
  if (num <= 0.5) {
    return f1;
  }
  return f2;
}
```

## CHECK_RANGE

```javascript
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
```

## periphrasis

### indexOf

```javascript
function indexOf(arr, num) {
  for (let i = 0; i <= arr.length; i++) {
    if (num === arr[i]) {
      return i;
    }
  }
  return -1;
}
```

### lastIndexOf

```javascript
// -----lastIndexOf() periphrasis:
function lastIndexOf(arr, num) {
  for (let i = arr.length - 1; i > 0; i--) {
    if (num === arr[i]) {
      return i;
    }
  }
  return -1;
}
```

### push

```javascript
function push(arr, val) {
  arr[arr.length] = val;
  return arr.length;
}

var arr = [1, 2, 3];
console.log(push(arr, 10)); // 4
```

### pop

```javascript
function pop(arr) {
  //1. grab the index position:
  let lastLen = arr.length - 1;
  //2. grab the value:
  let lastValue = arr[lastLen];
  //3. operate over the array:
  arr.splice(lastLen, 1);
  //4. return the grabbed value in step 1:
  return lastValue;
}

var emptyArr = ["a", "b", "c", "d", "e"];
console.log(emptyArr);
console.log(pop(emptyArr)); // undefined
console.log(emptyArr); // 0
```

### unshift

```javascript
function unshift(arr, val) {
  arr.splice(0, 0, val);
  return arr.length;
}
var arr = [1, 2, 3];
console.log(unshift(arr, 0)); //4
console.log(arr); //[0, 1, 2, 3]
```

### shift

```javascript
function shift(arr) {
  //grab indx position:
  firstIdx = arr.length - arr.length;
  //grab value:
  let firstValue = arr[firstIdx];
  //operate over arr:
  arr.splice(firstIdx, 1);
  // return grabbed value:
  return firstValue;
}

let arri = [12, 23, 34];
console.log(arri);
console.log(shift(arri));
console.log(arri);
```

### reverse

```javascript
function reverse(arr) {
  for (let i = 0; i < arr.length; i++) {
    let value = arr.pop();
    arr.splice(i, 0, value);
  }
  return arr;
}

var arru = ["a", "b", "c", "d", "e", "f", "g"];
console.log(reverse(arru));
```
