# Step One

1. O(n)
2. O(n)
3. O(1)
4. O(n³)
5. O(n)
6. O(n)
7. O(n logₙ)
8. O(n)
9. O(1)
10. O(n²)

# Step Two

```javascript
function logUpTo(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}
// TIME COMPLEXITY: O(n)

function logAtLeast10(n) {
  for (let i = 1; i <= Math.max(n, 10); i++) {
    console.log(i);
  }
}
//TIME COMPLEXITY: O(n)

function logAtMost10(n) {
  for (let i = 1; i <= Math.min(n, 10); i++) {
    console.log(i);
  }
}
// TTIME COMPLEXITY: O(1)

function onlyElementsAtEvenIndex(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}
// TIME COMPLEXITY: O(n)

function subtotals(array) {
  let subtotalArray = [];
  for (let i = 0; i < array.length; i++) {
    let subtotal = 0;
    for (let j = 0; j <= i; j++) {
      subtotal += array[j];
    }
    subtotalArray.push(subtotal);
  }
  return subtotalArray;
}
// TIME COMPLEXITY: O(n²)

function vowelCount(str) {
  let vowelCount = {};
  const vowels = 'aeiouAEIOU';

  for (let char of str) {
    if (vowels.includes(char)) {
      if (char in vowelCount) {
        vowelCount[char] += 1;
      } else {
        vowelCount[char] = 1;
      }
    }
  }

  return vowelCount;
}
// TIME COMPLEXITY: O(n)
```

# Part Three

1. True
2. True
3. True (false)
4. O(1) (O(n))
5. O(n)
6. O(n)
7. O(n logₙ)
8. O(n)
9. O(1)
10. O(n)
11. O(1)
12. O(n)
13. O(n)
