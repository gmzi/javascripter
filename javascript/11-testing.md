# Testing

1. - [setup](###setup)
   - [it](###it)
2. Matchers
   - [toEqual](###toEqual)
   - [toBe](###toBe)
   - [toBeInstanceOf](###toBeInstanceOf)
   - [not](###not)
   - [toContain](###toContain)
   - [toThrowError](###toThrowError)
3. Grouping_tests
   - [describe_keyword](###describe_keyword)
4. Hooks
   - [afterEach](###afterEach)
   - [beforeEach](###beforeEach)
   - [beforeAll](###beforeAll)
   - [afterAll](###afterAll)

Code to test your own code, so we don't have to do it manually. Mostly for large programs to capture things that might break.
There are many testing libraries: jasmine, unit.js, qunit, mocha, jest, cypress, etc etc etc).

## Jasmine

[doc](https://jasmine.github.io)

### setup

Find the appropiate setup for your lenguage. In this case:

1. Html, in head, above title:
   - `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.6.0/jasmine.css">`
2. In html body, above the app.js script:
   - `<script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.6.0/jasmine.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.6.0/jasmine-html.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.6.0/boot.js"></script>`
     Jasmine should be visible at the top of the rendered page.
3. Create a file with the same name of the .js file you're testing + test:
   - `fileName.test.js`.
4. wire test file in html body, below the fileName script (so it loads after the js file that's being tested):
   - `<script src="fileName.test.js></script>`
   - Complete example:
     `<script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.6.0/jasmine.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.6.0/jasmine-html.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.6.0/boot.js"></script>
      <script src="app.js"></script>
      <script src="app.test.js"></script>`
5. In `appName.test.js` write the tests.

### it

First argument is the name used to refer to the thest, this helps to find the test if it fails. Second argument is a callback function that executes the test:

Test values:

```javascript
it('first argument explain what should do', function () {
  expect(someValue).someMatcher(someResult);
});

it('should check word spelling', function () {
  expect('caca').toEqual('caca');
}); // should check word spelling.

it('should check sum result', function () {
  expect(2 + 2).toEqual(5);
}); // Error. Expected 4 to equal 5.
```

Test function:

```javascript
it('shoud calculate something', function () {
  expect(functionName(argument)).someMatcher(resultExpected);
});

it('should calculate taxes for high income', function () {
  expect(calculateTaxes(50000)).toEqual(12500);
  expect(calculateTaxes(100000)).toEqual(25000);
}); // should calculate taxes for high income
```

If something is updated in the fucntion, must be updated in the test, otherwise tests will fail.

## matchers

[full_matchers](https://jasmine.github.io/api/edge/matchers)

### toEqual

It's not the same as `===`, it will look for the values inside arrays or objects, so it checks deep equality.

Values:

```javascript
it('compare arrays', function () {
  expect([1, 2, 3]).toEqual([1, 2, 3]);
}); // green

it('compare objects', function () {
  expect({ a: 1, b: 2, c: 3 }).toEqual({ a: 10, b: 3, c: 3 });
}); // red
```

Function:

```javascript
it('should remove duplicates from array', function () {
  expect(removeDuplicates([1, 1, 1, 2, 3])).toEqual([1, 2, 3]);
}); // green
```

### toBe

True if it's the same object, different arrays or objects won't pass.

```javascript
it('should compare objects', function () {
  expect({ a: 1, b: 2 }).toBe({ a: 1, b: 2 });
}); // red
```

### toBeInstanceOf

Checks type of value:

```javascript
it('should compare type', function () {
  expect('hola').toBeInstanceOf(String);
  expect(1).toBeInstanceOf(Number);
  expect([2, 2, 2]).toBeInstanceOf(Array);
  expect({ 2: 2, a: 3 }).toBeInstanceOf(Object);
}); // green
```

### not

Changes the direction of the test.

### toContain

Checks if Object/array contains a given value.

```javascript
it('should check if value is contained', function () {
  expect(removeFromArray([1, 2, 3], 1)).not.toContain(1);
}); // green
```

### toThrowError

Mind the arrow function syntax required when declaring the function.
Checks error catches,

```javascript
// given a function with an error catch:
function calculateTaxes(income) {
  if (!Number.isFinite(income)) {
    throw new Error('invalid income');
  }
  if (income > 30000) {
    return income * 0.25;
  } else {
    return income * 0.15;
  }
}

// HERE'S THE TEST:
// mind the arrow syntax
it('should reject invalid incomes', function () {
  expect(() => calculateTaxes('fdsfds')).toThrowError(); // if string instead of number (mind the arrow syntax)
  expect(() => calculateTaxes([])).toThrowError(); // if array
  expect(() => calculateTaxes(true)).toThrowError(); // if boolean instead of number
}); // green
```

## grouping_tests

### describe_keyword

To avoid messy code, we group test in functions, to organize the testing reading and workflow.

```javascript
describe('calculateTaxes test', function () {
  it('should check if value is contained', function () {
    expect(removeFromArray([1, 2, 3], 1)).not.toContain(1);
  });

  it('should reject invalid incomes', function () {
    expect(() => calculateTaxes('fdsfds')).toThrowError();
    expect(() => calculateTaxes([])).toThrowError();
    expect(() => calculateTaxes(true)).toThrowError();
  });
});

describe('removeDuplicates test', function () {
  it('should remove duplicates from array', function () {
    expect(removeDuplicates([1, 1, 1, 2, 3])).toEqual([1, 2, 3]);
  });
});

/* Jasmine output will be organized:
calculateTaxes tests
    • should reject invalid incomes
    • should check if value is contained
remove duplicates test
    • should remove duplicates from array
*/
```

## hooks

### afterEach

After running a test we want to clean up and let the program without the additional data used for testing, so aferEach will run after each "it" specified on test, so as to clean the database or other parts of the code of the data used for testing.

```javascript
describe('calculateTaxes tests', function () {
  it('should check if value is contained', function () {
    expect(removeFromArray([1, 2, 3], 1)).not.toContain(1);
  });

describe('remove duplicates test', function () {
  it('should remove duplicates from array', function () {
    expect(removeDuplicates([1, 1, 1, 2, 3])).toEqual([1, 2, 3]);
  });
});

afterEach(function () {
  console.log('after each'); // 2 "after each"
  input.value = ''; // cleans input values
  databaseArray = []; // cleans database data
});
```

### beforeEach

Runs before every "it"

```javascript
beforeEach(() => {
  console.log('before');
}); // 3 before
```

### beforeAll

Runs before all tests. Can build a test database, and then run the tests, for ex.

```javascript
beforeAll(() => {
  console.log('before-all');
}); // 1 before-all (at the top of all the tests code)
```

### afterAll

Runs once after all tests are done, could erase the test database created with beforeAll.

```javascript
afterAll(() => {
  console.log('after-all');
}); // 1 after-all (at the end)
```

## best practices

- unit testing
  - narrow scope.
  - pure functions, or a single function at a time, or short fragments of code.
- integration testing
  - broad scope.
  - tests flow between multiple modules of code. Impure functions, dependencies, etc.
- end to end testing (will see it later.)

## Pure functions

are functions that don't have side efects.
An impure function, because it modifies the original array:

```javascript
function pusher(arr, val) {
  arr.push(val);
}

const robert = [1, 3, 4, 6];
pusher(robert, 32132);
robert; // [1, 3, 4, 6, 32132]
```

A pure function, because instead of modifying the original array, it creates a copy of the array and adds a new value:

```javascript
function purePusher(arr, val) {
  return (newArr = [...arr, val]);
}

const mary = [45, 43, 43, 54];
const maryPured = purePusher(mary, 88888);
mary; // [45, 43, 43, 54]
maryPured; // [45, 43, 43, 54, 88888]
```

What to test
Test every function in at least one way.
Test edges: empty list, non integer numbers, no internet connection, file not found, etc.
Write code that is easy to test.
More functions & smaller functions are easier to test. Modular code is better for testing.
Try to not mix logic and UI in a same function.

## Modular code

Two examples,
Less modular:

```javascript
function playGame() {
  let winner = checkForWinner();
}

function checkForWinner() {
  // code for checking board here...
  if (winner) {
    alert(winner + 'wins!!');
  }
  return winner;
}
```

Same code, more modular:

```javascript
function playGame() {
  let winner = checkForWinner();
  if (winner) {
    announceWinner(winner);
  }
}

function checkForWinner() {
  // code for checking board here...
  return winner;
}

function announceWinner(winner) {
  alert(winner + 'wins!!!');
}
```
