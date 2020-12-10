function Triangle(sideA, sideB) {
  this.sideA = sideA;
  this.sideB = sideB;
}

Triangle.prototype.getArea = function () {
  return (this.sideA * this.sideB) / 2;
};
Triangle.prototype.getHypotenuse = function () {
  return Math.sqrt(this.sideA ** 2 + this.sideB ** 2);
};

const maryTriangle = new Triangle(23, 30);
const pipiTriangle = new Triangle(45, 32);
maryTriangle; // Triangle {sideA: 23, sideB: 30, getArea: ƒ, getHypotenuse: ƒ}

maryTriangle.getArea;
