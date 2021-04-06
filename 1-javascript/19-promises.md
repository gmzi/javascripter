# promises

## Promise_methods

Promise objects have built in methods:

- Promise.all
  accepts an array of promises and returns a new promise
  This new promise will resolve when every promise in the array resolves, and will be rejected if any promise in the array is rejected

```javascript
let fourPokemonPromises = [];

for (let i = 1; i < 5; i++) {
  fourPokemonPromises.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  );
}

// If one of the promises of the array fails, .catch runs
Promise.all(fourPokemonPromises)
  .then((pokemonArr) => console.log(pokemonArr))
  .catch((err) => console.log(err));
```

- Promise.race
  Will resolve or reject as soon as one promise in the array resolves or rejects.
  First resolved promise gets in the result

```javascript
let fourPokemonRace = [];

for (let i = 1; i < 5; i++) {
  fourPokemonRace.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`));
}

Promise.race(fourPokemonRace)
  .then((res) => {
    console.log(res.data.name); // bulbasaur
  })
  .catch((err) => console.log(err));
```

- Promise.resolve
- Promise.reject

## building_promises

Make custom promise objects. Recipe:

```javascript
function myAsyncFunction() {
  // return a new Promise
  return new Promise((resolve, reject) => {
    /*
        DO ASYNC STUFF HERE
      */

    // if it succeeds, call the resolve callback
    resolve(/* success value*/);

    // if it fails, call the reject callback
    reject(/* fail value*/);
  });
}
// --------------------------------------------------
// EXAMPLE 1:
// Define Promise:
function wait3Seconds() {
  return new Promise((resolve, reject) => {
    // do something asynchoronous here, like:
    setTimeout(resolve, 3000);
  });
}
// Call promise:
wait3Seconds()
  .then(() => console.log('all done'))
  .catch(() => console.log('errorcito'));

// --------------------------------------------------
// CUSTOM PROMISE TO CHANGE COLOR OF TITLE:
// Define promise:
function changeColor(element, color) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      element.style.color = color;
      resolve();
    }, 1000);
  });
}
// Call promise:
changeColor(h1, 'red')
  .then(() => changeColor(h1, 'orange'))
  .then(() => changeColor(h1, 'yellow'));
```

## promise_chaining

Mind returning the first request result to chain the next request and promise.

```javascript
let baseURL = 'https://pokeapi.co/api/v2/pokemon';

axios
  .get(`${baseURL}/1/`)
  .then((p1) => {
    console.log(`The first pokemon is ${p1.data.name}`);
    return axios.get(`${baseURL}/2/`);
  })
  .then((p2) => {
    console.log(`The second pokemon is ${p2.data.name}`);
    return axios.get(`${baseURL}/3/`);
  })
  .then((p3) => {
    console.log(`The third pokemon is ${p3.data.name}`);
  })
  // one catch for all promises:
  .catch((err) => {
    console.log(`Oops, there was a problem :( ${err}`);
  });
```

Return a new promise in the callback, to chain multiple async operations together

## custom_axios_request

Make a custom axios with promises, that will return the data and errors just as axios does.

```javascript
function get(url) {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.onload = function () {
      if (request.readyState !== 4) return;

      // Check status code
      if (request.status >= 200 && request.status < 300) {
        resolve(JSON.parse(request.response));
      } else {
        reject(request.status);
      }
    };
    request.onerror = function handleError() {
      // request = null;
      reject('Network error');
    };
    request.open('GET', url);
    request.send();
  });
}

get('https://pokeapi.co/api/v2/pokemon')
  .then((res) => {
    console.log(res);
    return get('https://pokeapi.co/api/v2/pokemon/2');
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

## .then/.catch

```javascript
let url = 'https://swapi.dev/api/people/1/';
let firstPromise = axios.get(url);
firstPromise.then((res) => console.log(res.data));
firstPromise.catch((err) => console.log('heres catch!!!'));
```

.then Will execute code after the promise is resolved.
.catch Runs only if the promise is rejected.

```javascript
let url = 'https://swapi.dev/api/planets/1/';
let ourFirstPromise = axios.get(url);
console.log(ourFirstPromise);
// Promise {<pending>}
```

We set them to run some code when we have a response ready.
A promise is an object. The promise object has 3 potential states:

- Pending (it doesn't yet have a value)
- Resolved (it has succesfully obtained a value)
- Rejected (failed to obtain a value)

## callbacks

javascript runs synchronously. To make it asynchornous, we pass a callback to execute once a condition is meeted:

```javascript
console.log('this prints first');

setTimeout(function () {
  console.log('this prints third, one second later');
}, 1000);

console.log('this prints second');
```

The browser takes care of setting the timer and track when to execute the timeout code. Javascript continues with the execution. Ajax requests works the same way.

[detailed_callback_cal l_stack](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
