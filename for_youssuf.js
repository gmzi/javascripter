// QUESTION FOR YOUSSUF:
// Bracket and dot notation, when to use each?
// Given this object:
let alumni = [
  { name: "Tim", school: "bbbbb" },
  { name: "Matt", school: "aaaaa" },
];

// I loop over `alumni` keys and return de desired values:
function pluck(arr, keyname) {
  let vals = [];
  for (let key in arr) {
    vals.push(arr[key][keyname]);
  }
  return vals;
}
pluck(alumni, "name"); // Result: ["Tim", "Matt", "Elie"]

// Now if I try to console.log with bracket notation, I can't:
console.log(alumni[0][name]); // Throws 'undefined'
// Only can console.log with dot notation:
console.log(alumni[0].name); // "Tim"

// I don't quite get why I have to use bracket notation (`alumni[0][name]`) in
// my function's loop and dot notation ()`alumni[0].name`), in the console.log.

//--NOT HELP REQUIRED BELOW THIS LINE----------------------------------
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
