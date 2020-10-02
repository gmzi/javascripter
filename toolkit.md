# toolkit

[pwd](##password_function)  
[avg](##average)  
[str_to_arr](###str_to_arr)  
[pangram](##pangram_check)  
[random_itm](##PICK_RANDOM_ITEM_FROM_ARRAY:)  
[random_card](##GENERATE_CARD_WITH_RANDOM_VALUE_AND_SUIT:)  
[dupl_arr](##ARR_with_duplicate_values:)  
[calculator](##CALCULATOR_ARRAY_OF_FUNCTIONS)  
[random_pick](##PICK_ONE_OF_TWO)  
[check_range](##CHECK_RANGE)  
[squaredEvenNumbers](###squaredEvenNumbers)  
[countValueOccurence](###countValueOccurence)  
[generatePairs](###generatePairs)  
[multiples](###multiples)  
[twoHighest](###twoHighest)
[countNumbers](###countNumbers)
[totalCaps](###totalCaps)

---

#### periphrasis of methods

[indexOf](###indexOf)  
[lastIndexOf](###lastIndexOf)  
[push](###push)  
[pop](###pop)  
[unshift](###unshift)  
[shift](###shift)  
[reverse](###reverse)  
[concat](###concat)  
[Math.max](###Math.max)  
[Math.min](###Math.min)  
[slice](###slice)  
[sort](###twoHighest)

---

#### Objects

[Object.keys](###Object.keys)  
[Object.values](###Object.values)  
[Object.entries](###Object.entries)
[swapKeyValue](###swapKeyValue)  
[swapKeyAndGivenValue](###swapKeyAndGivenValue)  
[minMaxKeyInObject](###minMaxKeyInObject)
[pluckObject](###pluckObject)
[stringFromObject](###stringFromObject)
[objectToQueryString](###objectToQueryString)

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
```

### str_to_arr

```javascript
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

a sentence that contains every letter of the alphabet, like:
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

return index position of item.

```javascript
function indexOf(arr, item) {
  for (let i = 0; i <= arr.length; i++) {
    if (item === arr[i]) {
      return i;
    }
  }
  return -1;
}

console.log(indexOf([1, 5, 9, "a"], "a")); // 3
```

### lastIndexOf

Return last index position of given item

```javascript
function lastIndexOf(arr, item) {
  for (let i = arr.length - 1; i > 0; i--) {
    if (item === arr[i]) {
      return i;
    }
  }
  return -1;
}

console.log(lastIndexOf(["a", "f", "h"], "h")); // 2
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

### concat

(not checked with teacher)

```javascript
function concat(arr1, arr2) {
  let resultArr = [];
  for (let char of arr1) {
    resultArr.push(char);
  }
  for (let char of arr2) {
    resultArr.push(char);
  }
  return resultArr;
}

let arri = [1, 2, 3];
let arru = ["a", "b", "c"];

console.log(concat(arru, arri));
```

### Math.max

Return the highest number of an array.

```javascript
function max(arr) {
  arr.sort((a, b) => a - b);
  return arr[arr.length - 1];
}

console.log(max([5, 1, 4, 7, 1, 2]));
```

### Math.min

Return the lowest number of array.

```javascript
function min(arr) {
  arr.sort((a, b) => a - b);
  return arr[0];
}
```

### slice

```javascript
function slice(arr, num1, num2) {
  let result = [];
  let averga = [];
  if (num2 > arr.length || num2 === undefined || !num2) {
    for (let i = num1; i < arr.length; i++) {
      result.push(arr[i]);
    }
    return result;
  }
  for (let i = num1; i < num2; i++) {
    result.push(arr[i]);
  }
  return result;
}

console.log(slice([1, 2, 3, 4, 5], 0, 2));
```

### squaredEvenNumbers

```javascript
function squaredEvenNumbers(arr) {
  let evenNums = [];
  let squared = 0;
  // Grab evenNums numbers from arr and store them in `evenNums`:
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenNums.push(arr[i]);
    }
  }
  // operate over the evenNums numbers and store the result in `squared`:
  for (let char of evenNums) {
    squared += char * char;
  }
  // return one single number;
  return squared;
}
```

### Object.keys

```javascript
function keys(obj) {
  let objKeys = [];
  for (let key in obj) {
    objKeys.push(key);
  }
  return objKeys;
}

var obj1 = { a: 1, b: 2, c: 3 };
console.log(keys(obj1));
```

### Object.values

```javascript
function values(obj) {
  let allVals = [];
  for (const val in obj) {
    allVals.push(obj[val]);
  }
  return allVals;
}

var obj = { a: 1, b: 2, c: 3 };
console.log(values(obj)); // [1,2,3]
```

### swapKeyValue

```javascript
function swapKeyAndValue(obj) {
  let newObj = {};
  for (let key in obj) {
    newObj[obj[key]] = key;
  }
  return newObj;
}

var instructor = { name: "Elie", job: "Instructor" };

console.log(swapKeyAndValue(instructor));
// {Elie: "name", Instructor: "job"};
```

### swapKeyAndGivenValue

```javascript
function swapKeyAndGivenValue(obj, keyVal) {
  // Create empty object that will receive the properties:
  let newObj = {};
  // Loop over obj:
  for (let key in obj) {
    // store obj properties in newObj:
    newObj[key] = obj[key];
    // find the key that matches with `keyVal`
    if (key.includes(keyVal)) {
      // swap key and value:
      newObj[obj[keyVal]] = keyVal;
    }
  }
  // delete repeated property, accessing it by keyname:
  delete newObj[keyVal];
  return newObj;
}

var instructor = { name: "Elie", job: "Instructor" };
console.log(swapKeyAndValue(instructor, "name"));
// {Elie: "name", job: "Instructor"}
```

### Object.entries

Loop over object and extract keys and values separatedly, then merge keys and values in one single array of nested properties.

```javascript
function entries(obj) {
  // create arrays to store results:
  let objKeys = [];
  let objVals = [];
  // loop over obj and store keys in nested arrays:
  for (let key in obj) {
    objKeys.push([key]);
  }
  // loop over obj and store values:
  for (let val in obj) {
    objVals.push(obj[val]);
  }
  // loop over values and push them into the keys nested arrays:
  for (let i = 0; i < objVals.length; i++) {
    objKeys[i].push(objVals[i]);
  }
  return objKeys;
}

var obj = { a: 1, b: 2, c: 3 };
console.log(entries(obj));
// [["a",1], ["b",2], ["c",3]]
```

### countValueOccurence

Counts number of appearances of a given value in given array.

```javascript
function countValueOccurence(arr, num) {
  let counter = [];
  for (let char of arr) {
    if (char === num) {
      counter.push(char);
    }
  }
  return counter.length;
}

console.log(countValues([4, 1, 4, 2, 3, 4, 4], 4)); // 4
```

### generatePairs

Given an int, generate pairs in nested arrays with nested loops:

```javascript
function generatePairs(int) {
  // variable to store the generated values:
  let pairs = [];
  // two loops, one for each side of the nested arrays:
  for (let i = 0; i <= int; i++) {
    for (let j = i; j <= int; j++) {
      // push both values, left and right, at the same time, otherwise it would create an array for each of them:
      pairs.push([i, j]);
    }
  }
  return pairs;
}

console.log(generatePairs(1)); // [ [0, 0], [0, 1], [1,1]]
```

### multiples

Returns n first multiples of x number:

```javascript
function multiples(x, n) {
  let result = [];
  for (let i = 1; i <= n; i++) {
    result.push(x * i);
  }
  return result;
}
console.log(multiples(2, 5)); // [3, 6, 9, 12])
```

### pluckObject

Extract given key value from array of objects

```javascript
function pluck(arr, keyname) {
  let vals = [];
  for (let key in arr) {
    vals.push(arr[key][keyname]);
  }
  return vals;
}

let alumni = [
  { name: "Tim", school: "ffff" },
  { name: "Matt", school: "aaaaa" },
  { name: "Elie", school: "nnnnn" },
];
console.log(pluck(alumni, "name")); // ["Tim", "Matt", "Elie"]
```

### twoHighest

Get the two highest numbers of array:

```javascript
function twoHighest(arr) {
  // Loop over `arr` and copy it in variable:
  let allIn = [];
  for (let num of arr) {
    allIn.push(num);
  }
  // now work on `arr`s copy,
  // find and store the highest number:
  let highest = Math.max(...allIn);
  // find and store the idx position of highest:
  let idxHighest = arr.indexOf(highest);
  // remove the highest number from the array:
  allIn.splice(idxHighest, 1);
  // find and store the second highest number:
  let scndHigh = Math.max(...allIn);
  // return secondHigh and Highest:
  return [scndHigh, highest];
}

console.log(twoHighest([1, 2, 10, 8])); // [8,10]
```

### minMaxKeyInObject

Extract object's keynames and sorts them.

```javascript
function minMaxKeyInObject(obj) {
  // Extract and store all keynames from object (will be already sorted from lowest to highest)
  let allkeys = Object.keys(obj);
  // Variable to store loop result:
  let allArr = [];
  // Loop over keynames and convert them to numbers:
  for (let i = 0; i < allkeys.length; i++) {
    allArr.push(parseInt(allkeys[i]));
  }
  // Work on the arr to return lowest and highes keyname only:
  allArr.splice(1, allArr.length - 2);
  return allArr;
}

console.log(minMaxKeyInObject({ 2: "a", 7: "b", 1: "c", 10: "d", 4: "e" }));
// [1, 10]
```

### stringFromObject

Scans object properties and returns a string literal with key and value pairs in form of string, all separated by separated commas except the last one.

```javascript
function stringFromObject(obj) {
  let propString = "";
  for (let prop in obj) {
    propString += `${prop} = ${obj[prop]}, `;
  }
  let result = propString.slice(0, propString.length - 2);
  return result;
}

console.log(
  stringFromObject({ name: "Elie", job: "Instructor", isCatOwner: false })
);
// "name = Elie, job = Instructor, isCatOwner = false"
```

### objectToQueryString

Converts object into queryString, looping over object keys and values, when value is an array, loops into the array to return the values into the string separated by "&".

```javascript
function objectToQueryString(obj) {
  // place to store keys and values when looping:
  let qstring = "";
  // loop over object to extract keys and values:
  for (let prop in obj) {
    // Capture the array if there's one:
    if (typeof obj[prop] === "object") {
      // loop inside the array to extract it's values:
      for (let num of obj[prop]) {
        // push values into main storage with string literal:
        qstring += `${prop}=${num}&`;
      }
    } else {
      // capture the regular keys and values and store them in a string literal
      qstring += `${prop}=${obj[prop]}&`;
    }
  }
  // slice the last `&` from the string literal:
  result = qstring.slice(0, qstring.length - 1);
  return result;
}

console.log(objectToQueryString({ bar: [2, 3], foo: 1 }));
// bar=2&bar=3&foo=1
```

### countNumbers

In an array of strings, finds numbers as strings and convert
them to numbers datatype, and return their quantity.

```javascript
function countNumbers(arr) {
  let isNumber = [];
  // loop over arr:
  for (let char of arr) {
    // "if char can be parsedInt, or if char is 0, push it to
    //`isNumber`":
    if (parseInt(char) || parseInt(char) === 0) {
      isNumber.push(char);
    }
  }
  return isNumber.length;
}

console.log(countNumbers(["4", "1", "0", "NaN"])); // 3
```

### totalCaps

Nested loops that access each character in an array of words. Grabs the capitalized characters and stores them in a variable, returns the number of capitalized characters in given array.

```javascript
function totalCaps(arr) {
  // variable to store the loop:
  let allUppercase = [];
  // first loop goes over each word:
  for (let i = 0; i < arr.length; i++) {
    // nested loop to go over each character of each word
    for (let j = 0; j < arr[i].length; j++) {
      // Capture capitalized characters inside words, accessing them by the index of
      // the loops
      if (arr[i][j] === arr[i][j].toUpperCase()) {
        // push capitalized characters into variable for its count:
        allUppercase.push(arr[i][j]);
      }
    }
  }
  //count total and return:
  return allUppercase.length;
}
console.log(totalCaps(["AwesomE", "ThIngs", "hAppEning", "HerE"])); // 8
```

### rankingOfNumbers

Returns the ranking of the numbers given in the array, in a new array.

```javascript
function rankingOfNumbers(arr) {
  let ranked = [];
  // make a copy of the array, so as to not alter the given order of items
  // when sorting:
  for (let num of arr) {
    ranked.push(num);
  }
  // now sort over the copy, the index position+1 will be equivalent to
  // the ranking of each item.
  ranked.sort((a, b) => b - a);
  // now loop over each item of `arr` (and therefore preserve it's order
  // of appearance) and assign to it the index position they have in the
  // sorted copy + 1:
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(ranked.indexOf(arr[i]) + 1);
  }
  // return the index position+1 in `ranked` of each element of `arr`,
  // expressing the ranking of each item.
  return result;
}

console.log(rankings([10, 5, 20])); // [2, 3, 1]
```
