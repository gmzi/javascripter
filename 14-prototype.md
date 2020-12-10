# prototype

Prototype object is an object that stores functionalities that we can use accross that object's instances (array methods, object methods, Sets methods, Maps methods, etc).
We make an object using a constructor function:

Let's make a constructor function with functionalities inside the object:

```javascript
function Triangle(sideA, sideB) {
  this.sideA = sideA;
  this.sideB = sideB;
  this.getArea = function () {
    return (this.sideA * this.sideB) / 2;
  };
  this.getHypotenuse = function () {
    return Math.sqrt(this.sideA ** 2 + this.sideB ** 2);
  };
}

// NEW KEYWORD:
// create instances of Triangle object using keyword "new":
const maryTriangle = new Triangle(23, 30);
maryTriangle; /*
Triangle {sideA: 23, sideB: 30, getArea: ƒ, getHypotenuse: ƒ}
getArea: ƒ ()
getHypotenuse: ƒ ()
sideA: 23
sideB: 30
__proto__:
constructor: ƒ Triangle(sideA, sideB)
__proto__: Object
*/
```

Look at `__proto__`. The prototype object is an object that contains a bunch of methods. Contains the functionality that every instance will use.
`Array.prototype` will list all the methods available. `Object.prototye`, `Set.prototype`, the `__proto__` property contains all the methods.

```javascript
[].__proto__ === Array.prototype; // true.
```

`__proto__` is a property on an array. "prototype" is the actual prototype object.

We can add our own customized methods to the prototype object.

What is wrong with the above constructor function (not wrong, let's say not great) is that for each new instance of Triangle (maryTriangle, peterTriangle, etc) we're creating a brand new getArea() and getHypotenuse() functions, this is not great. It would be better to create those functions only once, and call them when needed, just like we do with push, or slice, etc. when we work with arrays. So let's do it:

```javascript
Triangle.prototype.getArea = function () {
  return (this.sideA * this.sideB) / 2;
};
Triangle.prototype.getHypotenuse = function () {
  return Math.sqrt(this.sideA ** 2 + this.sideB ** 2);
};
```

So now the Triangle constructor will look like this:

```javascript
function Triangle(sideA, sideB) {
  this.sideA = sideA;
  this.sideB = sideB;
}
```

And it's instance will look like this:

```javascript
maryTriangle; /*
Triangle {sideA: 23, sideB: 30}
    sideA: 23
    sideB: 30
    __proto__: 
        getArea: ƒ ()
        getHypotenuse: ƒ ()
        constructor: ƒ Triangle(sideA, sideB)
        __proto__: Object
*/
```

The functions are now inside the `__proto__` object, not anymore in the object, so we are not creating a new one each time we create a new instance of the object. We can check it:

```javascript
maryTriangle.getArea === pipiTriangle.getArea; // true (we're not calling the function and it's values, just checking both instances are referencing to one single method)
```

And we can call the methods on the variables just the same way we did:

```javascript
maryTriangle.getArea(); // 345
```
