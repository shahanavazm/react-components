import { useState } from "react";
import { useInterval } from "./util";

function StopwatchPure({ count, onStartClick, onStopClick, onResetClick }) {
  return (
    <>
      {count}
      <br />
      <button onClick={onStartClick}>Start</button>
      <button onClick={onStopClick}>Stop</button>
      <button onClick={onResetClick}>Reset</button>
    </>
  );
}

export default function Stopwatch() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(null);

  useInterval(() => {
    setCount((c) => c + 1);
  }, delay);

  function start() {
    setDelay(1);
  }

  function stop() {
    setDelay(null);
  }

  function reset() {
    setCount(0);
  }

  return (
    <StopwatchPure
      count={count}
      onStartClick={start}
      onStopClick={stop}
      onResetClick={reset}
    />
  );
}
