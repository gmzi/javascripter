# toolkit

## Functions

[frequency_counters_and_multiple_pointers](##frequency_counters_and_multiple_pointers)

[binary_search](##binary_search)
[linear_search](##linear_search)

[decimal_places](###decimal_places)  
[pwd](##password_function)  
[avg](##average)  
[string_to_array](###string_to_array)  
[array_to_string](###array_to_string)  
[pangram](##pangram_check)  
[isPalindrome](###isPalindrome)  
[isValidAnagram](###isValidAnagram)
[alphabetical](###alphabetical)  
[first_letter_uppercase](###first_letter_uppercase)  
[snake_to_camel](###snakeToCamelCase)
[longest_word](###longest_word)  
[num_of_vowels](###num_of_vowels)
[vowelCount](###vowelCount)
[vowelCountWithMap](###vowelCountWithMap)  
[containsVowels](###containsVowels)  
[str_letter_count](###str_letter_count)
[letterCount](###letterCount)
[character_count](###character_count)
[grid_star](###grid_star)

[swap_variables](###swap_variables)  
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
[lowest_number](###lowest_number)
[lowest_number_with_reduce](###lowest_number_with_reduce)  
[countNumbers](###countNumbers)  
[totalCaps](###totalCaps)  
[subset_of_str](###subset_of_str)  
[multiplesOf](###multiplesOf)  
[testPrime](###testPrime)  
[sumRows](###sumRows)
[Guessing_game](###Guessing_game)
[filterByType](###filterByType)
[SPIRAL_MATRIX](###SPIRAL_MATRIX)

---

### Higher order functions

[Function_picker](###Function_picker)
[range_checker](###range_checker)
[timer](###timer)
[countdown](###countdown)
[randomGame](###randomGame)
[removeDuplicates](###removeDuplicates)
[removeDuplicates_from_array](###removeDuplicates_from_array)  
[removeFromArray](###removeFromArray)

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
[addKeyAndValue](###addKeyAndValue)  
[Object.entries](###Object.entries)  
[swapKeyValue](###swapKeyValue)  
[swapKeyAndGivenValue](###swapKeyAndGivenValue)  
[minMaxKeyInObject](###minMaxKeyInObject)  
[pluckObject](###pluckObject)  
[pluck_object_reduce](###pluck_object_reduce)  
[stringFromObject](###stringFromObject)  
[objectToQueryString](###objectToQueryString)  
[findByValue](###findByValue)
[shoppingCart](###shoppingCart)
[map](###map)

## HTML, CSS and Javascript combined

[Add_and_remove_classes.](##Add_and_remove_classes.)
[checkboxes]

## Cool things

[backgroundColorPicker](###backgroundColorPicker)
[colorMaker](###colorMaker)

## frequency_counters_and_multiple_pointers

Problems applying frequency counters and multiple pointers

```javascript
/**
 Write a function called averagePair. Given a sorted array of integers and a target average, 
 determine if there is a pair of values in the array where the average of the pair equals the target average. 
 There may be more than one pair that matches the average target.
Constraints:
Time Complexity: O(N)
 */

function averagePair(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const avg = arr[left] + arr[right] / 2;
    if (avg === target) {
      console.log([arr[left], arr[right]]);
      return true;
    } else if (avg > target) {
      right--;
    } else {
      left++;
    }
  }
  return false;
}

// console.log(averagePair([1, 2, 3], 2.5)); // true
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false
console.log(averagePair([], 4)); // false

module.exports = { averagePair };

/**
 * Write a function called constructNote, which accepts two strings, a message and some letters. 
 * The function should return true if the message can be built with the letters that you are given; 
 * otherwise, it should return false. Assume that there are only lowercase letters and no space or special characters 
 * in both the message and the letters.
Constraints:
Time Complexity: O(M + N) - If M is the length of message and N is the length of letters:
 */

function constructNote(message, letters) {
  if (!letters.length) return false;
  const messageF = frequencyCounter(message);
  const lettersF = frequencyCounter(letters);

  for (let [key, value] of messageF) {
    if (value > lettersF.get(key)) {
      return false;
    }
  }
  return true;
}

function frequencyCounter(str) {
  let frequencies = new Map();

  for (let char of str) {
    let charCount = frequencies.get(char) || 0;
    frequencies.set(char, charCount + 1);
  }
  return frequencies;
}

module.exports = { constructNote };

// console.log(constructNote('aa', 'abc')); // false
// console.log(constructNote('abc', 'dcba')); // true
// console.log(constructNote('aabbcc', 'bcabcaddff')); // true

// Given an array of integers, and a number, find the number of pairs of integers in the array whose
// sum is equal to the second parameter. You can assume that there will be no duplicate values in the array.
//Constraints
// Time Complexity - O(N * log(N))

function countPairs(arr, target) {
  arr.sort((a, b) => a - b);
  let result = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      console.log(arr[left], arr[right]);
      result++;
      right--;
      left++;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return result;
}

module.exports = { countPairs };

// // console.log(countPairs([10, 4, 8, 2, 6, 0], 10)); // 3 (2,8, 4,6,) 10,0)
// // console.log(countPairs([3, 1, 5, 4, 2], 6)); // 2 (1,5 an)d 2,4)
// // console.log(countPairs([4, 6, 2, 7], 10)); // 1 (4),6)
// console.log(countPairs([1, 2, 3, 4, 5], 10)); // 0
// console.log(countPairs([1, 2, 3, 4, 5], -3)); // 0
// console.log(countPairs([0, -4], -4)); // 1
console.log(countPairs([1, 2, 3, 0, -1, -2], 0)); // 2

/**
 * Write a function called isSubsequence which takes in two strings and checks whether the 
 * characters in the first string form a subsequence of the characters in the second string. 
 * In other words, the function should check whether the characters in the first string appear 
 * somewhere in the second string, without their order changing.
Constraints:
Time Complexity - O(N + M)

 */
function isSubsequence(str1, str2) {
  let idx1 = 0;
  let idx2 = 0;

  while (idx2 < str2.length) {
    if (str2[idx2] === str1[idx1]) {
      idx1++;
    }
    if (idx1 === str1.length) return true;
    idx2++;
  }
  return false;
}

module.exports = { isSubsequence };

// console.log(isSubsequence('hello', 'hello world')); // true
// console.log(isSubsequence('sing', 'sting')); // true
// console.log(isSubsequence('abc', 'abracadabra')); // true
console.log(isSubsequence('abc', 'acb')); // fa)lse (order matters)

// Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

const { stringify } = require('jest-matcher-utils');

function sameFrequency(num1, num2) {
  const num1F = countFrequency(num1);
  const num2F = countFrequency(num2);

  for (let [key, value] of num1F) {
    if (value !== num2F.get(key)) return false;
  }
  return true;
}

function countFrequency(num) {
  const iterable = stringify(num);
  let count = new Map();

  for (let char of iterable) {
    const countFreq = count.get(char) || 0;
    count.set(char, countFreq + 1);
  }
  return count;
}

module.exports = { sameFrequency };

// console.log(sameFrequency(182, 281)); // true
console.log(sameFrequency(34, 14)); // false
// console.log(sameFrequency(3589578, 5879385)); // true
// console.log(sameFrequency(22, 222)); // false

const { moduleExpression } = require('@babel/types');

/**
 * Write a function called separatePositive which accepts an array of non-zero integers. Separate the positive integers to
 * the left and the negative integers to the right. The positive numbers and negative numbers need
 * not be in sorted order. The problem should be done in place (in other words, do not build a copy of the input array).
 */
function separatePositive(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    if (arr[left] < 0 && arr[right] > 0) {
      // old swap:
      //   let temp = arr[left];
      //   arr[left] = arr[right];
      //   arr[right] = temp;
      // new swap:
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    } else if (arr[left] < 0 && arr[right] < 0) {
      right--;
    } else {
      left++;
    }
  }
  return arr;
}

module.exports = { separatePositive };

console.log(separatePositive([2, -1, -3, 6, -8, 10])); // [2, 10, 6, 3, -1, -8]
// console.log(separatePositive([5, 10, -15, 20, 25])); // [5,10, 25, 20, -15]
// console.log(separatePositive([-5, 5])); // [5, -5]
// console.log(separatePositive([1, 2, 3])); // [1, 2, 3]

/**
 * Write a function called twoArrayObject which accepts two arrays of varying lengths.The first
 * array consists of keys and the second one consists of values. Your function should return an object
 *  created from the keys and values. If there are not enough values, the rest of keys should have a
 * value of null. If there not enough keys, just ignore the rest of values.
 */
function twoArrayObject(keys, values) {
  const keysF = frequencyCounter(keys);

  let idx = 0;
  for (let key in keysF) {
    if (idx < values.length) {
      keysF[key] = values[idx];
      idx++;
    }
  }
  return keysF;
}

function frequencyCounter(arr) {
  let frequencies = {};

  for (let val of arr) {
    let valCount = frequencies[val] || 0;
    frequencies[val] = null;
  }
  return frequencies;
}

module.exports = { twoArrayObject };

console.log(twoArrayObject(['a', 'b', 'c', 'd'], [1, 2, 3])); // {'a': 1, 'b': 2, 'c': 3, 'd': null}
// console.log(twoArrayObject(['a', 'b', 'c'], [1, 2, 3, 4])); // {'a': 1, 'b': 2, 'c': 3}
// console.log(twoArrayObject(['x', 'y', 'z'], [1, 2])); // {'x': 1, 'y': 2, 'z': null}

/* 
Write a function called pivotIndex which accepts an array of integers, and returns the pivot index where the sum of the items to the left equal to the sum of the items to the right. If there are more than one valid pivot index, return the smallest value.
**/
function pivotIndex(nums) {
  let rightSum = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  let pivotIdx = -1;
  for (let i = 0; i < nums.length; i++) {
    leftSum += nums[i];
    if (leftSum === rightSum) {
      pivotIdx = i;
      break;
    }
    rightSum -= nums[i];
  }
  return pivotIdx;
}

pivotIndex([1, 2, 1, 6, 3, 1]); // 3
pivotIndex([5, 2, 7]); // -1  no valid pivot index
pivotIndex([-1, 3, -3, 2]); // 1 valid pivot at 2: -1 + 3 = 2 however there is a smaller valid pivot at 1: -1 = -3 + 2

/**
 * Write a function called longestFall, which accepts
 * an array of integers, and returns the length of the longest
 * consecutive decrease of integers.
 *
 * For this function, we maintain a temporary count and a maximum count.
 *  If any element is smaller than the previous element, we count it.
 *  Then we compute the maximum each time the count increases.
 */
function longestFall(nums) {
  let counter = 1;
  let maxCounter = 0;

  // quick fail case if the array is empty
  if (nums.length === 0) {
    return 0;
  }

  for (let i = 1; i < nums.length; i++) {
    // if current number is smaller than the previous number
    if (nums[i] < nums[i - 1]) {
      counter++;
      maxCounter = Math.max(counter, maxCounter);
    } else {
      counter = 1;
    }
  }

  // 1 is the default value for a non-empty array
  return maxCounter || 1;
}

longestFall([5, 3, 1, 3, 0]); // 3, 5-3-1 is the longest consecutive sequence of decreasing integers
longestFall([2, 2, 1]); // 2, 2-1 is the longest consecutive sequence of decreasing integers
longestFall([2, 2, 2]); // 1, 2 is the longest consecutive sequence of decreasing integers
longestFall([5, 4, 4, 4, 3, 2]); // 3, 4-3-2 is the longest
longestFall([9, 8, 7, 6, 5, 6, 4, 2, 1]); // 5, 9-8-7-6-5 is the longest
longestFall([]); // 0
```

## binary_search

```javascript
function binarySearch(arr, val) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    // find the middle value
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    let middleVal = arr[middleIdx];

    if (middleVal < val) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal > val) {
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    } else {
      // we found our value!
      return middleIdx;
    }
  }
  // left and right pointers crossed, val isn't in arr
  return -1;
}
```

## linear_search

```javascript
/ custom indexOf implementation
function indexOf(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    // if you find the value, return the index
    if (arr[i] === val) return i;
  }

  // if you never find the value, return -1
  return -1;
}

indexOf([4, 8, 15, 16, 23, 42], 15); // 2
indexOf([4, 8, 15, 16, 23, 42], 42); // 5
indexOf([4, 8, 15, 16, 23, 42], 100); // -1
```

## password_function

It accepts 2 arguments: password and username
Password must:

- be at least 8 characters
- cannot contain spaces
- cannot contain the username
  If all requirements are met, return true.
  otherwise: false

```javascript
function isValidPassword(password, username) {
  return (
    password.length >= 8 &&
    !password.includes(' ') &&
    !password.includes(username)
  );
}

isValidPassword('89Fjj1nms', 'dogLuvr'); //true
isValidPassword('dogLuvr123!', 'dogLuvr'); //false
```

## average

Sum numbers of arr and divide by arr.length.

```javascript
function avg(arr) {
  let total = 0;
  let average = 0;
  for (let num of arr) {
    total += num;
  }
  return total / arr.length;
}

console.log(avg([0, 50])); // 25
```

### string_to_array

String to array

```javascript
function stringToArray(string) {
  resultArray = [];
  for (let char of string) {
    resultArray.push(char);
  }
  return resultArray;
}
console.log(stringToArray('2,3,4,5'));
// ["2", ",", "3", ",", "4", ",", "5"]
```

### array_to_string

array to string

```javascript
function arrayToString(arr) {
  let result = '';
  for (let char of arr) {
    result += char;
  }
  return result;
}

console.log(arrayToString(['a', 'b', 'c', 123, 4])); // "abc1234"
```

## pangram_check

Checks to see if a given sentence contains every letter of the alphabet.
Make sure you ignore string casing!

```javascript
function isPangram(sentence) {
  let cleanSentence = sentence.toLowerCase();
  for (let char of 'abcdefghijklmnopqrstuvwxyz') {
    if (!cleanSentence.includes(char)) {
      return false;
    }
  }
  return true;
}
console.log(isPangram('The five boxing wizards jump quicklY')); // true
console.log(isPangram('The five boxing wizards jump quick')); //false
```

### isPalindrome

Check if word of phrase is palindromic, returns true or false.

```javascript
function isPalindrome(str) {
  let reversed = '';
  let cleanedStr = '';
  // loop over str in reverse order:
  for (let i = str.length - 1; i >= 0; i--) {
    if ('abcdefghijklmnopqrstuvwxyz'.includes(str[i].toLowerCase())) {
      // store and normalize to lowercase:
      reversed += str[i].toLowerCase();
    }
  }
  // loop over str to get rid of spaces and punctuation symbols, storing only
  // the letters in lowercase:
  for (let i = 0; i < str.length; i++) {
    if ('abcdefghijklmnopqrstuvwxyz'.includes(str[i].toLowerCase())) {
      cleanedStr += str[i].toLowerCase();
    }
  }
  //compare exact equality of each variable:
  return reversed === cleanedStr;
}

console.log(isPalindrome('No lemon, no melon')); // true
console.log(isPalindrome('No lemon, no lemon')); // false
```

### isValidAnagram

Time complexity O(n)

```javascript
function createFrequencyCounter(str) {
  let frequencies = new Map();

  for (let val of str) {
    let valCount = frequencies.get(val) || 0;
    frequencies.set(val, valCount + 1);
  }
  return frequencies;
}

function isValidAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  let str1Freq = createFrequencyCounter(str1);
  let str2Freq = createFrequencyCounter(str2);

  if (str1Freq.size !== str2Freq.size) return false;

  for (let [key, value] of str1Freq) {
    if (value !== str2Freq.get(key)) {
      return false;
    }
  }
  return true;
}

// console.log(isValidAnagram('', '')); // true
// console.log(isValidAnagram('aaz', 'zza')); // false
// console.log(isValidAnagram('anagram', 'nagaram')); // true
console.log(isValidAnagram('rat', 'car')); // false
// console.log(isValidAnagram('awesome', 'awesom')); // false
// console.log(isValidAnagram('qwerty', 'qeywrt')); // true
console.log(isValidAnagram('texttwisttime', 'timetwisttext')); // true
```

### alphabetical

Lopp over array and sort it's letters in alphabetical order.

```javascript
function alphabetical(str) {
  let arrayed = [];
  for (let char of str) {
    arrayed.push(char);
  }
  let ordered = arrayed.sort();
  let stringed = '';
  for (let char of ordered) {
    stringed += char;
  }
  return stringed;
}

console.log(alphabetical('la reputa madre')); // aaadeelmprrtu
```

### first_letter_uppercase

Loop over sentence and uppercase first letter of each word.

```javascript
function firstLetterUppercase(str) {
  let result = '';
  // loop over str
  for (let i = 0; i < str.length; i++) {
    // capture spaces inside the string
    if (str[i] === ' ') {
      // after space, replace the lower case letter for it's capitalized version:
      str = str.replace(str[i + 1], str[i + 1].toUpperCase());
    }
  }
  // capitalize first letter of sentence and return the whole thing:
  return str.replace(str[0], str[0].toUpperCase());
}

console.log(firstLetterUppercase('the quick brown fox'));
// "The Quick Brown Fox"
```

### snakeToCamelCase

Convert snake case to camel case

```javascript
function snakeToCamel(str) {
  result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '_') {
      result += str[i + 1].toUpperCase();
      i = i + 1;
    } else {
      result += str[i];
    }
  }
  return result;
}
snakeToCamel('awsome_sauce'); // awesomeSauce
```

### longest_word

Loop over string to find longest word and return it:

```javascript
function longestWordInString(str) {
  // split str into an array:
  let splited = str.split(' ');
  let lengths = [];
  // loop over `splited` and store word lengths:
  for (let word of splited) {
    lengths.push(word.length);
  }
  // sort the lengths, highest to lowest:
  sorted = lengths.sort((a, b) => b - a);
  // loop again over `splited` to find the word that
  // has a length matching with the `sorted` highest:
  for (let word of splited) {
    if (word.length === sorted[0]) {
      return word;
    }
  }
}

console.log(longestWordInString('la requetecontra contra')); // requetecontra
```

### num_of_vowels

Loop over string and return number of vowels:

```javascript
function numOfVowels(str) {
  // list to compare:
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  // store the loop
  let toCount = [];
  for (let char of str) {
    // compare and store if they match:
    if (vowels.includes(char)) {
      toCount.push(char);
    }
  }
  // count and return:
  return toCount.length;
}

console.log(numOfVowels('The quick brown fox')); // 5
```

### vowelCount

Loop over string and return number of vowels, using reduce

```javascript
function vowelCount1(str) {
  const letters = str.toLowerCase().split('');
  return letters.reduce(function (accumulator, nextValue) {
    if ('aeiou'.indexOf(nextValue) !== -1) {
      if (accumulator[nextValue]) {
        accumulator[nextValue]++;
      } else {
        accumulator[nextValue] = 1;
      }
    }
    return accumulator;
  }, {});
}

console.log(vowelCount1('Elie')); // {e: 2, i: 1}
```

### vowelCountWithMap

Vowel count using Map data structure.

```javascript
const vowelCount = (str) => {
  const vowOccur = new Map();
  const lowercased = str.toLowerCase();
  for (let char of lowercased) {
    if ('aeiou'.includes(char)) {
      if (vowOccur.has(char)) {
        vowOccur.set(char, vowOccur.get(char) + 1);
      } else {
        vowOccur.set(char, 1);
      }
    }
  }
  return vowOccur;
};

console.log(vowelCount('awesome')); // {"a" => 1, "e" => 2, "o" => 1}
console.log(vowelCount('Ana')); // {"a" => 2}
```

### containsVowels

filter array of words containing vowels. Use indexOf and filter.

```javascript
const words = ['ffff', 'aaaa', 'fafa'];
// check word
const containsVowel = function (word) {
  for (let char of word) {
    if (isVowel(char)) return true;
  }
  return false;
};

// check character
const isVowel = function (char) {
  return 'aeiou'.indexOf(char) !== -1;
};

// filter
const yesVowels = words.filter(containsVowel);
console.log(yesVowels); // ["aaaa", "fafa"]

const noVowels = words.filter(function (word) {
  return !containsVowel(word);
});
console.log(noVowels); // ["ffff"]
```

## PICK_RANDOM_ITEM_FROM_ARRAY:

Picks one random item from given array.

```javascript
function randomPicker(arr) {
  let num = Math.floor(Math.random() * arr.length);
  return arr[num];
}
console.log(randomPicker([100, 'a', 3, 'b'])); //"b"
```

## GENERATE_CARD_WITH_RANDOM_VALUE_AND_SUIT:

```javascript
function getCard() {
  let card = {
    value: '',
    suit: '',
  };
  let allValues = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];
  let allSuits = ['clubs', 'spades', 'hearts', 'diamonds'];
  card.value = randomPicker(allValues);
  card.suit = randomPicker(allSuits);
  return card;
}
console.log(getCard()); // value:9 suit:"diamonds"
```

## ARR_with_duplicate_values:

Duplicate values of given array and generate new array with them:

```javascript
function doubleArr(arr) {
  const doubled = [];
  for (let num of arr) {
    doubled.push(num * 2);
  }
  return doubled;
}
console.log(doubleArr([6, 10])); // 12, 20
```

## CALCULATOR\_(ARRAY OF FUNCTIONS)

```javascript
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

function doMath(number1, number2, operation) {
  return operation(number1, number2);
}
doMath(3, 2, multiply); // 6
```

## PICK_ONE_OF_TWO:

Pick one item from two given options:

```javascript
function pickOne(item1, item2) {
  let num = Math.random();
  if (num <= 0.5) {
    return item1;
  }
  return item2;
}

console.log(pickOne('caca', 'pedo')); // caca
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

console.log(indexOf([1, 5, 9, 'a'], 'a')); // 3
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

console.log(lastIndexOf(['a', 'f', 'h'], 'h')); // 2
```

### push

Add given item to end of array, return array's length.

```javascript
function push(arr, val) {
  arr[arr.length] = val;
  return arr.length;
}

var arr = [1, 2, 3];
console.log(push(arr, 10)); // 4
```

### pop

Remove item from end of array, return removed item.

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

var emptyArr = ['a', 'b', 'c', 'd', 'e'];
console.log(emptyArr); // ["a", "b", "c", "d", "e"]
console.log(pop(emptyArr)); // "e"
console.log(emptyArr); // ["a", "b", "c", "d"]
```

### unshift

Add item to start of array, return resulting length of array.

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

Remove item from start of array, return removed item.

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
console.log(shift(arri)); // 12
console.log(arri); // [23, 34]
```

### reverse

Reverse array.

```javascript
function reverse(arr) {
  for (let i = 0; i < arr.length; i++) {
    let value = arr.pop();
    arr.splice(i, 0, value);
  }
  return arr;
}

var arru = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(reverse(arru)); // ["g", "f", "e", "d", "c", "b", "a"]
```

### concat

Merge two arrays.
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
let arru = ['a', 'b', 'c'];

console.log(concat(arru, arri)); // ["a", "b", "c", 1, 2, 3]
```

### Math.max

Return the highest number of an array.

```javascript
function max(arr) {
  arr.sort((a, b) => a - b);
  return arr[arr.length - 1];
}

console.log(max([5, 1, 4, 7, 1, 2])); // 7
```

### Math.min

Return the lowest number of array.

```javascript
function min(arr) {
  arr.sort((a, b) => a - b);
  return arr[0];
}
console.log(min([7, 230, 3])); // 3
```

### slice

Remove items in given range, return removed items.

```javascript
ffunction slice(arr, num1, num2) {
  let result = [];
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

console.log(slice(["a", "b", "c", "d", "e"], 0, 2)); // ["a", "b"]
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
console.log(squaredEvenNumbers([3, 4, 5])); // 16
```

### Object.keys

`Object.keys(objName)`;  
Extract keys only from object:

```javascript
function keys(obj) {
  let objKeys = [];
  for (let key in obj) {
    objKeys.push(key);
  }
  return objKeys;
}

var obj1 = { a: 1, b: 2, c: 3 };
console.log(keys(obj1)); // ["a", "b", "c"]
```

### Object.values

`Object.values(objName)`;  
Extract values only from object:

```javascript
function values(obj) {
  let allVals = [];
  for (const val in obj) {
    allVals.push(obj[val]);
  }
  return allVals;
}

var obj = { a: 1, b: 2, c: 3 };
console.log(values(obj)); // [1, 2, 3]
```

### addKeyAndValue

Add key and value to array of objects using reduce

```javascript
const arr = [
  { name: 'Elie' },
  { name: 'Tim' },
  { name: 'Matt' },
  { name: 'Colt' },
];

function addKeyAndValue1(arr, key, value) {
  return arr.reduce(function (accumulator, nextValue, index) {
    accumulator[index][key] = value;
    return accumulator;
  }, arr);
}

console.log(addKeyAndValue1(arr, 'title', 'Instructor'));
/*
{name: "Elie", title: "Instructor"}
{name: "Tim", title: "Instructor"}
{name: "Matt", title: "Instructor"}
{name: "Colt", title: "Instructor"}
*/
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

var instructor = { name: 'Elie', job: 'Instructor' };

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

var instructor = { name: 'Elie', job: 'Instructor' };
console.log(swapKeyAndValue(instructor, 'name'));
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
console.log(multiples(2, 5)); // [2, 4, 6, 8, 10]
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
  { name: 'Tim', school: 'ffff' },
  { name: 'Matt', school: 'aaaaa' },
  { name: 'Elie', school: 'nnnnn' },
];
console.log(pluck(alumni, 'name')); // ["Tim", "Matt", "Elie"]
```

### pluck_object_reduce

Extract values for given key from object using reduce

```javascript
const arr = [
  { name: 'Elie', age: 23 },
  { name: 'Tim', age: 23 },
  { name: 'Matt', age: 23 },
  { name: 'Colt', age: 23 },
];

function extractValue1(arr, key) {
  const result = [];
  arr.reduce(function (acc, next) {
    result.push(next[key]);
  }, arr[0]);
  return result;
}

extractValue1(arr, 'name'); // ["Elie", "Tim", "Matt", "Colt"]
```

### findByValue

in array of objects, find objects by one of it's values, return those single objects:

```javascript
function findByValue(arr, value) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Object.values(arr[i]).includes(value)) {
      result.push(arr[i]);
    }
  }
  return result;
}

let discos = [
  {
    artist: 'flaco',
    name: 'pescado',
    year: 1974,
  },
  {
    artist: 'gordo',
    name: 'ballena',
    year: 2010,
  },
];
console.log(findByValue(discos, 'fLaco')); // {artist: "flaco", name: "pescado", year: 1974}
```

### shoppingCart

Sum and average quantities and prices of objects.

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
// Variables to fill with the loop:
let productDetail = '';
let totalItems = 0;
let totalPrice = 0;
// Loop over object:
for (let i = 0; i < shoppingCart.length; i++) {
  // store each object separatedly:
  let items = shoppingCart[i];
  // extract the properties of object to sum and display them:
  productDetail += `${items.product}(${items.quantity}) `;
  totalItems += items.quantity;
  totalPrice += items.price;
}
console.log(
  `Products: ${productDetail}.\nTotal items: ${totalItems}.\nTotal price:$${totalPrice}\nHave a good one fucker!!`
);
/* 
Products: Jenga(1) Echo dot(3) Fire stick(3) . 
Total items: 7.
Total price:$121381.2
Have a good one fucker!!
*/
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

### lowest_number

Find lowest or highest number of array:

```javascript
const numbers = [2, 5, 423423423, 43, 23];
let starter = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] < starter) starter = numbers[i];
}
starter; // 2
```

### lowest_number_with_reduce

Find lowest value in array using reduce

```javascript
const scores = [23, 34, 3, 245, 1, 5];

function minValue(arr) {
  const result = arr.reduce(function (min, nextNumber) {
    if (nextNumber < min) {
      return nextNumber;
    }
    return min;
  });
  return result;
}

minValue(scores); // 1

// Rephrased with ternary operator:
function minValue(arr) {
  const result = arr.reduce(function (min, nextNumber) {
    return nextNumber < min ? nextNumber : min;
  });
  return result;
}
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

console.log(minMaxKeyInObject({ 2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e' }));
// [1, 10]
```

### stringFromObject

Scans object properties and returns a string literal with key and value pairs in form of string, all separated by commas except the last one.

```javascript
function stringFromObject(obj) {
  let propString = '';
  for (let prop in obj) {
    propString += `${prop} = ${obj[prop]}, `;
  }
  let result = propString.slice(0, propString.length - 2);
  return result;
}

console.log(
  stringFromObject({ name: 'Elie', job: 'Instructor', isCatOwner: false })
);
// "name = Elie, job = Instructor, isCatOwner = false"
```

### objectToQueryString

Converts object into queryString, looping over object keys and values, when value is an array, loops into the array to return the values into the string separated by "&".

```javascript
function objectToQueryString(obj) {
  // place to store keys and values when looping:
  let qstring = '';
  // loop over object to extract keys and values:
  for (let prop in obj) {
    // Capture the array if there's one:
    if (typeof obj[prop] === 'object') {
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

console.log(countNumbers(['4', '1', '0', 'NaN'])); // 3
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
console.log(totalCaps(['AwesomE', 'ThIngs', 'hAppEning', 'HerE'])); // 8
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

### str_letter_count

Count the number of appearances of each letter in a string. Use lopp and object. Spread the letters into an object, store their occurences as key value pairs, transform the key value pairs into string.

```javascript
function strLetterCount(word) {
  /* The strategy will be creating an empty object, each letter
  will be spreaded as a key, and then will capture the number
  of occurences of each letter as values for those keys.
  */
  // create empty object:
  let letters = {};
  console.log(letters);
  // loop over word:
  for (let i = 0; i < word.length; i++) {
    // with each word, create an object's key-value pair,
    // the keys will be the letters, the values will be 0
    // for start.
    letters[word[i]] = 0;
  }
  console.log(letters);
  // loop over word again:
  for (let i = 0; i < word.length; i++) {
    // each time a letter occurs, add +1 to it's corresponding
    // key:
    letters[word[i]] += 1;
  }
  console.log(letters);
  // now transform the object in a string, so as to return the
  // information in the form of a string.
  // Create the storage variable for the loop:
  let result = '';
  // loop over object, and add it's value and pairs to the
  // string:
  for (let keyVal in letters) {
    result += `${keyVal}${letters[keyVal]}`;
  }
  return result;
}

console.log(strLetterCount('coconut')); // "c2o2n1u1t1"
```

### letterCount

```javascript
const str = 'caca';

function letterCount(str) {
  const charCount = {};
  for (let char of str) {
    if (charCount[char]) {
      charCount[char] += 1;
    } else {
      charCount[char] = 1;
    }
  }
  return charCount;
}

letterCount(str); // {c: 2, a: 2}
```

### character_count

```javascript
function charCount(str) {
  return str.split('').reduce((obj, char) => {
    if (/[A-Z0-9]/i.test(char)) {
      char = char.toLowerCase();
      if (obj[char]) {
        obj[char] += 1;
      } else {
        obj[char] = 1;
      }
    }
    return obj;
  }, {});
}

charCount('fsdfs, fdsfds 3443'); // {3: 2, 4: 2, f: 4, s: 4, d: 3}

//-------------------------------------------------
// Alternate version 1:

function charCount(str) {
  return str
    .toLowerCase()
    .split('')
    .sort()
    .join('')
    .match(/([a-z0-9])\1*/g)
    .reduce(function (prev, cur) {
      return Object.assign(prev, { [cur[0]]: cur.length });
    }, {});
}
charCount('fsdfs, fdsfds 3443'); // {3: 2, 4: 2, f: 4, s: 4, d: 3}

//-------------------------------------------------
// Alternate version 2:

function charCount(str) {
  const obj = {};

  for (let char of str) {
    if (/[A-Z0-9]/i.test(char)) {
      char = char.toLowerCase();
      if (obj[char]) {
        obj[char] += 1;
      } else {
        obj[char] = 1;
      }
    }
  }
  return obj;
}

charCount('fsdfs, fdsfds 3443'); // {3: 2, 4: 2, f: 4, s: 4, d: 3}
```

### vowelCount

Count vowels of a string. First convert the string into an array, then forEach over the array and return object with key as vowel and value as number of appearances.

```javascript
function vowelCount(str) {
  const clean = str.toLowerCase();
  let arrayed = [];
  for (let char of clean) {
    arrayed.push(char);
  }
  const vowels = arrayed.filter(function (char) {
    return 'aeiou'.indexOf(char) !== -1;
  });
  let result = {};
  vowels.forEach(function (char) {
    return (result[char] = 0);
  });
  for (let i = 0; i < vowels.length; i++) {
    result[vowels[i]] += 1;
  }
  return result;
}
// vowelCount('Elie') // {e:2,i:1};
// vowelCount('Tim') // {i:1};
// vowelCount('Matt') // {a:1})
```

### grid_star

Star rows and columns where is a star

```javascript
function starOutGrid(grid) {
  cols = [];
  rows = [];
  // capture cols and rows to star:
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === '*') {
        cols.push(grid.indexOf(grid[j]));
        rows.push(grid.indexOf(grid[i]));
      }
    }
  }

  // star cols:
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      grid[i][cols[j]] = '*';
    }
  }

  // star rows:
  for (let i = 0; i < rows.length; i++) {
    grid[rows[i]] = ['*', '*', '*'];
  }

  return grid;
}

console.log(
  starOutGrid([
    ['A', 'B', 'C'],
    ['D', 'E', '*'],
    ['G', 'H', 'I'],
  ])
);
/*
["A", "B", "*"]
["*", "*", "*"]
["G", "H", "*"]
*/
```

### subset_of_str

Subset of string, combination of all letters of string.

```javascript
function combineLetters(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length + 1; j++) {
      result.push(str.slice(i, j));
    }
  }
  return result;
}

console.log(combineLetters('dog')); // ["d", "do", "dog", "o", "og", "g"]
```

### swap_variables

Swap values of variables using destructure

```javascript
let x = 'x';
let y = 'y';
// destructure to swap values:
[y, x] = [x, y];
console.log(y); // x
console.log(x); // y
```

### multiplesOf

Returns the multiples of given number from 0 to 100

```javascript
function multiplesOf(number) {
  let result = [];
  for (let i = 0; i <= 50; i++) {
    if (i % number === 0) {
      result.push(i);
    }
  }
  return result;
}

console.log(multiplesOf(11)); // [0, 11, 22, 33, 44]
```

### testPrime

Checks if a number is prime or not, returns true or false.

```javascript
function testPrime(n) {
  if (n === 1) {
    return false;
  } else if (n === 2) {
    return true;
  } else {
    for (let x = 2; x < n; x++) {
      if (n % x === 0) {
        return false;
      }
    }
    return true;
  }
}

console.log(testPrime(36)); // false
console.log(testPrime(37)); // true
```

### sumRows

Access each item in nested arrays and sum them:

```javascript
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
  console.log(`Row ${row.indexOf(row[i]) + 1} summed to ${sum}`);
}
/*
Row 1 summed to 14
Row 2 summed to 35
Row 3 summed to 15
*/
```

### Guessing_game

While loop for a game where the machine has to guess a number:

```javascript
const target = Math.floor(Math.random() * 10);
let guess = Math.floor(Math.random() * 10);

while (guess !== target) {
  console.log(`Target: ${target} Guess: ${guess}`);
  guess = Math.floor(Math.random() * 10);
}
// log machine attempts till target and guess match:
console.log(`Target: ${target} Guess: ${guess}`);
// log message once machine wins:
console.log('Machine wins');
/*
Target: 1 Guess: 4
Target: 1 Guess: 7
Machine wins
*/
```

### filterByType

Returns specified type of value from multiple arguments passed

```javascript
const filterByType = (type, ...values) => {
  return values.filter((val) => typeof val === type);
};

filterByType('number', 1, 2, 3, 'caca', 6, true, 'denise', 9);
// [1, 2, 3, 6, 9]
filterByType('string', 1, 2, 3, 'caca', 6, true, 'denise', 9); // "caca" "denise"
```

### SPIRAL_MATRIX

Return nested arrays in spiral shape:

```javascript
const square = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

// source: https://stackoverflow.com/questions/30906366/spiral-traversal-of-a-matrix-recursive-solution-in-javascript
function spiral(matrix) {
  const arr = [];

  while (matrix.length) {
    arr.push(
      ...matrix.shift(),
      ...matrix.map((a) => a.pop()),
      ...(matrix.pop() || []).reverse(),
      ...matrix.map((a) => a.shift()).reverse()
    );
  }
  return arr;
}

console.log(spiral(square)); // [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
```

### Function_picker

Pick randomly between functions.

```javascript
function happy() {
  return "ha ha ha";
}

function sad() {
  return "snif snif snif";
}

function pickOne(f1, f2) {
  let num = Math.random();
  if (num <= 0.5) {
    return f1();
  }
  return f2();
}
console.log(pickOne(happy, sad); // ha ha ha
console.log(pickOne(happy, sad)); // snif snif snif
```

### range_checker

With returned functions:

```javascript
// Build the function factory:
function checkRange(x, y) {
  return function (num) {
    return num >= x && num <= y;
  };
}

// Make a new instance:
let teenager = checkRange(12, 20);
// call it:
teenager(12); // true
teenager(22); // false

let adult = checkRange(21, 50);
adult(51); //false
adult(40); //true

let isNiceOutside = checkRange(65, 90);
isNiceOutside(78); // true
```

### timer

A timer with setTimeout and an anonymous function.

```javascript
function timer(time) {
  let measure = time * 1000;
  setTimeout(function () {
    console.log('time is over');
  }, measure);
}

timer(3); // (after 3 secs) time is over
```

### countdown

that counts from the given number to 0 and then displays an alert. Uses setInterval and callback function.

```javascript
function countDown(number) {
  let sustractor = setInterval(function () {
    number--;
    if (number > 0) {
      console.log(number);
    } else {
      console.log('DONE!');
      clearInterval(sustractor);
    }
  }, 1000);
}

countDown(3); // 3 2 1 DONE!
```

### decimal_places

Decimal places

Set the quantity of decimals for a number. For 2 decimals divide by 100, 3 decimals divide by 1000.

```javascript
let num = Math.round(Math.random() * 100) / 100;
console.log(num); // 0.93
```

### randomGame

The program selects a random number between 0 and 1 every 1000 miliseconds. Each time a random number is picked, adds 1 the the counter. If the number is greater than .75, stop the timer and console.log the number of tries it took to find a number greather than .75.

```javascript
function randomGame() {
  let counter = 0;
  let selector = setInterval(function () {
    let num = Math.round(Math.random() * 100) / 100;
    console.log(num);
    counter++;

    if (num > 0.75) {
      clearInterval(selector);
      console.log(`It took ${counter} tries`);
    }
  }, 1000);
}

randomGame(); // it took 3 tries.
```

## Add_and_remove_classes.

Adding and removing classes to style or animate:

1. Given an HTML element:

```html
<li class="todo-item">task 1</li>
```

2. I want that once the task is completed, the element change its appearance, so I style both states of the item, one before completed, and after completed:

```css
.todo-item {
  font-size: 40px;
  color: blanchedalmond;
}
.completed {
  color: rgb(129, 84, 129);
  text-decoration: line-through;
}
```

3. Now add the `completed` class on the html event:

```javascript
todoTitle.classList.add('completed'); //
```

4. This will result in the html having both classes:

```html
<li class="todo-item completed">task 1</li>
```

### checkboxes

Check if all checkboxes are checked or not.

```javascript
// grab elements from html:
const checkBoxes = document.querySelectorAll(
  '#no-input input[type="checkbox"]'
);
const btnNo = document.querySelector('#no');

// convert Nodelist into array so we can apply the method:
const checks = Array.from(checkBoxes);

//
btnNo.addEventListener('click', function (e) {
  // check if every box is checked
  let allChecked = checks.every(function (box) {
    return box.checked;
  });
}); // returns true or false
```

### backgroundColorPicker

Move cursor over body to change background color

```javascript
const body = document.querySelector('body');
body.addEventListener('mousemove', function (e) {
  let width = Math.round((e.pageX * 255) / window.innerWidth);
  let height = Math.round((e.pageY * 255) / window.innerHeight);
  let diagonal = Math.round(width + height / 255);
  let r = 255 - diagonal;
  let g = width - height;
  let b = Math.round(0 + width + (0 + height) - diagonal);

  if (g < 0) {
    g = g - g * 2;
    b = width;
  }

  let color = `rgb(${r}, ${g}, ${b})`;
  body.style.backgroundColor = color;
  console.log(color);
  console.log(`width ${width}`);
  console.log(`height ${height}`);
  console.log(`diagonal ${diagonal}`);
});
```

### colorMaker

Uses jQuery. Make a color manipulating rgb values:

```javascript
function changeColor(code) {
  $('body').css('background-color', code);
}

$('.mb-5').on('change', function (f) {
  let $color1 = parseInt($('input').eq(0).val());
  let $color2 = parseInt($('input').eq(1).val());
  let $color3 = parseInt($('input').eq(2).val());
  let code = `rgb(${$color1},${$color2},${$color3})`;
  changeColor(code);
});
```

### removeDuplicates

Works on strings and arrays.

```javascript
function removeDuplicates(values) {
  const arr = [...new Set(values)];
  if (typeof values === 'string') return arr.join('');
  return arr;
}

let arr1 = [1, 3, 3, 45, 4, 4];
let str1 = 'caca';
removeDuplicates(arr1); // [1, 3, 45, 4]
removeDuplicates(str1); // "ca"
```

### removeDuplicates_from_array

Removes duplicate values from array using Set

```javascript
const ages = [23, 12, 34, 23, 23, 23, 45, 32, 23, 45];
const agesNoDups = [...new Set(ages)];
console.log(agesNoDups); // [23, 12, 34, 45, 32]
```

### hasNoDuplicates

True if array has no duplicates, false if array has duplicates

```javascript
function hasNoDuplicates(arr) {
  let noDups = arr.every(function (num) {
    return arr.indexOf(num) === arr.lastIndexOf(num);
  });
  return noDups;
}
hasNoDuplicates([1, 2, 3, 1]); // false
hasNoDuplicates([1, 2, 3]); // true
```

### removeFromArray

Removes given item from array

```javascript
function removeFromArray(arr, value) {
  return arr.filter((el) => {
    return el !== value;
  });
}
let arr5 = [1, 2, 3];
removeFromArray(arr5, 3); // [1, 2]
```

### map

Map over array of objects to get one of it's properties:

```javascript
const todos = [
  {
    id: 3,
    text: 'walk the dog',
    priority: 'high',
  },
  {
    id: 2,
    text: 'park car',
    priority: 'low',
  },
];

const todoText = todos.map(function (todo) {
  return todo.text;
});

todoText; // ["walk the dog", "park car"]
```

### containsVowels
