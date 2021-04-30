const App = () => (
  <div>
    <Tweet
      username="Sergio"
      name="Serge"
      date="2/23/2023"
      message="Today's the first day of the last year!!"
    />
    <Tweet
      username="Lucas"
      name="lux"
      date="2/23/2023"
      message="this is twwt n 2"
    />
    <Tweet username="Pat" name="spat" date="2/23/2023" message="Today's" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
