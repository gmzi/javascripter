function numOfVowels(str) {
  // list to compare:
  let vowels = ["a", "e", "i", "o", "u"];
  // store the loop
  let toCount = [];
  for (let char of str) {
    // compare and store if they match:
    if (vowels.includes(char)) {
      toCount.push(char);
    }
  }
  // count and return:
  return toCount.length;
}

console.log(numOfVowels("The quick brown fox")); // 5
