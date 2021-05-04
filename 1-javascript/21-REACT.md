# react

1. [CRA](#CRA)
   - [demo](/Users/xxx/projects/demos/react/cra-1)
   - [modules](##modules)
   - [webpack](##webpack)
   - [CSS](##CSS)
     - [dynamic_styles](###dynamic_styles)
     - [pattern](###patern)
   - [React.Fragment](##React.Fragment)
   - [react_developer_tools](##React_developer_tools)
   - [setup](##setup)
2. [STATE](#state)
3. [EVENTS](#events)
4. [COMPONENTS](#components)
5. [PROPS](#props)
   - [props.children](##props.children)
   - [props_with_default_values](##props_with_default_values)
   - [loops](##loops)
   - [conditionals](##conditionals)
   - [expressions](##expressions)
   - [key_prop](##key_prop)
6. [style](#style)
7. [setup](###basic-dev-setup)
8. [basic-demo](/Users/xxx/projects/demos/react/basic-layout)
9. [testing](#testing_react)
   - [run_tests](##run_tests)
     General testing:
   - [smoke_tests](###smoke_tests)
   - [snapshot_tests](###snapshot_tests)
     Specialized testing:
   - [select_things_in_rendered_page](###select_things_in_rendered_page)
   - [matchers](###matchers)
   - [fireEvent](###fireEvent)
     Debug:
   - [debug_tests](###debug_tests)
   - [add_breakpoints](###add_breakpoints)

# CRA

(Create React App)

## modules

import-export .js files:

Might have to add `"type": "module"`

```jsx
// math.js:
const sum = (a, b) => a + b;
const mult = (a, b) => a * b;
export { sum, mult };

// other.js
const cacs = {
  1: 'ca',
  2: 'fdsf',
};
const mew = () => 'Mew!!!';

export default cacs;
export { mew };

// app.js:
import { sum, mult } from './math.js';
import cacs, { mew } from './other.js';
```

import non-js files:

```jsx
import myName from './my-image.jpg';
import logo from './my-logo.svg';

// use it:
function App() {
  return (
    <div>
      <img src={myName} />
    </div>
  );
}
```

Import - export code from different files in app. It's the modern version of node's "require".

## webpack

webpack is a JS utility that helps us to manage our dependencies. Allows to use import/export modules in react apps. It bundles code together. It makes sure that the components loads in the correct order, etc. Also can bundle all JS or all CSS code in one single JS file or CSS file. Also has hot reloading and enables testing environment.

## CSS

### dynamic_styles

[demo](/Users/xxx/projects/demos/react/cra-1/src/Alert.js) && /Alert.css

### pattern:

- Make a CSS file for each React component (eg: House.js --> House.css):
- import House.css at the top of House.js
- Name classes as the component:

```jsx
<div className="House">
  <p className="House-title">{props.title}</p>
  <p className="House-address">{props.addr}</p>
</div>
```

Classes are 'className':

```jsx
<h1 className="cart-header">{username}</h1>
```

Import CSS files:

```jsx
import './App.css';

// or to style a specific component individually, import in that component file:

import './MyComponent.css';
```

---

## React.Fragment

```jsx
import React from 'react';

// NEWEST SYNTAX:
const BookTitlesNew = () => {
  return (
    <>
      <h2>SIBLING</h2>
      <h2>SIBLING</h2>
      <h2>SIBLING</h2>
    </>
  );
};

// OLDER SYNTAX:
const BookTitlesOld = () => {
  return (
    <React.Fragment>
      <h2>SIBLING</h2>
      <h2>SIBLING</h2>
      <h2>SIBLING</h2>
    </React.Fragment>
  );
};

export { BookTitlesOld, BookTitlesNew };
```

In general we return one single element from a component (a parent div with children, etc.)

## React_developer_tools

In google chrome store find and install the extension.

## setup

0. cd to dir
1. - `npx create-react-app myAppName`
2. Work on the 'src' folder.

[docs](https://create-react-app.dev)

Creates a skeleton of the full app with all the setup.
It's not required for very lightweight projects. Create React App. Is a library to help creating react apps, that is efficient and scalable, and optimized for production.

# style

Libraries:

- materialUI (premade components)
- reactstrap

# state

EightBall demo:

```jsx
import React, { useState } from 'react';
import './EightBalls.css';

const EightBall = ({ answers }) => {
  // Random index number maker:
  const idx = () => Math.floor(Math.random() * answers.length);

  const changeBall = () => {
    const num = idx();
    // Create params from chosen ball:
    const ball = {
      msg: answers[num].msg,
      color: answers[num].color,
    };
    // Instead of 'return', 'setball', like a return but specifig for the ball
    setBall(ball);
  };
  // set the initial params for the ball:
  const [ball, setBall] = useState({
    msg: 'Think of a queston',
    color: 'black',
  });
  // On click, make new ball params and apply them:
  return (
    <div className="EightBalls">
      <div
        className="EightBalls-ball"
        onClick={changeBall}
        style={{ backgroundColor: `${ball.color}` }}
      >
        <p>{ball.msg}</p>
      </div>
    </div>
  );
};

export default EightBall;

// APP.JS:

// import React from 'react';
// import Pokedex from './Pokedex.js';
// import EightBall from './EightBall.js';
// import balls from './balls.js';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Pokedex />
//       <EightBall answers={balls} />
//     </div>
//   );
// }

// export default App;
```

NumberGame demo:

```jsx
import React, { useState } from 'react';
import './NumberGame.css';

const NumberGame = (props) => {
  const genRandom = () => Math.floor(Math.random() * 10) + 1;

  const restart = () => {
    setTarget(genRandom());
    setGuess(0);
    setGuessCount(0);
  };

  const makeGuess = () => {
    setGuess(genRandom());
    setGuessCount(guessCount + 1);
  };

  const [guess, setGuess] = useState(genRandom());
  const [target, setTarget] = useState(genRandom());
  const [guessCount, setGuessCount] = useState(0);
  const isWinner = target === guess;
  return (
    <div className="NumberGame">
      <h1>Target Num: {target} </h1>
      <h1 className={isWinner ? 'winner' : 'loser'}>Your Guess: {guess}</h1>
      <h4>Guess #{guessCount}</h4>
      {/* Hide or show button according to win or loose: */}
      {!isWinner && <button onClick={makeGuess}>Generate Num</button>}
      <button onClick={restart}>New Game</button>
    </div>
  );
};
export default NumberGame;
```

Counter demo:

```jsx
import React, { useState } from 'react';
const Counter = (props) => {
  const [count, setCount] = useState(99);
  return (
    <>
      <h1>Count is: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={() => setCount(count - 1)}>Subtract</button>
    </>
  );
};

export default Counter;
```

A state is created using "useState()". Which returns an array with two values:

- What the piece of state is.
- A function to change it.

When the state in a component changes, the component is re rendered in the browser.

```jsx
import React, { UseState } from 'react';

const [mood, setMood] = useState('happy'); // 'happy' is the initial state
```

Mind that:

- You must call useState in the component
- You cannot call useState in loops or conditionals
- Try to do state initialization early in your function component

Data specific to a component. CAN CHANGE!!!
Use cases:

- Toggle data.
- Fetch data from API.
- Themes, colors or styles that change based on an event.

# events

[full_list_of_events](https://reactjs.org/docs/events.html#supported-events)

Pass function witha arguments on event:

```jsx
import React from 'react';

const ButtonGroup = () => {
  const printColor = (color) => {
    console.log(`YOU CLICKED: ${color}`);
  };
  return (
    <div>
      <button onClick={() => printColor('Red')}>Red</button>
      <button onClick={() => printColor('Yellow')}>Yellow</button>
      <button onClick={() => printColor('Green')}>Green</button>
    </div>
  );
};

export default ButtonGroup;
```

```jsx
import React from 'react';

// define any function:
function handleClick() {
  console.log('GoodClick clicked!');
}

// Call the function on click event:
function GoodClick() {
  return <button onClick={handleClick}>GoodClick</button>;
}

export default GoodClick;

// ---------------------
// Synthetic event:
// console.log the synthetic event 'e':
function clickDetails(e) {
  console.log(e); // the whole synthetic event.
  console.log(e.currentTarget); // will be the element of the click. Mind that react nullifies values after execution.
  console.log(e.nativeEvent);
}

function clickerFire() {
  // react will send the synthetic event:
  return <button onClick={clickDetails}>Get details</button>;
}
```

Attach event handlers to React components.

# JSX

The state can pass new values as props, so a component will re render with the new values.

# props

```jsx
const Animal = (props) => {
  console.log(props);
  return (
    <ul>
      <li>Emoji: {props.emoji}</li>
      <li>Name: {props.name}</li>
      <li>Species: {props.species}</li>
      <li>IsCute: {props.isCute ? '✅' : '❌'}</li>
    </ul>
  );
};

// TO USE IT IN APP.JS:

const App = () => (
  <div>
    <Animal name="Stevie Chicks" species="Silkie Chicken" emoji="🐔" isCute />
    <Animal name="Patrick" species="Red Fox" emoji="🦊" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## props.children

To pass a component that contains other components:

```jsx
const Alert = (props) => {
  console.log(props);
  return (
    <div>
      🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈
      <p>{props.children}</p>
      🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵
    </div>
  );
};

// APP.JS:
const App = () => (
  <div>
    <Alert>
      <RandomChoice choices={['a', 'e', 'i']} />
      <Sum />
    </Alert>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## props_with_default_values

Destructure props to add default values in components:

```jsx
const Sum = ({ chaucha = 1, palitos = 1 }) => {
  const result = chaucha + palitos;
  return <h1>Your sum is: {result}</h1>;
};

// IN APP.JS:
const App = () => (
  <div>
    <Sum /> /* will return 2 */
    <Sum chaucha={2} palitos={4} /> /* will return 6 */
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

props are inmutable inside the component. Are read only in the component.
propos can be either strings ("3") or JSX expressions ({3}), or ({[3, 3, e]}) etc.

We can pass arguments (values) to a particular component.

## loops

React will iterate over array and insert each element into the DOM:

- pretty way (map):

```jsx
const TodoList = (props) => {
  return (
    <div>
      <h4>Todo List</h4>
      <ul>
        {props.todos.map((t) => (
          <li>{t}</li>
        ))}
      </ul>
    </div>
  );
};

// APP.JS:
const App = () => (
  <div>
    <TodoList todos={['change', 'patch', 'lack']} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

- ugly way:

```jsx
const TodoList = (props) => {
  return (
    <div>
      <h4>Todo List</h4>
      <ul>{props.todos}</ul>
    </div>
  );
};

// APP.JS:
const App = () => (
  <div>
    <TodoList
      todos={[
        <li>Walk the dog</li>,
        <li>feed the cat</li>,
        <li>fly the plane</li>,
      ]}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## conditionals

Syntaxes:

- if/else:

```jsx
const AgeCheck = (props) => {
  let message;
  if (props.age < 18) {
    message = "Can't come in, under age";
  } else if (props.age < 21) {
    message = 'Can come in, but not drinking';
  } else {
    message = 'Can come in AND drink';
  }
  return (
    <div>
      <h4>Good, night, {message}</h4>
    </div>
  );
};
```

[docs]

- Ternary operator:

```jsx
const Lottery = (props) => {
  return <b> You {props.winner ? '👻' : '👹'}</b>;
};
```

- Ternary with variable:

```jsx
const Machine = (props) => {
  const winner = props.s1 === props.s2; // this will throw true of false

  return (
    <div className="Machine">
      <b>{props.s1}</b>
      <b>{props.s2}</b>
      <p>You {winner ? 'win' : 'lose'}</p> // "if winner is true, return win,
      either return lose"
    </div>
  );
};

// APP.JS:
ReactDom.render(
  <Machine s1="berry" s2="berry" />,
  document.getElementById('root')
);
```

## expressions

Are curly braces. JSX will take curly braces and run what's inside as JS:

```jsx
const randomNum = () => {
  const rand = Math.floor(Math.random() * 10) + 1;
  // CURLY BRACES WILL RUN ANY JAVASCRIPT INSIDE THEM, SIMILAR TO JINJA:
  return <h3>{rand}</h3>;
};
```

Javascript Syntax Extension

Keetp in mind:

- Two return syntax options:
  1.  ```javascript
      const App = () => {
        return <p> Hi from app </p>;
      };
      ```
  2.  Only if single expression:
      ```jsx
      const App = () => (
         <p> Hi from app </p>;
      )
      ```
- Return one single element from a given component (a top level parent with childs ok, but multiple siblings not allowed)
- Mind the closing tags (`/>`)

Syntax that allows to write HTML in a JS file. We have to transpile it to JS so the browser can understand it.

## key_prop

Keys help React identify which items have changed, added or removed.
They should always be unique and not change (also called stable)

# components

### functional_components

- Functional components can render:
  - a single valid DOM object (<div> ..... <div>)
  - an array of DOM objects.
  - null (can't use undefined)

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <div>
      <h1>Let's count!</h1>
      <h2>Current count: {count}</h2>
      <button onClick={increment}>Add</button>
      <label htmlFor="usr">Username</label>
      <input id="usr" type="text" placeholder="username" />
    </div>
  );
}

export default Counter;
```

// Super basic:
const Comp = () => <p>Implicit return</p>;

const Other = () => (

  <div>
    <h3>Multiple lines implicit return</h3>
  </div>
);

const App = () => {
return <p> Hi from function </p>;
};

````

Newest version (2019)

### class_based_components

Older version of components

```jsx
class App extends React.Component {
  render() {
    return <p> Hi from a class </p>;
  }
}
````

## basic-dev-setup

1. index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Demo</title>
  </head>

  <body>
    <h1>React Demo!</h1>
    <!-- This div will host the react content: -->
    <div id="root"></div>

    <!-- dependencies: -->
    <!-- react: -->
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <!-- for render method: -->
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <!-- babel for transpiling: -->
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>

    <!-- Link to app, JSX instruction: -->
    <script src="demo-app.js" type="text/jsx"></script>
  </body>
</html>
```

2. demo-app.js:

```javascript
const Shiba = () => {
  return <img src="https://66.media.tumblr.png" />;
};

ReactDOM.render(<Shiba />, document.getElementById('root'));
//.render method takes ("what to render", "where to render it")

// RUN FILE FROM VS CODE LIVE SERVER OR WITH PYTHON SERVER
```

---

```jsx
const App = () => {
  return <p>Hi from a function!</p>;
};
```

- A component is a function that returns some content.
- Define a component writing a function, that tells react how and what to render in the html.
- Pieces of UI & view logic. Can include complex logic / functionalities (JS, HTML, etc)
- The building blocks of react, can reuse them

React helps to create reusable components. We build components that have HTM, JS and CSS working together.
React is a front end framework. Integrates JS in the front end rendering of the app. Offers a blueprint to build an app in it.

---

# testing_react

Can use any kind of testing frameworks. Create-react-app ships with jest and Testing-Library
[Testing_Library_docs](https://testing-library.com)

## run_tests

- `npm test` run all tests:
- `npm test myFile.test.js` run single file:
- `q` quit test
- `w` list of commands available

### smoke_tests

("Does the component render?")

One test file per Component file.

Counter.test.js:

```jsx
import React from 'react';
// 'render' creates a <div>, renders your JSX into the div, returns an object of methods.
import { render, screen } from '@testing-library/react';
import Counter from './Counter';

it('renders withouth crashing', function () {
  render(<Counter />);
});
```

### snapshot_tests

(Did the rendering change?)

First time it runs, creates the snapshot. Afeter that, compares the test to the snapshot.

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dog from './Dog.js';

// Check if renders:
it('should render', () => {
  render(<Dog name="julian" isAdopted={true} />);
});

// Snapshot with one set of values:
it('should match snapshot', () => {
  const { asFragment } = render(<Dog name="julian" isAdopted={true} />);
  expect(asFragment()).toMatchSnapshot();
});

// Snapshot test with other set of values:
it('should match snapshot', () => {
  const { asFragment } = render(<Dog name="newName" isAdopted={false} />);
  expect(asFragment()).toMatchSnapshot();
});
```

### select_things_in_rendered_page

User interactions: inputs, form submissions, clicks, doubleclicks, etc. What shows up after the users actions.

```jsx
import React from 'react';
import { getByPlaceholderText, render, screen } from '@testing-library/react';
import Counter from './Counter';

it('renders withouth crashing', function () {
  render(<Counter />);
});

test('find h1 by text', () => {
  const { getByText } = render(<Counter />);
  // Find text with exact match:
  getByText(`Let's count!`);
  // Not exact:
  getByText(`Current count`, { exact: false });
});

test('find all titles with the word <count>', () => {
  const { getAllByText } = render(<Counter />);
  getAllByText('count', { exact: false });
  console.log(getAllByText('count', { exact: false })); // will throw an array with all the results.
});

test('select by placeholder', () => {
  const { getByPlaceholderText } = render(<Counter />);
  console.log(getByPlaceholderText('username'));
});
```

[full_methods](https://testing-library.com/docs/react-testing-library/api/#render-result)

- .getByText()
  Find first matching element by its text (throws error if nothing found)
- .queryByText()
  Find first matching element by its text (returns null if nothing found)
- .getAllByText()
  Like getByText but finds all matches
- .queryAllByText()
  Like queryByText but finds all matches
- .getByPlaceholderText() / queryByPlaceholderText()
  Find first matching element by placeholder text
- .getAllByPlaceholderText() / queryAllByPlaceholderText()
  Like above but finds all matches
- .getByTestId() / queryByTestId()
  Find matching element by a data-testid attribute (helpful if there’s no other convenient way to grab an element)
- .getAllByTestId() / queryAllByTestId()
  Like above but finds all matches

### matchers

```jsx
it('should start showing h1', () => {
  const { getByText } = render(<Toggler />);
  const heading = getByText('Hello World');
  expect(heading).toHaveClass('Toggler-text');
  expect(heading).toBeInTheDocument();
});
```

CRA comes with jest-dom, an extension of jest providing aditional matchers.
[jest-dom_docs](https://testing-library.com/docs/ecosystem-jest-dom)
Some of them:

.toHaveClass()
Check whether an element has a certain class
.toBeInTheDocument()
Check whether an element is in the document
.toContainHTML()
Check whether the element contains a certain HTML string
.toBeEmpty()
Check whether the element has any content

### fireEvent

```jsx
test('button clicks', () => {
  const { getByText } = render(<Counter />);
  const h2 = getByText('Current count: 0');
  const btn = getByText('Add');
  // HERE WE TRIGGER THE EVENT:
  fireEvent.click(btn);
  // NOW WE EXPECT THE APP RESPONSE TO THAT EVENT:
  expect(h2).not.toHaveTextContent('0');
  // ALL MATCHERS HERE: https://github.com/testing-library/jest-dom#custom-matchers
});

it('should toggle', () => {
  const { getByText } = render(<Toggler />);
  const heading = getByText('Hello World');
  fireEvent.click(getByText('Toggle'));
  expect(heading).not.toBeInTheDocument();
});
```

Testing Library provides a fireEvent method that you can use to mimic user interaction with the app.
[fireEvents_docs](https://testing-library.com/docs/dom-testing-library/api-events/)
.fireEvent.click(HTMLElement)
Fire a click event
.fireEvent.submit(HTMLElement)
Fire a submit event
.fireEvent.input(HTMLElement)
Fire an input event

### debug_tests

Instead of console.log the whole object, console.log the specific element:

```jsx
test('button increments counter', () => {
  // declare debug:
  const { getByText, debug } = render(<Counter />);
  // call debug:
  debug(); // will console.log the component rendered above.
  const h2 = getByText('Current count: 0');
  const btn = getByText('Add');
  // HERE WE TRIGGER THE EVENT:
  fireEvent.click(btn);
  // NOW WE EXPECT THE APP RESPONSE TO THAT EVENT:
  debug();
  expect(h2).not.toHaveTextContent('0');
});
```

### add_breakpoints

1. In package.json.scripts, add:

```json
"test:debug": "react-scripts --inspect-brk test --runInBand",
```

2. In myFile.test.js, add `debugger;` wherever you want the execution to stop for debugging.
3. `npm run test:debug myFile.test.js`
4. In Chrome, press the green Node.js button to go to the debugger breakpoint.

```jsx
it('should toggle', () => {
  const { getByText } = render(<Toggler />);
  const heading = getByText('Hello World');
  // WILL STOP EXECUTION HERE:
  debugger;
  fireEvent.click(getByText('Toggle'));
  expect(heading).not.toBeInTheDocument();
});
```
