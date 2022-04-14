import { useState } from "react";
import { useInterval } from "./util";

function StopwatchLcl({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  const [delay, setDelay] = useState(null);

  useInterval(() => {
    setCount(c => c + 1);
  }, delay);

  function handleStartClick() {
    setDelay(1);
  }

  function handleStopClick() {
    setDelay(null);
  }

  function handleResetClick() {
    setCount(initialCount);
  }

  // render inputs:
  // - count
  // - handleStartClick
  // - handleStopClick
  // - handleResetClick
  return (
    <>
      {count}
      <br />
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
      <button onClick={handleResetClick}>Reset</button>
    </>
  );
}

function Stopwatch() {
  return <StopwatchLcl initialCount={0} />;
}

export default Stopwatch;
