/* 
3. Write a JavaScript function that generates all combinations 
of a string.
Example string : 'dog' 
Expected Output : d,do,dog,o,og,g 
(https://www.w3resource.com/javascript-exercises/javascript-functions-exercises.php)
*/

function allCombinations(str) {
  let combinations = "";
  console.log(str);
  for (let i = 0; i < str.length; i++) {
    combinations += `,`;
    for (let j = 0; j <= i; j++) {
      combinations += `${str[j]}`;
    }
  }
  return combinations;
}

console.log(allCombinations("dog"));

function repeat(number) {
  for (let i = 0; i <= number; i++) {
    console.log("hi");
  }
}
console.log(repeat(2));
