function strLetterCount(word) {
  let singleLets = [];
  let repeatedLets = [];
  let result = "";
  for (let i = 0; i < word.length; i++) {
    if (!singleLets.includes(word[i])) {
      singleLets.push(word[i]);
    } else {
      repeatedLets.push(word[i]);
    }
  }
  console.log(singleLets);
  console.log(repeatedLets);
  let sortedRep = repeatedLets.sort();
  console.log(sortedRep);
  for (let char of word) {
    if (!repeatedLets.includes(char)) {
      result += `${char}1`;
    }
    if (repeatedLets.includes(char)) {
      result += `${char}${sortedRep.indexOf(char) + 1}`;
    }
  }
  return result;
}
console.log(strLetterCount("coconut")); // "c2o2n1u1t1"

//  if (!count.includes(char)) {
//   count.push(char);
// }

// for (let i = 0; i < letters.length; i++) {
//   count.push(letters.indexOf(letters[i]));
// }
// console.log(count);
