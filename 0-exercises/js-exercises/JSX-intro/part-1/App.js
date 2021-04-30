const App = () => (
  <div>
    <FirstComponent />
    <NamedComponent name="danger" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
