import { choice, remove } from './helpers.js';
import foods from './foods.js';

let fruits = foods;
let fruit = choice(fruits);

console.log(`I'd like a ${fruit} please`);
console.log(`Of course, here's your ${fruit}`);
console.log(`May I have another?`);

remove(fruits, fruit);

console.log(`We're all out. Here's what we have available: ${fruits}`);
