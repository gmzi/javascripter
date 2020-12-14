//1.
class Vehicle {
  constructor(a, b, c) {
    this.make = a;
    this.model = b;
    this.year = c;
  }
  honk() {
    return 'Beep';
  }
  toString() {
    return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
  }
}

const myVeh = new Vehicle('toyota', 'corolla', 2011);

//2.
class Car extends Vehicle {
  constructor(a, b, c) {
    super(a, b, c);
    this.numWheels = 4;
  }
}

const arturo = new Car('toyota', 'corolla', 2011);

//3.
class Motorcycle extends Vehicle {
  constructor(a, b, c) {
    super(a, b, c);
    this.numWheels = 2;
  }
  revEngine() {
    return 'Vrooom!!!!';
  }
}

const myMoto = new Motorcycle('honda', 'biz', 2009);

//4.
class Garage {
  constructor(capacity) {
    this.vehicles = [];
    this.capacity = capacity;
  }
  add(vehicle) {
    if (!(vehicle instanceof Vehicle)) {
      return 'Only vehicles allowed here!';
    }
    if (this.vehicles.length > this.capacity) {
      return "Sorry, we're full";
    }
    this.vehicles.push(vehicle);
    return 'Vehicle added!';
  }
}

const victoria = new Garage(5);
