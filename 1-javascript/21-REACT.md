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
2. [style](#style)
3. [state](#state)
4. [JSX](#JSX)
   - [props](##props)
   - [props.children](##props.children)
   - [props_with_default_values](##props_with_default_values)
   - [loops](##loops)
   - [conditionals](##conditionals)
   - [expressions](##expressions)
5. [components](#components)
6. [key_prop](##key_prop)
7. [components](##components)
8. [setup](###basic-dev-setup)
9. [basic-demo](/Users/xxx/projects/demos/react/basic-layout)

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

# JSX

The state can pass new values as props, so a component will re render with the new values.

## props

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

Newest version (2019)

### class_based_components

Older version of components

```jsx
class App extends React.Component {
  render() {
    return <p> Hi from a class </p>;
  }
}
```

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
