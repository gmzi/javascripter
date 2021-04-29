# node - express - pg(postgres)

[full_app_demo](/Users/xxx/projects/demos/node-express/jobly-demo)

PG(POSTGRES)

- [pg](##pg)
- [full_demo_OO_smarter](##OO_smarter)
- [full_demo_OO_simple](##OO_simple)
- [queries](##queries)
  - 1. Install
  - 2. db.js
  - 3. routes.js
- [relationships](##relationships)
- [testing](##testing_pg)

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
- [middleware](##middleware)
- [router](##router)
- [validation/authentication-users](##validation/authentication)
- [validation-data](##validation-data-jsonschema)
- [security](##security)
- [error_handling](##error_handling)
- [templates](##templates)
- [static_files](##static_files)
- [cookies](##cookies)
- [debugging](##debugging)
- [testing](##testing_express)

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
  - [npm_scripts](###npm_scripts)
- testing:
  Unittests:
  - [jest](#jest)
- [dateAndTime](##moment.js)
- [string_validation](##validator.js)
- [websocket](##websocket_protocol)

# PG

## OO_smarter

Like a mini ORM. (Like SQLAlchemy in python)
Checkout DOGS model and route:

[full_demo](/Users/xxx/projects/demos/node-express/OO_full_app)

For a full ORM checkout Sequelize.

## OO_simple

Checkout CATS model and route:

[full_demo](/Users/xxx/projects/demos/node-express/OO_full_app)

(checkout cool architecture with models on a folder and routes in another.)

## queries

1. install pg
2. db.js:

```javascript
const { Client } = require('pg');

let DB_URI;

if (process.env.NODE_ENV === 'test') {
  DB_URI = 'postgresql:///usersdb_test'; // for tests
} else {
  DB_URI = 'postgresql:///usersdb'; // the prod db
}

let db = new Client({
  connectionString: DB_URI,
});

db.connect();

module.exports = db;
```

3. in router.js:

### not_OO

Keeps SQL and routes together, kind of messy.

```javascript
const express = require('express');
const app = require('.');
const router = new express.Router();
// IMPORT DB:
const db = require('./db');
const ExpressError = require('./expressError');

router.get('/', async (req, res, next) => {
  try {
    const results = await db.query('SELECT * FROM USERS');
    return res.json({ users: results.rows });
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const results = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find user with id of ${id}`, 404);
    }
    return res.send({ user: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

// parameterized query:
router.get('/search', async (req, res, next) => {
  try {
    const type = req.query.type;
    const results = await db.query(`SELECT * FROM users WHERE type=$1`, [type]);
    return res.json(results.rows);
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, type } = req.body;
    // create user, commit it to db and get back the new state of db thanks to the "RETURNING" clause
    const newUser = await db.query(
      `INSERT INTO users (name, type) VALUES ($1, $2) RETURNING *`,
      [name, type]
    );
    return res.status(201).json({ user: newUser.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const id = req.params.id;
    const results = await db.query(
      `UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING id, name, type`,
      [name, type, id]
    );
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't update user with id of ${id}`, 404);
    }
    return res.send({ user: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const userToDel = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
    if (userToDel.rows.length === 0) {
      throw new ExpressError(`Can't find user with id of ${id}`, 404);
    }
    const results = await db.query(`DELETE FROM users WHERE id=$1`, [
      userToDel.id,
    ]);
    return res.send({ msg: 'deleted' });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
```

## relationships

### 1:M

```javascript
router.get('/:id', async function (req, res, next) {
  try {
    // request to one table
    const userRes = await db.query(`SELECT name, type FROM users WHERE id=$1`, [
      req.params.id,
    ]);

    // request to the other table (mind all requests can be parallel):
    const messagesRes = await db.query(
      `SELECT id, msg FROM messages 
             WHERE user_id = $1`,
      [req.params.id]
    );
    if (userRes.rows.length === 0) {
      throw new ExpressError('User not found', 404);
    }
    const user = userRes.rows[0];
    // ******** RELATIONSHIP DEFINED HERE:
    user.messages = messagesRes.rows;
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

/* result:
{
  name: "Juanita",
  type: "admin",
  messages: [
    {id: 1, msg: 'msg #1'},
    {id: 2, msg: 'msg #2'}
  ]
} */
```

### M:M

```javascript
router.get('/:id', async (req, res, next) => {
  try {
    const results = await db.query(
      `
      SELECT m.id, m.msg, t.tag  
      FROM messages AS m
      LEFT JOIN messages_tags AS mt 
      ON m.id = mt.message_id
      LEFT JOIN tags AS t
      ON  mt.tag_code = t.code
      WHERE m.id = $1`,
      [req.params.id]
    );
    if (results.rows.length === 0) {
      throw new ExpressError(`Message not found with id ${req.params.id}`, 404);
    }
    const { id, msg } = results.rows[0];
    // **** MAKE ARRAY OF TAGS FOR EACH MESSAGE:
    const tags = results.rows.map((r) => r.tag);
    return res.send({ id, msg, tags });
  } catch (e) {
    return next(e);
  }
});
/*result:
{
  "id": 1,
  "msg": "Help me with my coding interview!",
  "tags": [
    "Python",
    "JavaScript"
  ]
} */

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await db.query(
      `UPDATE messages SET msg = $1 WHERE id = $2
        RETURNING id, user_id, msg`,
      [req.body.msg, req.params.id]
    );
    if (result.rows.length === 0) {
      throw new ExpressError('Message not found', 404);
    }
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

/* result:
{
  "id": 1,
  "user_id": 1,
  "msg": "new message here"
} */
```

## testing_pg

Test database.

1. Create test database.
2. check db.js for connection to db.
3. install supertest and create server.js like other tests configs
4. router.test.js:

```javascript
process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./index');
const db = require('./db');

let testUser;

beforeEach(async () => {
  const result = await db.query(
    `INSERT INTO users (name, type) VALUES ('Peanut', 'admin') RETURNING id, name, type`
  );
  testUser = result.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM users`);
});

afterAll(async () => {
  await db.end();
});

describe('GET /users', function () {
  test('Gets a list of 1 user', async function () {
    const response = await request(app).get(`/users`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ users: [testUser] });
  });
});

describe('GET /users/:id', function () {
  test('Gets single user', async function () {
    const response = await request(app).get(`/users/${testUser.id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ user: testUser });
  });

  test('Reponds with 404 for invalid id', async function () {
    const response = await request(app).get(`/users/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /users', () => {
  test('Creates a single user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Billy', type: 'user' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      user: { id: expect.any(Number), name: 'Billy', type: 'user' },
    });
  });
});

describe('PATCH /users/:id', () => {
  test('Updates single user', async () => {
    const res = await request(app)
      .patch(`/users/${testUser.id}`)
      .send({ name: 'Billo', type: 'staff' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      user: { id: testUser.id, name: 'Billo', type: 'staff' },
    });
  });

  test('Responsd with 404 for invalid id', async () => {
    const res = await request(app)
      .patch(`/users/0`)
      .send({ name: 'Billo', type: 'staff' });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /users/:id', () => {
  test('Deletes single user', async () => {
    const res = await request(app).delete(`/users/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      msg: 'deleted',
    });
  });

  test('Responds 404 if user not found', async () => {
    const res = await request(app).delete(`/users/0`);
    expect(res.statusCode).toBe(404);
  });
});
```

Postgres for Node. Connects and executes SQL queries from Node. Lightest library to manage databases. Not an ORM. If need an ORM (like SQLAlchemy in python) you can try Sequalize.

---

# EXPRESS

## syntax

```javascript
// 1- configs
const express = require('express');

// SERVER CONFIGURATIONS:
const app = express();
app.listen();
// REQUESTS CONFIGURATION:
app.use(express.json()); // middleware to receive and understand json reqs (APi endpoints, etc)
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
  const receiveJson = req.body;
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

## middleware

It's the code that runs in the middle of the request/response cycle. (Between we receive a request and send the response)

1. middleware.js:

```javascript
const ExpressError = require('./expressError');

function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}

function checkForPassword(req, res, next) {
  try {
    if (req.query.password !== 'monkeys') {
      throw new ExpresssError('Missing password', 402);
    } else {
      return next();
    }
  } catch (e) {
    return next(e);
  }
}

module.exports = { logger, checkForPassword };
```

2. app.js:

```javascript
const middleware = require('./middleware');

// middleware for all routes:
app.use(middleware.logger); // mind putting this above all routes

// middleware called in specific route:
app.get('/secret', middleware.checkForPassword, (req, res, next) => {
  return res.send('Access granted, password correct');
});
```

## router

Put all routes in one specific file:

1. routes.js:

```javascript
//config:
const express = require('express');
const routes = new express.Router();

// database
let USERS = [{ name: 'lala' }, { name: 'toto' }];
// Routes:
routes.get('/', function (req, res) {
  return res.json(USERS);
});

routes.delete('/:id', function (req, res) {
  const idx = users.findIndex((u) => u.id === +req.params.id);
  users.splice(idx, 1);
  return res.json({ message: 'Deleted' });
});

module.exports = routes;
```

2. app.js:

```javascript
const routes = require('./routes');

// To pass a prefix for all routes:
app.use('/users', routes);
// this will add "users" to all routes definded with "/" in routes.js

// Use the route:
app.get('/users', routes);
```

## validation/authentication

Using bcrypt.
bcrypt.hash(password-to-hast, work-factor)
bcrypt.compare(password, hashed-password)

1. - `npm install bcrypt`
2. - `npm install jsonwebtoken`
3. Full demo:

`cd /Users/xxx/projects/demos/node-express/authentication`

routes/auth.js:

```javascript
/** Routes for demonstrating authentication in Express. */

const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ExpressError = require('../expressError');
const db = require('../db');
const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth');
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require('../config');

/** Register user.
 *   {username, password} => {username} */

router.post('/register', async function (req, res, next) {
  try {
    const { username, password } = req.body;

    // hash password:
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // save username and hashed pwd to db:
    const result = await db.query(
      `INSERT INTO users (username, password)
             VALUES ($1, $2)
             RETURNING username`,
      [username, hashedPassword]
    );

    return res.json(result.rows[0]);
  } catch (e) {
    if (e.code === '23505') {
      return next(new ExpressError('Username taken, please pick another', 400));
    }
  }
  return next(e);
});
// end

// this version of login does not use JWTs --- it's just a demo
// from the first part of the lecture, pre-JWTs

/** Login: returns {message} on success. */

router.post('/login-1', async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username]
    );
    const user = result.rows[0];

    if (user) {
      if ((await bcrypt.compare(password, user.password)) === true) {
        return res.json({ message: 'Logged in!' });
      }
    }
    throw new ExpressError('Invalid user/password', 400);
  } catch (err) {
    return next(err);
  }
});
// end

/** (Fixed) Login: returns JWT on success. */

router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      'SELECT password FROM users WHERE username = $1',
      [username]
    );
    let user = result.rows[0];

    if (user) {
      if ((await bcrypt.compare(password, user.password)) === true) {
        let token = jwt.sign({ username }, SECRET_KEY);
        return res.json({ token });
      }
    }
    throw new ExpressError('Invalid user/password', 400);
  } catch (err) {
    return next(err);
  }
});
// end

/** Secret-1 route than only users can access */

router.get('/secret-1', async function (req, res, next) {
  try {
    // try to get the token out of the body
    const tokenFromBody = req.body._token;

    // verify this was a token signed with OUR secret key
    // (jwt.verify raises error if not)
    jwt.verify(tokenFromBody, SECRET_KEY);

    return res.json({ message: 'Made it!' });
  } catch (err) {
    return next({ status: 401, message: 'Unauthorized' });
  }
});
// end

/** Secret route: only users can access */

router.get('/secret', ensureLoggedIn, async function (req, res, next) {
  try {
    return res.json({ message: 'Made it!' });
  } catch (err) {
    return next(err);
  }
});
// end

/** Secret-admin route: only admins can access */

router.get('/secret-admin', ensureAdmin, async function (req, res, next) {
  try {
    return res.json({ message: 'Made it!' });
  } catch (err) {
    return next(err);
  }
});
// end

module.exports = router;
```

### JWT

Using Json Web Tokens (JWT). Once authenticated, one same token works for the different services. Once validated, the user gets a token that is stored client-side (in a variable, or localStorage, etc). For every future requests, browser will send the token in the request, the server will get that token and validate it or not. All the different services can have their own validations, checking for the one single token from the client.
Parts of the JWT:

- Header: metadata about the token (signing algorithm used, type of token)
- Payload: data to be stored in token (typically an object).
  - It's not encrypted (it's encoded), so don't put sercret info here.
- Signature: contains the header and payload combined and hashed. If something changes in the header or the payload, the signature will be different and also contains the SECRET that the server will require to grant auth.

### token_methods:

Create token:
jwt.sign(payload, secret-key, jwt-options) // returns a string.

Verify token:
jwt.verify(token, secret-key) // Checks if token matches with the secret key in server, and returns the payload if corretc, if not match returns error

Decode:
jwt.decode(token) // returns the payload. Doens't verify the signature.

Create Token:

```javascript
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'my-secret-phrase';
const JWT_OPTIONS = { expiresIn: 60 * 60 }; // 1 hour

let payload = { username: 'jane' };
let token = jwt.sign(payload, SECRET_KEY, JWT_OPTIONS);

// IN THE REQUEST SIDE:

// get token from login route
let resp = await axios.post('/login', { username: 'jane', password: 'secret' });
let token = resp.data;

// use that tOken for future requests:
await axios.get('/secret', { params: { token: token } });
await axios.post('/other', { token: token });
```

---

### morgan

npm install morgan, then:

1. app.js:

```javascript
const morgan = require('morgan');

app.use(morgan('dev'));
```

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

---

## validation-data-jsonschema

jsonschema.validate(JSON_obj, schema_to_validate_against).valid // tre/false

1. - `npm install jsonschema`
2. Make a json example with the format you want the json data to be sent to your database. (Mind making different schemas for different data sets)
3. generate schema from above example in https://jsonschema.net/
4. copy schema and paste it in `schemas/mySchemaName.json`
5. in routes/books.js:

```javascript
const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const jsonschema = require('jsonschema'); // impoty package
const bookSchema = require('../schemas/bookSchema.json'); // IMPORT SCHEMA!!!!!

router.post('/add-book', function (req, res, next) {
  const result = jsonschema.validate(req.body, bookSchema);

  if (!result.valid) {
    // loop over errors getting the stack one:
    let listOfErrors = result.errors.map((error) => error.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  // now we now the input is clean and valid:
  const { book } = req.body;
  return res.json(book);
});

module.exports = router;
```

[full_demo](/Users/xxx/projects/demos/node-express)

Schema validator: https://www.jsonschemavalidator.net
Validate data before sending it to database.
Use jsonschema. "JSON Schema is a vocabulary that allows you to annotate and validate JSON documents."
Docs: https://json-schema.org

---

## security

CSRF and other security concerns, protect app with:

- [helmet](https://www.npmjs.com/package/helmet)

Authentication and login for third party login:

- [Passport](https://www.passportjs.org)

---

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

---

## templates

Tools:

- nunjucks (syntax like jinja)

  ```javascript
  const express = require('express');
  const app = express()
  cons nunjucks = require('nunjucks')

  nunjucks.configure('views', {
  autoescape: true,
  express: app
  })

  app.get('/', (req, res, next) => {
  res.render("index.html")
  })
  ```

- Pug (different syntax)

## static_files

style.css, and other static files (like in flask). Needs middleware configuration:

1. app.js:

```javascript
// serve all stuff in static/ folder
app.use(express.static('static/')); // will serve style.css, .js, etc. Checkout demos/node-express/websocket-groupchat for full setup

app.use(express.static('nameOfFolderThatContainsStyle.css'));
app.use(express.static('nameOfFolderThatContainesMyScript.js'));
// to serve with path to folder:
app.use('/folderName', express.static('fileName'));
```

2. index.html:

```html
<link rel="stylesheet" href="app.css" />
<!-- all body of file -->
<script src='MyScript.js'>
```

## cookies

```javascript
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function (req, res, next) {
  console.log('Cookies: ', req.cookies);
});
```

## debugging

COMMANDS:

- `node --inspect` runs file stopping at keyword "debugger"
- `node --inspect-brk myFile.js` (adds breakpoint in first line of app)
  for express:
- `nodemon --inspect myFile.js` same but with nodemon (mind refreshing chrome to catch the debugger tags)

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

## testing_express

Setup Supertest:

0. check if jest installed (install it if not)
1. `npm i --save-dev supertest`
2. export app.js: module.exports = app;
3. Make server.js file:

[cool_tests_demo](/Users/xxx/projects/demos/node-express/messagely-VALIDATION-00-TESTS)

```javascript
const app = require('./app');

app.listen(3000, function () {
  console.log('Server starting on port 3000');
});
// now to run the server: 'node server.js'
```

4. myApp-routes.test.js:

```javascript
process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
let cats = require('../fakeDb');

let pickles = { name: 'Pickles' };

beforeEach(function () {
  cats.push(pickles);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `cats`
  cats.length = 0;
});
// end afterEach

/** GET /cats - returns `{cats: [cat, ...]}` */

describe('GET /cats', function () {
  test('Gets a list of all cats', async function () {
    const resp = await request(app).get(`/cats`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ cats: [pickles] });
  });
});
// end

/** GET /cats/[name] - return data about one cat: `{cat: cat}` */

describe('GET /cats/:name', function () {
  test('Gets a single cat', async function () {
    const resp = await request(app).get(`/cats/${pickles.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ cat: pickles });
  });

  test("Responds with 404 if can't find cat", async function () {
    const resp = await request(app).get(`/cats/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** POST /cats - create cat from data; return `{cat: cat}` */

describe('POST /cats', function () {
  test('Creates a new cat', async function () {
    const resp = await request(app).post(`/cats`).send({
      name: 'Ezra',
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      cat: { name: 'Ezra' },
    });
  });

  test('Responds 404 if empty name creating cat', async function () {
    const resp = await (await request(app).post('/cats')).send({});
    expect(res.statusCode).toBe(400);
  });
});
// end

/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

describe('PATCH /cats/:name', function () {
  test('Updates a single cat', async function () {
    const resp = await request(app).patch(`/cats/${pickles.name}`).send({
      name: 'Troll',
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      cat: { name: 'Troll' },
    });
  });

  test('Responds with 404 if id invalid', async function () {
    const resp = await request(app).patch(`/cats/wrongCatName`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

describe('DELETE /cats/:name', function () {
  test('Deletes a single a cat', async function () {
    const resp = await request(app).delete(`/cats/${pickles.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: 'Deleted' });
  });

  test('Responds with 404 for deleting invalid cat', async function () {
    const resp = await request(app).patch(`/cats/wrongCatName`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

// RUN TESTS: 'npm run test' or 'jest myfile.test.js'
// CHROME DEBUGGER: node --inspect-brk $(which jest) --runInBand NAME_OF_FILE
```

Integration test to check if all elements work together as expected

### mocking

Mock in jest:

rollDice.test.js:

```javascript
const rollDice = require('./dice');

describe('#rollDice returning values', function () {
  // set the mock value that will return every time:
  Math.random = jest.fn(() => 0.5);

  // test assuming the value of 0.5:
  test('it rolls the correct amount of dice', function () {
    expect(rollDice(6)).toEqual(3);
    expect(rollDice(2)).toEqual(1);
    expect(Math.random).toHaveBeenCalled(); // test that the function is called
    expect(Math.random.mock.calls.length).toBe(2); // test that function has been called 2 times
  });
});
```

Docs: jestjs.io/docs/mock-functions

Mocking is primarily used in unit testing
An object under test may have dependencies on other (complex) objects
To isolate the behavior, you replace other objects by mocks that simulate their behavior
This is useful if the real objects are impractical to incorporate into the unit test.

### E2E

end_to_end_tests

Tools:

- Cypress (recomended)
  1. `npm install --save-dev cypress`
  2. package.json:
  ```json
  "scripts": {
  "cypress:open": "cypress open"
  },
  ```
  3. Run: `npm run cypress open`
- Selenium

End-to-end testing tests an application’s flow from start to end.
The purpose of E2E testing is to simulate an entire real user scenario.

### CI

continuous integration

Continuous Integration is the practice of merging in small code changes frequently, rather than merging in a large change at the end of a development cycle.
The goal is to build better software by developing and testing in smaller increments.
What can CI do for you?
Automate running your tests when pushing your code
Reject deployments if your tests do not pass
Easily notify you when changes to your test suite occur
How does it work?
It integrates with tools like GitHub and carries out a series of tasks to build and test your code
If one or more of those tasks fails, the build is considered broken
If none of the tasks fail, the build is considered passed, and Travis CI can deploy your code
Common CI Tools:

- Travis CI
- Jenkins
- Circle CI
- Buddy

### TDD (test driven development)

Write test first, develop the code afterwards to make the test pass, and keep going this way: red-green-refactor (first will fail, then make it pass, green, then refactor the code)

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

### npm_scripts

package.json:

```json
"scripts": {
  "whatever":"whatever will run",
  // standards:
  "test": "jest",
  // "npm run test"
  "start":"nodemon -e html,css,js,json app.js",
  // trigger with "npm start"
  "debug":"nodemon --inspect app.js",
  // "npm run debug"
}
```

to run it: cd to package.json dir, and `npm run whatever`, or `npm run test`

# jest

It's built on top of Jasmine. It's to test environments that are not browser based.

0. - `npm i --save-dev jest`

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

## moment.js

manage the pain of dates and times

[moment](https://momentjs.com)

## validator.js

Is all uppercas?
Is email?
is url?
[validator.js](https://github.com/validatorjs/validator.js)

## websocket_protocol

Websocket protocol.

HTTP is a pretty wordy, heavy protocol
So many things in headers!
HTTP is stateless
Ask for answer, get answer, close connection.
Websockets are tiny and stateful — they stay connected!
They’re often used for “tell the browser something has changed”. The connection remains permanently open, like a tunnel between client and server. Real time notifications, push notifications, real time maps with things moving around in them, you get updates inmediately.
It's multidirectoinal, client-server and server-client.

In client:
client.js:

```javascript
const ws = new WebSocket(`ws://localhost:3000/chat`); // mind 'ws' declaring the websocket protocol

ws.onopen = function(evt) {
  // runs when browser connects to server
};

ws.onmessage = function(evt) {
  // runs when browser receives a "message"
  console.log("got", evt.data);

ws.onclose = function(evt) {
  // runs when server closes connection
}

// TO SEND MESSAGE TO SERVER:
ws.send("this is a message from browser");
```

In server:
app.js:

```javascript
const wsExpress = require('express-ws')(app);

app.ws('/chat', function (ws, req, next) {
  ws.on('open', function () {
    // runs when connection is opened
  });

  ws.on('message', function (data) {
    // runs when message is received from browser
    console.log('message received');
    console.log(data);
  });

  ws.on('close', function () {
    // runs when browser closes connection
  });
});

// TO SEND MESSAGE TO BROWSER:
ws.send('this is a message from server');
```
