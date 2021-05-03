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
