/* 
Write a function called pluck, which takes an array of objects and the name of a key.
The function should return an array containing the value associated with that key 
for each object, or undefined if that key is not present in the object.*/

function pluck(arr, keyname) {
  let vals = [];
  for (let key in arr) {
    vals.push(arr[key][keyname]);
  }
  return vals;
}

let alumni = [
  { name: "Tim", school: "ffff" },
  { name: "Matt", school: "aaaaa" },
  { name: "Elie", school: "nnnnn" },
];
console.log(pluck(alumni, "name"));
console.log(alumni[0].name);
// ["Tim", "Matt", "Elie"]

pluck(
  [
    { name: "Tim", isBoatOwner: true },
    { name: "Matt", isBoatOwner: false },
    { name: "Elie" },
  ],
  "isBoatOwner"
);

let boats = [
  { name: "Tim", isBoatOwner: true },
  { name: "Matt", isBoatOwner: false },
  { name: "Elie", isBoatOwner: true },
];

console.log(boats[0].isBoatOwner);
