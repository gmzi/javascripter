# Debugging

Is the process of identifying what's wrong with the code and fixing it.
Find the error and fix it.

## Common error messages

### Syntax error

Javascript isn't able to parse a certain syntax.

### ReferenceError

Happen when:

- Try to access a variable that's out of scope, not defined, or doesn't exist.
- Dependencie issue.
- Scope issue.

### TypeError

Trying to do something with a data type that cannot perform the intended task (e.g. call an array method on a string).
`"hello".splice() // TypeError`.

## Errors with no message.

There are no error messages, the code works, but we're getting unexpected results or non desired results. In this case, Colt recommends:

- Make assumption about the error.
- Test the assumption.
- Prove the assumption.
- Repeat the assumption.

`console.log()` is a very useful resource to debug.  
Control what you're printing out. For more clarity, can add the title of the printed values:
`console.log("value of x:", x)`

## Javascript debugger

Can debug code in-browser or with node.

Ways to trigger the debugger:

1. Adding breakpoints

   - Breakpoints in browser.
     In chrome: option+command+j -> Sources -> Select `app.js` or whatever file to debug. Add breakpoints highlighting line number of file.

   - `debugger` in code (in case you don't want to go all the way in the browser, and you can add it dynamically in different instances of your code):

   ```javascript
   let grades = [23, 35, 54, 23];
   let sum = 0;
   debugger; // <-- WILL STOP EXECUTION HERE
   for (let i = 0; i < grades.length; i++) {
     sum += grades[i];
   }
   let avg = sum / grades.length;
   console.log(avg);
   ```

2. Steps

- step. Executes next step in function.
- step over to next function.
- step into next function.
- step out of current function.

[Chrome_debugger_full_doc](https://developers.google.com/web/tools/chrome-devtools/javascript)

## Tips to avoid bugs.

- Plan things first. After that you write the code.
- Keep it simple. Code should be easy to understand for when debugging.
- Rewrite what you find online before including it in your code.
- Use `===` rather than double equals.
- Don't compare arrays nor objects, their identifiers in memory are always unique ([1, 2, 3] !== [1, 2, 3]).
- Calling function with missing arguments makes those arguments undefined.
- Calling function with too many arguments makes the extra arguments to be ignored.
- Getting a missing property from object/index from array is `undefined`.
