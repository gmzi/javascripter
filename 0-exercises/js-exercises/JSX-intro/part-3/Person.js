const Person = ({ name, age, hobbies }) => {
  let message;
  let pName;
  if (name.length > 8) {
    pName = name.slice(0, 8);
  }
  if (age > 18) {
    message = 'please go vote!';
  } else {
    message = 'you must be 18';
  }
  return (
    <div>
      <p>Learn some information about this person</p>
      <h3>{pName}</h3>
      <h3>{message}</h3>
      <h3>Hobbies:</h3>
      <ul>
        {hobbies.map((h) => (
          <li>{h}</li>
        ))}
      </ul>
    </div>
  );
};
