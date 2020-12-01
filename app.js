let evenNumbers = [2, 4, 6, 8];

evenNumbers.reduce(function (accumulator, nextValue) {
  return accumulator + nextValue;
}); // 20

// Find smaller value using reduce

const arr1 = [23, 34, 3, 245, 1, 5];
const arr2 = [23131, 4, 654, 3, 8, 43];

// Find smallest value in two arrays:

// Min value of arr1:
const arr1MinValue = arr1.reduce(function (accum, nextVal) {
  return nextVal < accum ? nextVal : accum;
});

// Min value of both,
// reduce arr2:
const allMin = arr2.reduce(function (accum, nextVal) {
  return nextVal < accum ? nextVal : accum;
  // set arr1Min as initial accum value:
}, arr1MinValue);

allMin; // 1
