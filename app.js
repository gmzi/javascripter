function removeFromString(str, startIdx, numOfChars) {
  let converted = [];
  for (let char of str) {
    converted.push(char);
  }
  converted.splice(startIdx, numOfChars);
  return converted.join("");
}

console.log(removeFromString("Rithm School", 2, 4));
