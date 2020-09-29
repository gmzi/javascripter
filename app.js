function shift(arr) {
  firstIdx = arr.length - arr.length;
  let firstValue = arr[firstIdx];
  arr.splice(firstIdx, 1);
  return firstValue;
}

let arri = [12, 23, 34];
console.log(arri);
console.log(shift(arri));
console.log(arri);
