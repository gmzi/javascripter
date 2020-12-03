// 1.

function double(arr) {
  return arr.map(function (val) {
    return val * 2;
  });
}
console.log(double([1, 2]));

// Refactor to two arrow functions, Turn it into a one-liner.

const doubleRef = (arr) => {
  return arr.map((val) => val * 2);
};

console.log(doubleRef([9, 15]));

// 2.
function squareAndFindEvens(numbers) {
  var squares = numbers.map(function (num) {
    return num ** 2;
  });
  var evens = squares.filter(function (square) {
    return square % 2 === 0;
  });
  return evens;
}

console.log(squareAndFindEvens([4, 4]));

// Refactored (copied from solution) :

const squareAndEvens = (numbers) => {
  return numbers.map((val) => val ** 2).filter((square) => square % 2 === 0);
};

console.log(squareAndEvens([4, 3]));
