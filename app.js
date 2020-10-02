function rankingOfNumbers(arr) {
  let ranked = [];
  // make a copy of the array, so as to not alter the given order of items
  // when sorting:
  for (let num of arr) {
    ranked.push(num);
  }
  // now sort over the copy, the index position+1 will be equivalent to
  // the ranking of each item.
  ranked.sort((a, b) => b - a);
  // now loop over each item of `arr` (and therefore preserve it's order
  // of appearance) and assign to it the index position they have in the
  // sorted copy + 1:
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(ranked.indexOf(arr[i]) + 1);
  }
  // return the index position+1 in `ranked` of each element of `arr`,
  // expressing the ranking of each item.
  return result;
}

console.log(rankings([10, 5, 20])); // [2, 3, 1]
