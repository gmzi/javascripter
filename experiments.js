const cat = {
  name: 'blue',
  breed: 'scotish',
  dance(style) {
    console.log('This = ', this);
    console.log(`I'm ${this.name}, i'm a ${this.breed} and I dance ${style}`);
  },
};

console.log(cat.dance('tango')); // this = {name: blue, etc} I'm blue, i'm a scotish and I dance tango.

const blueDance = cat.dance;
// this wil be set to Window:
console.log(blueDance()); // I'm <empty str>, i'm a undefined and i dance undefined

// set "this" with call:
blueDance.call(cat, 'jota'); // I'm blue, i'm a scottish and I dance jota

const dog = {
  breed: 'salchi',
  name: 'astro',
};
blueDance.call(dog, 'tango'); // I'm astro, i'm a salchi and i dance tango

console.log(cat.dance.call(window, 'salsa')); // this = Window / I'm , i'm a undefined and I dance salsa.
