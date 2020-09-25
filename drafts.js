// Car checks tire pressure and display alert if one of the tires is out
// or above expected air pressure.
function checkTirePressureCar(x, y) {
  return function (t1, t2, t3, t4) {
    return (
      t1 >= x &&
      t1 <= y &&
      t2 >= x &&
      t2 <= y &&
      t3 >= x &&
      t3 <= y &&
      t4 >= x &&
      t4 <= y
    );
  };
}

let falcon = checkTirePressureCar(36, 41);

console.log(`Falcon is: ${falcon(32, 40, 40, 40)}`); //false
