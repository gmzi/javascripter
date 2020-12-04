function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function (num) {
    return num % 2 === 0;
  });
}

// Refactor the above function to use rest opeartor and an arrow function:

const filterOdds = (...rest) => {
  return rest.filter((n) => n % 2 === 0);
};

filterOdds(111, 112, 113); // [112]

/* findMin
Write a function called findMin that accepts a variable number of arguments and returns the
smallest argument. Make sure tto do this using the rest and spread operator. */

const findMin = (...rest) => {
  return Math.min(...rest);
};

findMin(23, 43, 12); // 12
