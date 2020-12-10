# Object Oriented Programming

A program paradigm is a style of programming, a way to structure the language and dictate how you write code. Like in music,
there are different genres and styles, but the notes are the same. OOP is the most frequently used style of programming in
the world, because its used in the most front end and back ends of apps and websites.

## OOP characteristics

Data is structures into classes, and coded procedures manipulate data in objects. An array, for example, is an instance of
a class, and a method like filter is an instance of a procedure.
Javascript wasn't originally designed as an Object-oriented language, but ES2015 made it more object-oriented.

### Review objects and methods:

### POJO

Plain Old Javascript Object. It's characteristics:

```javascript
let o1 = {} // make object
let 02 = new Object(); // make object
o1.name = 'whiskey'; // add property (key and value)
o1[name] = "whiskey"; // read the value
01.["color"] = 'brown'; // set new property
01[color] = 'brown'; // read new property

Object.keys(o1) // iterate over the keys
Object.values(o1) // iterate over values

Object.entries(o1) // array of key-value pairs.
```

All keys get "stringified" when added to the object.

Methods:
We can use objects to group methods together. Example, the Math object groups a variety of math operations (Math.max, Math.min, etc.). It's a collection of things. If we want to make our own collection of methods:

```javascript
const myMath = {
  add: function (x, y) {
    return x + y;
  },
  mult: function (x, y) {
    return x * y;
  },
  div: function (x, y) {
    return x / y;
  },
};
myMath.add(3, 2); // 5;
```
