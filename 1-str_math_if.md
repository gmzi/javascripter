## String methods

[toUpperCase](###toUpperCase)  
[trim](###trim)  
[indexOf](###indexOf)  
[slice](###slice)  
[replace](###replace)  
[parseInt](###parseInt)  
[parseFloat](###parseFloat)

[String_escapes](###String_escapes)

## Conditional statements

[conditionals](##Conditional_statements)

### Ternary_operator

[ternary_operator](###Ternary_operator)

## data types

[dataTypes](##Primitive_data_types)

### Mathematical_operations

[Mathematical_operations](###Mathematical_operations)

### Operators

[logialOperators](###Logical_operators)  
[operatorsPrecedence](####Operators_precedence)

### Booleans

[Booleans](###Booleans)

### toUpperCase

```javascript
let thing = 'asdfgh';
thing.toUpperCase(); // ASDFGH
```

### trim

```javascript
let color = ' purple caqui ';
color.trim(); //removes white spaces at beginning and end of string.
```

### indexOf

```javascript
let pipita = 'hola mi nombre es Pipita';
pipita.indexOf('f'); //-1 (absence of character)
pipita.indexOf('es'); //15
```

### slice

Stores sliced in new variable.

```javascript
let pipita = 'hola mi nombre es Pipita';
let pip = pipita.slice(15);
console.log(pipita); //"hola mi nombre es Pipita"
console.log(pip); // "es Pipita"
let pup = pipita.slice(5, 14); // "mi nombre"
```

### replace

`str.replace("toRemove", "toInclude");`

```javascript
let sor = pipita.replace('Pipita', 'Sorete'); // "hola mi nombre es Sorete"
```

### parseInt

Parse strings into integer number (watch out for NaN.)

```javascript
parseInt('23'); // 23
parseInt('23.34'); //23
parseInt('I ate 3 ramps'); // NaN
parseInt('33cents'); // 33
```

### parseFloat

```javascript
parseFloat('23.43'); //23.43
parseFloat('23'); //23
parseFloat('I ate 3 ramps'); //NaN
parseFloat('33.2cents'); //33.2
```

CHAIN METHODS:

```javascript
color.trim().toUpperCase();
```

---

### Ternary_operator

Ternary operator

one `if` and one `else` in a single line of code.

```javascript
condition ? runIfTrue : runIfFalse;
// if condition is true, `runIfTrue` will run, else `runIfFalse` will run.
```

```javascript
let num = 7;
num === 7 ? console.log('lucky') : console.log('bad');

// ternary in variable value:
let status = 'offline';
let color;

let color = status === 'offline' ? 'red' : 'green';
```

---

## Primitive_data_types

- number
  - Integer
  - float
  - NaN
- String
- Boolean
- Null
- Undefined

---

### Mathematical_operations

In order of precedence:
`()` Parenthesis always runs first.  
`2 ** 2;` & `2 % 2` Exponenciation & modulo
`2 * 2` & `2 / 2` Multiplication and division  
`2 + 2` & `2 - 2` Addition and substraction  
If same precedence, execute from left to right.

`3 - 9 * 2 // -15`
`(3 - 9) * 2; // -12`
`1.5 + 1.5 * 2; // 4.5`
`10 % 6 ** 2; //16`
`200 + 0 / 0; // NaN`

### Ternary operators

```javascript
score++; // adds 1
score--; // sustracts 1
score *= 5;
score += 1;
score -= 10;
bonusMult = 100;
score *= bonusMult;
```

### The Math Object

Collection of pieces of mathematical functionallity.

```javascript
Math.PI;

Math.round(4.9); // 5

Math.abs(-456); // 456

Math.pow(2, 5); // 32

Math.floor(3.9); // 3

Math.random(); // random decimal between 0 and 1.

// Get a random number between 1 and 88:
Math.floor(Math.random() * 89) + 1;
```

---

### Booleans

`true` or `false` values.

### FALSY VALUES:

`false`  
`0`  
`""` (empty string)  
`null`  
`undefined`  
`NaN`
ALL THE REST ARE TRUTHY VALUES.

Check truthyness or falsyness:

```javascript
Boolean(0); // false
Boolean([]); // true

/*the twisted way:*/
!5; // false
!!5; // true
!!0; // false
```

---

### String_escapes

- `\n` : new line
- `\'` : single quote;
- `\"` : double quote;
- `\\` : backslash;

---

### String template literals

Strings that allow embeded information, which will be evaluated and turned into a resulting string.

```javascript
`You owe me ${100 + 53}`;
let animal = 'Pig';
let sound = 'oink';
`${animal} says ${sound.toUpperCase()}!`; // pig says OINK!
```

### `null` & `Undefined`

```javascript
let loggedUser = null; //intentional absence of value. / must be assigned.
let user = undefined; //variables that not have an assigned value.
```

---

### `typeof` operator

```javascript
const userData = 10;
typeof userData; // number
```

### Comparisons

`>` grater than  
`<` less than  
`>=` greater or equal to  
`<=` less or equal to  
`==` equality (of values only)  
`!=` not equal  
`===` strict equality (of vales and type)  
`!==` strict non-equality (value and type)

Strings characters are less or greater than others according to their Unicode values.

    REPL: "read-evaluate-print-loop"

## Conditional_statements

### `if/ else if / else`

```javascript
// Odd number checker:
let num = 36;

if (num % 2 !== 0) {
  console.log('Odd number');
}
```

`else if`  
Will run only one of the conditions.

```javascript
let rating = 2;
if (rating === 3) {
  console.log('Your are a star');
} else if (rating === 2) {
  console.log("You're not a star");
} else if (rating === 1) {
  console.log('Needs improvement');
} else {
  console.log('nothing true before');
}
```

If vs else if.
With `else if`, one of the statements will run:

```javascript
let n = 10;
if (n > 0) {
  console.log('n first time');
} else if (n < 100) {
  console.log('n second time');
} else {
  console.log('not valid');
}
//'n first time'.
```

With `if`, all the true statements will run:

```javascript
if (n > 0) {
  console.log('n first time');
}
if (n < 100) {
  console.log('n second time');
} else {
  console.log('not valid');
}
// 'n first time'
// 'n second time'
```

#### Nested conditionals

Nest conditionals inside conditionals

```javascript
let password;

if (password.length >= 6) {
  if (password.indexOf(' ') === -1) {
    console.log('valid password');
  } else {
    console.log('Password is long enough, but cannot contain spaces');
  }
} else {
  console.log('pwd must be longer');
}
```

### `switch`

One thing to check across multiple variables.

```javascript
// One variable each:
let day = 5;

switch (day) {
  case 1:
    console.log('Monday');
    break;
  case 2:
    console.log('Tuesday');
    break;
  case 3:
    console.log('Wednesday');
    break;
  default:
    console.log('invalid day');
}
// Two or more variables each:
let emoji = 'eggplant';

switch (emoji) {
  case 'sad face':
  case 'happy face':
    console.log('yellow');
    break;
  case 'eggplant':
    console.log('purple');
    break;
  case 'heart':
  case 'lips':
    console.log('red');
    break;
}
```

### Logical_operators

`&&` both sides have to be true to execute

`||` if one side is true, the entire thing is true.

```javascript
let color = ;
if (color === 'blue' || color === 'lilac' || color === 'violet') {
  console.log("gret choice");
}
```

`!` the "not" operator. Returns true if the expression is false. Returns false if the expression is true. "Not true is false".

```javascript
!(3 > 4); // true
!(5 > 4); // false
//If there isn't a logged user:
if (!loggedInUser) {
  console.log("get out of here you're not logged in");
}
```

#### Operators_precedence

Order of execution from first to last:
`()` parenthesis run first.  
`!` run first
`<`  
`<=`  
`>`  
`>=`  
`==`  
`!=`  
`===`  
`!==`  
`&&` run second
`||` run third.  
To alter this order of precedence, add parenthesis.

---

### Include JS code into the html file

Two options:

1. In the html file:

```html
<script>
  <!-- Code goes here>
</script>
```

2. In a separate file. In html:

```html
<script src="app.js"></scriptL>
```

### Variables declaration and behavoir

`var`, can reassign; can redeclare; function scope.  
`let`, can reassign, no redeclare, block scope.
`const`, no reassign, no redeclare, block scope.

Arrays and objects can use `const` because they references in memory doesn't change, while it's inner elements can change.
