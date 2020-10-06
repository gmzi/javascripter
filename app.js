function strLetterCount(word) {
  /* The strategy will be creating an empty object, each letter
  will be spreaded as a key, and then will capture the number
  of occurences of each letter as values for those keys.
  */
  // create empty object:
  let letters = {};
  console.log(letters);
  // loop over word:
  for (let i = 0; i < word.length; i++) {
    // with each word, create an object's key-value pair,
    // the keys will be the letters, the values will be 0
    // for start.
    letters[word[i]] = 0;
  }
  console.log(letters);
  // loop over word again:
  for (let i = 0; i < word.length; i++) {
    // each time a letter occurs, add +1 to it's corresponding
    // key:
    letters[word[i]] += 1;
  }
  console.log(letters);
  // now transform the object in a string, so as to return the
  // information in the form of a string.
  // Create the storage variable for the loop:
  let result = "";
  // loop over object, and add it's value and pairs to the
  // string:
  for (let keyVal in letters) {
    result += `${keyVal}${letters[keyVal]}`;
  }
  return result;
}

console.log(strLetterCount("coconut and cokes")); // "c2o2n1u1t1"
