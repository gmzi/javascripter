function reverse(arr) {
  for (let i = 0; i < arr.length; i++) {
    let value = arr.pop();
    arr.splice(i, 0, value);
    console.log(arr);
  }
  return arr;
}

var arru = ["a", "b", "c", "d", "e", "f", "g"];
console.log(reverse(arru));

var arr = [1, 2, 3];
console.log(reverse(arr));
console.log(arr);
