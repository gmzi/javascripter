- Frequency Counter
- Multiple Pointers
- Sliding Window
- Divide and Conquer
- Dynamic Programming
- Greedy Algorithms
- Backtracking
- Many more!

## Frequency Counter

```javascript
/** 
 * Write a function called squares, which accepts two arrays. The function should return true if every value in the array has it’s corresponding value squared in the second array. The frequency of values must be the same.
squares([1,2,3], [4,1,9]); // true
squares([1,2,3], [1,9]); // false
squares([1,2,1], [4,4,1]); // false (must be same frequency) */

// FREQUENCY COUNTER USING MAP:
function createFrequencyCounter(array) {
  let frequencies = new Map();

  for (let val of array) {
    let valCount = frequencies.get(val) || 0;
    frequencies.set(val, valCount + 1);
  }

  return frequencies;
}

// FREQUENCY COUNTER USING AN OBJECT:
function createFrequencyCounterObj(array) {
  let frequencies = {};

  for (let val of array) {
    let valCount = frequencies[val] || 0;
    frequencies[val] = valCount + 1;
  }

  return frequencies;
}

// USE THE FREQUENCY COUNTER:
function squaresWithFreqCounter(nums1, nums2) {
  if (nums1.length !== nums2.length) return false;

  let nums1Freqs = createFrequencyCounter(nums1);
  let nums2Freqs = createFrequencyCounter(nums2);

  for (let key of nums1Freqs.keys()) {
    if (nums2Freqs.has(key ** 2) === false) {
      return false;
    }

    if (nums2Freqs.get(key ** 2) !== nums1Freqs.get(key)) {
      return false;
    }
  }

  return true;
}

// time complexity: O(n)
```

Check if valid anagram:

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

## multiple_pointers

Creating pointers or values that correspond to an index or position and move towards the beginning, end or middle based on a certain condition.

```javascript
/**
 * Write a function called sumZero which accepts a sorted array of
 * integers. The function should find the first pair where the sum is 0. Return
 * an array that includes both values that sum to zero or undefined
 * if a pair does not exist.
 */

function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}

console.log(sumZero([-10, -9, -8, 0, 2, 4, 8, 9, 10])); // [-10, 10]
// Time complexity: O(n)

```