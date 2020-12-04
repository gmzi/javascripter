// 1.
function createInstructor(firstName, lastName) {
  return {
    firstName: firstName,
    lastName: lastName,
  };
}

// refactor to ES2015

function createInstructor(firstName, lastName) {
  return {
    firstName,
    lastName,
  };
}

// 2.
// Computed property names
var favoriteNumber = 42;

var instructor = {
  firstName: 'Colt',
};

instructor[favoriteNumber] = 'That is my favorite!';

// refactor ES2015
const favoriteNumber2015 = 42;

const instructor2015 = {
  firstName: 'Colt',
  [favoriteNumber2015]: 'that is my favorite!',
};

// 3.
// Object methods
var instructor = {
  firstName: 'Colt',
  sayHi: function () {
    return 'Hi!';
  },
  sayBye: function () {
    return this.firstName + ' says bye!';
  },
};

// refactor:
const instructorNew = {
  firstName: 'Colt',
  sayHi() {
    return 'Hi!';
  },
  sayBye() {
    return this.firstName + ' says bye!';
  },
};

// 4.
// Create animal function
/* 
const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
d.bark()  //"Woooof!"
*/

const createAnimal = (species, verb, noise) => {
  return {
    species,
    [verb]() {
      console.log(noise);
    },
  };
};

const alfred = createAnimal('cat', 'meows', 'meeeooowww');
console.log(alfred);
alfred.meows();
