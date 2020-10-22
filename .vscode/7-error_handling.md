# Error Handling

Prevent the code from crashing when there's an error. (Working with API's or send messages, databases, servers, etc.). Code has to be prepared to handle the issues.

## try / catch

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
