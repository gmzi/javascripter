let x = "x";
let y = "y";
let b = x + y;
x = b[1];
y = b[0];
console.log(x);

let car = {
  color: "red",
  brand: "toyo",
};

let swappedCar = {};

for (let key in car) {
  swappedCar[car[key]] = key;
}
car = swappedCar;
console.log(car);
