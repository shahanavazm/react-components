// Creating a simple counter using React which increments or decrements
// count dynamically on-screen as the user clicks on the button

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function setIncCount() {
    setCount((prevCount) => prevCount + 1);
  }

  function setDecCount() {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <CounterPure
      count={count}
      onIncClick={setIncCount}
      onDecClick={setDecCount}
    />
  );
}

function CounterPure({ count, onIncClick, onDecClick }) {
  return (
    <>
      {count}
      <br />
      <button onClick={onDecClick}>Dec</button>
      <button onClick={onIncClick}>Inc</button>
    </>
  );
}
