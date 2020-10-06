/* 
3. Write a JavaScript function that generates all combinations 
of a string.
Example string : 'dog' 
Expected Output : d,do,dog,o,og,g 
(https://www.w3resource.com/javascript-exercises/javascript-functions-exercises.php)
*/

function allCombinations(str) {
  let arrayed = [];
  for (let char of str) {
    arrayed.push(char);
  }
  console.log(arrayed);
  let combinations = [];
  console.log(str);
  for (let i = 0; i < arrayed.length; i++) {
    for (let j = 0; j <= i; j++) {
      // combinations.push([arrayed[j], arrayed[i]]);
      combinations.push([arrayed[j], arrayed[i], arrayed[j]]);
    }
  }
  return combinations;
}

console.log(allCombinations("dog"));

// combinations.push(arrayed[i]);
