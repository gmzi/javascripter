function reverse(array) {
  for (let i = 0; i < arr.length; i++) {
    let value = array.pop();
    array.splice(i, 0, value);
  }
  return array;
}

var arr = [1, 2, 3, 4];
console.log(reverse(arr));
console.log(arr);
