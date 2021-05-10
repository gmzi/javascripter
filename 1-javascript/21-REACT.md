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
2. [HOOKS](#HOOKS)
   - [useState](##useState)
     - [demo](/Users/xxx/projects/demos/react/states)
     - [update_state_with_callback](##update_state_with_callback)
   - [useEffect](##useEffect)
     - [Request.js](###Request.js)
     - [ProfileSearch](###ProfileSearch)
     - [Timer](###Timer)
   - [useRef](##useRef)
     - [Video.js](###Video.js)
     - [Focus.js](###Focus.js)
     - [Timer2.js](###Timer2.js)
     - [FileInput.js](###FileInput.js)
   - [custom_hooks]
     - [useRequest](###useRequest)
     - [useFormFields](###useFormFields)
     - [useToggle](###useToggle)
     - [useLocalStorage](###useLocalStorage)
3. [COMPONENTS](#components)
   - [demo](/Users/xxx/projects/demos/react/component-design)
   - [pass_function_to_child_component](##pass_function_to_child_component)
   - [dumb_components](##dumb_components)
   - [functional_components](###functional_components)
   - [class_based_components](###class_based_components)
4. [EVENTS](#events)
5. [PROPS](#props)
   - [key_prop](##key_prop)
   - [props.children](##props.children)
   - [props_with_default_values](##props_with_default_values)
   - [loops](##loops)
   - [conditionals](##conditionals)
   - [expressions](##expressions)
6. [FORMS](#FORMS)
7. [style](#style)
8. [setup](###basic-dev-setup)
9. [basic-demo](/Users/xxx/projects/demos/react/basic-layout)
10. [testing](#testing_react)
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

---

# HOOKS

[full_hooks](https://reactjs.org/docs/hooks-reference.html)

## useState

REACT WILL RE-RENDER THE COMPONENT ONLY WHEN THE NEW STATE IS DIFFERENT FROM THE PREVIOUS.

```jsx
import React, { useState } from 'react';
const [data, setData] = useState(initialState);
/* Periphrasis: During the intial render, the returned state (data) is te same as the value passed as the first argument (initialState).
The setData function is used to update the state. It accepts a new state value and equeues a re-render of the whole component. 
The convention is to name the second value setX where X is the name of the first value. 
*/
```

## update_state_with_callback

```jsx
import React, { useState } from 'react';

function BestSimpleCounter() {
  const [num, setNum] = useState(0);
  const clickUp = () => {
    // callback will run once the useState value is updated:
    setNum((n) => n + 1);
  };

  const clickUpBy2 = () => {
    // callback will run once the useState value is updated:
    setNum((n) => n + 1);
    // once 'n' is updated, will run the next callback:
    setNum((n) => n + 1);
  };

  return (
    <div>
      <h3>Count: {num}</h3>
      <button onClick={clickUp}>Up</button>
      <button onClick={clickUpBy2}>Up By 2</button>
    </div>
  );
}

export default BestSimpleCounter;
```

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

## useEffect

```jsx
useEffect(() => {
  //function here
}, [props.some, props.others, etc]); // effect runs every time a prop value changes.

useEffect(() => {
  //function here
}, []); // effect runs only first time component is rendered

useEffect(() => {
  //function here
}); // effect runs every time component is rendered
```

### Request.js

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// "https://api.github.com/users/elie"

const ProfileViewer = ({ name = 'Elie', color = 'purple' }) => {
  // Set an empty piece of state, so the page can load without having to wait for the request:
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const res = await axios.get(`https://api.github.com/users/${name}`);
      // change the state to re-render component:
      setData(res.data.name);
    }
    loadProfile();
  }, [name]);
  // If "name" changes the request will run, but if "color" changes,
  //the component will re-render but the request will not run,
  //because "color" is not in the array

  return <h3 style={{ color }}>{data ? data : 'Loading...'}</h3>;
  /* periphrasis: "if there's data in state, display it, else display 'loading...'"*/
};

export default ProfileViewer;

// IN APP.JS:
function App() {
  return (
    <div className="App">
      <ProfileViewer name="Colt" color="teal" />
      <ProfileViewer name="Matt" color="orange" />
    </div>
  );
}
```

### ProfileSearch

1. ProfileViewerWithSearch.js:

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileSearchForm from './ProfileSearchForm';

const ProfileViewerWithSearch = () => {
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState(`https://api.github.com/users/elie`);

  // term comes from the form
  const search = (term) => {
    setUrl(`https://api.github.com/users/${term}`);
  };

  useEffect(() => {
    console.log('LOADING DATA');
    async function loadProfile() {
      const res = await axios.get(url);
      setProfile(res.data);
    }
    loadProfile();

    // CLEANUP FUNCTION (will run before the effect and after the component unmounts, after the first
    // time the effect runned):
    return () => console.log('CLEANING UP!');
  }, [url]);

  return (
    <div>
      {profile ? <h1>Hi {profile.name}</h1> : <h1>Loading....</h1>}
      <ProfileSearchForm search={search} />
    </div>
  );
};

export default ProfileViewerWithSearch;
```

2. ProfileSearchForm.js:

```jsx
import React, { useState } from 'react';

const ProfileSearchForm = ({ search }) => {
  const [term, setTerm] = useState('');

  const handleChange = (evt) => {
    setTerm(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    search(term);
    setTerm('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={term} onChange={handleChange} />
      <button>Search!</button>
    </form>
  );
};

export default ProfileSearchForm;
```

### Timer

1. Timer.js:

```jsx
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    // cleanup function will run only when component dismounts:
    return () => {
      console.log('hi from cleanup');
      clearInterval(intervalId);
    };
  }, []);

  return <h1>{seconds}</h1>;
};

export default Timer;
```

2. TimerWrapper.js:

```jsx
// show/hide the timer:

import React, { useState } from 'react';
import Timer from './Timer';

const TimerWrapper = () => {
  const [timerVisible, setTimerVisible] = useState(true);

  const toggleTimer = () => {
    // Will unmount Timer component:
    setTimerVisible(!timerVisible);
  };

  return (
    <div>
      <button onClick={toggleTimer}>Toggle Timer</button>
      {timerVisible && <Timer />}
    </div>
  );
};

export default TimerWrapper;
```

## useRef

`myVarName.current` stores the useRef object

### Video.js

```jsx
import React, { useState, useRef, useEffect } from 'react';

function Video({
  src = 'https://media.giphy.com/media/KctGIT2JHvVRC7ESeR/giphy.mp4',
}) {
  const [speed, setSpeed] = useState(1);

  // 1. Make an object that will persist accross renders:
  const videoRef = useRef();

  // 3. Grab the useRef object, set its initial value through state and its changes through side effect:
  useEffect(() => {
    videoRef.current.playbackRate = speed;
  }, [speed]);

  return (
    <div>
      {/* 2. Pass the useRef value to the DOM element where we want to use it: */}
      <video muted autoPlay loop ref={videoRef}>
        <source src={src} />
      </video>
      <div>
        <button onClick={() => setSpeed((s) => s / 2)}>slow</button>
        <button onClick={() => setSpeed((s) => s * 2)}>fast</button>
        <p>Current speed: {speed}x</p>
      </div>
    </div>
  );
}

export default Video;
```

### Focus.js

```jsx
import React, { useRef } from 'react';

const Focus = () => {
  // 1. Make this 'secondInput' property:
  const secondInput = useRef();

  // 3. grab the current value of 'secondInput' and run function over it.
  const moveFocus = () => secondInput.current.focus();

  return (
    <>
      <h3>Focus Starts Here</h3>
      <input type="text" autoFocus />
      <button onClick={moveFocus}>Focus the text input</button>
      <h3>Then Moves Here</h3>
      {/* 2. Point the useRef property to this DOM element (this input will be stored in secondInput variable): */}
      <input type="text" ref={secondInput} />
    </>
  );
};

export default Focus;
```

### Timer2.js

```jsx
import React, { useState, useEffect, useRef } from 'react';

const Timer2 = () => {
  const [seconds, setSeconds] = useState(0);

  // Store the id of timer component-scoped so you can stop it in clearInterval
  const timerId = useRef();

  // Run timer when component renders:
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    // cleanup when component unmounts:
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  // useRef to grab the id of the current timer and stop it:
  const stopTimer = () => {
    clearInterval(timerId.current);
  };

  return (
    <div>
      <h1>{seconds}</h1>
      <button onClick={stopTimer}>Stop Timer</button>
    </div>
  );
};

export default Timer2;
```

### FileInput.js

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(<FileInput />, document.getElementById('root'));

// docs:
// https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
```

Use cases: file input, video player speed, focus, integrate library. Except this try to avoid it, is better that React controlls the DOM.

## custom_hooks

Just functions that abstract logic or perfor repeatable tasks. Can be in separate file, and call it from different components. Move logic out to a separate file if a componen gets too cluttered. No need to make hooks ahead, its just a refactoring tool.

### useRequest

1. hooks/useRequest.js:

```jsx
import { useEffect, useState } from 'react';

const useRequest = (url, options = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // after the first render, fetch our data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  //returns an object:
  return { response, error, isLoading };
};

export default useRequest;
```

2. DogDetails.js:

```jsx
import React from 'react';
import useRequest from './hooks/useRequest';

const DogDetail = () => {
  const data = useRequest('https://dog.ceo/api/breeds/image/random');

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (data.error) {
    return <div>Sorry, something went wrong</div>;
  }

  const { status, message } = data.response;

  return (
    <div className="App">
      <div>
        <h3>{status}</h3>
        <div>
          <img src={message} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default DogDetail;
```

### useFormFields

1. /hooks/useFormFields.js:

```jsx
import React, { useState } from 'react';

const useFormFields = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setFormData(initialState);
  };

  return [formData, handleChange, resetFormData];
};

export default useFormFields;
```

2. SignupForm.js:

```jsx
import React from 'react';
import useFormFields from './hooks/useFormFields';

const SignupForm = () => {
  const [formData, handleChange, resetForm] = useFormFields({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="username"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
      />
      <input
        type="text"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="password"
      />
      <button>Submit</button>
    </form>
  );
};

export default SignupForm;
```

### useToggle

1. /hooks/useToggleState.js:

```jsx
import React, { useState } from 'react';

const useToggleState = (initialState = true) => {
  // Make a piece of state:
  const [state, setState] = useState(initialState);

  // Toggler function (change t to f or viceversa):
  const toggleState = () => {
    setState((state) => !state);
  };

  // Return the piece of state and the function:
  return [state, toggleState];
};

export default useToggleState;
```

2. /MoodClicker.js:

```jsx
import React from 'react';
// 1. IMPORT CUSTOM HOOK:
import useToggleState from './hooks/useToggleState';
import './MoodClicker.css';

const MoodClicker = () => {
  // ASSIGN STATE AND FUNCTION TO CUSTOM HOOK, WITH INITIAL VALUE:
  const [isHappy, toggleIsHappy] = useToggleState(true);
  const [isDarkMode, toggleIsDarkMode] = useToggleState(false);

  return (
    // TOGGLE CLASSNAMES:
    <div className={isDarkMode ? 'Clicker-dark' : 'Clicker-light'}>
      {/* TOGGLE CONTENT: */}
      <h1>{isHappy ? '😀' : '😭'}</h1>
      {/* FIRE TOGGLE WITH BUTTON: */}
      <button onClick={toggleIsHappy}>Change Mood</button>
      <button onClick={toggleIsDarkMode}>Toggle Dark/Light Mode</button>
    </div>
  );
};

export default MoodClicker;
```

3. /MoodClicker.css

```css
.Clicker-light {
  background-color: lightblue;
}
.Clicker-dark {
  background-color: darkslateblue;
}
.Clicker-dark button {
  background-color: lightblue;
}

.Clicker-light button {
  background-color: darkslateblue;
  color: white;
}
```

### useLocalStorage

1. /hooks/useLocalStorageState.js

```jsx
import React, { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue) => {
  // Instead of setting the initial value directly, use a callback function to check if is
  // there any previous value in localStorage:
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      );
    } catch (e) {
      console.log(e);
      value = defaultValue;
    }
    // useState will have this value:
    return value;
  });

  // call useState if there's any change in the value or if the function is called:
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // return the state value and the function:
  return [state, setState];
};

export default useLocalStorageState;
```

2. Counter.js:

```jsx
import React from 'react';
import useLocalStorageState from './hooks/useLocalStorageState';

const Counter = () => {
  // call the custom hook:
  const [count, setCount] = useLocalStorageState('count', 0);

  // function inherent to this particular component:
  const addToCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <>
      <h4>{count}</h4>
      <button onClick={addToCount}>Add</button>
    </>
  );
};

export default Counter;
```

---

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

## key_prop

```jsx
let todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);

// if no id, if no other possible solution, use iteration index:
let todoItems = todos.map((todo, idx) => <li key={idx}>{todo.text}</li>);
```

Tool to generate unique ids: [uuid](https://www.npmjs.com/package/uuid)

When working with JSON or objects or arrays, React need the key prop to keep track of the data changes. Every key should be a unique value. Ideally, a stable id, else the idx position of the element.

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

---

# FORMS

## basic_demo

With no validations:
/Users/xxx/projects/demos/react/forms

## validation

Validation + form styles:
[formik-material-ui](https://stackworx.github.io/formik-material-ui/docs/guide/getting-started)

Pure validation library:
[formik](https://formik.org/docs/tutorial)

React validation IS NOT A SUBSTITUTE for server side validation. Have to validate also in the server separatedly.

## controlled_components

React controls all the form data through state.

## uncontrolled_components

React doesn't control the from state. It's not very common, but may be needed (file input, or external libraries that require uncontrolled components, or non-react code integrations). Check react docs for implementation.

---

# components

Parent:

```jsx
import React, { useState } from 'react';
import Die from './Die';
import './Dice.css';

const Dice = ({ numDice = 6, title = 'Main Game', maxVal = 20 }) => {
  // MIND THE STATE IS IN THE PARENT COMPONENT:
  const [numbers, setNumbers] = useState(Array.from({ length: numDice }));

  // MAKE NEW ARRAY OF DICES AND SET IT TO STATE TO RE-RENDER:
  const rollDice = () =>
    setNumbers((numbers) =>
      numbers.map((n) => Math.floor(Math.random() * maxVal) + 1)
    );

  return (
    <div className="Dice">
      <h2>{title}</h2>
      <div>
        {numbers.map((num) => (
          <Die val={num} />
        ))}
      </div>

      <button onClick={rollDice}>Roll</button>
    </div>
  );
};

export default Dice;
```

Child:

```jsx
import React from 'react';
import './Die.css';

const Die = ({ val }) => {
  return <div className="Die">{val}</div>;
};
export default Die;
```

## pass_function_to_child_component

Parent component defines the function ---> pass the function to the child as a prop. The child invokes the prop. When called, the parent executes the prop and updates the state. The parent is re-rendered along with the children.

```jsx
// PARENT COMPONENT
import React, { useState } from 'react';
import NumberItem from './NumberItem';

function NumberList() {
  const [nums, setNums] = useState([1, 2, 3, 4]);

  const remove = (num) => {
    setNums(nums.filter((n) => n !== num));
  };

  const numsList = nums.map((n) => <NumberItem value={n} remove={remove} />);
  /* alternate way to pass the function to the child directly in the parent:
  return (
    <ul>
      {numbers.map(n => (
        <NumberItem number={n} remove={() => remove(n)} />
      ))}
    </ul>
  )
  */
  return <ul>{numsList}</ul>;
}

export default NumberList;

// ----------------
// CHILD COMPONENT
import React from 'react';

function NumberItem(props) {
  // Define function that calls the parent's function, convetional
  // naming 'handleMyName' for parent invoking.
  const handleRemove = () => {
    props.remove(props.value);
  };

  return (
    <li>
      {props.value}
      <button onClick={handleRemove}>X</button>
    </li>
  );
}

export default NumberItem;
```

## dumb_components

"There should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the top-down data flow."
(https://reactjs.org/docs/lifting-state-up.html#lessons-learned)

Are stateless. Are purely presentational, destined only to render something. Smarter parent with dumber children is a good pattern. State goes with the parent, the children only render.

Components should be small & do one thing, this makes them more reusable and debuggable. It's good to break one thing in multiple components.

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

//--------------------------------
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
```

### class_based_components

Older version of components

```jsx
class App extends React.Component {
  render() {
    return <p> Hi from a class </p>;
  }
}
```

---

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
