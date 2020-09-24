// Build the function factory:
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

//Make a new returned value:
let adult = checkRange(21, 50);
//call it:
adult(51); //false
adult(40); //true
