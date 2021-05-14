// SCOPE
function justScope() {
  const secret = 42;

  // we have haccess to 'secret'variable, because of scope
  function shareSecret() {
    return secret;
  }

  return shareSecret();
}
justScope(); // 42

// --------------------------------------
// CLOSURE
// The inner function has access to 'secret', even after the outer function
// has completed
function closureExample() {
  const secret = 42;

  function shareSecret() {
    return secret;
  }

  return shareSecret;
}

let shareFn = closureExample();
shareFn(); // 42

//--------
// Updating private variables:

function changeableSecret() {
  let secret = 42;

  function shareSecret() {
    return secret;
  }

  function changeSecret(newSecret) {
    secret = newSecret;
  }

  return { shareSecret, changeSecret };
}
// Use it in variable:
let shh = changeableSecret();
shh.shareSecret(); // 42
shh.changeSecret(43);
shh.shareSecret(); // 43;
// Use it alone:
let { shareSecret, changeSecret } = changeableSecret();
shareSecret(); // 43
changeSecret(21);
shareSecret(); // 21

// --------------------------
// Other example
function counter(initialVal) {
  let count = initialVal;

  function getCount() {
    return count;
  }

  function increment(n) {
    count += n;
  }
  return { getCount, increment };
}

let vamo = counter(3);
vamo.increment(12);
vamo.getCount();
// Destructure:
const { getCount, increment } = counter(92);
getCount(); // 92
increment(1);
getCount(); // 93

// -----------------------------
// A REACT HOOK:

function Counter() {
  // 'count' is like 'getCount', and setCount in like 'increment'
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
