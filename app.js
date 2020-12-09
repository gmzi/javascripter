// 1.
const noRepeats = new Set([1, 1, 2, 2, 3, 4]);
console.log(noRepeats); // {1, 2, 3, 4}

// 2.
const algo = [...new Set('referee')].join('');
console.log(algo); // "ref"

// 3.
let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);
console.log(m); // {Array(3) => true, Array (3) => false}

/* 4. 
Function hasDuplicate, accepts an array and returns true or false if 
array contains duplicate */
const hasDuplicate = (arr) => {
  return new Set(arr).size !== arr.length;
};

console.log(hasDuplicate([1, 2, 3, 1])); // true
console.log(hasDuplicate([1, 5, -1, 4])); // false

/* 5.
Function vowelCount, accepts string and returns a map where the keys
are numbers and the values are the count of the vowels in the string. */

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
