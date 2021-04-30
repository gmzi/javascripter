const Tweet = (props) => {
  return (
    <div>
      <h3>Username: {props.username}</h3>
      <h4>Name: {props.name}</h4>
      <h5>Date: {props.date}</h5>
      <h6>Message:</h6>
      <p>{props.message}</p>
    </div>
  );
};
