// Creating a simple counter using React which increments or decrements
// count dynamically on-screen as the user clicks on the button

import { useButton } from "./util";

function CounterPure({ decClicks, decProps, incClicks, incProps }) {
  return (
    <>
      {incClicks - decClicks}
      <br />
      <button {...decProps}>Dec</button>
      <button {...incProps}>Inc</button>
    </>
  );
}

function Counter() {
  const [decProps, decClicks] = useButton();
  const [incProps, incClicks] = useButton();
  return <CounterPure {...{ decClicks, decProps, incClicks, incProps }} />;
}

export default Counter;
