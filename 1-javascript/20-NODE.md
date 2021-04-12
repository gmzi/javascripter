# Express and Node

EXPRESS

- [syntax](##syntax)
  - 1 configs(top)
  - 2 query-string
  - 3 request-body
  - 4 url-params
  - 5 headers
  - 6 get
  - 7 post
  - 8 API
  - 9 configs(bottom)
- [validation](##validation)
- [error_handling](##error_handling)
- [debugging](##debugging)

NODE:

- file system:
  - [reading_files](###reading_files)
  - [writing_files](###writing_files)
- process:
  - [process.env](##process.env)
  - [process.exit](##process.exit)
  - [process.argv](##process.argv)
- modules system:
  - [import/export_files](##import/export_files)
- [import_libraries](##import_libraries)
- [node_callbacks](##node_callbacks)
- [global](##global)
- [npm](##npm)
- testing:
  - [jest](#jest)

# EXPRESS

## syntax

```javascript
// 1- configs
const express = require('express');

// SERVER CONFIGURATIONS:
const app = express();
app.listen();
// REQUESTS CONFIGURATION:
app.use(express.json()); // to receive and understand json reqs (APi endpoints, etc)
app.use(express.urlencoded({ extended: true })); // receive and understand form data

// ROUTES:

// home page:
app.get('/', (req, res) => {
  res.send('Homepage');
});

// 2- QUERY STRING
// listen to '/search?term=someterm&sort=somesort'
app.get('/search', (req, res) => {
  console.log(req.query); // { term: 'luca', sort: 'prodan' }
  const { term = 'my-default-term', sort = 'my-default-sort' } = req.query;
  return res.send(`Search page for ${term}, ${sort}`);
});

// 3- REQUEST BODY
// Mind configuring express requests at the top
// for POST requests data from forms, API endpoints, etc
app.post('/register', (req, res) => {
  console.log(req.body);
  let param1 = req.body.myparam1;
});

// 4- URL parameters
const greetings = {
  en: 'hello',
  fr: 'bonjour',
  ic: 'halló',
};
app.get('/greet/:lang', function (req, res) {
  console.log(req.params); // {lang:"en"}
  const lang = req.params.lang; // "en"
  const greeting = greetings[lang];
  if (!greeting) return res.send('invalid language');
  return res.send(greeting);
});

// 5- HEADERS

app.get('/detect-lang', (req, res) => {
  const lang = req.headers['accept-language'];
  res.send(lang); // en-US,en;q=0.9
});

app.get('/show-headers', (req, res) => {
  console.log(req.rawHeaders); // shows array with raw headers
  console.log(req.headers); // headers object with key-value pairs.
  res.send(req.headers); // sends headers as json
});

// 6- GET
app.get('/dogs', function (req, res) {
  // express makes request object ('req'), and response object 'res' automatically, you can use them or not, but
  // will always be in that order.
  console.log(req); // JS object containing request data
  return res.send('<H1>Dogs go Yamn brk brk</H1>'); // response content. Express sets the response object type
  // dinamically according to the content of the response
});

// this will never get matched, because express executes first match only
app.get('/dogs', function (req, res) {
  return res.send('but what about these dogs???');
});

// 7- POST
app.post('/chickens', function createChicken(req, res) {
  res.send('Chicken created! (POST verb)');
});

// 8-  API
// for a json API, all data will be formatted as json
const CANDIES = [
  { name: 'snickers', qty: 23, price: 1.5 },
  { name: 'tita', qty: 901, price: 23.5 },
];

app.get('/candies', (req, res) => {
  res.send(CANDIES); // express sends json because the passed, object is json
  res.json('this will be converted to json by express'); // converts any passed argument to json
});

app.post('/candies', (req, res) => {
  // capture invalid condition:
  if (req.body.name.toLowerCase() === 'mediahora') {
    res.status(403).json({ msg: 'horrible choice. Mediahora forbidden' });
  }
  // if validation pass, save the incoming data to database:
  CANDIES.push(req.body);
  //respond with status code 'created' and updated database:
  res.status(201).json(CANDIES);
});

//******* LOOK HERE!!!!!!!!!!!!!!! */
// 9. CONFIGURATIONS (BOTTOM):

// 9.0 MIDLEWARE FOR 404 ERROR:
// this route will run if none of the above routes are matched:
// (mind that this relies on custom error class we called ExpressError or whatever)
app.use((req, res, next) => {
  const e = new ExpressError('Page Not Found', 404);
  next(e);
});

// 9.1 MIDLEWARE (FOR ERRORS):
app.use((error, req, res, next) => {
  console.log(error.msg);
  // default status is 500 internal server error
  let status = res.status || 500;
  let message = error.message;

  //set the status and alert the user:
  return res.status(status).json({ error: { message, status } });
});

// 9.2 SERVER (always at the bottom of file):
app.listen(3000, function () {
  // callback func to run when server started:
  console.log('Server running on port 3000');
});

// to run server: 'node fileName.js' Browser: localhost:3000
// nodemon fileName.js
```

## validation

```javascript
const USERS = [
  { username: 'Rosana', city: 'PA' },
  { username: 'Juanca', city: 'BA' },
];
app.get('/users/:username', function (req, res, next) {
  const user = USERS.find((u) => u.username === req.params.username);
  if (!user) return res.status(404).send('NOT FOUND');
  // simpler: if (!user) throw "invalid username";
  return res.send({ user });
});

app.get('/secret', (req, res) => {
  if (req.query.password != 'popcorn') {
    res.status(403).send('Invalid pass');
  }
  res.send('Access granted');
});
```

## error_handling

Express has a default error handling, but always return status code 500 (internal server erro). Can custom our own error handling on top of default behavoir.

```javascript
const USERS = [
  { username: 'Rosana', city: 'PA' },
  { username: 'Juanca', city: 'BA' },
];

// -------------------------------------------------------------------
// the basic way: (relies on express default error handling behavoir)
app.get('/users/:username', function (req, res, next) {
  const user = USERS.find((u) => u.username === req.params.username);
  if (!user) throw 'Not found!';
  return res.send({ user });
});

// --------------------------------------------------------
// custom error classes:

// in 'expressError.js':

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack); // method in the Error class to lead us in the debugging
  }
}

module.exports = ExpressError;

// in app.js:

app.use(express.json());

const ExpressError = require('./expressError');

app.get('/users/:username', function (req, res, next) {
  try {
    const user = USERS.find((u) => u.username === req.params.username);
    // throw the error if needed:
    if (!user) throw new ExpressError('invalid username', 404);
    // return value if no erros:
    return res.send({ user });
    // catch the error thrown above:
  } catch (e) {
    next(e);
  }
});

app.get('/savetodb', (req, res, next) => {
  try {
    attemptToSaveToDB();
    return res.send('Saved succesfully');
  } catch (e) {
    return next(new ExpressError('Database Error', 500));
  }
});

// CONFIGURATIONS BOTTOM:
/ 9.0 MIDLEWARE FOR 404 ERROR:
// this route will run if none of the above routes are matched:
// (mind that this relies on custom error class we called ExpressError or whatever)
app.use((req, res, next) => {
  const e = new ExpressError('Page Not Found', 404);
  next(e);
});

// 9.1 MIDLEWARE (FOR ERRORS):
app.use((error, req, res, next) => {
  console.log(error.msg);
  // default status is 500 internal server error
  let status = res.status || 500;
  let message = error.message;

  //set the status and alert the user:
  return res.status(status).json({ error: { message, status } });
});

// 9.2 SERVER (always at the bottom of file):
app.listen(3000, function () {
  // callback func to run when server started:
  console.log('Server running on port 3000');
});
```

## debugging

COMMANDS:

- `node --inspect` runs file stopping at keyword "debugger"
- `node --inspect-brk myFile.js` (adds breakpoint in first line of app)
  for express:
- `nodemon --inspect myFile.js` same but with nodemon

```javascript
function add(x, y) {
  debugger; // will pass execution here and we can inspect it with chrome debugger
  return x + y;
}

console.log(1, 2, 3);
```

Debug node only:

- `node --inspect-brk sumEvens.js`

Debug Express:

## route_methods

One for each HTTP verb:

- app.get(path, callback)
- app.post(path, callback)
- app.put(path, callback)
- app.patch(path, callback)
- app.delete(path, callback)

When you start the server, Express runs through the file and registers all the event listeners before app.listen at the bottom.
Whenever a user makes a request, Express invokes the first matching route handler it finds until a response is issued via a method on the response object.
This is called the request-response cycle for Express.

# NODE

## file_system_module

### reading_files

`fs.readFile(path, encoding, callback);`

```javascript
const fs = require('fs');

// ASYNCHRONOUS
fs.readFile('words.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('ERROR:', err);
    process.kill(1);
  }
  console.log('File content:', data); // File content: words words words
});

// SYNCHRONOUS:
try {
  // store the read file contents
  var contents = fs.readFileSync('myFile.txt', 'utf8');
  console.log(`file contents are "${contents}"`);
} catch (error) {
  // errors thrown by fs will be caught here
  console.error(error);
  // kill the process and tell the shell it errored
  process.exit(1);
}
```

- path: path to file (relative to working directory)
- encoding: how to interpret file. For text files, this is almost always “utf8”. for binary files (like an image), omit this argument
- callback: function that takes error and data

The fs module is built-in and provides an interface to your local file system.
It is commonly used to read and write files.

### writing_files

`fs.writeFile(path, data, encoding, callback)`

```javascript
const fs = require('fs');

const phrase = 'THIS WILL GO IN THE FILE!';

// OVERWRITE FILE:
fs.writeFile('./files/output.txt', phrase, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Successfully wrote to file!');
});
console.log('writing file...');

// APPEND TO FILE:
fs.appendFile('./files/output.txt', phrase, 'utf8', (err) => {
  if (err) {
    console.log('error', err);
    process.kill(1);
  }
  console.log('it worked');
});

console.log('appending to file...');

// APPEND WITH FLAG:
fs.writeFile(
  './files/output.txt',
  phrase,
  { encoding: 'utf8', flag: 'a' },
  (err) => {
    if (err) {
      console.log('error', err);
      process.kill(1);
    }
    console.log('it worked');
  }
);
console.log('appending to file...');
```

## process.env

Create .env variables:
in terminal:

- `export SECRET_INFO='abc123'`

Access .env variables in file:

```javascript
console.log(process.env.SECRET_INFO); // abc123
```

Access .env variables in terminal:

1. run node
2. `process.SECRET_INFO`

process.env is an object that contains key-value pairs. The keys are the names of the environment variables, and the values are... well, it's values.

For secret keys and APIs credentials.

Is a global object for managing the current script. Using process, we can:

- Access environment variables.
- See the command-line arguments passed to the script.
- Kill the script.

## process.exit

```javascript
console.log('caquite'); // this will run

process.exit(1);

console.log('lfdslasdfsa'); // this won't run
```

Exit the program inmediately, and displays a code:
Standard Codes:

- success code: 0
- failure code: 1 and above

You can assign your own meaning to codes.

## process.argv

An array of command-line arguments given to be executed by the program. First two are paths to node in local machine and to file, then comes the rest of the arguments:

In terminal:

```
$ node showArgs.js hello world
    0 '/path/to/node' -->
    1 '/path/to/showArgs.js'
    - whatever is in the script.js file to run
    - 'hello'
    - 'world'
```

In js:

```javascript
const fs = require('fs');
const process = require('process');

const myPath = process.argv[2];

fs.readFile(myPath, 'utf8', (err, data) => {
  if (err) {
    console.log('LA RECONCHA TUYA!!!!!', err);
    process.kill(1);
  }
  console.log('Heres the file: ', data);
});
```

[process_docs](https://nodejs.org/api/process.html#process_process)

## import/export_files

Double process: export from a file, import it in the other.

```javascript
// EXPORT from /helpers.js:
function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}

module.exports = {
  add: add,
  color: 'red',
}; // not exporting 'subtract' function

// --------------------------------------------------------------------

// IMPORT in /app.js:
// import the module:
const { add, color } = require('./helpers'); //mind the './' for same folder, '../' for one folder up.
// call the methods:
color; // 'red'
add(1, 1); // 2
```

Modules are the way to share code across different files in a Node project.
To share code accress different files, have to export/import manually.

## import_libraries

```javascript
// Import libraries:
const axios = require('axios');
const faker = require('faker');

// use libraries:
console.log(faker.name.findName());
console.log(axios);
```

## node_callbacks

Node callbacks use Error-first pattern: first param is error, node will supply an error object if there's an error, otherwise null as arguments.

```javascript
const fs = require('fs');

fs.readFile('myFile.txt', 'utf8', function (err, data) {
  if (err) {
    // handle error, options:
    // - log the error to the console.
    // - exit the program with process.exit(1)
  }
  // otherwise we're good, continue execution
});
```

## global

- _global object_ is in node.js the equivalent to browser's window object.
- no DOM methods nor document methods in node.js
- node.js has file system and can start server processes.
- There are libraries that can run in both node and browsers js (like axios)

## npm

[npm](https://www.npmjs.com)
Node package manager
Massive registry of add-on libraries
Command line tool, npm, comes with Node
Easy dependency management for a project
Register with npm to publish open-source or proprietary packages

Javascript environment that runs server-side (not in the browser). Uses Chrome 8 engine, but doesn't require Chrome.
With Node.js, entire stack can be made in JS, back and front end. Has a lot of npm packages. Very efficient in streamming. Can use Electron to "translate" your js app into any language.
Not so good for very complex server-side computation.

- `npm install nameOfPackage`
  - ex. `npm install axios`

# jest

It's built on top of Jasmine. It's to test environments that are not browser based.

1. myfile.js:

```javascript
function add(x, y) {
  return x + y;
}

// MIND EXPORTING THE FILE
module.exports = { add };
```

2. myfile.test.js:

```javascript
const { add, sustract, getRandomToy } = require('./math');

describe('add function', function () {
  const value = add(2, 2);
  test('should return sum of two nums', function () {
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });
});

describe('flavors', function () {
  test('the best flavor is not coconut', () => {
    expect(bestLaCroixFlavor()).not.toBe('coconut');
    expect(bestLaCroixFlavor()).toContain('choco');
    expect(bestLaCroixFlavor()).toContain('choco');
  });
});

describe('sustract function', function () {
  test('shoud return x - y', function () {
    const res = sustract(3, 2);
    expect(res).toEqual(1);
    const res2 = sustract(5, 5);
    expect(res2).toEqual(0);
  });
});

test('drinking La Croix leads to having thirst info', () => {
  drinkSomeLaCroix();
  expect(thirstInfo()).toBeTruthy();
});

// -----------
// ANY
test('playing with any', function () {
  let num = Math.random() * 6;
  expect(num).toEqual(expect.any(Number));
  expect('ASKD').toEqual(expect.any(String));
  // MIND PASSING A CONSTRUCTOR after "any"
});

test('random toy', function () {
  let toy = getRandomToy();
  expect(toy).toEqual({
    toy: {
      name: expect.any(String),
      price: 34.99,
    },
  });
});

// ---------------
// NOT
test('play with not', function () {
  const numLives = 9;
  expect(numLives).not.toEqual(0);
});

// npm run test
```

## before/after

can go in or outside the describes

```javascript
describe('my set of tests', function () {
  // to access a value from every test, in general scope:
  let cart;

  beforeAll(function () {
    console.log('Run before all tests');
  });
  // tests here
  beforeEach(function () {
    console.log('Run before each it');
    cart = { item: 'my-clean-item', value: 'my-clean-value' };
  });
  // test here
  afterEach(function () {
    console.log('Run after each it');
  });

  afterAll(function () {
    console.log('Run after all tests');
  });
});
```

[docs](https://jestjs.io/docs/en/using-matchers)

## install_and_configure_jest

1. Install jest:

- `npm install --save-dev jest`

2. if file test:
   - `NAME_OF_FILE.test.js`
     if folder:
   - `__tests__`
3. Configuration:
   - If you have a package.json, you don’t need additional configuration, check:
     `json { "scripts": { "test": "jest" } } `
   - If not, create jest.config.js file. It can be empty, you just need one.
4. Run:

- `npm run test`
