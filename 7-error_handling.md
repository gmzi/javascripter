# Error Handling

Prevent the code from crashing when there's an error. (Working with API's or send messages, databases, servers, etc.). Code has to be prepared to handle the issues.

## try / catch

For unpredictable errors.

```javascript
try {
  functionThatMayFail();
} catch (err) {
  console.log("something went wrong", err);
}
```

Try and catch create block scope, so whatever is defined inside them will only be available inside them, not globally.
The parameter `(err)` (or whatever name you want to give it) allows to get info about the error or the type of error.

```javascript
try {
  connect();
} catch (err) {
  console.log("OH FUCK, no connection");
  console.log(err);
}
/* OH FUCK, no connection
ReferenceError: connect is not defined at app.js:2
*/
```

try and catch inside a function:

```javascript
function displayInitials(user) {
  let firstNameLetter;
  let lastNameLetter;
  try {
    firstNameLetter = user.firstName[0].toUpperCase();
    lastNameLetter = user.lastName[0].toUpperCase();
  } catch (e) {
    return `"Invalid input!!", ${e}`;
  }
  return `${firstNameLetter}.${lastNameLetter}.`;
}

displayInitials({ firstName: "caca", lastName: "pedo" }); // C.P.
displayInitials({ firstName: "fds" }); // "Invalid input!!", TypeError: Cannot read property '0' of undefined
```

## finally

After `try` and `catch`, `finally` will run whatever happens, it will run anyway.
Useful when opening files with functions as a file closing command [finally_block_doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

```javascript
try {
  console.log("inside try");
  undefined.pop(); // this results in an error
} catch (e) {
  // BUT WE CATCH IT HERE!!!
  console.log("OH FUCK, (runs only if there's an error)");
  console.log(e); // PRINTS THE ERROR
} finally {
  // RUNS EITHER WAY
  console.log("inside finally, runs either way");
}
```

## Throwing customized errors.

In adition to the standard console messages, we can create customized errors. You make it when you want to provide custom feedback. You can specify what's happening.

1. `throw` keyword.
   Causes an error and the code execution stops. Works like a syntax error, or a Reference error, etc, but doesn't provide much information.

   ```javascript
   console.log("I am before the error");
   throw "I Am the error!!!"; // EXECUTION WILL STOP HERE
   console.log("I am after the error");
   ```

2. `Error` object with `new` keyword.
   We make a better quality of error here, to get more information about what went wrong.

   ```javascript
   try {
     throw new Error("fuck I'm hot");
   } catch (e) {
     console.log("what kind of error?", e.name);
     console.log("what is the message?", e.message);
     console.log("where did it happen?", e.stack);
   }
   /*
    what kind of error? Error
    what is the message? fuck I'm hot
    where did it happen? Error: fuck I'm hot at http://127.0.0.1:5500/app.js:2:9
        */
   ```

New Error inside function:

```javascript
function getMonthName(mo) {
  mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (months[mo] !== undefined) {
    return months[mo];
  } else {
    throw new Error("InvalidMonthNo"); // to deal with wrong inputs
  }
}
getMonthName(10); // Oct
getMonthName("fds"); /* Uncaught Error: InvalidMonthNo 
at getMonthName (app.js:49) at app.js:54
getMonthName @ app.js:49
(anonymous) @ app.js:54
*/
```

We can change the Error name for different type of error:

```javascript
throw new TypeError("fuck it's type"); // what kind of error? Typerror
```

[full_doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
